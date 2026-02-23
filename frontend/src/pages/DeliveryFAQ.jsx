import React, { useState } from 'react';
import './DeliveryFAQ.css';

const DeliveryFAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const faqItems = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I sign up as a delivery partner?',
      answer: 'To sign up, visit our website and click "Join Now" on the Delivery Partners page. Fill in your details including personal information, vehicle type, and banking details. Once verified, you can start accepting deliveries.'
    },
    {
      id: 2,
      category: 'Getting Started',
      question: 'What documents do I need to provide?',
      answer: 'You need to provide a valid ID proof, vehicle registration, driving license, and banking details for payment processing. All documents are verified within 24-48 hours.'
    },
    {
      id: 3,
      category: 'Deliveries',
      question: 'How do I accept delivery orders?',
      answer: 'Once you log in to your dashboard, you will see available orders nearby. You can view order details, customer location, and restaurant location before accepting. Simply click "Pick Up" to accept an order.'
    },
    {
      id: 4,
      category: 'Deliveries',
      question: 'What is the delivery process?',
      answer: 'The typical process is: 1) Accept order 2) Go to restaurant 3) Pick up order 4) Navigate to customer location 5) Deliver and get signature/confirmation 6) Complete delivery. The app will guide you through each step.'
    },
    {
      id: 5,
      category: 'Earnings',
      question: 'How much can I earn per delivery?',
      answer: 'Earnings depend on delivery distance and order value. Base fare ranges from ₹50-150 per delivery, with additional bonuses for speed and ratings. Peak hours often offer higher earnings.'
    },
    {
      id: 6,
      category: 'Earnings',
      question: 'When will I receive my payment?',
      answer: 'Payments are processed weekly to your registered bank account. You can withdraw your earnings anytime after minimum balance of ₹100 is reached. Processing takes 2-3 business days.'
    },
    {
      id: 7,
      category: 'Account',
      question: 'How do I update my profile?',
      answer: 'Go to "My Profile" in the menu to update your personal information, vehicle details, and banking details. Changes are reflected immediately in your account.'
    },
    {
      id: 8,
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'Click "Sign In" and select "Forgot Password". Enter your email, and we will send you a password reset link. Follow the instructions to create a new password.'
    },
    {
      id: 9,
      category: 'Support',
      question: 'What if I face an issue during delivery?',
      answer: 'If you encounter any issues, tap the "Help" button in the app. Our support team is available 24/7 to assist you with order cancellations, customer complaints, or technical issues.'
    },
    {
      id: 10,
      category: 'Support',
      question: 'How is my rating calculated?',
      answer: 'Your rating is based on on-time deliveries, customer feedback, and order accuracy. Maintain a rating above 4.5 to keep getting orders. Poor ratings may result in account suspension.'
    }
  ];

  const categories = ['All', ...new Set(faqItems.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about delivery partnerships</p>
      </div>

      {/* Category Filter */}
      <div className="faq-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="faq-list">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`faq-item ${activeId === item.id ? 'active' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(item.id)}
            >
              <span className="question-text">{item.question}</span>
              <span className="toggle-icon">
                {activeId === item.id ? '−' : '+'}
              </span>
            </button>
            {activeId === item.id && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="support-section">
        <h2>Still have questions?</h2>
        <p>Our support team is here to help. Contact us anytime!</p>
        <div className="support-options">
          <a href="mailto:support@mealmate.com" className="support-btn email">
            📧 Email Support
          </a>
          <a href="tel:1800-123-4567" className="support-btn phone">
            📞 Call Support
          </a>
          <button className="support-btn chat">
            💬 Live Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryFAQ;
