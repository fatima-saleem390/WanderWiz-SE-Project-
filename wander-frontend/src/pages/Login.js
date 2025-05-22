import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import travelImage from '../assets/Register.jpg';
import buildingsImage from '../assets/buildings.jpg';
import mosqueVector from '../assets/vector.jpg';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage('Login successful! Redirecting...');
        setErrorMessage('');
        localStorage.setItem('token', result.token);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setErrorMessage(result.message || 'Invalid login credentials');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container">
      {/* Left Image */}
      <div className="login-image">
        <img src={travelImage} alt="Travel" />
      </div>

      {/* Right Form */}
      <div className="login-form">
        <h2>Welcome</h2>
        <p>Login with Email</p>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />
          <button type="submit">LOGIN</button>
        </form>
        <p className="register-link">
          Don’t have an account?
          <a href="/register"> Register Now</a>
        </p>
        <img src={mosqueVector} alt="Mosque Vector" className="mosque-vector" />
        <img src={buildingsImage} alt="Buildings" className="buildings-image" />
      </div>
    </div>
  );
};

export default Login;