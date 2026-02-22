import React from 'react';
import { CheckCircleOutlined, TeamOutlined, RocketOutlined, HeartOutlined } from '@ant-design/icons';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <h1 className="hero-title">Connecting People Through Great Food</h1>
          <p className="hero-subtitle">
            MealMate is India's leading food delivery platform, bringing delicious meals from your favorite restaurants right to your doorstep.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=600&h=600&fit=crop&auto=format" 
                alt="Restaurant kitchen" 
              />
            </div>
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, MealMate started with a simple idea: make quality food accessible to everyone. 
                What began as a small team serving a single city has grown into a nationwide platform connecting 
                thousands of restaurants with millions of hungry customers.
              </p>
              <p>
                We believe that great food brings people together. Whether it's a family dinner, a quick lunch, 
                or a celebration feast, MealMate ensures that delicious meals are always just a few taps away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <RocketOutlined />
              </div>
              <h3>Our Mission</h3>
              <p>
                To revolutionize food delivery by creating seamless connections between restaurants, 
                delivery partners, and customers while supporting local businesses and communities.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <HeartOutlined />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted and loved food delivery platform in India, known for exceptional 
                service, diverse culinary options, and unwavering commitment to quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <CheckCircleOutlined className="value-icon" />
              <h3>Quality First</h3>
              <p>We partner only with the best restaurants and ensure every meal meets our high standards.</p>
            </div>
            <div className="value-card">
              <TeamOutlined className="value-icon" />
              <h3>Customer Obsessed</h3>
              <p>Your satisfaction drives everything we do, from restaurant selection to delivery excellence.</p>
            </div>
            <div className="value-card">
              <RocketOutlined className="value-icon" />
              <h3>Speed & Reliability</h3>
              <p>Fast, dependable delivery ensures your food arrives hot and fresh, every single time.</p>
            </div>
            <div className="value-card">
              <HeartOutlined className="value-icon" />
              <h3>Community Support</h3>
              <p>We empower local restaurants and create earning opportunities for delivery partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">10M+</h3>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">20K+</h3>
              <p className="stat-label">Restaurant Partners</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Cities Covered</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">100K+</h3>
              <p className="stat-label">Delivery Partners</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
