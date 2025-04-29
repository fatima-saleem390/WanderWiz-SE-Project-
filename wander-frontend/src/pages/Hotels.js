// src/pages/Hotels.js
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

  return (
    <div className="category-container">
      <h2>Hotels in {city}</h2>
      <div className="category-grid">
        {hotels.length === 0 ? (
          <p>No hotels found.</p>
        ) : (
          hotels.map((hotel, index) => {
            const name = typeof hotel === 'string' ? hotel : hotel.name;
            return (
              <Link
                key={index}
                to={`/tour-details/${id}/hotels/${encodeURIComponent(name)}`}
                className="category-card"
              >
                {name}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Hotels;
