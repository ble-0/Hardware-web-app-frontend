
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

  // Implement OAuth login using a third-party library, such as Author


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', { email, password })
      .then((response) => {
        // Handle successful login
        console.log("Login successful", response.data);
        history.push('/catalog');
      })
      .catch((err) => {
        setError('Invalid email or password');
        console.error("Login error:", err);
      });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
