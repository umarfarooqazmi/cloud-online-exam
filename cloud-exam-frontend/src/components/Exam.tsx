import React, { useEffect, useState } from 'react';

interface ExamProps {
  token: string;
}

interface Question {
  id: number;
  question_text: string;
}

const Exam: React.FC<ExamProps> = ({ token }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('https://cloud-online-exam.up.railway.app/exams/questions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, [token]);

  const handleChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      responses: Object.entries(answers).map(([question_id, answer]) => ({
        question_id: parseInt(question_id),
        answer,
      })),
    };

    const res = await fetch('https://cloud-online-exam.up.railway.app/exams/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Exam submitted successfully!');
    } else {
      alert('Failed to submit exam.');
    }
  };

  return (
    <div>
      <h2>Exam</h2>
      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.question_text}</p>
          <input
            type="text"
            value={answers[q.id] || ''}
            onChange={(e) => handleChange(q.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Exam</button>
    </div>
  );
};

export default Exam;

