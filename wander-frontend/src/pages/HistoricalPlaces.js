// src/pages/HistoricalPlaces.js
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

  return (
    <div className="category-container">
      <h2>Historical Places in {city}</h2>
      <div className="category-grid">
        {places.length === 0 ? (
          <p>No historical places found.</p>
        ) : (
          places.map((place, index) => {
            const name = typeof place === 'string' ? place : place.name;
            return (
              <Link
                key={index}
                to={`/tour-details/${id}/historical-places/${encodeURIComponent(name)}`}
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

export default HistoricalPlaces;
