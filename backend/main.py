# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import exam, user

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Cloud Online Exam System",
    description="A simple cloud-based exam system using FastAPI and JWT.",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(user.router)  # /auth routes
app.include_router(exam.router)  # /exams routes

@app.get("/ping")
def ping():
    return {"message": "Backend is live!"}
