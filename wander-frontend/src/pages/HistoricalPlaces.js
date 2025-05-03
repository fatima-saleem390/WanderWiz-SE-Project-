import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

const HistoricalPlaces = () => {
  const { id } = useParams();
  const [places, setPlaces] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tours/${id}`)
      .then(response => {
        setPlaces(response.data.historicalPlaces);
        setCity(response.data.title);
      })
      .catch(error => console.error('Error fetching historical places:', error));
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
      <h2>Historical Places in {city}</h2>
      <div className="category-grid">
        {places.length === 0 ? (
          <p>No historical places found.</p>
        ) : (
          places.map((place, index) => {
            const { name, image, location, rating } = place;  // Destructure place fields

            return (
              <Link
                key={index}
                to={`/tour-details/${id}/historical-places/${encodeURIComponent(name)}`}
                className="category-card"
              >
                <div className="category-card-image">
                  <img src={image} alt={name} />
                </div>
                <div className="category-card-content">
                  <h3>{name}</h3>
                  <p>{location}</p>
                  <div className="rating">
                    {renderStars(rating)} {/* Display stars */}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HistoricalPlaces;
