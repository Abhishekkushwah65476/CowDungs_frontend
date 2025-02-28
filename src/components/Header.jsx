import React from 'react';
import { Link } from 'react-router-dom'; // Use Link instead of <a>
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">Rural Dung Cakes</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="delivery-notice">Free Delivery in 4 Hours!</div>
      </nav>
    </header>
  );
}

export default Header;