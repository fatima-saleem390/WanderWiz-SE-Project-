import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TourCard.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

const TourCard = ({ tour }) => {
 
  const token = localStorage.getItem('token');
  const [isBookmarked, setIsBookmarked] = useState(false); // To track bookmark state
  const imageSrc = tour.image;

  const handleBookmark = async () => {
    if (!token) {
      alert('Please login to bookmark cities.');
      return;
    }
  
    if (!tour.title) {
      alert('City title is required!');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/bookmark',
        { cityTitle: tour.title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        setIsBookmarked(true);
        alert('City bookmarked!');
      } else {
        if (response.data.message === 'City already bookmarked') {
          alert('This city is already in your bookmarks.');
        } else {
          alert('Failed to bookmark the city.');
        }
      }
    } catch (error) {
      console.error('Error bookmarking city:', error.response?.data || error.message);
      alert('City already bookmarked.');
    }
  };
  
  
  
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
      <button className="bookmark-btn" onClick={handleBookmark}>
        <FontAwesomeIcon icon={isBookmarked ? faBookmarkSolid : faBookmark} />
      </button>
      <img src={imageSrc} alt={tour.title} />
      <h3>
        <Link to={`/tour-details/${tour.id}`} className="city-link">
          {tour.title}
        </Link>
      </h3>
      <div className="rating-review">
        <div className="rating">{renderStars(tour.rating)}</div>
        <div className="review-count">({tour.reviews})</div>
      </div>
    </div>
  );
};

export default TourCard;
