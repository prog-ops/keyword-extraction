import { applySpellingRules } from '@/domain/grammar/rules/spellingRules'
import { applyGrammarPatterns } from '@/domain/grammar/rules/grammarPatterns'
import { applyPunctuationRules } from '@/domain/grammar/rules/punctuationRules'

/**
 * Runs deterministic local English spelling, grammar, and punctuation rules.
 * @param {string} text
 * @returns {{ correctedText: string, matchLogs: import('@/domain/grammar/grammarTypes').RuleMatchLog[] }}
 */
export function runLocalGrammarCheck(text) {
  /** @type {import('@/domain/grammar/grammarTypes').RuleMatchLog[]} */
  const matchLogs = []

  let workingText = text
  workingText = applySpellingRules(workingText, matchLogs)
  workingText = applyGrammarPatterns(workingText, matchLogs)
  workingText = applyPunctuationRules(workingText, matchLogs)

  return {
    correctedText: workingText,
    matchLogs,
  }
}

