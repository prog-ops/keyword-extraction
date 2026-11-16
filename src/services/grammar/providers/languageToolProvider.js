import { APP_CONFIG } from '@/config/constants'

/**
 * Calls the LanguageTool public HTTP API for contextual English grammar corrections.
 * @param {string} text
 * @returns {Promise<{ correctedText: string, matchLogs: import('@/domain/grammar/grammarTypes').RuleMatchLog[] } | null>}
 */
export async function runLanguageToolCheck(text) {
  const controller = new AbortController()
  const timeoutId = setTimeout(
    () => controller.abort(),
    APP_CONFIG.requestTimeoutMs
  )

  try {
    const params = new URLSearchParams({
      text,
      language: 'en-US',
    })

    const response = await fetch(APP_CONFIG.languageToolEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
      signal: controller.signal,
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    if (!data || !Array.isArray(data.matches)) {
      return null
    }

    /** @type {import('@/domain/grammar/grammarTypes').RuleMatchLog[]} */
    const matchLogs = []

    // Filter matches that have at least one replacement and sort descending by offset
    const validMatches = data.matches
      .filter(
        (m) =>
          typeof m.offset === 'number' &&
          typeof m.length === 'number' &&
          m.length > 0 &&
          Array.isArray(m.replacements) &&
          m.replacements.length > 0 &&
          typeof m.replacements[0].value === 'string'
      )
      .sort((a, b) => b.offset - a.offset)

    let workingText = text
    let lastStartOffset = Infinity

    for (const match of validMatches) {
      const start = match.offset
      const end = start + match.length

      // Avoid overlapping replacements
      if (end > lastStartOffset) {
        continue
      }

      const originalSlice = workingText.slice(start, end)
      const replacementValue = match.replacements[0].value

      if (replacementValue && replacementValue !== originalSlice) {
        workingText =
          workingText.slice(0, start) +
          replacementValue +
          workingText.slice(end)
        lastStartOffset = start

        matchLogs.push({
          original: originalSlice,
          replacement: replacementValue,
          category: match.rule?.category?.name || 'Grammar',
          explanation: match.message || `Corrected "${originalSlice}" to "${replacementValue}".`,
        })
      }
    }

    return {
      correctedText: workingText,
      matchLogs: matchLogs.reverse(),
    }
  } catch {
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

