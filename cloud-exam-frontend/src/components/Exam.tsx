import React from 'react';
import '../index.css';

const Exam = ({ exams }: { exams: any[] }) => {
  return (
    <div className="container">
      <h2>Available Exams</h2>
      {exams.map((exam) => (
        <div key={exam.id} className="card">
          <h3>{exam.title}</h3>
          <p>{exam.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Exam;

