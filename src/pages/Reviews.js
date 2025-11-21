import React, { useState } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Jeetu Dongre',
      role: 'Senior Teacher, Bhopal',
      rating: 5,
      date: '2024-12-15',
      comment: 'It has been an awesome experience for me when I got to roam places like Dipor Bil, Kamakhya Temple, Umanadna temple and many more places on my way to Dispur. Before I started the journey I wasn\'t sure I would get chance to visit and these all beautiful places.',
      bike: 'Royal Enfield Classic 350'
    },
    {
      id: 2,
      name: 'Mandy Varshaney',
      role: 'TripAdvisor',
      rating: 5,
      date: '2024-12-10',
      comment: 'We had booked two bikes (Pulsar 180 & 150) for my ASSAM and MEGHALAYA trip from Rentrip Guwahati. The bikes were very well maintained and perfectly clean when they handed the key. So no trouble with the bike at any place.',
      bike: 'Bajaj Pulsar 180'
    },
    {
      id: 3,
      name: 'Know Startup',
      role: 'News',
      rating: 5,
      date: '2024-12-05',
      comment: 'Road trips would not have been exciting if there were no Rentrip bike rental company. One of the leading motorbike rental service providers in India, Rentrip offers a diversified range of two-wheelers for short and long rides.',
      bike: 'Honda Activa'
    },
    {
      id: 4,
      name: 'Rahul Sharma',
      role: 'Travel Blogger',
      rating: 5,
      date: '2024-11-28',
      comment: 'Amazing service! The bike was in perfect condition and the pickup process was smooth. Highly recommend for anyone planning a road trip.',
      bike: 'Yamaha MT-15'
    },
    {
      id: 5,
      name: 'Priya Patel',
      role: 'Adventure Enthusiast',
      rating: 4,
      date: '2024-11-20',
      comment: 'Great experience overall. The bike was clean and well-maintained. Customer service was helpful throughout the journey.',
      bike: 'KTM Duke 200'
    },
    {
      id: 6,
      name: 'Amit Kumar',
      role: 'Photographer',
      rating: 5,
      date: '2024-11-15',
      comment: 'Perfect for my photography trip! The bike handled well on all terrains. Will definitely book again for my next adventure.',
      bike: 'Royal Enfield Himalayan'
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    bike: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      role: 'Customer',
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      bike: newReview.bike || 'Not specified'
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', email: '', rating: 5, comment: '', bike: '' });
    setShowForm(false);
    alert('Thank you for your review!');
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="reviews-page">
      <div className="reviews-hero">
        <div className="container">
          <h1>Customer Reviews</h1>
          <p>See what our customers have to say about their experience</p>
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{averageRating.toFixed(1)}</span>
              <div className="stars-large">{renderStars(Math.round(averageRating))}</div>
              <span className="total-reviews">Based on {reviews.length} reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="reviews-header">
          <h2>All Reviews</h2>
          <button className="add-review-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Your Review'}
          </button>
        </div>

        {showForm && (
          <div className="review-form-container">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={newReview.email}
                    onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bike Rented (Optional)</label>
                  <input
                    type="text"
                    value={newReview.bike}
                    onChange={(e) => setNewReview({...newReview, bike: e.target.value})}
                    placeholder="Which bike did you rent?"
                  />
                </div>
                <div className="form-group">
                  <label>Rating *</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                    required
                  >
                    <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 ⭐⭐⭐⭐</option>
                    <option value={3}>3 ⭐⭐⭐</option>
                    <option value={2}>2 ⭐⭐</option>
                    <option value={1}>1 ⭐</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Your Review *</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                  rows="5"
                  placeholder="Share your experience..."
                />
              </div>
              <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
          </div>
        )}

        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{review.name}</h4>
                    <p className="reviewer-role">{review.role}</p>
                  </div>
                </div>
                <div className="review-meta">
                  <div className="stars">{renderStars(review.rating)}</div>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <p className="review-bike">Bike: {review.bike}</p>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

