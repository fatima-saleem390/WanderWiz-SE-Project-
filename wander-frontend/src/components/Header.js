// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/logo.png'; // Ensure logo exists
import '../components/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={require('../assets/logo.png')} alt="WanderWiz Logo" />
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/listing">Listing</Link>
        <Link to="/login">Login</Link>
        <button className="post-btn">Post a trip</button>
      </nav>
    </header>
  );
};

export default Header;
