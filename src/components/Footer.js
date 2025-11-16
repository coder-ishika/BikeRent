import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About BikeRent</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/why-us">Why BikeRent?</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/payment">Payment and Security</Link></li>
              <li><Link to="/terms">Terms and Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Adventure Tours</h3>
            <ul>
              <li><Link to="/tours/leh-ladakh">Leh Ladakh Adventure</Link></li>
              <li><Link to="/tours/spiti">Spiti Valley Expedition</Link></li>
              <li><Link to="/tours/rajasthan">Rajasthan Desert Adventure</Link></li>
              <li><Link to="/tours/northeast">Northeast Adventure</Link></li>
              <li><Link to="/tours/sikkim">Sikkim Himalayan Tour</Link></li>
              <li><Link to="/tours/bhutan">Bhutan Adventure</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><Link to="/testimonials">Customer Testimonials</Link></li>
              <li><Link to="/partner">Partner with Us</Link></li>
              <li><Link to="/safety">Safety</Link></li>
              <li><Link to="/coupons">Discount Coupons</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <div className="contact-info">
              <p>📧 Email Us</p>
              <p>📞 +91 88007 79391</p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">📺</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 BikeRent Services Pvt Ltd. All rights reserved.</p>
          <p>Powered by Sun Programs</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

