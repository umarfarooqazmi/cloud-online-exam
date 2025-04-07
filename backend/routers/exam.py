# backend/routers/exam.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from uuid import uuid4

from database import get_db
from models import Exam, Question, Submission, Answer, User
from schemas import ExamCreate, ExamOut, ResponseCreate
from auth import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/exams", tags=["exams"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# ----------------------------
# Auth: Get current user
# ----------------------------
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ----------------------------
# Create Exam (Admin/Teacher)
# ----------------------------
@router.post("/", response_model=ExamOut)
def create_exam(exam: ExamCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_exam = Exam(
        id=uuid4(),
        title=exam.title,
        description=exam.description,
        created_by=current_user.id
    )
    db.add(new_exam)
    db.flush()  # So new_exam.id is available

    for q in exam.questions:
        new_question = Question(
            id=uuid4(),
            exam_id=new_exam.id,
            question_text=q.question_text,
            option_a=q.option_a,
            option_b=q.option_b,
            option_c=q.option_c,
            option_d=q.option_d,
            correct_option=q.correct_option,
        )
        db.add(new_question)

    db.commit()
    db.refresh(new_exam)
    return new_exam


# ----------------------------
# List All Exams
# ----------------------------
@router.get("/", response_model=list[ExamOut])
def list_exams(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Exam).all()


# ----------------------------
# Submit Exam Response
# ----------------------------
@router.post("/submit")
def submit_response(response: ResponseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    exam = db.query(Exam).filter(Exam.id == response.exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    new_submission = Submission(
        id=uuid4(),
        user_id=current_user.id,
        exam_id=exam.id,
    )
    db.add(new_submission)
    db.flush()

    for ans in response.answers:
        new_answer = Answer(
            id=uuid4(),
            submission_id=new_submission.id,
            question_id=ans.question_id,
            selected_option=ans.selected_option,
        )
        db.add(new_answer)

    db.commit()
    return {"message": "Exam submitted successfully"}
