from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID


# -------------------------
# Authentication Schemas
# -------------------------
class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# -------------------------
# Exam & Question Schemas
# -------------------------
class QuestionBase(BaseModel):
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str


class QuestionCreate(QuestionBase):
    pass


class QuestionOut(QuestionBase):
    id: UUID

    class Config:
        orm_mode = True


class ExamCreate(BaseModel):
    title: str
    description: Optional[str] = None
    questions: List[QuestionCreate]


class ExamOut(BaseModel):
    id: UUID
    title: str
    description: Optional[str]
    questions: List[QuestionOut]

    class Config:
        orm_mode = True


# -------------------------
# Submission & Answer Schemas
# -------------------------
class AnswerCreate(BaseModel):
    question_id: UUID
    selected_option: str


class ResponseCreate(BaseModel):
    exam_id: UUID
    answers: List[AnswerCreate]
