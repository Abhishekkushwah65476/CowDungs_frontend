import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { toast } from 'react-toastify';
import '../styles/ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields!');
      return;
    }

    // Simulate sending contact form (replace with actual backend call if needed)
    try {
      toast.promise(
        new Promise((resolve) => setTimeout(() => resolve(), 1000)), // Mock delay
        {
          pending: 'Sending message...',
          success: 'Message sent successfully!',
          error: 'Failed to send message',
        }
      );
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error sending contact form:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="contact-us-page">
        <section className="contact-us">
          <h2>Contact Us</h2>
          <p>Have questions? Get in touch with us!</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
          <div className="contact-info">
            <p>Email: info@ruraldungcakes.com</p>
            <p>Phone: +91 93016 80755</p>
            <p>Address: 123 Village Road, Rural India</p>
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default ContactUs;