import React, { useState } from 'react';
import { loginUser } from '../api';
import '../index.css';

const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      if (data.access_token) onLogin(data.access_token);
      else alert('Login failed!');
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
