import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    city: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    rentalType: 'Daily'
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('bikeCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bikeCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (bike) => {
    setCart([...cart, { ...bike, id: Date.now() }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateBookingDetails = (details) => {
    setBookingDetails({ ...bookingDetails, ...details });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      bookingDetails,
      updateBookingDetails
    }}>
      {children}
    </CartContext.Provider>
  );
};

