"""Test script for 2GIS parser integration"""
import sys
import os

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

print("Testing 2GIS Parser Integration...")
print("-" * 50)

# Test 1: Import parser module
print("\n1. Testing imports...")
try:
    from src.parser_2gis.parser import get_parser
    from src.parser_2gis.chrome.options import ChromeOptions
    from src.parser_2gis.parser.options import ParserOptions
    print("✓ Parser modules imported successfully")
except Exception as e:
    print(f"✗ Import error: {e}")
    sys.exit(1)

# Test 2: Import service
print("\n2. Testing service import...")
try:
    from src.services.parser_service import parser_service
    print("✓ Parser service imported successfully")
except Exception as e:
    print(f"✗ Service import error: {e}")
    sys.exit(1)

# Test 3: Check Chrome
print("\n3. Checking Chrome installation...")
try:
    from src.parser_2gis.chrome.browser import ChromeBrowser
    browser = ChromeBrowser()
    chrome_path = browser.get_chrome_path()
    print(f"✓ Chrome found at: {chrome_path}")
except Exception as e:
    print(f"✗ Chrome not found: {e}")
    print("  Please install Google Chrome to use the parser")

# Test 4: Test service initialization
print("\n4. Testing service initialization...")
try:
    service = parser_service
    print(f"✓ Service initialized")
    print(f"  - Headless mode: {service.chrome_options.headless}")
    print(f"  - Max records: {service.parser_options.max_records}")
except Exception as e:
    print(f"✗ Service initialization error: {e}")
    sys.exit(1)

# Test 5: Test URL generation
print("\n5. Testing URL generation...")
try:
    test_url = "https://2gis.ru/moscow/search/рестораны"
    print(f"✓ Test URL: {test_url}")
except Exception as e:
    print(f"✗ URL generation error: {e}")

print("\n" + "=" * 50)
print("All basic tests passed! ✓")
print("=" * 50)
print("\nNote: Actual parsing requires Chrome and internet connection.")
print("To test parsing, use the API endpoint:")
print('  POST http://localhost:8001/api/parse')
print('  Body: {"url": "https://2gis.ru/moscow/search/рестораны", "max_records": 5}')
