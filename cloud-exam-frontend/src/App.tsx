import React, { useState } from 'react';
import Login from './components/Login';
import Exam from './components/Exam';

function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <div>
      {!token ? (
        <Login onLogin={(newToken: string) => setToken(newToken)} />
      ) : (
        <Exam token={token} />
      )}
    </div>
  );
}

export default App;
