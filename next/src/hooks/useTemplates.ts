'use client'

import { useState, useEffect } from 'react'
import { templatesApi } from '@/lib/api'

export function useTemplates() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await templatesApi.getAll()
      setTemplates(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching templates:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  return { templates, loading, error, refetch: fetchTemplates }
}
