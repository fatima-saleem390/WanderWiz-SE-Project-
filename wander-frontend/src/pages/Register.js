import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import travelImage from '../assets/Register.jpg';
import buildingsImage from '../assets/buildings.jpg';
import mosqueVector from '../assets/vector.jpg';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Convert to expected structure for backend
    const body = {
      username: formData.firstName + ' ' + formData.lastName,
      email: formData.email,
      password: formData.password,
      mobileNumber: formData.phone
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate('/home');
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src={travelImage} alt="Travel" />
      </div>

      <div className="register-form">
        <h2>CREATE AN ACCOUNT</h2>
        <p>By creating an account, you agree to our Privacy policy and Terms of use.</p>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Enter Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Enter Password" required onChange={handleChange} />
          <input type="text" name="phone" placeholder="Mobile Number" required onChange={handleChange} />
          <button type="submit">CREATE ACCOUNT</button>
        </form>
        <p className="login-link">Already have an account? <a href="/login">Login</a></p>
        <img src={mosqueVector} alt="Mosque Vector" className="mosque-vector" />
        <img src={buildingsImage} alt="Buildings" className="buildings-image" />
      </div>
    </div>
  );
};

export default Register;
