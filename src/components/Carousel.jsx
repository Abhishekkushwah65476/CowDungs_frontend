import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      img: '/images/istockphoto-1381547560-612x612.jpg',
      alt: 'Rural Village',
      title: 'Traditional Fuel',
      text: 'Eco-friendly energy delivered in 4 hours',
    },
    {
      img: '/images/istockphoto-2098848387-612x612.jpg',
      alt: 'Dung Cakes',
      title: 'Sustainable Living',
      text: 'Order now, delivered to your door in 4 hours',
    },
    {
      img: '/images/istockphoto-2176629259-612x612.jpg',
      alt: 'Village Life',
      title: 'Village Heritage',
      text: 'Fast, eco-friendly fuel at your doorstep',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="carousel">
      <div
        className="carousel-container"
        style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.img} alt={slide.alt} />
            <div className="carousel-caption">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
              <a href="/products" className="shop-now-btn">Shop Now</a>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-prev" onClick={handlePrev}>❮</button>
      <button className="carousel-next" onClick={handleNext}>❯</button>
    </section>
  );
}

export default Carousel;