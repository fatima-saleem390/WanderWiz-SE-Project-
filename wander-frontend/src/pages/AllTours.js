import React, { useEffect, useState } from 'react';
import TourCard from '../components/TourCard';
import bannerImg from '../assets/Banner.jpg';
import './AllTours.css';
import axios from 'axios';

const AllTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tours')
      .then(response => setTours(response.data))
      .catch(error => console.error('Error fetching tours:', error));
  }, []);

  return (
    <div className="all-tours-page">
      <div className="banner-container">
        <img src={bannerImg} alt="Banner" className="banner" />
        <div className="banner-text">
          <h1>All Tours</h1>
        </div>
      </div>

      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        Explore Tourist Attractions
      </h2>

      <div className="tour-grid">
        {tours.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default AllTours;
