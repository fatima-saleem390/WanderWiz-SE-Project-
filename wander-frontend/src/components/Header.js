// src/components/Header.js
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePlanTripClick = () => {
    navigate('/plan-trip');
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token'); // remove token or session
    setShowConfirm(false);
    navigate('/login');
  };

  const showAuthLinks = ['/login', '/register', '/about'].includes(path);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="WanderWiz Logo" />
      </div>
      <nav className="nav-links">
        {showAuthLinks ? (
          <>
            {path !== '/login' && (
              <NavLink 
                to="/login" 
                className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
              >
                Login
              </NavLink>
            )}
            {path !== '/register' && (
              <NavLink 
                to="/register" 
                className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
              >
                Register
              </NavLink>
            )}
            {path !== '/about' && (
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
              >
                About
              </NavLink>
            )}
          </>
        ) : (
          <>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            >
              Home
            </NavLink>
            <NavLink 
              to="/listing" 
              className={({ isActive }) => isActive ? 'nav-link active-link listing-link' : 'nav-link listing-link'}
            >
              Listing
            </NavLink>
            <button className="post-btn" onClick={handlePlanTripClick}>Plan a trip</button>
            <button className="logout-btn" onClick={() => setShowConfirm(true)}>Logout</button>
          </>
        )}
      </nav>

      {/* Logout Confirmation Popup */}
      {showConfirm && (
        <div className="confirm-logout-box">
          <p>Are you sure?</p>
          <div className="confirm-btns">
            <button onClick={handleLogoutConfirm}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
