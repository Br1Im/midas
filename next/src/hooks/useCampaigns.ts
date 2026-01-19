'use client'

import { useState, useEffect } from 'react'
import { campaignsApi } from '@/lib/api'

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await campaignsApi.getAll()
      setCampaigns(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching campaigns:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  return { campaigns, loading, error, refetch: fetchCampaigns }
}
