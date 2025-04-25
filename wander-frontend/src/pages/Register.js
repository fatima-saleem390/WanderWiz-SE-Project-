import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import './Register.css';
import travelImage from '../assets/Register.jpg';
import buildingsImage from '../assets/buildings.jpg';
import mosqueVector from '../assets/vector.jpg';

const Register = () => {
  const navigate = useNavigate(); // ✅ create the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: You can add validation or form logic here

    navigate('/home'); // ✅ navigate to home on success
  };

  return (
    <div className="register-container">
      {/* Left Image */}
      <div className="register-image">
        <img src={travelImage} alt="Travel" />
      </div>

      {/* Right Form */}
      <div className="register-form">
        <h2>CREATE AN ACCOUNT</h2>
        <p>
          By creating an account, you agree to our Privacy policy and Terms of use.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="email" placeholder="Enter Email" required />
          <input type="password" placeholder="Enter Password" required />
          <input type="text" placeholder="Mobile Number" required />
          <button type="submit">CREATE ACCOUNT</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
        <img src={mosqueVector} alt="Mosque Vector" className="mosque-vector" />
        <img src={buildingsImage} alt="Buildings" className="buildings-image" />
      </div>
    </div>
  );
};

export default Register;
