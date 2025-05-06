import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/footer.css';

// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      setEmailError('');
      try {
        const response = await fetch('http://localhost:5000/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Subscribed successfully! Check your inbox for updates.');
          setEmail('');
        } else {
          alert(result.message || 'Subscription failed.');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  return (
    <>
      <div className="subscribe-section">
        <div className="subscribe-left">
          <h3>Subscribe now to get useful traveling information</h3>
          <div className="subscribe-form">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            <button onClick={handleSubscribe}>Subscribe</button>
            {emailError && <p className="error">{emailError}</p>}
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
            <div className="social-icons">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
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
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>

          <div className="contact">
            <h4>Contact</h4>
            <p>📍 Address: WanderWiz</p>
            <p>📧 Email: WanderWiz@gmail.com</p>
            <p>📞 Phone: 0900-000000</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
