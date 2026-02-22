import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './VendorNavbar.css';

const VendorNavbar = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showProfileMenu]);

  const handleLogout = () => {
    setShowProfileMenu(false);
    dispatch(logout());
    navigate('/vendor-login');
  };

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };

  return (
    <nav className="vendor-navbar">
      <div className="vendor-navbar-container">
        <Link to="/partners" className="vendor-brand">
          <span className="brand-text">MealMate</span>
          <span className="brand-tag">for Partners</span>
        </Link>
        
        <ul className="vendor-menu">
          <li><Link to="/partners">Home</Link></li>
          <li><Link to="/partners/about">Why Partner</Link></li>
          <li><Link to="/partners/pricing">Pricing</Link></li>
          <li><Link to="/partners/support">Support</Link></li>
        </ul>

        <div className="vendor-actions">
          {isAuthenticated && user ? (
            <div className="vendor-profile" ref={profileRef}>
              <div className="user-greeting">
                Hi, {(user.fullName || user.email).split(' ')[0]}!
              </div>
              <button 
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title={user.fullName || user.email}
              >
                <span className="profile-avatar">
                  {(user.fullName || user.email).charAt(0).toUpperCase()}
                </span>
              </button>
              
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <p className="profile-name">{user.fullName || user.email}</p>
                    
                  </div>
                  <div className="profile-divider"></div>
                  <Link to="/vendor-profile" className="profile-link" onClick={closeProfileMenu}>
                    <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                  </Link>
                  <Link to="/vendor-dashboard" className="profile-link" onClick={closeProfileMenu}>
                    <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    Dashboard
                  </Link>
                  <Link to="/partners/support" className="profile-link" onClick={closeProfileMenu}>
                    <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Contact
                  </Link>
                  <Link to="/vendor-settings" className="profile-link" onClick={closeProfileMenu}>
                    <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
                    </svg>
                    Settings
                  </Link>
                  <div className="profile-divider"></div>
                  <button className="profile-logout" onClick={handleLogout}>
                    <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/vendor-login" className="btn-vendor-signin">Sign In</Link>
              <Link to="/vendor-register" className="btn-vendor-signup">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default VendorNavbar;
