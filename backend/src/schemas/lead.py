from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID

class LeadBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    linkedin_url: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    source: str
    status: Optional[str] = "new"

class LeadCreate(LeadBase):
    pass

class LeadUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    linkedin_url: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    status: Optional[str] = None

class Lead(LeadBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
