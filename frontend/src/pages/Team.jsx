import React from 'react';
import { LinkedinOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import './Team.css';

const Team = () => {
  const leadership = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
      bio: "Serial entrepreneur with 15+ years in tech. Previously led product at a major e-commerce platform.",
      linkedin: "#",
      email: "#"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format",
      bio: "Engineering leader passionate about building scalable systems. Former tech lead at a global unicorn.",
      linkedin: "#",
      email: "#"
    },
    {
      id: 3,
      name: "Arjun Patel",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format",
      bio: "Operations expert focused on logistics optimization. MBA from IIM with 10+ years in supply chain.",
      linkedin: "#",
      email: "#"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
      bio: "Product visionary with a customer-first approach. Led product teams at multiple successful startups.",
      linkedin: "#",
      email: "#"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format",
      bio: "Growth marketer with a track record of scaling brands. Expert in digital marketing and brand strategy.",
      linkedin: "#",
      email: "#"
    },
    {
      id: 6,
      name: "Ananya Iyer",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&auto=format",
      bio: "Creative leader passionate about user experience. Award-winning designer with a focus on simplicity.",
      linkedin: "#",
      email: "#"
    }
  ];

  const departments = [
    {
      name: "Engineering",
      count: "50+",
      description: "Building robust, scalable technology that powers millions of orders",
      icon: "💻"
    },
    {
      name: "Product",
      count: "15+",
      description: "Creating exceptional experiences for customers, vendors, and partners",
      icon: "🎨"
    },
    {
      name: "Operations",
      count: "100+",
      description: "Ensuring seamless delivery across 50+ cities nationwide",
      icon: "🚀"
    },
    {
      name: "Marketing",
      count: "20+",
      description: "Telling our story and connecting with millions of food lovers",
      icon: "📢"
    },
    {
      name: "Customer Support",
      count: "80+",
      description: "Providing 24/7 assistance to resolve any concern instantly",
      icon: "💬"
    },
    {
      name: "Sales & Partnerships",
      count: "40+",
      description: "Building relationships with restaurants and delivery partners",
      icon: "🤝"
    }
  ];

  const values = [
    {
      title: "Customer Obsession",
      description: "We start with the customer and work backwards in everything we do"
    },
    {
      title: "Innovation",
      description: "We constantly push boundaries to improve our platform and services"
    },
    {
      title: "Ownership",
      description: "Every team member takes full responsibility for their work and outcomes"
    },
    {
      title: "Collaboration",
      description: "We believe great things happen when diverse minds work together"
    },
    {
      title: "Speed",
      description: "We move fast, learn quickly, and iterate constantly to stay ahead"
    },
    {
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical standards always"
    }
  ];

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="hero-container">
          <h1 className="hero-title">Meet Our Team</h1>
          <p className="hero-subtitle">
            We're a diverse group of passionate individuals working to revolutionize food delivery in India
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="leadership-section">
        <div className="container">
          <div className="section-header">
            <h2>Leadership Team</h2>
            <p>The visionaries driving MealMate's mission forward</p>
          </div>

          <div className="leadership-grid">
            {leadership.map((leader) => (
              <div key={leader.id} className="leader-card">
                <div className="leader-image-wrapper">
                  <img src={leader.image} alt={leader.name} className="leader-image" />
                </div>
                <div className="leader-info">
                  <h3 className="leader-name">{leader.name}</h3>
                  <p className="leader-role">{leader.role}</p>
                  <p className="leader-bio">{leader.bio}</p>
                  <div className="leader-social">
                    <a href={leader.linkedin} className="social-link" aria-label="LinkedIn">
                      <LinkedinOutlined />
                    </a>
                    <a href={leader.email} className="social-link" aria-label="Email">
                      <MailOutlined />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Departments</h2>
            <p>Teams working together to deliver excellence</p>
          </div>

          <div className="departments-grid">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <div className="dept-icon">{dept.icon}</div>
                <h3 className="dept-name">{dept.name}</h3>
                <div className="dept-count">{dept.count} People</div>
                <p className="dept-description">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta-section">
        <div className="cta-container">
          <h2>Want to Join Our Team?</h2>
          <p>We're always looking for talented individuals who share our passion</p>
          <button className="cta-btn">View Open Positions</button>
        </div>
      </section>
    </div>
  );
};

export default Team;
