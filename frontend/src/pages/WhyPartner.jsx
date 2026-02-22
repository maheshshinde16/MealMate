import React from 'react';
import { Link } from 'react-router-dom';
import VendorNavbar from '../components/VendorNavbar';
import './WhyPartner.css';

const WhyPartner = () => {
  const benefits = [
    {
      icon: '�',
      title: 'Grow Your Business',
      description: 'Reach thousands of hungry customers in your area. Our platform helps you scale without the overhead.'
    },
    {
      icon: '💵',
      title: 'Maximize Revenue',
      description: 'Keep more of what you earn with transparent pricing. No hidden fees, just fair commission rates.'
    },
    {
      icon: '⚙️',
      title: 'Smart Tools',
      description: 'Manage orders, menus, and inventory from one dashboard. Real-time updates and analytics included.'
    },
    {
      icon: '🎯',
      title: 'Dedicated Support',
      description: 'Our support team is ready to help 24/7. Free onboarding and training for your team.'
    },
    {
      icon: '🏆',
      title: 'Build Your Brand',
      description: 'Create a stunning restaurant profile with photos, menus, and customer reviews to build trust.'
    },
    {
      icon: '🔧',
      title: 'Easy Integration',
      description: 'Seamless integration with your existing POS system. Setup takes just minutes.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Customers' },
    { number: '1000+', label: 'Partner Restaurants' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="why-partner-page">
      <VendorNavbar />

      {/* Hero Section */}
      <section className="why-partner-hero">
        <div className="why-partner-hero-content">
          <h1>Why Partner with MealMate?</h1>
          <p>Join hundreds of successful restaurants growing their business with MealMate</p>
          <Link to="/vendor-register" className="cta-button">Become a Partner</Link>
        </div>
        <div className="why-partner-hero-bg"></div>
      </section>

      {/* Stats Section */}
      <section className="why-partner-stats">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="why-partner-benefits">
        <div className="benefits-header">
          <h2>What Makes Us Different</h2>
          <p>Everything you need to run and grow your restaurant business online</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card" data-number={index + 1}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              
              <h3>Sign Up</h3>
              <p>Create your restaurant profile in minutes. Add your menu, photos, and business details.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              
              <h3>Go Live</h3>
              <p>Your restaurant appears on MealMate. Customers can browse and place orders.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              
              <h3>Manage Orders</h3>
              <p>Receive orders in real-time. Manage kitchen operations with our smart dashboard.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              
              <h3>Get Paid</h3>
              <p>Fast, transparent payments. Earnings settle weekly to your bank account.</p>
            </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Partners Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"MealMate has been a game-changer for our restaurant. We've increased orders by 40% in just 3 months."</p>
            <div className="testimonial-author">
              <strong>Ahmed Khan</strong>
              <span>Owner, Spice House Restaurant</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"The dashboard is so easy to use. My staff loves how organized everything is. Highly recommended!"</p>
            <div className="testimonial-author">
              <strong>Fatima Ali</strong>
              <span>Manager, Fresh Bites Cafe</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"Customer support is excellent. They helped us set everything up and we never looked back."</p>
            <div className="testimonial-author">
              <strong>Hassan Ahmed</strong>
              <span>CEO, Flavors Kitchen</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="partner-cta">
        <div className="cta-content">
          <h2>Ready to Grow Your Business?</h2>
          <p>Join the MealMate partner network today and start reaching more customers</p>
          <Link to="/vendor-register" className="cta-button-large">Get Started Now</Link>
        </div>
      </section>
    </div>
  );
};

export default WhyPartner;
