/**
 * @typedef {Object} RuleMatchLog
 * @property {string} original
 * @property {string} replacement
 * @property {string} category
 * @property {string} explanation
 */

/**
 * @typedef {Object} TextSegment
 * @property {string} id
 * @property {string} text
 * @property {boolean} isCorrected
 * @property {string} [original]
 * @property {string} [category]
 * @property {string} [explanation]
 */

/**
 * @typedef {Object} CorrectionDetail
 * @property {string} id
 * @property {string} original
 * @property {string} corrected
 * @property {string} category
 * @property {string} explanation
 */

/**
 * @typedef {Object} GrammarAnalysisResult
 * @property {string} originalText
 * @property {string} correctedText
 * @property {string} markdownText
 * @property {TextSegment[]} segments
 * @property {CorrectionDetail[]} corrections
 * @property {number} correctionCount
 * @property {string} engineUsed
 * @property {number} durationMs
 */

/**
 * Preserves the capitalization pattern of the source word when applying a replacement.
 * @param {string} source
 * @param {string} target
 * @returns {string}
 */
export function matchCase(source, target) {
  if (!source || !target) return target

  // Special case: standalone pronoun "I" or contractions starting with "I'"
  if (target === 'I' || target.startsWith("I'")) {
    return target
  }

  // All uppercase (for words of length > 1)
  if (source.length > 1 && source === source.toUpperCase()) {
    return target.toUpperCase()
  }

  // First letter capitalized
  if (
    source[0] === source[0].toUpperCase() &&
    source[0] !== source[0].toLowerCase()
  ) {
    return target.charAt(0).toUpperCase() + target.slice(1)
  }

  return target
}

