import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs'; // New
import Blog from './pages/Blog'; // New
import ContactUs from './pages/ContactUs'; // New
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </CartProvider>
  );
}

export default App;