// src/pages/Restaurants.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

const Restaurants = () => {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tours/${id}`)
      .then(response => {
        setRestaurants(response.data.restaurants);
        setCity(response.data.title);
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, [id]);

  return (
    <div className="category-container">
      <h2>Restaurants in {city}</h2>
      <div className="category-grid">
        {restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          restaurants.map((restaurant, index) => {
            const name = typeof restaurant === 'string' ? restaurant : restaurant.name;
            return (
              <Link
                key={index}
                to={`/tour-details/${id}/restaurants/${encodeURIComponent(name)}`}
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

export default Restaurants;
