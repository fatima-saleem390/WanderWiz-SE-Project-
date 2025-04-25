// src/components/Header.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handlePlanTripClick = () => {
    navigate('/plan-trip');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="WanderWiz Logo" />
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
        <NavLink 
          to="/register" 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
        >
          Register
        </NavLink>
        <button className="post-btn" onClick={handlePlanTripClick}>Plan a trip</button>
      </nav>
    </header>
  );
};

export default Header;
