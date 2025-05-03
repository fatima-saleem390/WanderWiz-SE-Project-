import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TourDetails.css';

import historicalPlaceImg from '../assets/historical-place.jpg';
import restaurantImg from '../assets/restaurant.jpg';
import hotelImg from '../assets/hotel.jpg';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);

  const images = {
    'historical-places': historicalPlaceImg,
    'restaurants': restaurantImg,
    'hotels': hotelImg,
  };

  useEffect(() => {
    // Fetch city data by ID from the backend
    const fetchCity = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tours/${id}`);
        const data = await response.json();
        setCity(data);  // Store the city data in state
      } catch (error) {
        console.error('Error fetching city details:', error);
      }
    };

    fetchCity();
  }, [id]);

  const handleNavigate = (type) => {
    navigate(`/tour-details/${id}/${type}`);
  };

  return (
    <div className="tour-details-container">
      {/* Display loading text until city data is fetched */}
      {city ? (
        <>
          {/* City Name and Image */}
          <div className="city-header">
            <h1>{city.title}</h1>
          </div>

          {/* Option Cards */}
          <div className="option-cards">
            <div className="option-card" onClick={() => handleNavigate('historical-places')}>
              <img
                src={images['historical-places']}
                alt="Historical Places"
                className="card-image"
              />
              <h3>Historical Places</h3>
            </div>
            <div className="option-card" onClick={() => handleNavigate('restaurants')}>
              <img
                src={images['restaurants']}
                alt="Restaurants"
                className="card-image"
              />
              <h3>Restaurants</h3>
            </div>
          </div>

          <div className="option-cards" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <div className="option-card" onClick={() => handleNavigate('hotels')}>
              <img
                src={images['hotels']}
                alt="Hotels"
                className="card-image"
              />
              <h3>Hotels</h3>
            </div>
          </div>
        </>
      ) : (
        <p>Loading city details...</p>
      )}
    </div>
  );
};

export default TourDetails;
