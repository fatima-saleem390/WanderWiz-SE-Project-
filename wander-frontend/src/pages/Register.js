import React from 'react';
import './Register.css';
import travelImage from '../assets/Register.jpg'; //  import the image
import buildingsImage from '../assets/buildings.jpg';        // (buildings, right-bottom)
import mosqueVector from '../assets/vector.jpg';             // (mosque, left-bottom)

const Register = () => {
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
        <form>
          <div className="name-fields">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <input type="text" placeholder="Mobile Number" />
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
