import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/tour-details/${id}/${category}`);
  };

  return (
    <div className="tour-details">
      <h1>{id}</h1>
      <div className="card-container">
        <div className="card" onClick={() => handleNavigate('historical-places')}>
          <img src="/historical.jpg" alt="Historical Places" />
          <h3>Historical Places</h3>
        </div>
        <div className="card" onClick={() => handleNavigate('restaurants')}>
          <img src="/restaurant.jpg" alt="Restaurants" />
          <h3>Restaurants</h3>
        </div>
        <div className="card" onClick={() => handleNavigate('hotels')}>
          <img src="/hotel.jpg" alt="Hotels" />
          <h3>Hotels</h3>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
