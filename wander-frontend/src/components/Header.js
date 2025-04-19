import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={require('../assets/logo.png')} alt="WanderWiz Logo" />
      </div>
      <nav className="nav-links">
        <Link to="/" className="home-link">Home</Link>
        <Link to="/about" className="about-link">About</Link>
        <Link to="/listing" className="listing-link">Listing</Link>
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/plan-trip">
          <button className="post-btn">Plan a trip</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
