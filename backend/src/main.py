from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .api.routes import leads, campaigns, templates, parser

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Midas API",
    description="Lead generation and email campaign management API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(leads.router, prefix="/api")
app.include_router(campaigns.router, prefix="/api")
app.include_router(templates.router, prefix="/api")
app.include_router(parser.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Midas API", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}
