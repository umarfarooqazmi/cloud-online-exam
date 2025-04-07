# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import user, exam  # user = auth endpoints, exam = exam operations

# Create all tables in the database
Base.metadata.create_all(bind=engine)

# FastAPI app instance
app = FastAPI(
    title="Cloud Online Exam System",
    description="A simple cloud-based exam system using FastAPI and JWT.",
    version="1.0.0",
)

# ✅ Add CORS middleware here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route handlers
app.include_router(user.router)  # Handles /auth/register and /auth/login
app.include_router(exam.router)  # Handles /exams and /submit

# Health check endpoint
@app.get("/ping")
def ping():
    return {"message": "Backend is live!"}
