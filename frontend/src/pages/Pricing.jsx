import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VendorNavbar from '../components/VendorNavbar';
import './Pricing.css';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      tagline: 'Perfect for new restaurants',
      commission: '15%',
      setupFee: '₹5,000',
      features: [
        'Up to 3 menu categories',
        'Basic analytics',
        'Email support',
        'Order management',
        'Standard delivery integration',
        'Weekly payouts'
      ],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Professional',
      tagline: 'For growing restaurants',
      commission: '12%',
      setupFee: 'Free',
      features: [
        'Unlimited menu categories',
        'Advanced analytics & insights',
        'Priority email & phone support',
        'Smart order routing',
        'Multiple kitchen screens',
        'Bi-weekly payouts',
        'Custom branding',
        'Marketing tools'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      tagline: 'For established chains',
      commission: '10%',
      setupFee: 'Custom',
      features: [
        'Everything in Professional',
        'Multi-location management',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
        'Weekly payouts',
        'Advanced loyalty programs',
        'Priority development'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: 'What is the commission rate?',
      answer: 'Commission rates vary by plan. Starter: 15%, Professional: 12%, Enterprise: 10%. This covers platform fees, payment processing, and rider delivery costs.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. We charge only the commission percentage on orders. There are no payment processing fees, platform fees, or monthly recurring charges (except for optional add-ons).'
    },
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing period.'
    },
    {
      question: 'How long is the free trial?',
      answer: 'We offer a 30-day free trial for all new restaurants. During this period, you get full access to your selected plan features with zero commission.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and bank transfers. Payouts are made directly to your bank account weekly or bi-weekly depending on your plan.'
    },
    {
      question: 'Is there a contract?',
      answer: 'No long-term contracts required. You can cancel anytime, but we\'re confident you\'ll love the platform and the results you see.'
    }
  ];

  return (
    <div className="pricing-page">
      <VendorNavbar />

      {/* Hero Section */}
      <section className="pricing-hero">
        <h1>Simple, Transparent Pricing</h1>
        <p>No hidden fees. No surprises. Just fair pricing that helps you grow.</p>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="pricing-container">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
              {plan.highlighted && <div className="popular-badge">Most Popular</div>}
              
              <div className="plan-header">
                <h2>{plan.name}</h2>
                <p className="plan-tagline">{plan.tagline}</p>
              </div>

              <div className="plan-pricing">
                <div className="commission">
                  <span className="label">Commission Rate</span>
                  <span className="rate">{plan.commission}</span>
                </div>
                <div className="setup">
                  <span className="label">Setup Fee</span>
                  <span className="fee">{plan.setupFee}</span>
                </div>
              </div>

              <button className="plan-cta">
                {plan.cta}
              </button>

              <div className="features-list">
                <p className="features-title">What's Included:</p>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="whats-included">
        <h2>All Plans Include</h2>
        <div className="included-grid">
          <div className="included-item">
            <span className="icon feature-icon-app"></span>
            <h4>Mobile App</h4>
            <p>Get order notifications instantly and manage on the go</p>
          </div>
          <div className="included-item">
            <span className="icon feature-icon-profile"></span>
            <h4>Restaurant Profile</h4>
            <p>Create a stunning storefront with photos and menu</p>
          </div>
          <div className="included-item">
            <span className="icon feature-icon-analytics"></span>
            <h4>Analytics</h4>
            <p>Track sales, popular items, and customer trends</p>
          </div>
          <div className="included-item">
            <span className="icon feature-icon-delivery"></span>
            <h4>Delivery Network</h4>
            <p>Access to our network of professional delivery partners</p>
          </div>
          <div className="included-item">
            <span className="icon feature-icon-reviews"></span>
            <h4>Ratings & Reviews</h4>
            <p>Build credibility with customer reviews and ratings</p>
          </div>
          <div className="included-item">
            <span className="icon feature-icon-security"></span>
            <h4>Security</h4>
            <p>Enterprise-grade security for your data and payments</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <h2>Detailed Comparison</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th>Professional</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-name">Commission Rate</td>
                <td>15%</td>
                <td>12%</td>
                <td>10%</td>
              </tr>
              <tr>
                <td className="feature-name">Menu Categories</td>
                <td>Up to 3</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td className="feature-name">Customer Support</td>
                <td>Email</td>
                <td>Email & Phone</td>
                <td>Dedicated Manager</td>
              </tr>
              <tr>
                <td className="feature-name">Analytics</td>
                <td>Basic</td>
                <td>Advanced</td>
                <td>Advanced +</td>
              </tr>
              <tr>
                <td className="feature-name">Multiple Locations</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="feature-name">API Access</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="feature-name">Custom Branding</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="feature-name">Payout Frequency</td>
                <td>Weekly</td>
                <td>Bi-weekly</td>
                <td>Weekly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs */}
      <section className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <h2>Ready to Grow Your Business?</h2>
        <p>Start your free 30-day trial today. No credit card required.</p>
        <Link to="/vendor-register" className="cta-button">Get Started Now</Link>
      </section>
    </div>
  );
};

export default Pricing;
