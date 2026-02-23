import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './DeliveryNavbar.css';

const DeliveryNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/delivery-partners');
  };

  return (
    <nav className="delivery-navbar">
      <div className="delivery-navbar-container">
        <Link to="/delivery-partners" className="delivery-brand">
          <span className="brand-text">MealMate</span>
          <span className="brand-tag">Delivery Partners</span>
        </Link>
        
        <ul className="delivery-menu">
          <li><Link to="/delivery-partners">Home</Link></li>
          {isAuthenticated && (
            <>
              <li><Link to="/delivery-dashboard">Dashboard</Link></li>
              <li><Link to="/delivery-partners/earnings">Earnings</Link></li>
            </>
          )}
          <li><Link to="/delivery-partners/how-it-works">How It Works</Link></li>
          <li><Link to="/delivery-partners/faq">FAQ</Link></li>
        </ul>

        <div className="delivery-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <button 
                className="user-avatar"
                onClick={() => setShowMenu(!showMenu)}
                title={user?.fullName || user?.email}
              >
                {user?.fullName?.split(' ')[0] || 'Partner'}
              </button>
              {showMenu && (
                <div className="dropdown-menu">
                  <Link to="/delivery-profile" className="dropdown-item">
                    👤 My Profile
                  </Link>
                  <Link to="/delivery-settings" className="dropdown-item">
                    ⚙️ Settings
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/rider-login" className="btn-delivery-signin">Sign In</Link>
              <Link to="/rider-register" className="btn-delivery-signup">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DeliveryNavbar;
