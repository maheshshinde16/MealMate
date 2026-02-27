import React, { useState } from 'react';
import './DeliveryHowItWorks.css';

const DeliveryHowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create your account in minutes with your basic information, ID, and vehicle details. Our team will verify your documents within 48 hours.",
      icon: "📝",
      details: [
        "Fill in personal information",
        "Upload ID and vehicle documents",
        "Add bank account details",
        "Get instant approval"
      ]
    },
    {
      id: 2,
      title: "Accept Orders",
      description: "Once verified, access your dashboard and start accepting delivery orders. View order details, location, and earnings before accepting.",
      icon: "📱",
      details: [
        "View available orders",
        "Check order details and location",
        "See estimated earnings",
        "Accept orders instantly"
      ]
    },
    {
      id: 3,
      title: "Complete Delivery",
      description: "Pick up the order from the restaurant and deliver it to the customer. Our app provides turn-by-turn navigation and support.",
      icon: "🚗",
      details: [
        "Navigate to restaurant",
        "Pick up order",
        "Navigate to customer",
        "Mark as delivered"
      ]
    },
    {
      id: 4,
      title: "Earn & Withdraw",
      description: "Earn money per delivery with performance bonuses. Withdraw your earnings directly to your bank account anytime.",
      icon: "💰",
      details: [
        "Earn base fare per delivery",
        "Get performance bonuses",
        "Weekly earnings statement",
        "Easy withdrawal anytime"
      ]
    }
  ];

  const benefits = [
    {
      icon: "⏰",
      title: "Work on Your Schedule",
      description: "Choose when you want to work. Work full-time or part-time based on your availability."
    },
    {
      icon: "💵",
      title: "Competitive Pay",
      description: "Earn ₹50-150 per delivery plus performance bonuses. Total earnings depend on distance and order value."
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description: "Track your earnings, deliveries, and performance metrics in real-time through your dashboard."
    },
    {
      icon: "🎯",
      title: "Flexible Work",
      description: "Switch between available and busy status anytime. Work at your own pace without pressure."
    },
    {
      icon: "🛡️",
      title: "Safety & Support",
      description: "24/7 customer support, insurance coverage, and strict safety protocols for all partners."
    },
    {
      icon: "⭐",
      title: "Ratings & Rewards",
      description: "Build your reputation with customer ratings and unlock special bonuses for high performance."
    }
  ];

  const faqs = [
    {
      question: "What are the eligibility requirements?",
      answer: "You must be 18+ years old with a valid ID, own or have access to a vehicle (bicycle, scooter, motorcycle, or car), and have a smartphone with internet connection."
    },
    {
      question: "How much can I earn?",
      answer: "Base earnings are ₹50-150 per delivery depending on distance. You also get ₹15 performance bonus per delivery. Peak hours offer 1.5x to 2x surge rates."
    },
    {
      question: "When do I get paid?",
      answer: "Earnings are calculated daily and credited to your bank account within 24-48 hours. You can withdraw anytime subject to minimum balance limits."
    },
    {
      question: "What if my vehicle breaks down?",
      answer: "You can pause deliveries temporarily and resume when ready. No penalties. MealMate also offers vehicle repair assistance and insurance coverage."
    },
    {
      question: "How is my safety ensured?",
      answer: "All partners get comprehensive insurance coverage, emergency support hotlines, and city-level support representatives. You can also rate and report customers."
    },
    {
      question: "What's the verification process like?",
      answer: "Upload your documents (ID, vehicle registration, driving license) during signup. Our team verifies within 48 hours. You'll receive approval email and can start immediately."
    },
    {
      question: "Can I work for another delivery app?",
      answer: "Yes, you can work for multiple platforms simultaneously. You have complete freedom to manage your schedule across different apps."
    },
    {
      question: "What if there's a dispute with a customer?",
      answer: "Our support team handles disputes fairly. We have a transparent process and always prioritize partner safety and rights."
    }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="delivery-how-it-works">
      {/* Hero Section */}
      <section className="dhiw-hero">
        <div className="hero-container">
          <h1 className="hero-title">How Delivery Partners Earn</h1>
          <p className="hero-subtitle">
            Start earning money on your schedule with MealMate
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">₹500+</span>
              <span className="stat-label">Daily Earning Potential</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Partners</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="container">
          <h2 className="section-title">Get Started in 4 Simple Steps</h2>
          <p className="section-subtitle">Join MealMate and start earning today</p>

          <div className="steps-container">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`step-card ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-number">Step {step.id}</p>
                
                {activeStep === step.id && (
                  <div className="step-details">
                    <p className="step-description">{step.description}</p>
                    <ul className="step-checklist">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>
                          <span className="checkmark">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Become a Delivery Partner?</h2>
          <p className="section-subtitle">Enjoy flexibility, competitive pay, and exclusive benefits</p>

          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Section */}
      <section className="earnings-section">
        <div className="container">
          <h2 className="section-title">How Much Can You Earn?</h2>
          
          <div className="earnings-grid">
            <div className="earnings-card">
              <h3>Base Fare</h3>
              <p className="earnings-value">₹50 - ₹150</p>
              <p className="earnings-desc">Per delivery based on distance</p>
            </div>
            <div className="earnings-card highlight">
              <h3>Performance Bonus</h3>
              <p className="earnings-value">₹15+</p>
              <p className="earnings-desc">Per delivery completion</p>
            </div>
            <div className="earnings-card">
              <h3>Peak Hour Surge</h3>
              <p className="earnings-value">1.5x - 2x</p>
              <p className="earnings-desc">Multiplier on base fare</p>
            </div>
            <div className="earnings-card">
              <h3>Daily Potential</h3>
              <p className="earnings-value">₹500+</p>
              <p className="earnings-desc">Completing 5-8 deliveries</p>
            </div>
          </div>

          <div className="earnings-note">
            <p>💡 Earnings vary based on your location, vehicle type, delivery distance, order value, and performance ratings.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start Earning?</h2>
            <p>Join thousands of delivery partners making money on their schedule</p>
            <div className="cta-buttons">
              <button className="btn-primary">Sign Up Now</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryHowItWorks;
