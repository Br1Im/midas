from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from ...database import get_db
from ...models.campaign import Campaign
from ...schemas.campaign import Campaign as CampaignSchema, CampaignCreate, CampaignUpdate, CampaignStats

router = APIRouter(prefix="/campaigns", tags=["campaigns"])

@router.get("/", response_model=List[CampaignSchema])
def get_campaigns(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    campaigns = db.query(Campaign).offset(skip).limit(limit).all()
    
    # Format response with stats
    result = []
    for campaign in campaigns:
        campaign_dict = {
            "id": campaign.id,
            "name": campaign.name,
            "description": campaign.description,
            "status": campaign.status,
            "template_id": campaign.template_id,
            "lead_ids": campaign.lead_ids or [],
            "start_date": campaign.start_date,
            "end_date": campaign.end_date,
            "stats": {
                "sent": campaign.sent_count,
                "opened": campaign.opened_count,
                "clicked": campaign.clicked_count,
                "bounced": campaign.bounced_count,
                "unsubscribed": campaign.unsubscribed_count,
            },
            "created_at": campaign.created_at,
            "updated_at": campaign.updated_at,
        }
        result.append(campaign_dict)
    
    return result

@router.get("/{campaign_id}", response_model=CampaignSchema)
def get_campaign(campaign_id: UUID, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    return {
        "id": campaign.id,
        "name": campaign.name,
        "description": campaign.description,
        "status": campaign.status,
        "template_id": campaign.template_id,
        "lead_ids": campaign.lead_ids or [],
        "start_date": campaign.start_date,
        "end_date": campaign.end_date,
        "stats": {
            "sent": campaign.sent_count,
            "opened": campaign.opened_count,
            "clicked": campaign.clicked_count,
            "bounced": campaign.bounced_count,
            "unsubscribed": campaign.unsubscribed_count,
        },
        "created_at": campaign.created_at,
        "updated_at": campaign.updated_at,
    }

@router.post("/", response_model=CampaignSchema)
def create_campaign(campaign: CampaignCreate, db: Session = Depends(get_db)):
    db_campaign = Campaign(**campaign.model_dump())
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    
    return {
        "id": db_campaign.id,
        "name": db_campaign.name,
        "description": db_campaign.description,
        "status": db_campaign.status,
        "template_id": db_campaign.template_id,
        "lead_ids": db_campaign.lead_ids or [],
        "start_date": db_campaign.start_date,
        "end_date": db_campaign.end_date,
        "stats": {
            "sent": 0,
            "opened": 0,
            "clicked": 0,
            "bounced": 0,
            "unsubscribed": 0,
        },
        "created_at": db_campaign.created_at,
        "updated_at": db_campaign.updated_at,
    }

@router.put("/{campaign_id}", response_model=CampaignSchema)
def update_campaign(campaign_id: UUID, campaign: CampaignUpdate, db: Session = Depends(get_db)):
    db_campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not db_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    for key, value in campaign.model_dump(exclude_unset=True).items():
        setattr(db_campaign, key, value)
    
    db.commit()
    db.refresh(db_campaign)
    
    return {
        "id": db_campaign.id,
        "name": db_campaign.name,
        "description": db_campaign.description,
        "status": db_campaign.status,
        "template_id": db_campaign.template_id,
        "lead_ids": db_campaign.lead_ids or [],
        "start_date": db_campaign.start_date,
        "end_date": db_campaign.end_date,
        "stats": {
            "sent": db_campaign.sent_count,
            "opened": db_campaign.opened_count,
            "clicked": db_campaign.clicked_count,
            "bounced": db_campaign.bounced_count,
            "unsubscribed": db_campaign.unsubscribed_count,
        },
        "created_at": db_campaign.created_at,
        "updated_at": db_campaign.updated_at,
    }

@router.post("/{campaign_id}/send")
def send_campaign(campaign_id: UUID, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # TODO: Implement actual email sending logic with Celery
    campaign.status = "active"
    db.commit()
    
    return {"message": "Campaign started", "campaign_id": campaign_id}

@router.get("/{campaign_id}/stats", response_model=CampaignStats)
def get_campaign_stats(campaign_id: UUID, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    return {
        "sent": campaign.sent_count,
        "opened": campaign.opened_count,
        "clicked": campaign.clicked_count,
        "bounced": campaign.bounced_count,
        "unsubscribed": campaign.unsubscribed_count,
    }
