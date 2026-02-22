import React from 'react';
import { Link } from 'react-router-dom';
import './DeliveryNavbar.css';

const DeliveryNavbar = () => {
  return (
    <nav className="delivery-navbar">
      <div className="delivery-navbar-container">
        <Link to="/delivery-partners" className="delivery-brand">
          <span className="brand-text">MealMate</span>
          <span className="brand-tag">Delivery Partners</span>
        </Link>
        
        <ul className="delivery-menu">
          <li><Link to="/delivery-partners">Home</Link></li>
          <li><Link to="/delivery-partners/how-it-works">How It Works</Link></li>
          <li><Link to="/delivery-partners/earnings">Earnings</Link></li>
          <li><Link to="/delivery-partners/faq">FAQ</Link></li>
        </ul>

        <div className="delivery-actions">
          <Link to="/delivery-login" className="btn-delivery-signin">Sign In</Link>
          <Link to="/delivery-register" className="btn-delivery-signup">Join Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default DeliveryNavbar;
