/**
 * Applies capitalization, pronoun "I", repeated-word removal, and punctuation spacing rules.
 * @param {string} inputText
 * @param {import('@/domain/grammar/grammarTypes').RuleMatchLog[]} matchLogs
 * @returns {string}
 */
export function applyPunctuationRules(inputText, matchLogs = []) {
  let text = inputText

  // 1. Standalone lowercase "i" and "i'm / i've / i'll / i'd"
  text = text.replace(/\bi(?=('m|'ve|'ll|'d)\b|\b)/g, (match) => {
    matchLogs.push({
      original: match,
      replacement: 'I',
      category: 'Capitalization',
      explanation: 'The pronoun "I" is always capitalized in English.',
    })
    return 'I'
  })

  // 2. Accidental repeated words ("the the", "is is", "to to")
  text = text.replace(/\b([A-Za-z]+)\s+\1\b/gi, (match, word) => {
    if (word.toLowerCase() === 'had' || word.toLowerCase() === 'that') {
      return match
    }
    matchLogs.push({
      original: match,
      replacement: word,
      category: 'Repeated Word',
      explanation: `Removed duplicate word "${word}".`,
    })
    return word
  })

  // 3. Remove extra spaces before punctuation marks
  text = text.replace(/\s+([,.;!?])/g, '$1')

  // 4. Capitalize the first letter at the start of the text and after sentence-ending punctuation
  text = text.replace(/(^\s*|[.!?]\s+|\n\s*)([a-z])/g, (match, prefix, letter) => {
    const upper = letter.toUpperCase()
    matchLogs.push({
      original: letter,
      replacement: upper,
      category: 'Capitalization',
      explanation: 'Capitalize the first word of every sentence.',
    })
    return `${prefix}${upper}`
  })

  return text
}

