import React from 'react'
import { useRef, useState } from 'react';


const Carousel = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef(null);

  // Scroll carousel function
  const handlePrevCarousel = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const handleNextCarousel = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  // Modal navigation function
  const handlePrevModal = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextModal = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="rouselContainer">
        <button
          onClick={handlePrevCarousel}
          className="left_btn"
        >
          &lt;
        </button>
        <div
          className="hideScrollbar main_rouselContainer"
          ref={scrollRef}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <button
          onClick={handleNextCarousel}
          className="right_btn"
        >
          &gt;
        </button>
      </div>

    </div>
  );
};

export default Carousel;
