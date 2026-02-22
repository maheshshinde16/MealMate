import React from 'react';
import './LegalPage.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="hero-container">
          <h1 className="hero-title">Terms & Conditions</h1>
          <p className="hero-subtitle">Last updated: February 21, 2026</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="container">
          <section className="legal-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using MealMate's services, you accept and agree to be bound by the terms and 
              provisions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Use of Services</h2>
            <p>
              MealMate provides a platform connecting customers with restaurants and delivery partners. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not interfere with or disrupt the service or servers</li>
              <li>Not attempt to gain unauthorized access to any part of the service</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Orders and Payments</h2>
            <p>
              When you place an order through MealMate, you agree that:
            </p>
            <ul>
              <li>All orders are subject to acceptance by the restaurant</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be made at the time of order placement</li>
              <li>Delivery fees and taxes will be added to your order total</li>
              <li>You are responsible for the accuracy of your delivery address</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Cancellations and Refunds</h2>
            <p>
              Orders may be cancelled before restaurant acceptance for a full refund. After acceptance, 
              cancellations are subject to restaurant approval. Refunds for cancelled orders will be 
              processed within 5-7 business days to the original payment method.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. User Responsibilities</h2>
            <p>You are responsible for:</p>
            <ul>
              <li>Ensuring you meet age requirements (18+ years) to use the service</li>
              <li>Complying with all local laws regarding online food ordering</li>
              <li>Providing accurate delivery information</li>
              <li>Being available to receive your order at the specified location</li>
              <li>Treating delivery partners and restaurant staff with respect</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Intellectual Property</h2>
            <p>
              All content on MealMate, including logos, text, graphics, software, and images, is the 
              property of MealMate Limited or its content suppliers and is protected by intellectual 
              property laws. You may not reproduce, distribute, or create derivative works without 
              express written permission.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              MealMate acts as an intermediary between customers and restaurants. We are not responsible for:
            </p>
            <ul>
              <li>Food quality, preparation, or safety</li>
              <li>Allergens or dietary restrictions not communicated to the restaurant</li>
              <li>Delays caused by weather, traffic, or circumstances beyond our control</li>
              <li>Actions or omissions of restaurants or delivery partners</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Privacy</h2>
            <p>
              Your use of MealMate is also governed by our Privacy Policy. Please review our Privacy 
              Policy to understand our practices regarding the collection and use of your information.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Modifications to Terms</h2>
            <p>
              MealMate reserves the right to modify these terms at any time. We will notify users of 
              significant changes via email or through the platform. Continued use of the service after 
              changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising from these terms or your use of MealMate shall be subject to the 
              exclusive jurisdiction of the courts in Mumbai, India.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <p>
              Email: legal@mealmate.com<br />
              Phone: +91 22 1234 5678<br />
              Address: MealMate Limited, Mumbai, India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
