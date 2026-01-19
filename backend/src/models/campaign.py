from sqlalchemy import Column, String, DateTime, Enum, Integer, ForeignKey, JSON
from datetime import datetime
import enum
from ..database import Base

class CampaignStatus(str, enum.Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"

class Campaign(Base):
    __tablename__ = "campaigns"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String)
    status = Column(Enum(CampaignStatus), default=CampaignStatus.DRAFT)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    template_id = Column(Integer, ForeignKey("email_templates.id"))
    lead_ids = Column(JSON, default=list)
    
    # Stats
    sent_count = Column(Integer, default=0)
    opened_count = Column(Integer, default=0)
    clicked_count = Column(Integer, default=0)
    bounced_count = Column(Integer, default=0)
    unsubscribed_count = Column(Integer, default=0)
    lead_count = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
