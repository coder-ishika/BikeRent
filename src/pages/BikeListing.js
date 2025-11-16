import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { bikes } from '../data/bikes';
import BikeCard from '../components/BikeCard';
import './BikeListing.css';

const BikeListing = () => {
  const { bookingDetails } = useCart();
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    search: ''
  });

  const filteredBikes = useMemo(() => {
    return bikes.filter(bike => {
      if (filters.category && bike.category !== filters.category) return false;
      if (filters.rating && bike.rating < parseFloat(filters.rating)) return false;
      if (filters.search && !bike.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !bike.brand.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max && (bike.price < min || bike.price > max)) return false;
        if (!max && bike.price < min) return false;
      }
      return true;
    });
  }, [filters]);

  const categories = [...new Set(bikes.map(bike => bike.category))];

  return (
    <div className="bike-listing">
      <div className="container">
        <div className="listing-header">
          <h1>Available Bikes</h1>
          {bookingDetails.city && (
            <p className="location-info">
              📍 {bookingDetails.city} • {bookingDetails.rentalType} Rental
            </p>
          )}
        </div>

        <div className="listing-content">
          <aside className="filters-sidebar">
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search bikes..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="filter-select"
              >
                <option value="">All Prices</option>
                <option value="0-500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="1000-1500">₹1000 - ₹1500</option>
                <option value="1500-2000">₹1500 - ₹2000</option>
                <option value="2000-9999">Above ₹2000</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                className="filter-select"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>

            <button
              className="clear-filters"
              onClick={() => setFilters({category: '', priceRange: '', rating: '', search: ''})}
            >
              Clear All Filters
            </button>
          </aside>

          <main className="bikes-main">
            <div className="results-header">
              <p className="results-count">
                {filteredBikes.length} {filteredBikes.length === 1 ? 'bike' : 'bikes'} found
              </p>
            </div>
            
            {filteredBikes.length > 0 ? (
              <div className="bikes-grid">
                {filteredBikes.map(bike => (
                  <BikeCard key={bike.id} bike={bike} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No bikes found matching your criteria.</p>
                <button
                  className="btn-primary"
                  onClick={() => setFilters({category: '', priceRange: '', rating: '', search: ''})}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BikeListing;

