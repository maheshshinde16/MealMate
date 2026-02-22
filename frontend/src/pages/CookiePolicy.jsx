import React from 'react';
import './LegalPage.css';

const CookiePolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="hero-container">
          <h1 className="hero-title">Cookie Policy</h1>
          <p className="hero-subtitle">Last updated: February 21, 2026</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="container">
          <section className="legal-section">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are 
              widely used to make websites work more efficiently and provide information to website owners. 
              Cookies help us enhance your experience on MealMate by remembering your preferences and 
              understanding how you use our platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the platform to function properly. They enable core features 
              such as security, authentication, and network management. You cannot opt out of these cookies.
            </p>
            <ul>
              <li>Session management and user authentication</li>
              <li>Shopping cart functionality</li>
              <li>Security and fraud prevention</li>
              <li>Load balancing and performance optimization</li>
            </ul>

            <h3>Performance Cookies</h3>
            <p>
              These cookies collect information about how you use our platform, helping us improve 
              performance and user experience.
            </p>
            <ul>
              <li>Page load times and error tracking</li>
              <li>Popular features and navigation patterns</li>
              <li>Device and browser information</li>
              <li>Traffic sources and user flow</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>
              These cookies remember your preferences and choices to provide a more personalized experience.
            </p>
            <ul>
              <li>Language and region preferences</li>
              <li>Saved delivery addresses</li>
              <li>Favorite restaurants and cuisines</li>
              <li>Display settings and accessibility options</li>
            </ul>

            <h3>Targeting/Advertising Cookies</h3>
            <p>
              These cookies are used to deliver relevant advertisements and measure campaign effectiveness.
            </p>
            <ul>
              <li>Personalized restaurant recommendations</li>
              <li>Promotional offers based on browsing history</li>
              <li>Retargeting campaigns across platforms</li>
              <li>Social media integration and sharing</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Third-Party Cookies</h2>
            <p>
              We work with trusted third-party partners who may also set cookies on your device. These include:
            </p>
            <ul>
              <li><strong>Analytics Providers:</strong> Google Analytics to understand user behavior</li>
              <li><strong>Payment Processors:</strong> Secure payment gateways for transaction processing</li>
              <li><strong>Social Media Platforms:</strong> Facebook, Instagram for social sharing features</li>
              <li><strong>Advertising Networks:</strong> Google Ads, Facebook Ads for targeted advertising</li>
              <li><strong>Customer Support:</strong> Live chat and help desk services</li>
            </ul>
            <p>
              These third parties have their own privacy policies governing their use of cookies. We recommend 
              reviewing their policies for more information.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. How Long Do Cookies Last?</h2>
            <h3>Session Cookies</h3>
            <p>
              These temporary cookies are deleted when you close your browser. They help maintain your 
              session as you navigate through our platform.
            </p>
            
            <h3>Persistent Cookies</h3>
            <p>
              These cookies remain on your device for a set period (ranging from days to years) or until 
              you manually delete them. They remember your preferences across multiple visits.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Managing Your Cookie Preferences</h2>
            <p>
              You have control over which cookies you accept. Here's how you can manage them:
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to:
            </p>
            <ul>
              <li>View and delete existing cookies</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies</li>
              <li>Delete cookies when you close your browser</li>
            </ul>

            <h3>Cookie Preference Center</h3>
            <p>
              Use our Cookie Preference Center (accessible via the cookie banner or account settings) to:
            </p>
            <ul>
              <li>Accept or reject non-essential cookies</li>
              <li>Customize cookie categories</li>
              <li>Update your preferences anytime</li>
            </ul>

            <h3>Opt-Out Tools</h3>
            <ul>
              <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
              <li><strong>Advertising:</strong> <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance Opt-Out</a></li>
              <li><strong>Mobile:</strong> Use your device's advertising ID settings (iOS or Android)</li>
            </ul>

            <p className="warning-text">
              <strong>Note:</strong> Blocking all cookies may affect your ability to use certain features 
              of MealMate, such as remembering your cart items or staying logged in.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Do Not Track Signals</h2>
            <p>
              Some browsers have a "Do Not Track" (DNT) feature that signals websites not to track you. 
              Currently, there is no industry standard for responding to DNT signals. We do not alter our 
              data collection practices based on DNT signals at this time.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Mobile App Tracking</h2>
            <p>
              If you use our mobile app, we may collect similar information through mobile identifiers 
              and SDKs (Software Development Kits). You can manage tracking preferences through your 
              device settings:
            </p>
            <ul>
              <li><strong>iOS:</strong> Settings → Privacy → Tracking → MealMate</li>
              <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in technology, law, or our 
              practices. We will notify you of significant changes through our platform or via email. 
              Please review this policy regularly to stay informed.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have questions about our use of cookies or this Cookie Policy:
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

export default CookiePolicy;
