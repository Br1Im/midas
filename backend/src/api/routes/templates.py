from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from ...database import get_db
from ...models.template import EmailTemplate
from ...schemas.template import Template, TemplateCreate, TemplateUpdate

router = APIRouter(prefix="/templates", tags=["templates"])

@router.get("/", response_model=List[Template])
def get_templates(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    templates = db.query(EmailTemplate).offset(skip).limit(limit).all()
    return templates

@router.get("/{template_id}", response_model=Template)
def get_template(template_id: UUID, db: Session = Depends(get_db)):
    template = db.query(EmailTemplate).filter(EmailTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.post("/", response_model=Template)
def create_template(template: TemplateCreate, db: Session = Depends(get_db)):
    db_template = EmailTemplate(**template.model_dump())
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    return db_template

@router.put("/{template_id}", response_model=Template)
def update_template(template_id: UUID, template: TemplateUpdate, db: Session = Depends(get_db)):
    db_template = db.query(EmailTemplate).filter(EmailTemplate.id == template_id).first()
    if not db_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    for key, value in template.model_dump(exclude_unset=True).items():
        setattr(db_template, key, value)
    
    db.commit()
    db.refresh(db_template)
    return db_template

@router.delete("/{template_id}")
def delete_template(template_id: UUID, db: Session = Depends(get_db)):
    db_template = db.query(EmailTemplate).filter(EmailTemplate.id == template_id).first()
    if not db_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    db.delete(db_template)
    db.commit()
    return {"message": "Template deleted successfully"}
