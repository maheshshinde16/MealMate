import React from 'react';
import { EnvironmentOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import './Careers.css';

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Mumbai, India',
      type: 'Full-time',
      description: 'Build delightful user experiences with React, TypeScript, and modern web technologies.'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Design and scale microservices handling millions of orders using Java Spring Boot.'
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'Delhi, India',
      type: 'Full-time',
      description: 'Drive product strategy and roadmap for customer-facing features.'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Pune, India',
      type: 'Full-time',
      description: 'Create beautiful, intuitive interfaces that millions of users love.'
    },
    {
      id: 5,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Hyderabad, India',
      type: 'Full-time',
      description: 'Turn data into actionable insights to improve customer experience and operations.'
    },
    {
      id: 6,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Mumbai, India',
      type: 'Full-time',
      description: 'Lead growth initiatives and brand campaigns across digital channels.'
    }
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Industry-leading compensation with performance bonuses'
    },
    {
      icon: '🏥',
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family'
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: 'Annual allowance for courses, conferences, and books'
    },
    {
      icon: '🏖️',
      title: 'Flexible PTO',
      description: 'Generous paid time off to recharge and explore'
    },
    {
      icon: '🍕',
      title: 'Free Meals',
      description: 'Complimentary lunch and unlimited snacks in office'
    },
    {
      icon: '💻',
      title: 'Remote Options',
      description: 'Hybrid work model with flexible working hours'
    }
  ];

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="hero-container">
          <h1 className="hero-title">Join Our Team</h1>
          <p className="hero-subtitle">
            Help us revolutionize food delivery and build the future of how India eats. 
            Work with passionate people on meaningful problems at scale.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="why-join-section">
        <div className="container">
          <h2 className="section-title">Why Join MealMate?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="positions-section">
        <div className="container">
          <h2 className="section-title">Open Positions</h2>
          <div className="positions-grid">
            {openPositions.map((position) => (
              <div key={position.id} className="position-card">
                <div className="position-header">
                  <span className="position-department">{position.department}</span>
                  <h3 className="position-title">{position.title}</h3>
                </div>
                <p className="position-description">{position.description}</p>
                <div className="position-meta">
                  <span className="meta-item">
                    <EnvironmentOutlined /> {position.location}
                  </span>
                  <span className="meta-item">
                    <ClockCircleOutlined /> {position.type}
                  </span>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="culture-section">
        <div className="container">
          <div className="culture-grid">
            <div className="culture-content">
              <h2>Our Culture</h2>
              <p>
                At MealMate, we're building more than just a food delivery platform—we're creating 
                a culture where innovation thrives, diverse perspectives are celebrated, and every 
                team member can make a real impact.
              </p>
              <p>
                We believe in transparency, collaboration, and empowering our people to do their 
                best work. Whether you're solving complex technical challenges or reimagining the 
                customer experience, you'll have the autonomy and support to excel.
              </p>
              <div className="culture-values">
                <div className="culture-value">
                  <TeamOutlined className="culture-icon" />
                  <div>
                    <h4>Collaborative</h4>
                    <p>We win together as one team</p>
                  </div>
                </div>
                <div className="culture-value">
                  <TeamOutlined className="culture-icon" />
                  <div>
                    <h4>Innovative</h4>
                    <p>We embrace new ideas and technologies</p>
                  </div>
                </div>
                <div className="culture-value">
                  <TeamOutlined className="culture-icon" />
                  <div>
                    <h4>Customer-Focused</h4>
                    <p>We obsess over delighting customers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="culture-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop&auto=format" 
                alt="Team collaboration" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
