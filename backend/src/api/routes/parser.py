"""API routes for 2GIS parser"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, HttpUrl
from typing import List, Optional

from ...database import get_db
from ...models.lead import Lead, LeadStatus
from ...services.parser_service import parser_service

router = APIRouter(tags=["parser"])


class ParseRequest(BaseModel):
    url: str
    max_records: int = 100
    auto_save: bool = True


class ParseResponse(BaseModel):
    success: bool
    leads_found: int
    leads_saved: int
    message: str


@router.post("/parse", response_model=ParseResponse)
async def parse_2gis(
    request: ParseRequest,
    db: Session = Depends(get_db)
):
    """
    Parse leads from 2GIS URL
    
    Args:
        request: Parse request with URL and options
        db: Database session
        
    Returns:
        Parse results
    """
    try:
        # Parse leads from 2GIS
        leads_data = parser_service.parse_leads(
            url=request.url,
            max_records=request.max_records
        )
        
        leads_saved = 0
        
        # Save to database if auto_save is enabled
        if request.auto_save:
            for lead_data in leads_data:
                # Check if lead already exists by email or phone
                existing_lead = None
                if lead_data.get('email'):
                    existing_lead = db.query(Lead).filter(
                        Lead.email == lead_data['email']
                    ).first()
                
                if not existing_lead:
                    # Create new lead
                    lead = Lead(
                        email=lead_data.get('email') or f"noemail_{leads_saved}@2gis.local",
                        first_name=lead_data.get('name', '').split()[0] if lead_data.get('name') else '',
                        last_name=' '.join(lead_data.get('name', '').split()[1:]) if lead_data.get('name') else '',
                        company=lead_data.get('company'),
                        phone=lead_data.get('phone'),
                        location=lead_data.get('location'),
                        source=lead_data.get('source', '2GIS'),
                        status=LeadStatus.NEW,
                        score=lead_data.get('score', 50)
                    )
                    db.add(lead)
                    leads_saved += 1
            
            db.commit()
        
        return ParseResponse(
            success=True,
            leads_found=len(leads_data),
            leads_saved=leads_saved,
            message=f"Successfully parsed {len(leads_data)} leads from 2GIS"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error parsing 2GIS: {str(e)}"
        )


@router.get("/generate-url")
async def generate_2gis_url(
    city: str,
    rubric: str,
    query: Optional[str] = None
):
    """
    Generate 2GIS search URL
    
    Args:
        city: City name (e.g., 'moscow', 'spb')
        rubric: Rubric/category
        query: Optional search query
        
    Returns:
        Generated URL
    """
    # Encode rubric for URL
    import urllib.parse
    
    # Build search query
    if query:
        search_query = f"{rubric} {query}"
    else:
        search_query = rubric
    
    # Encode the search query
    encoded_query = urllib.parse.quote(search_query)
    
    # Build URL - use rubricId format for better compatibility
    url = f"https://2gis.ru/{city}/search/{encoded_query}"
    
    return {
        "url": url,
        "city": city,
        "rubric": rubric,
        "query": query
    }
