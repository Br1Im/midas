from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    template_id: Optional[UUID] = None
    lead_ids: List[UUID] = []

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    template_id: Optional[UUID] = None
    lead_ids: Optional[List[UUID]] = None

class CampaignStats(BaseModel):
    sent: int
    opened: int
    clicked: int
    bounced: int
    unsubscribed: int

class Campaign(CampaignBase):
    id: UUID
    status: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    stats: CampaignStats
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
