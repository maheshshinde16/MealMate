import React from 'react';
import DeliveryNavbar from '../components/DeliveryNavbar';

const DeliveryLayout = ({ children }) => {
  return (
    <div className="delivery-portal">
      <DeliveryNavbar />
      <main className="delivery-content">
        {children}
      </main>
      <footer className="delivery-footer">
        <div className="delivery-footer-container">
          <p>&copy; 2026 MealMate Delivery Partners. All rights reserved.</p>
          <div className="delivery-footer-links">
            <a href="/delivery-partners/terms">Terms of Service</a>
            <a href="/delivery-partners/privacy">Privacy Policy</a>
            <a href="/delivery-partners/support">Delivery Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeliveryLayout;
