import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import '../styles/CheckoutModal.css';

function CheckoutModal({ onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) >= 400 ? 'prepaid' : 'cod');
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    whatsappNumber: '',
    address: '',
    location: null, // Store latitude and longitude
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    // Request user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserDetails((prev) => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not get your location. Please enable location services.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!userDetails.name || !userDetails.phone || !userDetails.address || !userDetails.whatsappNumber || !userDetails.location) {
      toast.error('Please fill in all delivery details and allow location access!');
      return;
    }

    const orderDetails = {
      items: cart,
      total,
      paymentMethod,
      user: userDetails,
      fromNumber: userDetails.whatsappNumber,
      date: new Date().toISOString(),
    };

    const message = `
Order Details:
Items:
${orderDetails.items.map((item) => `${item.name} x${item.quantity} (₹${item.price * item.quantity}) - Image: ${item.img}`).join('\n')}
Total: ₹${total}
Payment: ${paymentMethod.toUpperCase()}
Customer: ${userDetails.name}
Phone: ${userDetails.phone}
Address: ${userDetails.address}
Location: Lat ${userDetails.location.latitude}, Lon ${userDetails.location.longitude}
From: ${userDetails.whatsappNumber}
Note: Please attach product images after sending this message.
`.trim();

    const yourNumber = '919301680755'; // Your WhatsApp number
    const whatsappUrl = `https://wa.me/${yourNumber}?text=${encodeURIComponent(message)}`;

    try {
      if (paymentMethod === 'prepaid') {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error('Failed to load Razorpay SDK');
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: total * 100,
          currency: 'INR',
          name: 'Rural Dung Cakes',
          description: 'Order Payment',
          handler: async (response) => {
            await toast.promise(
              new Promise((resolve) => {
                window.open(whatsappUrl, '_blank');
                setTimeout(resolve, 1000);
              }),
              {
                pending: 'Opening WhatsApp...',
                success: `Order submitted! Total: ₹${total} via ${paymentMethod.toUpperCase()} (Payment ID: ${response.razorpay_payment_id})`,
                error: 'Failed to open WhatsApp',
              }
            );
            clearCart();
            onClose();
          },
          prefill: {
            name: userDetails.name,
            contact: userDetails.phone,
          },
          notes: {
            address: userDetails.address,
            whatsappNumber: userDetails.whatsappNumber,
            latitude: userDetails.location.latitude,
            longitude: userDetails.location.longitude,
          },
          theme: {
            color: '#ff4500',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else if (paymentMethod === 'cod' && total < 400) {
        await toast.promise(
          new Promise((resolve) => {
            window.open(whatsappUrl, '_blank');
            setTimeout(resolve, 1000);
          }),
          {
            pending: 'Opening WhatsApp...',
            success: `Order submitted! Total: ₹${total} via ${paymentMethod.toUpperCase()}`,
            error: 'Failed to open WhatsApp',
          }
        );
        clearCart();
        onClose();
      } else {
        toast.error('Orders of ₹400 or more must use Prepaid payment.');
      }
    } catch (error) {
      console.error('Error processing order:', error.message, error.stack);
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Your Cart is Empty</h2>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Checkout</h2>
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.img} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Category: {item.category === 'holy' ? 'Holy Festival' : 'Regular'}</p>
                <p>Quantity: {item.quantity} Cow Dungs</p>
                <p>Price: ₹{item.price}/piece</p>
                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= item.minQuantity}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="total">Order Total: ₹{total}</p>

        <div className="delivery-details">
          <h3>Delivery Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userDetails.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="whatsappNumber"
            placeholder="Your WhatsApp Number (e.g., 919876543210)"
            value={userDetails.whatsappNumber}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={userDetails.address}
            onChange={handleInputChange}
            required
          />
          <p>Location: {userDetails.location ? `Lat: ${userDetails.location.latitude}, Lon: ${userDetails.location.longitude}` : 'Fetching...'}</p>
        </div>

        <div className="payment-options">
          <h3>Payment Method</h3>
          {total < 400 ? (
            <>
              <label>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery (Available for orders below ₹400)
              </label>
              <label>
                <input
                  type="radio"
                  value="prepaid"
                  checked={paymentMethod === 'prepaid'}
                  onChange={() => setPaymentMethod('prepaid')}
                />
                Prepaid (Online Payment)
              </label>
            </>
          ) : (
            <label>
              <input
                type="radio"
                value="prepaid"
                checked={paymentMethod === 'prepaid'}
                disabled
              />
              Prepaid (Required for orders ₹400 or more)
            </label>
          )}
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CheckoutModal;