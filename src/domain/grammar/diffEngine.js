/**
 * Tokenizes text into words (including apostrophes), whitespace, and punctuation.
 * @param {string} text
 * @returns {string[]}
 */
export function tokenizeText(text) {
  if (!text) return []
  return text.match(/[A-Za-z0-9'\u2019]+|\s+|[^\sA-Za-z0-9'\u2019]+/g) || []
}

/**
 * Computes Longest Common Subsequence (LCS) diff operations between two token arrays.
 * @param {string[]} origTokens
 * @param {string[]} corrTokens
 * @returns {Array<{ type: 'equal' | 'delete' | 'insert', token: string }>}
 */
function computeTokenDiff(origTokens, corrTokens) {
  const m = origTokens.length
  const n = corrTokens.length

  // DP table for LCS
  const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1))

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (origTokens[i] === corrTokens[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1])
      }
    }
  }

  const ops = []
  let i = 0
  let j = 0

  while (i < m && j < n) {
    if (origTokens[i] === corrTokens[j]) {
      ops.push({ type: 'equal', token: origTokens[i] })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: 'delete', token: origTokens[i] })
      i++
    } else {
      ops.push({ type: 'insert', token: corrTokens[j] })
      j++
    }
  }

  while (i < m) {
    ops.push({ type: 'delete', token: origTokens[i++] })
  }
  while (j < n) {
    ops.push({ type: 'insert', token: corrTokens[j++] })
  }

  return ops
}

/**
 * Finds the best matching rule explanation from matchLogs for a given original -> corrected pair.
 * @param {string} original
 * @param {string} corrected
 * @param {import('@/domain/grammar/grammarTypes').RuleMatchLog[]} matchLogs
 * @returns {{ category: string, explanation: string }}
 */
function resolveExplanation(original, corrected, matchLogs) {
  const origLower = original.trim().toLowerCase()
  const corrLower = corrected.trim().toLowerCase()

  // Direct or partial match in logs
  for (const log of matchLogs) {
    const logOrig = log.original.trim().toLowerCase()
    const logRepl = log.replacement.trim().toLowerCase()
    if (
      (origLower && (logOrig === origLower || logOrig.includes(origLower))) ||
      (corrLower && (logRepl === corrLower || logRepl.includes(corrLower)))
    ) {
      return {
        category: log.category,
        explanation: log.explanation,
      }
    }
  }

  if (origLower === corrLower && original !== corrected) {
    return {
      category: 'Capitalization',
      explanation: `Capitalized "${original}" to "${corrected}".`,
    }
  }

  return {
    category: 'Grammar & Usage',
    explanation: original
      ? `Corrected "${original}" to "${corrected}".`
      : `Inserted "${corrected}" for grammatical completeness.`,
  }
}

/**
 * Builds output segments (marking corrected words for bold rendering) and a list of corrections.
 * @param {string} originalText
 * @param {string} correctedText
 * @param {import('@/domain/grammar/grammarTypes').RuleMatchLog[]} [matchLogs=[]]
 * @returns {{
 *   segments: import('@/domain/grammar/grammarTypes').TextSegment[],
 *   corrections: import('@/domain/grammar/grammarTypes').CorrectionDetail[],
 *   markdownText: string
 * }}
 */
export function buildDiffAnalysis(originalText, correctedText, matchLogs = []) {
  const origTokens = tokenizeText(originalText)
  const corrTokens = tokenizeText(correctedText)
  const ops = computeTokenDiff(origTokens, corrTokens)

  /** @type {import('@/domain/grammar/grammarTypes').TextSegment[]} */
  const segments = []
  /** @type {import('@/domain/grammar/grammarTypes').CorrectionDetail[]} */
  const corrections = []

  let idx = 0
  let segCounter = 0
  let corrCounter = 0

  while (idx < ops.length) {
    const current = ops[idx]

    if (current.type === 'equal') {
      segments.push({
        id: `seg-${++segCounter}`,
        text: current.token,
        isCorrected: false,
      })
      idx++
      continue
    }

    // Collect contiguous delete/insert cluster
    const deletedTokens = []
    const insertedTokens = []

    while (idx < ops.length && ops[idx].type !== 'equal') {
      const op = ops[idx]
      if (op.type === 'delete') {
        deletedTokens.push(op.token)
      } else if (op.type === 'insert') {
        insertedTokens.push(op.token)
      }
      idx++
    }

    const originalPhrase = deletedTokens.join('')
    const correctedPhrase = insertedTokens.join('')

    if (!correctedPhrase) {
      // Pure deletion (e.g., removed duplicate word or redundant preposition)
      if (originalPhrase.trim()) {
        const meta = resolveExplanation(originalPhrase, '', matchLogs)
        corrections.push({
          id: `corr-${++corrCounter}`,
          original: originalPhrase.trim(),
          corrected: '(removed)',
          category: meta.category,
          explanation: meta.explanation,
        })
      }
      continue
    }

    // Separate leading/trailing whitespace so only the actual corrected words are bolded
    const leadingWsMatch = correctedPhrase.match(/^\s+/)
    const trailingWsMatch = correctedPhrase.match(/\s+$/)
    const leadingWs = leadingWsMatch ? leadingWsMatch[0] : ''
    const trailingWs =
      trailingWsMatch && leadingWs.length < correctedPhrase.length
        ? trailingWsMatch[0]
        : ''
    const coreCorrected = correctedPhrase.slice(
      leadingWs.length,
      correctedPhrase.length - trailingWs.length
    )
    const coreOriginal = originalPhrase.trim()

    if (leadingWs) {
      segments.push({
        id: `seg-${++segCounter}`,
        text: leadingWs,
        isCorrected: false,
      })
    }

    if (coreCorrected) {
      const meta = resolveExplanation(coreOriginal, coreCorrected, matchLogs)

      segments.push({
        id: `seg-${++segCounter}`,
        text: coreCorrected,
        isCorrected: true,
        original: coreOriginal || undefined,
        category: meta.category,
        explanation: meta.explanation,
      })

      corrections.push({
        id: `corr-${++corrCounter}`,
        original: coreOriginal || '(missing word)',
        corrected: coreCorrected,
        category: meta.category,
        explanation: meta.explanation,
      })
    }

    if (trailingWs) {
      segments.push({
        id: `seg-${++segCounter}`,
        text: trailingWs,
        isCorrected: false,
      })
    }
  }

  const markdownText = segments
    .map((segment) => (segment.isCorrected ? `**${segment.text}**` : segment.text))
    .join('')

  return {
    segments,
    corrections,
    markdownText,
  }
}
