import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

const Hotels = () => {
  const { id } = useParams();
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tours/${id}`)
      .then(response => {
        setHotels(response.data.hotels);
        setCity(response.data.title);
      })
      .catch(error => console.error('Error fetching hotels:', error));
  }, [id]);

  // Function to render the stars for the rating
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
    <div className="category-container">
      <h2>Hotels in {city}</h2>
      <div className="category-grid">
        {hotels.length === 0 ? (
          <p>No hotels found.</p>
        ) : (
          hotels.map((hotel, index) => {
            const { name, image, location, rating } = hotel;

            return (
              <Link
                key={index}
                to={`/tour-details/${id}/hotels/${encodeURIComponent(name)}`}
                className="category-card"
              >
                <div className="category-card-image">
                  <img src={image} alt={name} />
                </div>
                <div className="category-card-content">
                  <h3>{name}</h3>
                  <div className="rating">
                    {renderStars(rating)}
                  </div>
                  <p>📍{location}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Hotels;
