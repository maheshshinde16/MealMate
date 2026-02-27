import React, { useState } from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <MailOutlined />,
      title: 'Email Support',
      details: 'support@mealmate.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: <PhoneOutlined />,
      title: 'Phone Support',
      details: '+1 (800) 123-4567',
      description: 'Mon-Sun, 9AM-9PM EST'
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Address',
      details: '123 Food Street, Culinary City, CC 12345',
      description: 'Visit our headquarters'
    },
    {
      icon: <ClockCircleOutlined />,
      title: 'Working Hours',
      details: '24/7 Customer Support',
      description: 'Always available for your queries'
    }
  ];

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our restaurants, select your items, add to cart, and proceed to checkout with your delivery address.'
    },
    {
      question: 'What is your delivery time?',
      answer: 'Most orders are delivered within 30-40 minutes. You can track your order in real-time.'
    },
    {
      question: 'Can I cancel my order?',
      answer: 'You can cancel orders before the restaurant confirms them. Contact support immediately for assistance.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, UPI, net banking, wallets, and cash on delivery.'
    },
    {
      question: 'Is there a refund policy?',
      answer: 'Yes, we offer full refunds for undelivered or incorrect orders. Contact support within 24 hours.'
    },
    {
      question: 'How can I become a delivery partner?',
      answer: 'Visit our vendor/partner page and fill in your details. Our team will review and contact you soon.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>Have questions? We're here to help 24/7</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="section-header">
            <h2>How to Reach Us</h2>
            <p>Choose your preferred way to contact our support team</p>
          </div>
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="method-card">
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p className="method-details">{method.details}</p>
                <p className="method-description">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="form-column">
              <h2>Send us a Message</h2>
              {submitted && (
                <div className="success-message">
                  Thank you for reaching out! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Message subject"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
            <div className="info-column">
              <h2>Why Contact Us?</h2>
              <div className="info-card">
                <h4>Help with Orders</h4>
                <p>Track delivery status, modify or cancel orders, and resolve payment issues.</p>
              </div>
              <div className="info-card">
                <h4>Report Issues</h4>
                <p>Report incomplete orders, missing items, or delivery problems safely.</p>
              </div>
              <div className="info-card">
                <h4>Feedback & Suggestions</h4>
                <p>Share your feedback, restaurant recommendations, or feature requests with us.</p>
              </div>
              <div className="info-card">
                <h4>Partnership Inquiries</h4>
                <p>Interested in becoming a vendor or delivery partner? Let's talk!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="social-section">
        <div className="container">
          <h2>Follow Us</h2>
          <p>Connect with us on social media for updates and offers</p>
          <div className="social-links">
            <a href="#" className="social-btn facebook">
              <FacebookOutlined />
            </a>
            <a href="#" className="social-btn twitter">
              <TwitterOutlined />
            </a>
            <a href="#" className="social-btn linkedin">
              <LinkedinOutlined />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
