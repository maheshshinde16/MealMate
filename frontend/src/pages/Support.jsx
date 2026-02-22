import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VendorNavbar from '../components/VendorNavbar';
import './Support.css';

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const categories = {
    'getting-started': {
      title: 'Getting Started',
      icon: '1',
      articles: [
        { title: 'How to Register Your Restaurant', url: '#' },
        { title: 'Setting Up Your Menu', url: '#' },
        { title: 'Adding Photos & Descriptions', url: '#' },
        { title: 'First Order Setup', url: '#' }
      ]
    },
    'orders': {
      title: 'Managing Orders',
      icon: '2',
      articles: [
        { title: 'How to Accept/Reject Orders', url: '#' },
        { title: 'Order Status Updates', url: '#' },
        { title: 'Handling Special Requests', url: '#' },
        { title: 'Cancellation Policy', url: '#' }
      ]
    },
    'payments': {
      title: 'Payments & Payouts',
      icon: '3',
      articles: [
        { title: 'How Payments Work', url: '#' },
        { title: 'Payout Schedule', url: '#' },
        { title: 'Tax Reports', url: '#' },
        { title: 'Payment Methods', url: '#' }
      ]
    },
    'analytics': {
      title: 'Analytics & Reports',
      icon: '4',
      articles: [
        { title: 'Understanding Your Dashboard', url: '#' },
        { title: 'Analyzing Sales Trends', url: '#' },
        { title: 'Customer Insights', url: '#' },
        { title: 'Generating Reports', url: '#' }
      ]
    },
    'technical': {
      title: 'Technical Help',
      icon: '5',
      articles: [
        { title: 'App Installation & Setup', url: '#' },
        { title: 'Troubleshooting Login Issues', url: '#' },
        { title: 'Browser Compatibility', url: '#' },
        { title: 'API Documentation', url: '#' }
      ]
    },
    'billing': {
      title: 'Billing & Plans',
      icon: '6',
      articles: [
        { title: 'Plan Comparison', url: '#' },
        { title: 'Upgrading Your Plan', url: '#' },
        { title: 'Cancellation Process', url: '#' },
        { title: 'Refund Policy', url: '#' }
      ]
    }
  };

  const supportChannels = [
    {
      icon: 'C',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 9 AM - 9 PM, Daily'
    },
    {
      icon: 'E',
      title: 'Email Support',
      description: 'Send us detailed queries and attachments',
      contact: 'support@mealmate.com',
      availability: 'Response within 24 hours'
    },
    {
      icon: 'P',
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+92-XXX-XXXX-XXX',
      availability: '10 AM - 7 PM, Monday - Friday'
    },
    {
      icon: 'H',
      title: 'Help Center',
      description: 'Access our knowledge base and FAQs',
      availability: 'Available 24/7'
    }
  ];

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const currentCategory = categories[selectedCategory];

  return (
    <div className="support-page">
      <VendorNavbar />

      {/* Hero Section */}
      <section className="support-hero">
        <h1>We're Here to Help</h1>
        <p>Find answers, get support, and connect with our team</p>
      </section>

      {/* Support Channels */}
      <section className="support-channels">
        <div className="channels-grid">
          {supportChannels.map((channel, index) => (
            <div key={index} className="channel-card">
              <div className="channel-icon">{channel.icon}</div>
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              {channel.contact && (
                <div className="channel-contact">{channel.contact}</div>
              )}
              <div className="channel-availability">{channel.availability}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="knowledge-base">
        <div className="kb-container">
          <h2>Knowledge Base</h2>
          
          <div className="kb-content">
            {/* Categories Sidebar */}
            <div className="kb-categories">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            {/* Articles */}
            <div className="kb-articles">
              <h3>{currentCategory.title}</h3>
              <ul className="articles-list">
                {currentCategory.articles.map((article, index) => (
                  <li key={index}>
                    <a href={article.url}>
                      <span>{article.title}</span>
                      <span className="arrow">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="support-faqs">
        <h2>Frequently Asked Questions</h2>
        <div className="faqs-grid">
          <div className="faq-item">
            <h4>How quickly will I get support?</h4>
            <p>Our support team responds to emails within 24 hours. For live chat, we typically respond within minutes during business hours.</p>
          </div>

          <div className="faq-item">
            <h4>What's included in support?</h4>
            <p>All plans include email and chat support. Professional and Enterprise plans get priority support with faster response times.</p>
          </div>

          <div className="faq-item">
            <h4>Can I get training for my staff?</h4>
            <p>Yes! We offer free onboarding training and custom training sessions for teams. Contact our support team to schedule.</p>
          </div>

          <div className="faq-item">
            <h4>Is there API documentation?</h4>
            <p>Yes, comprehensive API documentation is available for Enterprise customers. Contact us for access.</p>
          </div>

          <div className="faq-item">
            <h4>How do I report a security issue?</h4>
            <p>Please email security@mealmate.com with detailed information. We take security seriously and will respond promptly.</p>
          </div>

          <div className="faq-item">
            <h4>Can I request custom features?</h4>
            <p>Absolutely! Enterprise customers get dedicated development support. Contact your account manager to discuss.</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Can't find what you're looking for? Send us a message and our team will get back to you shortly.</p>
            
            <div className="contact-details">
              <div className="detail-item">
                <span className="icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>Karachi, Pakistan</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>support@mealmate.com</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+92-XXX-XXXX-XXX</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                placeholder="How can we help?"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="Tell us more..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Status Page Link */}
      <section className="status-section">
        <div className="status-content">
          <h3>System Status</h3>
          <p>Check the real-time status of all MealMate services and get notified of any incidents.</p>
          <a href="#" className="status-link">View Status Page →</a>
        </div>
      </section>
    </div>
  );
};

export default Support;
