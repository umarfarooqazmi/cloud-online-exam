import React, { useEffect, useState } from 'react';
import { fetchExams } from '../api';
import Exam from './Exam';
import '../index.css';

const Dashboard = ({ token }: { token: string }) => {
  const [exams, setExams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Token in Dashboard:", token); // ✅ Debug
    fetchExams(token)
      .then((data) => {
        console.log("Fetched exams:", data); // ✅ Debug
        setExams(data);
      })
      .catch((err) => {
        console.error("Failed to fetch exams:", err);
        setError(err.message);
      });
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.reload();
        }}
      >
        Logout
      </button>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <Exam exams={exams} />}
    </div>
  );
};

export default Dashboard;
