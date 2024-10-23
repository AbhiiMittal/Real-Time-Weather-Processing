import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name : username,
            email : email,
            password : password 
        }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
        navigate('/login') 
    })
    .catch((error) => {
        alert('Error:', error);
    })
    console.log('Signup attempt with:', { username, email, password });
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Create Your Weather App Account</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <button type="submit" className="log-in-button">
          <Link to='/login'> Have an Account ? Log-In</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

