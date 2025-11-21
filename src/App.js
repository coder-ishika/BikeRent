import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BikeListing from './pages/BikeListing';
import BikeDetails from './pages/BikeDetails';
import Booking from './pages/Booking';
import Cart from './pages/Cart';
import GuidedTours from './pages/GuidedTours';
import Auth from './pages/Auth';
import Offers from './pages/Offers';
import Reviews from './pages/Reviews';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bikes" element={<BikeListing />} />
              <Route path="/bike/:id" element={<BikeDetails />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/tours" element={<GuidedTours />} />
              <Route path="/tours/:tourId" element={<GuidedTours />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/reviews" element={<Reviews />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
