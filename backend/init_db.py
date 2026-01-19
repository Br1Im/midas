"""Initialize database with tables"""
from src.database import engine, Base
from src.models import lead, campaign, template

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Database initialized successfully!")
