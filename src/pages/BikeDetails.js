import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bikes } from '../data/bikes';
import { useCart } from '../context/CartContext';
import './BikeDetails.css';

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, bookingDetails } = useCart();
  const bike = bikes.find(b => b.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!bike) {
    return (
      <div className="bike-details">
        <div className="container">
          <p>Bike not found</p>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    addToCart(bike);
    navigate('/cart');
  };

  const calculateTotal = () => {
    if (!bookingDetails.pickupDate || !bookingDetails.dropoffDate) return bike.price;
    const pickup = new Date(bookingDetails.pickupDate);
    const dropoff = new Date(bookingDetails.dropoffDate);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24)) || 1;
    return bike.price * days;
  };

  return (
    <div className="bike-details">
      <div className="container">
        <div className="details-content">
          <div className="details-images">
            <div className="main-image">
              <img src={bike.image} alt={bike.name} />
            </div>
            <div className="image-thumbnails">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${selectedImage === idx - 1 ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx - 1)}
                >
                  <img src={bike.image} alt={`${bike.name} ${idx}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="details-info">
            <div className="breadcrumb">
              <span>Home</span> / <span>Bikes</span> / <span>{bike.name}</span>
            </div>

            <h1>{bike.name}</h1>
            <p className="bike-brand">{bike.brand} • {bike.category}</p>

            <div className="rating-section">
              <div className="rating-display">
                <span className="stars-large">{'⭐'.repeat(Math.floor(bike.rating))}</span>
                <span className="rating-value">{bike.rating}</span>
                <span className="reviews-count">({bike.reviews} reviews)</span>
              </div>
            </div>

            <div className="price-section">
              <div className="price-main">
                <span className="currency">₹</span>
                <span className="amount">{bike.price}</span>
                <span className="period">/day</span>
              </div>
              {bookingDetails.pickupDate && bookingDetails.dropoffDate && (
                <div className="total-price">
                  Total: ₹{calculateTotal()}
                </div>
              )}
            </div>

            <div className="features-section">
              <h3>Features</h3>
              <div className="features-list">
                {bike.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="availability-section">
              <div className={`availability-badge ${bike.available ? 'available' : 'unavailable'}`}>
                {bike.available ? '✓ Available' : '✗ Unavailable'}
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="btn-book"
                onClick={handleBookNow}
                disabled={!bike.available}
              >
                Book Now
              </button>
              <button
                className="btn-cart"
                onClick={() => {
                  addToCart(bike);
                  alert('Added to cart!');
                }}
                disabled={!bike.available}
              >
                Add to Cart
              </button>
            </div>

            <div className="booking-info">
              {bookingDetails.city && (
                <div className="info-item">
                  <strong>Location:</strong> {bookingDetails.city}
                </div>
              )}
              {bookingDetails.pickupDate && (
                <div className="info-item">
                  <strong>Pickup:</strong> {bookingDetails.pickupDate} at {bookingDetails.pickupTime}
                </div>
              )}
              {bookingDetails.dropoffDate && (
                <div className="info-item">
                  <strong>Dropoff:</strong> {bookingDetails.dropoffDate} at {bookingDetails.dropoffTime}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="details-tabs">
          <div className="tab-content">
            <h3>Description</h3>
            <p>
              The {bike.name} from {bike.brand} is a perfect choice for your {bike.category.toLowerCase()} needs. 
              With excellent features and reliable performance, this bike offers great value for money. 
              Whether you're planning a city ride or a long-distance journey, the {bike.name} won't disappoint.
            </p>
          </div>

          <div className="tab-content">
            <h3>Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Brand</span>
                <span className="spec-value">{bike.brand}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Category</span>
                <span className="spec-value">{bike.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Rating</span>
                <span className="spec-value">{bike.rating} / 5.0</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Reviews</span>
                <span className="spec-value">{bike.reviews}</span>
              </div>
            </div>
          </div>

          <div className="tab-content">
            <h3>Reviews</h3>
            <div className="reviews-list">
              <div className="review-item">
                <div className="review-header">
                  <strong>John Doe</strong>
                  <span className="review-stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p>Great bike! Very comfortable and fuel efficient. Perfect for city rides.</p>
                <span className="review-date">2 days ago</span>
              </div>
              <div className="review-item">
                <div className="review-header">
                  <strong>Jane Smith</strong>
                  <span className="review-stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p>Amazing experience! The bike was in excellent condition and the service was top-notch.</p>
                <span className="review-date">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;

