import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cities, rentalTypes, bikes } from '../data/bikes';
import BikeCard from '../components/BikeCard';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { updateBookingDetails } = useCart();
  const [searchForm, setSearchForm] = useState({
    city: '',
    rentalType: 'Daily',
    pickupDate: '',
    pickupTime: '09:00',
    dropoffDate: '',
    dropoffTime: '09:00'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    updateBookingDetails(searchForm);
    navigate('/bikes');
  };

  const popularBikes = bikes.slice(0, 6);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Rent your bike from the startup made by ITs Engineering college students</h1>
          <p>Rent from India's Largest Fleet of Motorcycles, Trusted by millions.</p>
          
          <div className="hero-tabs">
            <button className="tab active">Rent Bikes</button>
            <button className="tab">Guided Tours</button>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <select 
                  value={searchForm.city}
                  onChange={(e) => setSearchForm({...searchForm, city: e.target.value})}
                  required
                >
                  <option value="">-- select --</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Book at</label>
                <select 
                  value={searchForm.rentalType}
                  onChange={(e) => setSearchForm({...searchForm, rentalType: e.target.value})}
                >
                  {rentalTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pick Up Date</label>
                <input 
                  type="date" 
                  value={searchForm.pickupDate}
                  onChange={(e) => setSearchForm({...searchForm, pickupDate: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Pick Time</label>
                <select 
                  value={searchForm.pickupTime}
                  onChange={(e) => setSearchForm({...searchForm, pickupTime: e.target.value})}
                >
                  {Array.from({length: 18}, (_, i) => {
                    const hour = 6 + i;
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    const period = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                    return (
                      <option key={time} value={time}>
                        {displayHour.toString().padStart(2, '0')}:00 {period}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Drop Off Date</label>
                <input 
                  type="date" 
                  value={searchForm.dropoffDate}
                  onChange={(e) => setSearchForm({...searchForm, dropoffDate: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Drop Time</label>
                <select 
                  value={searchForm.dropoffTime}
                  onChange={(e) => setSearchForm({...searchForm, dropoffTime: e.target.value})}
                >
                  {Array.from({length: 18}, (_, i) => {
                    const hour = 6 + i;
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    const period = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                    return (
                      <option key={time} value={time}>
                        {displayHour.toString().padStart(2, '0')}:00 {period}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <button type="submit" className="search-btn">Find Bike</button>
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2>Benefits of Choosing Self Drive Bike</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚫</div>
              <h3>No Riding Limits</h3>
              <p>Odometer Won't Scare You Anymore.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🪖</div>
              <h3>Freebies</h3>
              <p>Helmets Always, Sometimes More.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Our Payment Partners are Industry Leaders.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⏰</div>
              <h3>No Bullshit</h3>
              <p>A Day Rent is simply for 24 hrs, We mean it.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✅</div>
              <h3>Verified Dealers</h3>
              <p>Every Single Dealer is Committed to Quality Service.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>100% Moneyback*</h3>
              <p>Not Happy With Service, Take Your Money Back.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Models */}
      <section className="popular-models">
        <div className="container">
          <h2>Popular Models</h2>
          <div className="bikes-grid">
            {popularBikes.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
          <div className="text-center">
            <button className="btn-primary" onClick={() => navigate('/bikes')}>
              View All Bikes
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews-section">
        <div className="container">
          <h2>Customer Experiences</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"It has been an awesome experience for me when I got to roam places like Dipor Bil, Kamakhya Temple, Umanadna temple and many more places on my way to Dispur. Before I started the journey I wasn't sure I would get chance to visit and these all beautiful places."</p>
              <div className="reviewer">
                <strong>Jeetu Dongre</strong>
                <span>Senior Teacher, Bhopal</span>
              </div>
            </div>
            <div className="review-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"We had booked two bikes (Pulsar 180 & 150) for my ASSAM and MEGHALAYA trip from Rentrip Guwahati. The bikes were very well maintained and perfectly clean when they handed the key. So no trouble with the bike at any place."</p>
              <div className="reviewer">
                <strong>Mandy Varshaney</strong>
                <span>TripAdvisor</span>
              </div>
            </div>
            <div className="review-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Road trips would not have been exciting if there were no Rentrip bike rental company. One of the leading motorbike rental service providers in India, Rentrip offers a diversified range of two-wheelers for short and long rides."</p>
              <div className="reviewer">
                <strong>Know Startup</strong>
                <span>News</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How to Rent a Bike?</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3>Select Your Bike</h3>
              <p>You can search & select bike from our wide range.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🛒</div>
              <h3>Add to Cart</h3>
              <p>Easily add multiple bike in your cart or direct book from "BookNow" button.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">📍</div>
              <h3>Pick Your Bike</h3>
              <p>Find the pickup location and pick a bike.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon">🏍️</div>
              <h3>Ride Anywhere</h3>
              <p>We do not have kms limit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">569,782</div>
              <div className="stat-label">HAPPY CUSTOMERS</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6,370</div>
              <div className="stat-label">TOTAL PRODUCT COUNT</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">62</div>
              <div className="stat-label">CITIES SERVING NOW</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,692</div>
              <div className="stat-label">PICKUP LOCATIONS</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

