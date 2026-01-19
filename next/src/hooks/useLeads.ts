'use client'

import { useState, useEffect } from 'react'
import { leadsApi } from '@/lib/api'

export function useLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await leadsApi.getAll()
      setLeads(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching leads:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  return { leads, loading, error, refetch: fetchLeads }
}
