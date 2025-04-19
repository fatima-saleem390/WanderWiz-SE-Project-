// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active links
import '../assets/logo.png'; 
import '../components/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={require('../assets/logo.png')} alt="WanderWiz Logo" />
      </div>
      <nav className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
        >
          About
        </NavLink>
        <NavLink 
          to="/listing" 
          className={({ isActive }) => isActive ? 'nav-link active-link listing-link' : 'nav-link listing-link'}
        >
          Listing
        </NavLink>
        <NavLink 
          to="/login" 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
        >
          Login
        </NavLink>
        <button className="post-btn">Plan a trip</button>
      </nav>
    </header>
  );
};

export default Header;
