"""Service for parsing leads from 2GIS using parser-2gis"""
import json
import tempfile
from typing import List, Dict, Any
from pathlib import Path

from ..parser_2gis.parser import get_parser
from ..parser_2gis.writer import get_writer
from ..parser_2gis.chrome.options import ChromeOptions
from ..parser_2gis.parser.options import ParserOptions
from ..parser_2gis.writer.options import WriterOptions


class Parser2GISService:
    """Service for parsing leads from 2GIS"""
    
    def __init__(self):
        self.chrome_options = ChromeOptions(
            headless=True,
            silent_browser=True,
            disable_images=True
        )
        
        self.parser_options = ParserOptions(
            max_records=100,
            skip_404_response=True,
            use_gc=True,
            gc_pages_interval=5
        )
        
        self.writer_options = WriterOptions()
    
    def parse_leads(self, url: str, max_records: int = 100) -> List[Dict[str, Any]]:
        """
        Parse leads from 2GIS URL
        
        Args:
            url: 2GIS search URL
            max_records: Maximum number of records to parse
            
        Returns:
            List of parsed leads
        """
        # Update max records
        self.parser_options.max_records = max_records
        
        # Create temporary file for results
        with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as tmp_file:
            tmp_path = tmp_file.name
        
        try:
            # Parse data
            with get_writer(tmp_path, 'json', self.writer_options) as writer:
                with get_parser(url, self.chrome_options, self.parser_options) as parser:
                    parser.parse(writer)
            
            # Read results with utf-8-sig to handle BOM
            with open(tmp_path, 'r', encoding='utf-8-sig') as f:
                content = f.read()
                # Handle empty file
                if not content or content.strip() == '':
                    return []
                data = json.loads(content)
            
            # Transform to lead format
            leads = self._transform_to_leads(data)
            return leads
            
        except Exception as e:
            # More detailed error message
            error_msg = str(e)
            if "No node with given id found" in error_msg or "Bound is incorrect" in error_msg:
                raise Exception(
                    "Ошибка парсинга 2GIS. Возможные причины:\n"
                    "1. Chrome не запущен или недоступен\n"
                    "2. Неверный формат URL\n"
                    "3. Страница 2GIS изменила структуру\n"
                    f"Детали: {error_msg}"
                )
            raise Exception(f"Ошибка парсинга: {error_msg}")
        finally:
            # Clean up temp file
            Path(tmp_path).unlink(missing_ok=True)
    
    def _transform_to_leads(self, data: List[Dict]) -> List[Dict[str, Any]]:
        """Transform 2GIS data to lead format"""
        leads = []
        
        for item in data:
            try:
                # Extract organization data
                org = item.get('org', {})
                address = item.get('address', {})
                contacts = item.get('contact_groups', [])
                
                # Extract phone
                phone = None
                if contacts:
                    for contact_group in contacts:
                        for contact in contact_group.get('contacts', []):
                            if contact.get('type') == 'phone':
                                phone = contact.get('text')
                                break
                        if phone:
                            break
                
                # Extract email
                email = None
                if contacts:
                    for contact_group in contacts:
                        for contact in contact_group.get('contacts', []):
                            if contact.get('type') == 'email':
                                email = contact.get('text')
                                break
                        if email:
                            break
                
                # Extract website
                website = None
                if contacts:
                    for contact_group in contacts:
                        for contact in contact_group.get('contacts', []):
                            if contact.get('type') == 'website':
                                website = contact.get('url')
                                break
                        if website:
                            break
                
                # Create lead
                lead = {
                    'name': org.get('name', ''),
                    'company': org.get('name', ''),
                    'email': email,
                    'phone': phone,
                    'location': address.get('name', ''),
                    'source': '2GIS',
                    'status': 'new',
                    'score': 50,
                    'website': website,
                    'rubrics': [r.get('name') for r in item.get('rubrics', [])],
                    'raw_data': item  # Store original data
                }
                
                # Only add if we have at least email or phone
                if email or phone:
                    leads.append(lead)
                    
            except Exception as e:
                print(f"Error transforming lead: {e}")
                continue
        
        return leads


# Singleton instance
parser_service = Parser2GISService()
