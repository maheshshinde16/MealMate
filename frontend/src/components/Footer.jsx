import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedinOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-column brand-column">
            <div className="footer-brand">
              <h2 className="brand-name">MealMate</h2>
              <p className="copyright">© 2026 MealMate Limited</p>
            </div>
          </div>

          {/* Company Section */}
          <div className="footer-column">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="footer-column">
            <h3 className="footer-heading">Contact us</h3>
            <ul className="footer-list">
              <li><Link to="/contact">Help & Support</Link></li>
              <li><a href="/partners" rel="noopener">Partner With Us</a></li>
              <li><a href="/delivery-partners" rel="noopener">Ride With Us</a></li>
            </ul>
            <h3 className="footer-heading" style={{ marginTop: '2rem' }}>Legal</h3>
            <ul className="footer-list">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Available In Section */}
          <div className="footer-column">
            <h3 className="footer-heading">Available in:</h3>
            <ul className="footer-list cities-list">
              <li>Mumbai</li>
              <li>Delhi</li>
              <li>Bangalore</li>
              <li>Hyderabad</li>
              <li>Pune</li>
              <li>Chennai</li>
              <li className="more-cities">+ 50 more cities</li>
            </ul>
          </div>

          {/* Life at MealMate Section */}
          <div className="footer-column">
            <h3 className="footer-heading">Life at MealMate</h3>
            <ul className="footer-list">
              <li><Link to="/explore">Explore With MealMate</Link></li>
              <li><Link to="/news">MealMate News</Link></li>
              <li><Link to="/blog">Food Stories</Link></li>
            </ul>
            <h3 className="footer-heading" style={{ marginTop: '2rem' }}>Social Links</h3>
            <div className="footer-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <LinkedinOutlined />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <InstagramOutlined />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FacebookOutlined />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <TwitterOutlined />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <YoutubeOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
