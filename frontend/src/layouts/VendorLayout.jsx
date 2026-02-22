import React from 'react';
import VendorNavbar from '../components/VendorNavbar';

const VendorLayout = ({ children }) => {
  return (
    <div className="vendor-portal">
      <VendorNavbar />
      <main className="vendor-content">
        {children}
      </main>
      <footer className="vendor-footer">
        <div className="vendor-footer-container">
          <p>&copy; 2026 MealMate Partners. All rights reserved.</p>
          <div className="vendor-footer-links">
            <a href="/partners/terms">Terms of Service</a>
            <a href="/partners/privacy">Privacy Policy</a>
            <a href="/partners/support">Partner Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VendorLayout;
