import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="contact-info">
              <span className="phone">📞 +91 88007 79391</span>
            </div>
            <div className="header-actions">
              <Link to="/offers" className="header-link">Offers</Link>
              <Link to="/reviews" className="header-link">Reviews</Link>
              <Link to="/download" className="header-link">Download App</Link>
              <Link to="/login" className="header-link">Login / Register</Link>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="logo">
              <span className="logo-icon">🏍️</span>
              <span className="logo-text">RideTrailRentals</span>
            </Link>
            
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li className="dropdown">
                <span>Adventure Tours</span>
                <ul className="dropdown-menu">
                  <li><Link to="/tours/bike">Adventure Bike Tours</Link></li>
                  <li><Link to="/tours/adventure">Adventure Activities</Link></li>
                  <li><Link to="/tours/expedition">Expedition Tours</Link></li>
                  <li><Link to="/tours/activities">Extreme Activities</Link></li>
                </ul>
              </li>
              <li><Link to="/bikes" onClick={() => setIsMenuOpen(false)}>Rent Bikes</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
            </ul>

            <div className="nav-actions">
              <button className="cart-btn" onClick={() => navigate('/cart')}>
                🛒 Cart {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </button>
              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

