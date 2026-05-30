import { useState, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export function usePredict() {
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const predict = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const body = new FormData()
      body.append('file', file)

      const res = await fetch(`${API_BASE}/predict`, { method: 'POST', body })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.detail ?? `HTTP ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, loading, error, predict, reset }
}
