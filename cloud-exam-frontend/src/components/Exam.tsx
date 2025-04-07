import React from 'react';
import '../index.css';

const formatField = (field: any) => {
  if (typeof field === 'string') return field;
  if (typeof field === 'object') return JSON.stringify(field, null, 2); // Pretty print JSON
  return String(field);
};

const Exam = ({ exams }: { exams: any[] }) => {
  return (
    <div className="container">
      <h2>Available Exams</h2>
      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        exams.map((exam) => (
          <div key={exam.id} className="card">
            <h3>{formatField(exam.title)}</h3>
            <p>{formatField(exam.description)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Exam;
