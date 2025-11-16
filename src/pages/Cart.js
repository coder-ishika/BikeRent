import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, bookingDetails } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    if (!bookingDetails.pickupDate || !bookingDetails.dropoffDate) {
      return cart.reduce((sum, item) => sum + item.price, 0);
    }
    const pickup = new Date(bookingDetails.pickupDate);
    const dropoff = new Date(bookingDetails.dropoffDate);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24)) || 1;
    return cart.reduce((sum, item) => sum + (item.price * days), 0);
  };

  const calculateDays = () => {
    if (!bookingDetails.pickupDate || !bookingDetails.dropoffDate) return 1;
    const pickup = new Date(bookingDetails.pickupDate);
    const dropoff = new Date(bookingDetails.dropoffDate);
    return Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24)) || 1;
  };

  const subtotal = calculateSubtotal();
  const serviceFee = subtotal * 0.05;
  const tax = subtotal * 0.18;
  const total = subtotal + serviceFee + tax;

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some bikes to get started!</p>
            <button className="btn-primary" onClick={() => navigate('/bikes')}>
              Browse Bikes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <h2>Items ({cart.length})</h2>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-brand">{item.brand} • {item.category}</p>
                  <div className="item-features">
                    {item.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
                <div className="item-pricing">
                  <div className="item-price">
                    <span className="price">₹{item.price}</span>
                    <span className="price-unit">/day</span>
                  </div>
                  {bookingDetails.pickupDate && bookingDetails.dropoffDate && (
                    <div className="item-total">
                      ₹{item.price * calculateDays()} for {calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}
                    </div>
                  )}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Booking Summary</h2>
            
            {bookingDetails.city && (
              <div className="summary-section">
                <h3>Location</h3>
                <p>📍 {bookingDetails.city}</p>
              </div>
            )}

            {bookingDetails.pickupDate && (
              <div className="summary-section">
                <h3>Pickup</h3>
                <p>📅 {bookingDetails.pickupDate}</p>
                <p>⏰ {bookingDetails.pickupTime}</p>
              </div>
            )}

            {bookingDetails.dropoffDate && (
              <div className="summary-section">
                <h3>Dropoff</h3>
                <p>📅 {bookingDetails.dropoffDate}</p>
                <p>⏰ {bookingDetails.dropoffTime}</p>
              </div>
            )}

            <div className="summary-section">
              <h3>Rental Type</h3>
              <p>{bookingDetails.rentalType || 'Daily'}</p>
            </div>

            <div className="summary-section">
              <h3>Pricing</h3>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal ({calculateDays()} {calculateDays() === 1 ? 'day' : 'days'})</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Service Fee (5%)</span>
                  <span>₹{serviceFee.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate('/booking')}
            >
              Proceed to Checkout
            </button>

            <div className="security-badges">
              <div className="badge">🔒 Secure Payment</div>
              <div className="badge">✓ Verified Dealers</div>
              <div className="badge">💰 Money Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

