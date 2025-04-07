import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  return (
    <div>
      <Header />
      {token ? <Dashboard token={token} /> : <Login onLogin={setToken} />}
    </div>
  );
};

export default App;
