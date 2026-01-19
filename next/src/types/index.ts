export interface Lead {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  position?: string
  linkedinUrl?: string
  phone?: string
  location?: string
  industry?: string
  companySize?: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  name: string
  description?: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate?: string
  endDate?: string
  templateId: string
  leadIds: string[]
  stats: {
    sent: number
    opened: number
    clicked: number
    bounced: number
    unsubscribed: number
  }
  createdAt: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  variables: string[]
  language: string
  createdAt: string
  updatedAt: string
}

export interface SentEmail {
  id: string
  leadId: string
  campaignId: string
  templateId: string
  subject: string
  body: string
  sentAt: string
  openedAt?: string
  clickedAt?: string
  bounced: boolean
  unsubscribed: boolean
}
