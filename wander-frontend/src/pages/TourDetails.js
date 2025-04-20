import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import historicalImg from '../assets/historical.jpg';
import restaurantImg from '../assets/restaurant.jpg';
import hotelImg from '../assets/hotel.jpg';
import './TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cityTitle, setCityTitle] = useState('');

  useEffect(() => {
    const fetchCityTitle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/city/${id}`);
        const data = await res.json();
        setCityTitle(data.title);
      } catch (err) {
        console.error('Failed to load city:', err);
        setCityTitle('City Not Found');
      }
    };

    fetchCityTitle();
  }, [id]);

  const handleNavigate = (category) => {
    navigate(`/tour-details/${id}/${category}`);
  };

  return (
    <div className="tour-details">
      <h1>{cityTitle}</h1>
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
