from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/midas"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # API Keys
    OPENAI_API_KEY: Optional[str] = None
    HUNTER_API_KEY: Optional[str] = None
    
    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Rate Limits
    EMAILS_PER_HOUR: int = 50
    EMAILS_PER_DAY: int = 500
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:3001"]
    
    class Config:
        env_file = ".env"

settings = Settings()
