import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Booking.css';

const Booking = () => {
  const { cart, bookingDetails, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    paymentMethod: 'card'
  });
  const [errors, setErrors] = useState({});

  const calculateTotal = () => {
    if (!bookingDetails.pickupDate || !bookingDetails.dropoffDate) {
      const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
      return subtotal + (subtotal * 0.05) + (subtotal * 0.18);
    }
    const pickup = new Date(bookingDetails.pickupDate);
    const dropoff = new Date(bookingDetails.dropoffDate);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24)) || 1;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * days), 0);
    return subtotal + (subtotal * 0.05) + (subtotal * 0.18);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate booking process
      alert('Booking confirmed! You will receive a confirmation email shortly.');
      clearCart();
      navigate('/');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="booking">
        <div className="container">
          <div className="empty-booking">
            <h2>No items in cart</h2>
            <p>Please add bikes to your cart before booking.</p>
            <button className="btn-primary" onClick={() => navigate('/bikes')}>
              Browse Bikes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking">
      <div className="container">
        <h1>Complete Your Booking</h1>
        
        <div className="booking-content">
          <div className="booking-form-section">
            <form onSubmit={handleSubmit} className="booking-form">
              <h2>Personal Information</h2>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={errors.phone ? 'error' : ''}
                  placeholder="10 digit phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={errors.address ? 'error' : ''}
                  rows="3"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>Driving License Number *</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                  className={errors.licenseNumber ? 'error' : ''}
                />
                {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
              </div>

              <h2>Payment Method</h2>
              
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <span>📱 UPI</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={formData.paymentMethod === 'wallet'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <span>💼 Wallet</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <span>💰 Cash on Delivery</span>
                </label>
              </div>

              <button type="submit" className="submit-booking-btn">
                Confirm Booking - ₹{calculateTotal().toFixed(2)}
              </button>
            </form>
          </div>

          <div className="booking-summary">
            <h2>Booking Summary</h2>
            
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.brand}</p>
                  </div>
                  <span>₹{item.price}/day</span>
                </div>
              ))}
            </div>

            <div className="summary-details">
              <div className="detail-row">
                <span>Location:</span>
                <span>{bookingDetails.city || 'Not selected'}</span>
              </div>
              <div className="detail-row">
                <span>Pickup:</span>
                <span>{bookingDetails.pickupDate || 'Not selected'} {bookingDetails.pickupTime || ''}</span>
              </div>
              <div className="detail-row">
                <span>Dropoff:</span>
                <span>{bookingDetails.dropoffDate || 'Not selected'} {bookingDetails.dropoffTime || ''}</span>
              </div>
              <div className="detail-row">
                <span>Rental Type:</span>
                <span>{bookingDetails.rentalType || 'Daily'}</span>
              </div>
            </div>

            <div className="summary-total">
              <div className="total-row">
                <span>Total Amount:</span>
                <span className="total-amount">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="booking-security">
              <p>🔒 Your payment information is secure and encrypted</p>
              <p>✓ 100% Money Back Guarantee</p>
              <p>✓ Verified Dealers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

