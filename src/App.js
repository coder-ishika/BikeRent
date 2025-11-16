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
import { CartProvider } from './context/CartContext';

function App() {
  return (
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
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
