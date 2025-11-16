import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GuidedTours.css';

const tours = {
  // Bike Tours
  'leh-ladakh': {
    title: 'Leh Ladakh Bike Tours',
    description: 'Experience the breathtaking landscapes of Leh Ladakh on an unforgettable bike tour through the Himalayas.',
    duration: '10-15 days',
    price: '₹25,000 - ₹45,000',
    highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La Pass', 'Magnetic Hill', 'Shanti Stupa'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    difficulty: 'Challenging',
    category: 'bike',
    bikeModel: 'Royal Enfield Himalayan',
    bikeImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop'
  },
  'spiti': {
    title: 'Spiti Bike Tours',
    description: 'Explore the cold desert valley of Spiti with its ancient monasteries and stunning mountain vistas.',
    duration: '8-12 days',
    price: '₹20,000 - ₹35,000',
    highlights: ['Key Monastery', 'Chandratal Lake', 'Kunzum Pass', 'Tabo Monastery', 'Pin Valley'],
    image: 'https://images.unsplash.com/photo-1558980664-1db506751c6c?w=800&h=600&fit=crop',
    difficulty: 'Moderate to Challenging',
    category: 'bike',
    bikeModel: 'Royal Enfield Classic 350',
    bikeImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop'
  },
  'rajasthan': {
    title: 'Rajasthan Bike Tours',
    description: 'Discover the royal heritage of Rajasthan on a cultural bike journey through palaces and deserts.',
    duration: '7-10 days',
    price: '₹15,000 - ₹30,000',
    highlights: ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur', 'Pushkar'],
    image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop',
    difficulty: 'Easy to Moderate',
    category: 'bike',
    bikeModel: 'Royal Enfield Bullet 350',
    bikeImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop'
  },
  'northeast': {
    title: 'North East Bike Tours',
    description: 'Journey through the lush green landscapes and diverse cultures of Northeast India.',
    duration: '10-14 days',
    price: '₹22,000 - ₹40,000',
    highlights: ['Sikkim', 'Darjeeling', 'Gangtok', 'Kalimpong', 'Tea Gardens'],
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop&auto=format',
    difficulty: 'Moderate',
    category: 'bike',
    bikeModel: 'Bajaj Dominar 400',
    bikeImage: 'https://images.unsplash.com/photo-1558980664-1db506751c6c?w=400&h=300&fit=crop&auto=format'
  },
  'sikkim': {
    title: 'Sikkim Bike Tours',
    description: 'Ride through the beautiful hill stations and monasteries of Sikkim.',
    duration: '6-8 days',
    price: '₹18,000 - ₹28,000',
    highlights: ['Gangtok', 'Tsomgo Lake', 'Nathula Pass', 'Pelling', 'Rumtek Monastery'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format',
    difficulty: 'Moderate',
    category: 'bike',
    bikeModel: 'KTM RC 200',
    bikeImage: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&h=300&fit=crop&auto=format'
  },
  'bhutan': {
    title: 'Bhutan Bike Tours',
    description: 'Experience the happiness and beauty of the Land of the Thunder Dragon.',
    duration: '8-10 days',
    price: '₹30,000 - ₹50,000',
    highlights: ['Thimphu', 'Paro', 'Punakha', 'Tiger\'s Nest', 'Buddha Dordenma'],
    image: 'https://images.unsplash.com/photo-1558980664-2cd663967d0a?w=800&h=600&fit=crop&auto=format',
    difficulty: 'Moderate',
    category: 'bike',
    bikeModel: 'BMW G310 R',
    bikeImage: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&h=300&fit=crop&auto=format'
  },
  
  // Holiday Packages
  'goa-holiday': {
    title: 'Goa Beach Holiday',
    description: 'Relax and unwind on the beautiful beaches of Goa with our all-inclusive holiday package.',
    duration: '5-7 days',
    price: '₹12,000 - ₹25,000',
    highlights: ['Beach Resorts', 'Water Sports', 'Nightlife', 'Portuguese Heritage', 'Seafood'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    difficulty: 'Easy',
    category: 'holidays'
  },
  'kerala-holiday': {
    title: 'Kerala Backwaters Holiday',
    description: 'Experience the serene backwaters and lush greenery of God\'s Own Country.',
    duration: '6-8 days',
    price: '₹15,000 - ₹30,000',
    highlights: ['Houseboat Stay', 'Ayurveda Spa', 'Tea Plantations', 'Wildlife Safari', 'Beaches'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Easy',
    category: 'holidays'
  },
  'himachal-holiday': {
    title: 'Himachal Hill Station Holiday',
    description: 'Escape to the cool hill stations of Himachal Pradesh for a refreshing holiday.',
    duration: '5-7 days',
    price: '₹10,000 - ₹22,000',
    highlights: ['Manali', 'Shimla', 'Dharamshala', 'Dalhousie', 'Adventure Activities'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Easy',
    category: 'holidays'
  },
  'udaipur-holiday': {
    title: 'Udaipur Royal Holiday',
    description: 'Experience the royal charm of Udaipur with palace stays and cultural experiences.',
    duration: '4-6 days',
    price: '₹18,000 - ₹35,000',
    highlights: ['Lake Palace', 'City Palace', 'Boat Ride', 'Cultural Shows', 'Royal Cuisine'],
    image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
    difficulty: 'Easy',
    category: 'holidays'
  },
  
  // Travel Packages
  'delhi-travel': {
    title: 'Delhi Heritage Tour',
    description: 'Explore the rich history and culture of India\'s capital city.',
    duration: '3-4 days',
    price: '₹8,000 - ₹15,000',
    highlights: ['Red Fort', 'Qutub Minar', 'India Gate', 'Lotus Temple', 'Street Food'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    difficulty: 'Easy',
    category: 'travel'
  },
  'mumbai-travel': {
    title: 'Mumbai City Tour',
    description: 'Discover the vibrant city of Mumbai, the financial capital of India.',
    duration: '3-4 days',
    price: '₹10,000 - ₹18,000',
    highlights: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Bollywood Tour', 'Street Food'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Easy',
    category: 'travel'
  },
  'varanasi-travel': {
    title: 'Varanasi Spiritual Tour',
    description: 'Experience the spiritual essence of Varanasi, the oldest living city.',
    duration: '3-5 days',
    price: '₹7,000 - ₹14,000',
    highlights: ['Ganga Aarti', 'Boat Ride', 'Temples', 'Ghats', 'Spiritual Walks'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Easy',
    category: 'travel'
  },
  'agra-travel': {
    title: 'Agra Taj Mahal Tour',
    description: 'Witness the magnificent Taj Mahal and explore the Mughal heritage.',
    duration: '2-3 days',
    price: '₹6,000 - ₹12,000',
    highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Local Markets', 'Mughlai Cuisine'],
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    difficulty: 'Easy',
    category: 'travel'
  },
  
  // Adventure Activities
  'paragliding': {
    title: 'Paragliding Adventure',
    description: 'Soar through the skies with our thrilling paragliding experiences.',
    duration: '1-2 days',
    price: '₹3,000 - ₹8,000',
    highlights: ['Tandem Flight', 'Professional Instructors', 'Safety Equipment', 'Photography', 'Certificate'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate',
    category: 'activities'
  },
  'river-rafting': {
    title: 'River Rafting Adventure',
    description: 'Navigate through rapids and enjoy the thrill of white water rafting.',
    duration: '1-2 days',
    price: '₹2,500 - ₹6,000',
    highlights: ['Grade 3-4 Rapids', 'Safety Gear', 'Expert Guides', 'Riverside Camping', 'Meals'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate to Challenging',
    category: 'activities'
  },
  'trekking': {
    title: 'Mountain Trekking',
    description: 'Challenge yourself with our guided mountain trekking expeditions.',
    duration: '3-7 days',
    price: '₹5,000 - ₹15,000',
    highlights: ['Scenic Trails', 'Camping', 'Mountain Views', 'Expert Guides', 'Equipment Provided'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate to Challenging',
    category: 'activities'
  },
  'bungee-jumping': {
    title: 'Bungee Jumping',
    description: 'Experience the ultimate adrenaline rush with bungee jumping.',
    duration: '1 day',
    price: '₹3,500 - ₹7,000',
    highlights: ['Professional Setup', 'Safety Certified', 'Video Recording', 'Certificate', 'Insurance'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Challenging',
    category: 'activities'
  },
  'rock-climbing': {
    title: 'Rock Climbing Adventure',
    description: 'Scale new heights with our rock climbing and rappelling activities.',
    duration: '1-2 days',
    price: '₹2,000 - ₹5,000',
    highlights: ['Natural Rock Faces', 'Safety Equipment', 'Expert Instructors', 'Multiple Routes', 'Training'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate',
    category: 'activities'
  },
  
  // Adventure Activities (Different from regular activities)
  'skydiving': {
    title: 'Skydiving Adventure',
    description: 'Experience the ultimate thrill of freefalling from thousands of feet above ground.',
    duration: '1 day',
    price: '₹15,000 - ₹35,000',
    highlights: ['Tandem Jump', 'Professional Instructors', 'Safety Equipment', 'Video Recording', 'Certificate'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Extreme',
    category: 'adventure'
  },
  'scuba-diving': {
    title: 'Scuba Diving Adventure',
    description: 'Explore the underwater world and discover marine life in crystal clear waters.',
    duration: '2-3 days',
    price: '₹8,000 - ₹20,000',
    highlights: ['PADI Certified', 'Underwater Photography', 'Coral Reefs', 'Marine Life', 'Equipment Provided'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate',
    category: 'adventure'
  },
  'zip-lining': {
    title: 'Zip Lining Adventure',
    description: 'Soar through forests and valleys on thrilling zip line courses.',
    duration: '1 day',
    price: '₹2,000 - ₹5,000',
    highlights: ['Multiple Lines', 'Safety Gear', 'Professional Setup', 'Scenic Views', 'Photography'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate',
    category: 'adventure'
  },
  'atv-riding': {
    title: 'ATV Off-Road Adventure',
    description: 'Navigate through challenging terrains on powerful all-terrain vehicles.',
    duration: '1-2 days',
    price: '₹3,500 - ₹8,000',
    highlights: ['Off-Road Trails', 'Professional ATVs', 'Safety Gear', 'Expert Guides', 'Mud Riding'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate to Challenging',
    category: 'adventure'
  },
  'cave-exploration': {
    title: 'Cave Exploration Adventure',
    description: 'Discover hidden caves and underground formations with expert guides.',
    duration: '1-2 days',
    price: '₹4,000 - ₹10,000',
    highlights: ['Natural Caves', 'Safety Equipment', 'Expert Guides', 'Underground Photography', 'Adventure Gear'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Moderate',
    category: 'adventure'
  },
  
  // Expedition Tours
  'everest-base-camp': {
    title: 'Everest Base Camp Expedition',
    description: 'Trek to the base of the world\'s highest mountain in this challenging expedition.',
    duration: '15-20 days',
    price: '₹1,50,000 - ₹3,00,000',
    highlights: ['Everest Base Camp', 'Kala Patthar', 'Namche Bazaar', 'Tengboche Monastery', 'Sherpa Culture'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Extreme',
    category: 'expedition'
  },
  'k2-base-camp': {
    title: 'K2 Base Camp Expedition',
    description: 'One of the most challenging expeditions to the base of the savage mountain.',
    duration: '20-25 days',
    price: '₹2,00,000 - ₹4,00,000',
    highlights: ['K2 Base Camp', 'Concordia', 'Baltoro Glacier', 'Gasherbrum Peaks', 'High Altitude Trekking'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Extreme',
    category: 'expedition'
  },
  'chadar-trek': {
    title: 'Chadar Trek Expedition',
    description: 'Walk on the frozen Zanskar River in one of the world\'s most unique winter expeditions.',
    duration: '10-12 days',
    price: '₹45,000 - ₹85,000',
    highlights: ['Frozen River Walk', 'Ice Caves', 'Zanskar Valley', 'Buddhist Monasteries', 'Extreme Cold'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Extreme',
    category: 'expedition'
  },
  'roopkund-trek': {
    title: 'Roopkund Mystery Lake Expedition',
    description: 'Trek to the mysterious skeleton lake at high altitude in the Himalayas.',
    duration: '8-10 days',
    price: '₹25,000 - ₹45,000',
    highlights: ['Roopkund Lake', 'Skeleton Remains', 'High Altitude', 'Alpine Meadows', 'Mountain Views'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Challenging',
    category: 'expedition'
  },
  'stok-kangri': {
    title: 'Stok Kangri Summit Expedition',
    description: 'Summit one of the highest trekkable peaks in the Indian Himalayas.',
    duration: '10-12 days',
    price: '₹55,000 - ₹95,000',
    highlights: ['Stok Kangri Summit (20,187 ft)', 'High Altitude Climbing', 'Acclimatization', 'Mountain Views', 'Expert Guides'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Extreme',
    category: 'expedition'
  },
  'trans-himalaya': {
    title: 'Trans-Himalaya Bike Expedition',
    description: 'Epic motorcycle expedition crossing the entire Himalayan range.',
    duration: '25-30 days',
    price: '₹1,80,000 - ₹3,50,000',
    highlights: ['Multiple High Passes', 'Remote Villages', 'Desert Landscapes', 'Buddhist Monasteries', 'Support Team'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    difficulty: 'Extreme',
    category: 'expedition'
  },
  
  // Categories
  'bike': {
    title: 'Bike Tours',
    description: 'Explore various bike tour packages across India.',
    type: 'category',
    category: 'bike'
  },
  'holidays': {
    title: 'Holiday Packages',
    description: 'Complete holiday packages with accommodation and guided tours.',
    type: 'category',
    category: 'holidays'
  },
  'travel': {
    title: 'Travel Packages',
    description: 'Comprehensive travel packages for your next adventure.',
    type: 'category',
    category: 'travel'
  },
  'activities': {
    title: 'Extreme Activities',
    description: 'Thrilling extreme activities and experiences for adrenaline junkies.',
    type: 'category',
    category: 'activities'
  },
  'adventure': {
    title: 'Adventure Activities',
    description: 'Exciting adventure activities and outdoor experiences for thrill-seekers.',
    type: 'category',
    category: 'adventure'
  },
  'expedition': {
    title: 'Expedition Tours',
    description: 'Extreme multi-day expeditions for experienced adventurers seeking the ultimate challenge.',
    type: 'category',
    category: 'expedition'
  }
};

const GuidedTours = () => {
  const { tourId } = useParams();
  const tour = tours[tourId];

  if (!tour) {
    return (
      <div className="guided-tours">
        <div className="container">
          <h1>Guided Tours</h1>
          <div className="tours-grid">
            {Object.entries(tours).filter(([key, t]) => !t.type).map(([key, t]) => (
              <Link key={key} to={`/tours/${key}`} className="tour-card">
                <img 
                  src={t.image} 
                  alt={t.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600/667eea/ffffff?text=' + encodeURIComponent(t.title);
                  }}
                />
                <div className="tour-info">
                  <h3>{t.title}</h3>
                  {t.bikeModel && (
                    <div className="bike-model-badge">🏍️ {t.bikeModel}</div>
                  )}
                  <p>{t.description}</p>
                  <div className="tour-meta">
                    <span>⏱️ {t.duration}</span>
                    <span>💰 {t.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tour.type === 'category') {
    // Filter tours by category
    const categoryTours = Object.entries(tours).filter(([key, t]) => 
      !t.type && t.category === tour.category
    );

    return (
      <div className="guided-tours">
        <div className="container">
          <h1>{tour.title}</h1>
          <p className="category-description">{tour.description}</p>
          <div className="tours-grid">
            {categoryTours.map(([key, t]) => (
              <Link key={key} to={`/tours/${key}`} className="tour-card">
                <img 
                  src={t.image} 
                  alt={t.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600/667eea/ffffff?text=' + encodeURIComponent(t.title);
                  }}
                />
                <div className="tour-info">
                  <h3>{t.title}</h3>
                  {t.bikeModel && (
                    <div className="bike-model-badge">🏍️ {t.bikeModel}</div>
                  )}
                  <p>{t.description}</p>
                  <div className="tour-meta">
                    <span>⏱️ {t.duration}</span>
                    <span>💰 {t.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="guided-tours-detail">
      <div className="tour-hero" style={{backgroundImage: `url(${tour.image})`}}>
        <div className="hero-overlay">
          <h1>{tour.title}</h1>
          <p>{tour.description}</p>
        </div>
      </div>
      
      <div className="container">
        <div className="tour-content">
          <div className="tour-main">
            <div className="tour-section">
              <h2>Tour Highlights</h2>
              <ul className="highlights-list">
                {tour.highlights.map((highlight, idx) => (
                  <li key={idx}>✓ {highlight}</li>
                ))}
              </ul>
            </div>

            <div className="tour-section">
              <h2>Itinerary Overview</h2>
              <p>
                This {tour.duration} tour will take you through some of the most beautiful and culturally rich destinations. 
                Our experienced guides will ensure you have a safe and memorable journey. The tour includes accommodation, 
                meals, support vehicle, and all necessary permits.
              </p>
            </div>

            {tour.bikeModel && (
              <div className="tour-section">
                <h2>🏍️ Bike Model</h2>
                <div className="bike-model-section">
                  <img 
                    src={tour.bikeImage} 
                    alt={tour.bikeModel}
                    className="bike-model-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=' + encodeURIComponent(tour.bikeModel);
                    }}
                  />
                  <div className="bike-model-info">
                    <h3>{tour.bikeModel}</h3>
                    <p>This tour features the {tour.bikeModel}, perfect for this route's terrain and conditions.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="tour-section">
              <h2>What's Included</h2>
              <ul className="included-list">
                {tour.category === 'bike' ? (
                  <>
                    <li>✓ {tour.bikeModel || 'Royal Enfield or similar bike'}</li>
                    <li>✓ Accommodation (twin sharing)</li>
                    <li>✓ All meals</li>
                    <li>✓ Support vehicle</li>
                    <li>✓ Experienced tour guide</li>
                    <li>✓ First aid kit</li>
                    <li>✓ All permits and entry fees</li>
                    <li>✓ Helmet and safety gear</li>
                  </>
                ) : tour.category === 'holidays' ? (
                  <>
                    <li>✓ Hotel/resort accommodation</li>
                    <li>✓ Breakfast and dinner</li>
                    <li>✓ Airport transfers</li>
                    <li>✓ Local sightseeing</li>
                    <li>✓ Tour guide</li>
                    <li>✓ All entry fees</li>
                    <li>✓ Travel insurance</li>
                    <li>✓ 24/7 support</li>
                  </>
                ) : tour.category === 'travel' ? (
                  <>
                    <li>✓ Hotel accommodation</li>
                    <li>✓ Daily breakfast</li>
                    <li>✓ Local transportation</li>
                    <li>✓ Guided city tours</li>
                    <li>✓ Entry tickets</li>
                    <li>✓ Professional guide</li>
                    <li>✓ Travel assistance</li>
                  </>
                ) : tour.category === 'adventure' ? (
                  <>
                    <li>✓ Professional adventure guides</li>
                    <li>✓ Premium safety equipment</li>
                    <li>✓ Training and briefing</li>
                    <li>✓ Insurance coverage</li>
                    <li>✓ Adventure certificate</li>
                    <li>✓ Action photography/videography</li>
                    <li>✓ Refreshments and snacks</li>
                    <li>✓ First aid support</li>
                  </>
                ) : tour.category === 'expedition' ? (
                  <>
                    <li>✓ Expert expedition leaders</li>
                    <li>✓ High-altitude gear and equipment</li>
                    <li>✓ Acclimatization program</li>
                    <li>✓ Medical support and oxygen</li>
                    <li>✓ All permits and documentation</li>
                    <li>✓ Camping equipment</li>
                    <li>✓ All meals during expedition</li>
                    <li>✓ Support team and porters</li>
                    <li>✓ Satellite communication</li>
                    <li>✓ Expedition certificate</li>
                  </>
                ) : (
                  <>
                    <li>✓ Professional instructors</li>
                    <li>✓ Safety equipment</li>
                    <li>✓ Training session</li>
                    <li>✓ Insurance coverage</li>
                    <li>✓ Certificate of participation</li>
                    <li>✓ Photography/videography</li>
                    <li>✓ Refreshments</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="tour-sidebar">
            <div className="booking-card">
              <h3>Book This Tour</h3>
              <div className="tour-details">
                <div className="detail-item">
                  <span className="label">Duration:</span>
                  <span className="value">{tour.duration}</span>
                </div>
                {tour.difficulty && (
                <div className="detail-item">
                  <span className="label">Difficulty:</span>
                  <span className="value">{tour.difficulty}</span>
                </div>
                )}
                {tour.bikeModel && (
                  <div className="detail-item">
                    <span className="label">Bike Model:</span>
                    <span className="value">{tour.bikeModel}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="label">Price:</span>
                  <span className="value price">{tour.price}</span>
                </div>
              </div>
              <button className="book-tour-btn">Book Now</button>
              <button className="enquire-btn">Enquire Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedTours;
