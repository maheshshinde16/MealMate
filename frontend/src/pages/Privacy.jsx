import React from 'react';
import './LegalPage.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="hero-container">
          <h1 className="hero-title">Privacy Policy</h1>
          <p className="hero-subtitle">Last updated: February 21, 2026</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="container">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              MealMate Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy 
              Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              food delivery platform and services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Delivery addresses and location data</li>
              <li>Payment information (processed securely through payment providers)</li>
              <li>Account credentials and profile information</li>
            </ul>
            <h3>Automatically Collected Information</h3>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, features used, time spent on platform)</li>
              <li>Location data (with your permission) for delivery services</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process and fulfill your food orders</li>
              <li>Communicate order status and delivery updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our services and user experience</li>
              <li>Send promotional offers and marketing communications (with your consent)</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations and regulations</li>
              <li>Analyze usage patterns and conduct research</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Restaurants:</strong> Order details and delivery address to prepare and fulfill your order</li>
              <li><strong>Delivery Partners:</strong> Delivery address and contact information for order delivery</li>
              <li><strong>Payment Processors:</strong> Payment information to process transactions securely</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul>
              <li>Encryption of sensitive data during transmission (SSL/TLS)</li>
              <li>Secure servers with restricted access</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection practices</li>
              <li>Multi-factor authentication for account access</li>
            </ul>
            <p>
              However, no method of transmission over the internet is 100% secure. While we strive to 
              protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Your Privacy Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
            </ul>
            <p>To exercise these rights, contact us at privacy@mealmate.com</p>
          </section>

          <section className="legal-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. Cookies help us:
            </p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze platform performance and usage</li>
              <li>Deliver personalized content and recommendations</li>
              <li>Provide targeted advertising</li>
            </ul>
            <p>
              You can control cookie preferences through your browser settings. However, disabling cookies 
              may affect platform functionality.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Children's Privacy</h2>
            <p>
              MealMate is not intended for users under 18 years of age. We do not knowingly collect 
              personal information from children. If you believe we have inadvertently collected information 
              from a child, please contact us immediately.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined 
              in this policy, unless a longer retention period is required by law. Order history and 
              transaction data may be retained for accounting and legal compliance purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites. We are not responsible for the privacy 
              practices of these external sites. We encourage you to review their privacy policies before 
              providing any personal information.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes via 
              email or through a prominent notice on our platform. Your continued use of MealMate after 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices:
            </p>
            <p>
              Email: privacy@mealmate.com<br />
              Phone: +91 22 1234 5678<br />
              Address: Data Protection Officer, MealMate Limited, Mumbai, India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
