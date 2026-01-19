from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from ...database import get_db
from ...models.lead import Lead
from ...schemas.lead import Lead as LeadSchema, LeadCreate, LeadUpdate

router = APIRouter(prefix="/leads", tags=["leads"])

@router.get("/", response_model=List[LeadSchema])
def get_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Lead)
    if status:
        query = query.filter(Lead.status == status)
    leads = query.offset(skip).limit(limit).all()
    return leads

@router.get("/{lead_id}", response_model=LeadSchema)
def get_lead(lead_id: UUID, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.post("/", response_model=LeadSchema)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing = db.query(Lead).filter(Lead.email == lead.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    db_lead = Lead(**lead.model_dump())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@router.put("/{lead_id}", response_model=LeadSchema)
def update_lead(lead_id: UUID, lead: LeadUpdate, db: Session = Depends(get_db)):
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    for key, value in lead.model_dump(exclude_unset=True).items():
        setattr(db_lead, key, value)
    
    db.commit()
    db.refresh(db_lead)
    return db_lead

@router.delete("/{lead_id}")
def delete_lead(lead_id: UUID, db: Session = Depends(get_db)):
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    db.delete(db_lead)
    db.commit()
    return {"message": "Lead deleted successfully"}

@router.post("/search")
def search_leads(query: str, db: Session = Depends(get_db)):
    leads = db.query(Lead).filter(
        (Lead.first_name.ilike(f"%{query}%")) |
        (Lead.last_name.ilike(f"%{query}%")) |
        (Lead.email.ilike(f"%{query}%")) |
        (Lead.company.ilike(f"%{query}%"))
    ).limit(50).all()
    return leads
