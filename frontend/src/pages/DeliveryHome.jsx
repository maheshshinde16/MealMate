import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryHome.css';

const DeliveryHome = () => {
  const navigate = useNavigate();

  return (
    <div className="delivery-home">
      {/* Hero Section */}
      <section className="delivery-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Earn Money On Your Schedule
            </h1>
            <p className="hero-subtitle">
              Join MealMate's delivery network and start earning today. Flexible hours, competitive pay, and the freedom to be your own boss.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/rider-register')}>
                Sign Up to Deliver
              </button>
              <button className="btn-secondary" onClick={() => navigate('/rider-login')}>
                Already a Partner? Sign In
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">₹500+</span>
                <span className="stat-label">Avg. Daily Earnings</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Partners</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Cities</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&h=500&fit=crop&auto=format" 
              alt="Delivery partner" 
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Start earning in three simple steps</p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="step-number">01</div>
              <h3 className="step-title">Sign Up</h3>
              <p className="step-description">
                Create your account in minutes. Provide basic details and upload required documents.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <div className="step-number">02</div>
              <h3 className="step-title">Get Verified</h3>
              <p className="step-description">
                Complete a quick background check and vehicle verification. We'll review and approve within 24 hours.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <div className="step-number">03</div>
              <h3 className="step-title">Start Earning</h3>
              <p className="step-description">
                Accept orders, make deliveries, and get paid weekly. Track your earnings in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="section-container">
          <h2 className="section-title">Why Deliver With MealMate?</h2>
          <p className="section-subtitle">Join thousands of partners earning with flexibility</p>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="benefit-title">Flexible Schedule</h3>
              <p className="benefit-description">
                Work when you want. Choose your own hours and work as much or as little as you like.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="benefit-title">Competitive Earnings</h3>
              <p className="benefit-description">
                Earn ₹25-50 per delivery plus 100% of tips. Weekly payouts directly to your bank account.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="benefit-title">Work Nearby</h3>
              <p className="benefit-description">
                Accept deliveries in your area. Smart routing ensures efficient trips and better earnings.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="benefit-title">Fuel Incentives</h3>
              <p className="benefit-description">
                Get additional bonuses for high-performance weeks and fuel reimbursements.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="benefit-title">Insurance Coverage</h3>
              <p className="benefit-description">
                All partners are covered with accident insurance while on delivery assignments.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="benefit-title">24/7 Support</h3>
              <p className="benefit-description">
                Dedicated partner support team available anytime you need assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="requirements-section">
        <div className="section-container">
          <h2 className="section-title">What You Need</h2>
          <p className="section-subtitle">Basic requirements to get started</p>
          
          <div className="requirements-grid">
            <div className="requirement-card">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <h3>Smartphone</h3>
              <p>Android 6.0+ or iOS 12+</p>
            </div>

            <div className="requirement-card">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
              <h3>Age 18+</h3>
              <p>Valid government ID required</p>
            </div>

            <div className="requirement-card">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <h3>Two-Wheeler</h3>
              <p>Bike/scooter with valid license</p>
            </div>

            <div className="requirement-card">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <h3>Bank Account</h3>
              <p>For weekly payouts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="earnings-section">
        <div className="section-container">
          <h2 className="section-title">Earnings Potential</h2>
          <p className="section-subtitle">See how much you can earn</p>
          
          <div className="earnings-calculator">
            <div className="calculator-card">
              <div className="calculator-option">
                <h3>Part-Time</h3>
                <p className="hours">4 hours/day</p>
                <div className="earnings-breakdown">
                  <div className="breakdown-row">
                    <span>~10 deliveries</span>
                    <span>₹400</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Tips (avg)</span>
                    <span>₹100</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Daily Earnings</span>
                    <span>₹500</span>
                  </div>
                  <div className="monthly-estimate">
                    <strong>₹15,000/month</strong>
                    <span>(30 days)</span>
                  </div>
                </div>
              </div>

              <div className="calculator-option highlighted">
                <div className="popular-badge">Most Popular</div>
                <h3>Full-Time</h3>
                <p className="hours">8 hours/day</p>
                <div className="earnings-breakdown">
                  <div className="breakdown-row">
                    <span>~20 deliveries</span>
                    <span>₹800</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Tips (avg)</span>
                    <span>₹200</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Performance Bonus</span>
                    <span>₹100</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Daily Earnings</span>
                    <span>₹1,100</span>
                  </div>
                  <div className="monthly-estimate">
                    <strong>₹33,000/month</strong>
                    <span>(30 days)</span>
                  </div>
                </div>
              </div>

              <div className="calculator-option">
                <h3>Peak Hours</h3>
                <p className="hours">Lunch + Dinner</p>
                <div className="earnings-breakdown">
                  <div className="breakdown-row">
                    <span>~15 deliveries</span>
                    <span>₹600</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Peak Hour Bonus</span>
                    <span>₹150</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Tips (avg)</span>
                    <span>₹150</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Daily Earnings</span>
                    <span>₹900</span>
                  </div>
                  <div className="monthly-estimate">
                    <strong>₹27,000/month</strong>
                    <span>(30 days)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Earning?</h2>
          <p className="cta-subtitle">
            Join MealMate today and become part of India's fastest-growing delivery network
          </p>
          <button className="cta-button" onClick={() => navigate('/delivery-signup')}>
            Sign Up Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <p className="cta-note">Free to join • No hidden fees • Start earning today</p>
        </div>
      </section>
    </div>
  );
};

export default DeliveryHome;
