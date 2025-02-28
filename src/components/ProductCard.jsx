import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ProductCard.css';

function ProductCard({ product, onBuyNow }) {
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(product.minQuantity);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleQuantityChange = (increment) => {
    const newQuantity = Math.max(product.minQuantity, Math.min(1000, quantity + increment));
    setQuantity(newQuantity);
  };

  const pricePerPiece = product.pricing(quantity);
  const totalPrice = pricePerPiece * quantity;

  const handleAddToCart = () => {
    if (quantity < product.minQuantity) {
      alert(`Minimum order quantity is ${product.minQuantity} pieces.`);
      return;
    }
    addToCart({ ...product, quantity, price: pricePerPiece });
  };

  const handleBuyNowClick = () => {
    if (quantity < product.minQuantity) {
      alert(`Minimum order quantity is ${product.minQuantity} pieces.`);
      return;
    }
    onBuyNow(product, quantity);
  };

  return (
    <motion.div
      className={`product-card ${product.category === 'holy' ? 'holy-card' : 'regular-card'}`}
      whileHover={{ scale: 1.03, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image">
        <img src={product.img} alt={product.name} />
        <span className="category-badge">
          {product.category === 'holy' ? 'Holy Festival' : 'Regular'}
        </span>
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="price-info">
          ₹{pricePerPiece}/piece{' '}
          <span className="bulk-info">
            {quantity > 200 ? '(Bulk)' : `(Min ${product.minQuantity})`}
          </span>
        </p>
        <p className="price-info">
          {quantity} piece
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={totalPrice}
            className="total-price"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            Total: ₹{totalPrice}
          </motion.p>
        </AnimatePresence>
        <div className="quantity-selector">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={isInCart || quantity <= product.minQuantity}
          >
            -
          </button>
          <motion.span
            key={quantity}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {quantity}
          </motion.span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={isInCart}
          >
            +
          </button>
        </div>
        <div className="quick-increment">
          <button
            onClick={() => handleQuantityChange(-50)}
            disabled={isInCart || quantity <= product.minQuantity}
          >
            -50
          </button>
          <button
            onClick={() => handleQuantityChange(50)}
            disabled={isInCart}
          >
            +50
          </button>
          <button
            onClick={() => handleQuantityChange(100)}
            disabled={isInCart}
          >
            +100
          </button>
        </div>
        <div className="action-buttons">
          <motion.button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={isInCart}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 1 }}
            animate={isInCart ? { backgroundColor: '#ccc' } : { backgroundColor: '#ff4500' }}
            transition={{ duration: 0.2 }}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </motion.button>
          <motion.button
            className="buy-now"
            onClick={handleBuyNowClick}
            disabled={isInCart}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 1 }}
            animate={isInCart ? { backgroundColor: '#ccc' } : { backgroundColor: '#ffd700' }}
            transition={{ duration: 0.2 }}
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;