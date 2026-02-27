import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './VendorHome.css';

const VendorHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <div className="vendor-home">
      {/* Hero Section */}
      <section className="vendor-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Partner with MealMate
            </h1>
            <p className="hero-subtitle">
              Grow your restaurant business with India's leading food delivery platform. Reach millions of customers and increase your revenue.
            </p>
            {!isAuthenticated ? (
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => navigate('/vendor-register')}>
                  Register Your Restaurant
                </button>
                <button className="btn-secondary" onClick={() => navigate('/vendor-login')}>
                  Already a Partner? Login
                </button>
              </div>
            ) : (
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => navigate('/vendor-dashboard')}>
                  Go to Dashboard
                </button>
              </div>
                  )}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">20K+</span>
                <span className="stat-label">Partner Restaurants</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5M+</span>
                <span className="stat-label">Orders Monthly</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Cities</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=500&fit=crop&auto=format" 
              alt="Restaurant kitchen" 
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="section-container">
          <h2 className="section-title">Your Restaurant at a Glance</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-kicker">Order Desk </span>
                <h3>Manage Orders</h3>
                <p>View and process incoming orders in real-time</p>
              </div>
              <div className="stat-footer">
                <button onClick={() => navigate('/vendor-dashboard')} className="stat-link">View Orders →</button>
                <span className="stat-footnote">Live updates</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-kicker">Menu Studio</span>
                <h3>Add Menu Items</h3>
                <p>Update your menu with new dishes and specials</p>
              </div>
              <div className="stat-footer">
                <button onClick={() => navigate('/vendor-dashboard')} className="stat-link">Manage Menu →</button>
                <span className="stat-footnote">Edit anytime</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-kicker">Revenue</span>
                <h3>Track Earnings</h3>
                <p>Monitor your revenue and sales performance</p>
              </div>
              <div className="stat-footer">
                <button onClick={() => navigate('/vendor-dashboard')} className="stat-link">View Analytics →</button>
                <span className="stat-footnote">Daily snapshots</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-kicker">Feedback</span>
                <h3>Customer Reviews</h3>
                <p>See what customers are saying about your food</p>
              </div>
              <div className="stat-footer">
                <button onClick={() => navigate('/vendor-dashboard')} className="stat-link">View Reviews →</button>
                <span className="stat-footnote">Recent ratings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="section-container">
          <h2 className="section-title">Quick Actions</h2>
          
          <div className="actions-grid">
            <div className="action-card" onClick={() => navigate('/vendor-dashboard')}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <h3>Set Business Hours</h3>
            </div>

            <div className="action-card" onClick={() => navigate('/vendor-dashboard')}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <h3>Download Reports</h3>
            </div>

            <div className="action-card" onClick={() => navigate('/profile')}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
              </svg>
              <h3>Restaurant Settings</h3>
            </div>

            <div className="action-card" onClick={() => navigate('/contact')}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3>Support Center</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <div className="section-container">
          <h2 className="section-title">Tips to Grow Your Business</h2>
          
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-number">1</div>
              <h3>Keep Your Menu Updated</h3>
              <p>Regularly add new items and seasonal specials to attract more customers.</p>
            </div>

            <div className="tip-card">
              <div className="tip-number">2</div>
              <h3>Respond Quickly to Orders</h3>
              <p>Fast order confirmation and preparation times lead to better customer satisfaction.</p>
            </div>

            <div className="tip-card">
              <div className="tip-number">3</div>
              <h3>Maintain High Quality</h3>
              <p>Consistent food quality and presentation build your reputation and customer loyalty.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorHome;
