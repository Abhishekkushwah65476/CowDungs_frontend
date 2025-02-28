import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import '../styles/Products.css';

function Products() {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, addToCart } = useCart();

  const regularPricing = (quantity) => {
    if (quantity >= 20 && quantity <= 200) return 10; // Non-bulk: ₹10/piece
    if (quantity > 200) return 8; // Bulk: ₹8/piece
    return 0; // Invalid quantity
  };

  const holyPricing = (quantity) => {
    if (quantity >= 10 && quantity <= 200) return 5; // Non-bulk: ₹5/piece
    if (quantity > 200) return 3; // Bulk: ₹3/piece
    return 0; // Invalid quantity
  };

  const products = [
    // Regular Products (8)
    { id: 1, img: '/images/istockphoto-617768114-612x612.jpg', name: 'Standard Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    { id: 2, img: '/images/istockphoto-509998544-612x612.jpg', name: 'Classic Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    { id: 3, img: '/images/istockphoto-2195688993-612x612.jpg', name: 'Village Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    { id: 4, img: '/images/istockphoto-617768114-612x612.jpg', name: 'Eco Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    { id: 5, img: '/images/istockphoto-509998544-612x612.jpg', name: 'Pure Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    { id: 6, img: '/images/istockphoto-2195688993-612x612.jpg', name: 'Traditional Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    { id: 7, img: '/images/istockphoto-617768114-612x612.jpg', name: 'Natural Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    { id: 8, img: '/images/istockphoto-509998544-612x612.jpg', name: 'Rural Dung Cakes', category: 'regular', minQuantity: 20, pricing: regularPricing },
    // Holy Festival Products (8)
    { id: 9, img: '/images/istockphoto-2098848387-612x612.jpg', name: 'Holy Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
    { id: 10, img: '/images/istockphoto-2176629259-612x612.jpg', name: 'Festival Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
    { id: 11, img: '/images/istockphoto-2098848387-612x612.jpg', name: 'Sacred Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
    { id: 12, img: '/images/istockphoto-2176629259-612x612.jpg', name: 'Diwali Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
    { id: 13, img: '/images/istockphoto-2098848387-612x612.jpg', name: 'Blessed Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
    { id: 14, img: '/images/istockphoto-2176629259-612x612.jpg', name: 'Ritual Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
    { id: 15, img: '/images/istockphoto-2098848387-612x612.jpg', name: 'Puja Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
    { id: 16, img: '/images/istockphoto-2176629259-612x612.jpg', name: 'Divine Dung Cakes', category: 'holy', minQuantity: 10, pricing: holyPricing },
  ];

  const handleBuyNow = (product, quantity) => {
    const pricePerPiece = product.pricing(quantity);
    if (quantity < product.minQuantity) {
      alert(`Minimum order quantity is ${product.minQuantity} pieces.`);
      return;
    }
    addToCart({ ...product, quantity, price: pricePerPiece });
    setShowCheckout(true);
  };

  return (
    <>
      <Header />
      <main className="products-page">
        <section className="products festive-products">
          <h2>Shop Dung Cakes</h2>
          <p>Regular: ₹8-10/piece | Holy Festival: ₹3-5/piece</p>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </section>
        {cart.length > 0 && (
          <button className="cart-icon-btn" onClick={() => setShowCheckout(true)}>
            <FaShoppingCart size={24} />
            <span className="cart-count">{cart.length}</span>
          </button>
        )}
        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default Products;