import React from 'react';
import './TourCard.css';

const TourCard = ({ tour }) => {
  let imageSrc;

  try {
    imageSrc = require(`../assets/${tour.image}`);
  } catch (err) {
    // If the specified image is not found, use a fallback image
    try {
      imageSrc = require(`../assets/default.jpg`);
    } catch (fallbackErr) {
      console.error('Default image not found. Please add default.jpg to assets.');
      imageSrc = ''; // Or set to a valid placeholder URL if desired
    }
  }

  return (
    <div className="tour-card">
      <img src={imageSrc} alt={tour.title} />
      <h3>{tour.title}</h3>
      <p>⭐ {tour.rating} / 5</p>
    </div>
  );
};

export default TourCard;
