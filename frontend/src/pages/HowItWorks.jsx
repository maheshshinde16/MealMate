import React from 'react';
import { SearchOutlined, ShoppingCartOutlined, RocketOutlined, CheckCircleOutlined, ClockCircleOutlined, SafetyOutlined } from '@ant-design/icons';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <SearchOutlined />,
      title: "Explore Restaurants",
      description: "Browse through hundreds of restaurants and discover cuisines from your neighborhood or across the city.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format"
    },
    {
      id: 2,
      icon: <ShoppingCartOutlined />,
      title: "Customize Your Order",
      description: "Select your favorite dishes, customize them to your taste, and add them to your cart with special instructions.",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop&auto=format"
    },
    {
      id: 3,
      icon: <RocketOutlined />,
      title: "Track in Real-Time",
      description: "Watch your order being prepared and track the delivery partner's journey to your doorstep in real-time.",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&h=400&fit=crop&auto=format"
    },
    {
      id: 4,
      icon: <CheckCircleOutlined />,
      title: "Enjoy Your Meal",
      description: "Receive your hot, fresh meal at your doorstep and enjoy! Rate your experience and help others discover great food.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format"
    }
  ];

  const benefits = [
    {
      icon: <ClockCircleOutlined />,
      title: "Fast Delivery",
      description: "Average delivery time of 30-40 minutes, with real-time tracking"
    },
    {
      icon: <SafetyOutlined />,
      title: "Safe & Hygienic",
      description: "Contactless delivery with stringent hygiene standards"
    },
    {
      icon: <CheckCircleOutlined />,
      title: "Quality Assured",
      description: "Partner only with verified restaurants with quality ratings"
    }
  ];

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Most orders are delivered within 30-40 minutes. Actual time may vary based on restaurant preparation time, distance, and traffic conditions."
    },
    {
      question: "Is there a minimum order value?",
      answer: "Minimum order values vary by restaurant, typically ranging from ₹100-₹200. This information is displayed on each restaurant's page."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order is confirmed, you can track it in real-time from the restaurant to your doorstep through the Orders page."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards, net banking, UPI, wallets, and cash on delivery."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "You can cancel your order before the restaurant confirms it. Once confirmed, modifications aren't possible, but you can contact support for assistance."
    },
    {
      question: "What if there's an issue with my order?",
      answer: "Contact our 24/7 customer support through the app or website. We'll resolve any issues promptly and ensure you're satisfied."
    }
  ];

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="hiw-hero">
        <div className="hero-container">
          <h1 className="hero-title">How MealMate Works</h1>
          <p className="hero-subtitle">
            Delicious food delivered to your doorstep in four simple steps
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="container">
          <div className="section-header">
            <h2>Your Journey to Great Food</h2>
            <p>From browsing to enjoying, we make it simple</p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={step.id} className="step-card">
                <div className="step-image">
                  <img src={step.image} alt={step.title} />
                  {/* <div className="step-number">{step.id}</div> */}
                </div>
                <div className="step-content">
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose MealMate?</h2>
            <p>We're committed to delivering excellence with every order</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about ordering with MealMate</p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Order?</h2>
          <p>Join thousands of happy customers ordering their favorite meals</p>
          <button className="cta-btn">Explore Restaurants</button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
