# backend/schemas.py
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

class TokenData(BaseModel):
    email: Optional[str] = None

class User(BaseModel):
    id: UUID
    email: EmailStr
    is_admin: bool

    class Config:
        orm_mode = True

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

class ExamBase(BaseModel):
    title: str
    description: Optional[str] = None

class ExamCreate(ExamBase):
    questions: List[QuestionCreate]

class Exam(ExamBase):
    id: UUID
    created_by: UUID
    
    class Config:
        orm_mode = True

class ExamOut(ExamBase):
    id: UUID
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