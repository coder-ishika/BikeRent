import React from 'react';
import { Link } from 'react-router-dom';
import './BikeCard.css';

const BikeCard = ({ bike }) => {
  return (
    <div className="bike-card">
      <div className="bike-image">
        <img src={bike.image} alt={bike.name} />
        {!bike.available && <div className="unavailable-badge">Unavailable</div>}
      </div>
      <div className="bike-info">
        <h3>{bike.name}</h3>
        <p className="bike-brand">{bike.brand}</p>
        <div className="bike-rating">
          <span className="stars">{'⭐'.repeat(Math.floor(bike.rating))}</span>
          <span className="rating-text">{bike.rating} ({bike.reviews} reviews)</span>
        </div>
        <div className="bike-features">
          {bike.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="feature-tag">{feature}</span>
          ))}
        </div>
        <div className="bike-footer">
          <div className="bike-price">
            <span className="price">₹{bike.price}</span>
            <span className="price-unit">/day</span>
          </div>
          <Link to={`/bike/${bike.id}`} className="book-btn">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;

