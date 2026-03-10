"""API клиент для взаимодействия с бэкендом"""
import os
import httpx
from typing import List, Dict, Any


class MidasAPI:
    """Клиент для API Midas"""
    
    def __init__(self):
        self.base_url = os.getenv("API_URL", "http://localhost:8001")
        self.client = httpx.AsyncClient(base_url=self.base_url)
    
    async def get_leads(self, skip: int = 0, limit: int = 10) -> List[Dict[str, Any]]:
        """Получить список лидов"""
        response = await self.client.get(f"/api/leads?skip={skip}&limit={limit}")
        response.raise_for_status()
        return response.json()
    
    async def parse_leads(self, url: str, max_records: int = 50) -> Dict[str, Any]:
        """Запустить парсинг лидов"""
        response = await self.client.post(
            "/api/parse",
            json={
                "url": url,
                "max_records": max_records,
                "auto_save": True
            }
        )
        response.raise_for_status()
        return response.json()
    
    async def get_stats(self) -> Dict[str, Any]:
        """Получить статистику"""
        leads = await self.get_leads(limit=1000)
        
        stats = {
            "total": len(leads),
            "new": sum(1 for lead in leads if lead.get("status") == "new"),
            "contacted": sum(1 for lead in leads if lead.get("status") == "contacted"),
            "qualified": sum(1 for lead in leads if lead.get("status") == "qualified"),
            "converted": sum(1 for lead in leads if lead.get("status") == "converted"),
        }
        
        return stats
    
    async def close(self):
        """Закрыть соединение"""
        await self.client.aclose()


# Singleton instance
api = MidasAPI()
