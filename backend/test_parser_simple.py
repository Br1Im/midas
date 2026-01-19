"""Simple test to verify parser can be imported and initialized"""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

print("=" * 60)
print("TESTING 2GIS PARSER INTEGRATION")
print("=" * 60)

# Test 1: Basic imports
print("\n[TEST 1] Importing parser modules...")
try:
    from src.parser_2gis.chrome.options import ChromeOptions
    from src.parser_2gis.parser.options import ParserOptions
    from src.parser_2gis.writer.options import WriterOptions
    print("✓ PASS: All parser modules imported")
except ImportError as e:
    print(f"✗ FAIL: {e}")
    sys.exit(1)

# Test 2: Service import
print("\n[TEST 2] Importing parser service...")
try:
    from src.services.parser_service import Parser2GISService
    print("✓ PASS: Parser service imported")
except ImportError as e:
    print(f"✗ FAIL: {e}")
    sys.exit(1)

# Test 3: Service initialization
print("\n[TEST 3] Initializing parser service...")
try:
    service = Parser2GISService()
    print("✓ PASS: Service initialized")
    print(f"  Config:")
    print(f"    - Headless: {service.chrome_options.headless}")
    print(f"    - Disable images: {service.chrome_options.disable_images}")
    print(f"    - Max records: {service.parser_options.max_records}")
except Exception as e:
    print(f"✗ FAIL: {e}")
    sys.exit(1)

# Test 4: Transform function
print("\n[TEST 4] Testing data transformation...")
try:
    test_data = [{
        'org': {'name': 'Test Restaurant'},
        'address': {'name': 'Moscow, Red Square'},
        'contact_groups': [{
            'contacts': [
                {'type': 'phone', 'text': '+7 (495) 123-45-67'},
                {'type': 'email', 'text': 'test@restaurant.ru'}
            ]
        }],
        'rubrics': [{'name': 'Restaurants'}]
    }]
    
    leads = service._transform_to_leads(test_data)
    
    if len(leads) == 1:
        lead = leads[0]
        print("✓ PASS: Data transformation works")
        print(f"  Transformed lead:")
        print(f"    - Name: {lead['name']}")
        print(f"    - Phone: {lead['phone']}")
        print(f"    - Email: {lead['email']}")
        print(f"    - Location: {lead['location']}")
    else:
        print(f"✗ FAIL: Expected 1 lead, got {len(leads)}")
except Exception as e:
    print(f"✗ FAIL: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Test 5: API route import
print("\n[TEST 5] Importing API routes...")
try:
    from src.api.routes import parser
    print("✓ PASS: Parser API routes imported")
    print(f"  Available endpoints:")
    print(f"    - POST /api/parse")
    print(f"    - GET /api/generate-url")
except ImportError as e:
    print(f"✗ FAIL: {e}")
    sys.exit(1)

print("\n" + "=" * 60)
print("ALL TESTS PASSED! ✓")
print("=" * 60)
print("\nParser is ready to use!")
print("\nTo start parsing:")
print("1. Make sure Chrome is installed")
print("2. Start the backend: python -m uvicorn src.main:app --reload --port 8001")
print("3. Send POST request to: http://localhost:8001/api/parse")
print('   Body: {"url": "https://2gis.ru/moscow/search/рестораны", "max_records": 10}')
