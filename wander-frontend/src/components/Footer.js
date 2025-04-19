// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../components/footer.css';

const Footer = () => {
  return (
    <>
      <div className="subscribe-section">
        <div className="subscribe-left">
          <h3>Subscribe now to get useful traveling information</h3>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="subscribe-image">
          <img src={require('../assets/subscribe-man.png')} alt="Subscribe" />
        </div>
      </div>

      <footer className="footer">
        <div className="footer-sections">
          <div className="brand">
            <img src={require('../assets/logo.png')} alt="WanderWiz" />
          </div>
          <div className="links">
            <h4>Discover</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/listing">Listing</Link></li>
            </ul>
          </div>
          <div className="links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/gallery">Gallery</Link></li>  {/* Gallery Link */}
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>  {/* Register Link */}
            </ul>
          </div>
          <div className="contact">
            <h4>Contact</h4>
            <p>📍 Address: Lorem</p>
            <p>📧 Email: xyz@gmail.com</p>
            <p>📞 Phone: 0900-000000</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
