import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import historicalImg from '../assets/historical.jpg';
import restaurantImg from '../assets/restaurant.jpg';
import hotelImg from '../assets/hotel.jpg';
import './TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    const fetchCityName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/city/${id}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        setCityName(data.cityName);
      } catch (error) {
        console.error('Error fetching city name:', error.message);
        setCityName('City Not Found');
      }
    };

    fetchCityName();
  }, [id]);

  const handleNavigate = (category) => {
    navigate(`/tour-details/${id}/${category}`);
  };

  return (
    <div className="tour-details">
      <h1>{cityName}</h1>
      <div className="card-grid">
        <div className="card" onClick={() => handleNavigate('historical-places')}>
          <img src={historicalImg} alt="Historical Places" />
          <h3>Historical Places</h3>
        </div>
        <div className="card" onClick={() => handleNavigate('restaurants')}>
          <img src={restaurantImg} alt="Restaurants" />
          <h3>Restaurants</h3>
        </div>
        <div className="card full-width" onClick={() => handleNavigate('hotels')}>
          <img src={hotelImg} alt="Hotels" />
          <h3>Hotels</h3>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
