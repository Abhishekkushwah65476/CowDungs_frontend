import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <>
      <Header />
      <main className="about-us-page">
        <section className="about-us">
          <h2>About Rural Dung Cakes</h2>
          <p>
            At Rural Dung Cakes, we are committed to providing eco-friendly fuel solutions rooted in traditional Indian practices. Our cow dung cakes are handcrafted by rural artisans, ensuring sustainability and supporting local livelihoods. We believe in preserving village heritage while delivering affordable, efficient, and environmentally conscious products to your doorstep within 4 hours.
          </p>
          <div className="mission-vision">
            <div className="mission">
              <h3>Our Mission</h3>
              <p>To promote sustainable living through natural fuel alternatives and empower rural communities.</p>
            </div>
            <div className="vision">
              <h3>Our Vision</h3>
              <p>To bridge tradition and modernity by making eco-friendly fuel accessible to all.</p>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default AboutUs;