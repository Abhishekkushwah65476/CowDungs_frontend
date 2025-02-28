import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Intro from '../components/Intro';
import FeaturedProducts from '../components/FeaturedProducts';
import CallToAction from '../components/CallToAction';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="festive-banner">
          <h1>Festival Of Color's Special Offer!</h1>
          <p>Holy Dung Cakes at ₹3-5/piece - Regular Prices from ₹8-10/piece!</p>
        </section>
        <Carousel />
        <section className="pricing-info">
          <h2>Our Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-item">
              <h3>Regular Non-Bulk</h3>
              <p>In this Category! You can Order minimum 20 pieces and maximum 200 pieces: ₹10/piece</p>
            </div>
            <div className="pricing-item">
              <h3>Regular Bulk</h3>
              <p>In this Category! You Can Order Minimum 200 pieces and Maximum 1000 pieces: ₹8/piece</p>
            </div>
            <div className="pricing-item festive">
              <h3>Holy Festival Non-Bulk</h3>
              <p>Minimum 10 and Maximum 200 pieces: ₹5/piece</p>
            </div>
            <div className="pricing-item festive">
              <h3>Holy Festival Bulk</h3>
              <p>Minimum 200 pieces and Maximum 10000 pieces: ₹3/piece</p>
            </div>
          </div>
        </section>
        <Intro />
        <FeaturedProducts />
        <CallToAction />
        <WhatsAppButton />
      </main>
      <Footer />
    </>
  );
}

export default Home;