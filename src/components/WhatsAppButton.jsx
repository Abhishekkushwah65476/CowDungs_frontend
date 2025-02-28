import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Ensure this import exists
import '../styles/WhatsAppButton.css';

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919301680755"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

export default WhatsAppButton;