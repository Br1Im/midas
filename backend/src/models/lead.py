from sqlalchemy import Column, String, DateTime, Enum, Integer
from datetime import datetime
import enum
from ..database import Base

class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    CONVERTED = "converted"
    LOST = "lost"

class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False, index=True)
    first_name = Column(String)
    last_name = Column(String)
    company = Column(String)
    position = Column(String)
    linkedin_url = Column(String)
    phone = Column(String)
    location = Column(String)
    industry = Column(String)
    company_size = Column(String)
    source = Column(String, nullable=False)
    status = Column(Enum(LeadStatus), default=LeadStatus.NEW)
    score = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
