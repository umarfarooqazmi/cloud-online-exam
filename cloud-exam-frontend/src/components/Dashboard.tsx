import React, { useEffect, useState } from 'react';
import { fetchExams } from '../api';
import Exam from './Exam';
import '../index.css';

const Dashboard = ({ token }: { token: string }) => {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    fetchExams(token).then(setExams);
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Exam exams={exams} />
    </div>
  );
};

export default Dashboard;
