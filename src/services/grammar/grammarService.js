import { buildDiffAnalysis } from '@/domain/grammar/diffEngine'
import { runLocalGrammarCheck } from '@/services/grammar/providers/localGrammarProvider'
import { runLanguageToolCheck } from '@/services/grammar/providers/languageToolProvider'

/**
 * Checks and corrects English grammar in the given text, returning full diff segments
 * where corrected words are flagged for bold display.
 *
 * @param {string} rawText
 * @param {{ localOnly?: boolean }} [options]
 * @returns {Promise<import('@/domain/grammar/grammarTypes').GrammarAnalysisResult>}
 */
export async function analyzeAndCorrectGrammar(rawText, options = {}) {
  const { localOnly = false } = options
  const startTime = performance.now()
  const originalText = rawText.trim()

  if (!originalText) {
    throw new Error('Input text cannot be empty.')
  }

  // Pass 1: Deterministic local grammar & spelling rules
  const localPass = runLocalGrammarCheck(originalText)
  let currentText = localPass.correctedText
  const combinedLogs = [...localPass.matchLogs]
  let engineUsed = localOnly
    ? 'Local-Only Engine (Offline)'
    : 'Local Grammar Engine'

  // Pass 2: Contextual refinement via LanguageTool API (skipped in Local-Only mode)
  if (!localOnly) {
    const remotePass = await runLanguageToolCheck(currentText)
    if (remotePass) {
      currentText = remotePass.correctedText
      combinedLogs.push(...remotePass.matchLogs)
      engineUsed = 'Hybrid (Local + LanguageTool NLP)'

      // Final normalization pass on remote output
      const postPass = runLocalGrammarCheck(currentText)
      currentText = postPass.correctedText
      combinedLogs.push(...postPass.matchLogs)
    }
  }

  const { segments, corrections, markdownText } = buildDiffAnalysis(
    originalText,
    currentText,
    combinedLogs
  )

  const durationMs = Math.max(1, Math.round(performance.now() - startTime))

  return {
    originalText,
    correctedText: currentText,
    markdownText,
    segments,
    corrections,
    correctionCount: corrections.length,
    engineUsed,
    durationMs,
  }
}

