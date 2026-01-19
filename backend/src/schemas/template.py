from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class TemplateBase(BaseModel):
    name: str
    subject: str
    body: str
    variables: List[str] = []
    language: str = "ru"

class TemplateCreate(TemplateBase):
    pass

class TemplateUpdate(BaseModel):
    name: Optional[str] = None
    subject: Optional[str] = None
    body: Optional[str] = None
    variables: Optional[List[str]] = None
    language: Optional[str] = None

class Template(TemplateBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
