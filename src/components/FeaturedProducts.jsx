import React from 'react';
import '../styles/FeaturedProducts.css';

function FeaturedProducts() {
  const products = [
    { img: '/images/istockphoto-617768114-612x612.jpg', name: 'Standard Dung Cakes', price: '₹50 / 5 Cakes' },
    { img: '/images/istockphoto-2098848387-612x612.jpg', name: 'Premium Dung Cakes', price: '₹80 / 5 Cakes' },
    { img: '/images/istockphoto-2098848387-612x612.jpg', name: 'Premium Dung Cakes', price: '₹80 / 5 Cakes' },
    { img: '/images/istockphoto-2195688993-612x612.jpg', name: 'Bulk Dung Cakes', price: '₹200 / 20 Cakes' },
  ];

  return (
    <section className="featured-products">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-item" key={index}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <a href="/products" className="add-to-cart">Shop Now</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;