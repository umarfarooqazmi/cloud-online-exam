from database import SessionLocal
from models import User, Exam, Question
from auth import get_password_hash
import uuid

db = SessionLocal()

# Clear existing data
db.query(Question).delete()
db.query(Exam).delete()
db.query(User).delete()

# Create admin user
admin_user = User(
    id=uuid.uuid4(),
    email="admin@example.com",
    password=get_password_hash("admin123"),
    is_admin=True,
)

# Add exam
exam = Exam(
    id=uuid.uuid4(),
    title="Python Basics",
    description="A quick quiz on Python basics.",
    creator=admin_user,
)

# Add questions
questions = [
    Question(
        id=uuid.uuid4(),
        exam=exam,
        question_text="What is the output of print(2 ** 3)?",
        option_a="5",
        option_b="6",
        option_c="8",
        option_d="9",
        correct_option="c"
    ),
    Question(
        id=uuid.uuid4(),
        exam=exam,
        question_text="Which keyword is used to define a function in Python?",
        option_a="function",
        option_b="def",
        option_c="define",
        option_d="fun",
        correct_option="b"
    ),
]

db.add(admin_user)
db.add(exam)
db.add_all(questions)
db.commit()
db.close()
