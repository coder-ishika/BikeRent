import React from 'react';
import { Link } from 'react-router-dom';
import './Offers.css';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: 'Weekend Special',
      discount: '20% OFF',
      code: 'WEEKEND20',
      description: 'Get 20% off on all weekend bookings. Valid on Saturday and Sunday.',
      validUntil: '2025-12-31',
      category: 'Weekend'
    },
    {
      id: 2,
      title: 'First Time User',
      discount: '15% OFF',
      code: 'FIRST15',
      description: 'New to BikeRent? Get 15% off on your first booking!',
      validUntil: '2025-12-31',
      category: 'New User'
    },
    {
      id: 3,
      title: 'Long Term Rental',
      discount: '30% OFF',
      code: 'LONG30',
      description: 'Book for 7+ days and save 30% on your rental.',
      validUntil: '2025-12-31',
      category: 'Long Term'
    },
    {
      id: 4,
      title: 'Group Booking',
      discount: '25% OFF',
      code: 'GROUP25',
      description: 'Book 3 or more bikes and get 25% discount on all bikes.',
      validUntil: '2025-12-31',
      category: 'Group'
    },
    {
      id: 5,
      title: 'Student Discount',
      discount: '20% OFF',
      code: 'STUDENT20',
      description: 'Students get 20% off on all bookings. Valid ID required.',
      validUntil: '2025-12-31',
      category: 'Student'
    },
    {
      id: 6,
      title: 'Early Bird',
      discount: '10% OFF',
      code: 'EARLY10',
      description: 'Book 7 days in advance and get 10% off.',
      validUntil: '2025-12-31',
      category: 'Advance Booking'
    }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <div className="offers-page">
      <div className="offers-hero">
        <div className="container">
          <h1>Special Offers & Discounts</h1>
          <p>Save more on your bike rental with our exclusive offers</p>
        </div>
      </div>

      <div className="container">
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-badge">{offer.category}</div>
              <div className="offer-header">
                <h3>{offer.title}</h3>
                <div className="discount-badge">{offer.discount}</div>
              </div>
              <p className="offer-description">{offer.description}</p>
              <div className="offer-code-section">
                <div className="coupon-code">
                  <span className="code-label">Coupon Code:</span>
                  <span className="code-value">{offer.code}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => handleCopyCode(offer.code)}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="offer-footer">
                <span className="valid-until">Valid until: {offer.validUntil}</span>
                <Link to="/bikes" className="apply-btn">Apply & Book Now</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="offers-info">
          <h2>How to Use Coupon Codes?</h2>
          <div className="info-steps">
            <div className="info-step">
              <div className="step-number">1</div>
              <h4>Select Your Bike</h4>
              <p>Browse and select the bike you want to rent</p>
            </div>
            <div className="info-step">
              <div className="step-number">2</div>
              <h4>Proceed to Booking</h4>
              <p>Add the bike to cart and proceed to checkout</p>
            </div>
            <div className="info-step">
              <div className="step-number">3</div>
              <h4>Enter Coupon Code</h4>
              <p>Enter the coupon code in the payment section</p>
            </div>
            <div className="info-step">
              <div className="step-number">4</div>
              <h4>Enjoy Discount</h4>
              <p>Your discount will be applied automatically</p>
            </div>
          </div>
        </div>

        <div className="terms-section">
          <h3>Terms & Conditions</h3>
          <ul>
            <li>Each coupon code can be used only once per user</li>
            <li>Coupons cannot be combined with other offers</li>
            <li>Discounts apply to base rental price only</li>
            <li>Some offers may have minimum booking duration requirements</li>
            <li>BikeRent reserves the right to modify or cancel offers at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Offers;

