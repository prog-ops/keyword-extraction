import { useState, useCallback } from 'react'
import { analyzeAndCorrectGrammar } from '@/services/grammar/grammarService'

/**
 * Custom hook encapsulating state and workflow for the English Grammar Checker.
 */
export function useGrammarChecker() {
  const [text, setText] = useState('')
  const [localOnly, setLocalOnly] = useState(false)
  const [isSplit, setIsSplit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const startCheck = useCallback(
    async (overrideText) => {
      const targetText =
        typeof overrideText === 'string' ? overrideText : text
      const trimmed = targetText.trim()

      if (!trimmed) {
        return { ok: false, error: 'EMPTY_INPUT' }
      }

      // Activate split-pane layout only when Start is clicked with valid input
      setIsSplit(true)
      setIsLoading(true)

      try {
        const analysis = await analyzeAndCorrectGrammar(trimmed, { localOnly })
        setResult(analysis)
        return { ok: true, data: analysis }
      } catch (err) {
        return {
          ok: false,
          error: err instanceof Error ? err.message : 'UNKNOWN_ERROR',
        }
      } finally {
        setIsLoading(false)
      }
    },
    [text, localOnly]
  )

  const resetWorkspace = useCallback(() => {
    setText('')
    setResult(null)
    setIsSplit(false)
    setIsLoading(false)
  }, [])

  return {
    text,
    setText,
    localOnly,
    setLocalOnly,
    isSplit,
    isLoading,
    result,
    startCheck,
    resetWorkspace,
  }
}

