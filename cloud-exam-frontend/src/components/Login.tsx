import React, { useState } from 'react';
import { loginUser } from '../api';
import '../index.css';

const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      if (data.access_token) {
        onLogin(data.access_token);
      } else {
        alert('Login failed: Invalid credentials.');
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      alert(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
