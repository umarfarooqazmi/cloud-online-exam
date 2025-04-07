# backend/routers/exam.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(prefix="/exams", tags=["exams"])

@router.get("/", response_model=list[schemas.ExamOut])
def get_exams(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    exams = db.query(models.Exam).all()
    return exams