import React from 'react';
import '../styles/CallToAction.css';

function CallToAction() {
  return (
    <section className="cta">
      <h2>Start Your Sustainable Journey</h2>
      <p>Get your eco-friendly fuel delivered in 4 hours</p>
      <a href="/products" className="cta-button">Shop Now</a>
    </section>
  );
}

export default CallToAction;