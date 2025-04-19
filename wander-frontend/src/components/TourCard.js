import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './TourCard.css';

const TourCard = ({ tour }) => {
  let imageSrc;

  try {
    imageSrc = require(`../assets/${tour.image}`);
  } catch (err) {
    try {
      imageSrc = require(`../assets/default.jpg`);
    } catch (fallbackErr) {
      console.error('Default image not found. Please add default.jpg to assets.');
      imageSrc = '';
    }
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">&#9733;</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">&#9733;</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">&#9734;</span>);
    }

    return stars;
  };

  return (
    <div className="tour-card">
      <img src={imageSrc} alt={tour.title} />
      <h3>
        <Link to={`/tour/${tour.id}`} className="city-link">
          {tour.title} {/* City name wrapped in Link */}
        </Link>
      </h3>
      <div className="rating-review">
        <div className="rating">
          {renderStars(tour.rating)} {/* Just stars */}
        </div>
        <div className="review-count">
          ({tour.reviews}) {/* Only reviews count */}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
