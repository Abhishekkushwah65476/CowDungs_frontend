import React from 'react';
import '../styles/WhatsAppButton.css';

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+919301680755?text=Hi, I'd like to order dung cakes!"
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/public/images/download.svg" alt="WhatsApp" />
    </a>
  );
}

export default WhatsAppButton;