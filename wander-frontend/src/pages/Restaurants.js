// Restaurants.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Restaurants = () => {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // You can fetch restaurant data for the city using the `id` from the API
    // For now, we're using mock data.
    const fetchRestaurants = async () => {
      // Replace this with a real API call to fetch restaurants
      const mockRestaurants = [
        { name: "Karachi Biryani", description: "Best Biryani in Karachi." },
        { name: "Lahore Grill", description: "Popular grill restaurant in Lahore." },
        { name: "Sawat Café", description: "Famous café in Islamabad." },
      ];
      setRestaurants(mockRestaurants);
    };

    fetchRestaurants();
  }, [id]);

  return (
    <div>
      <h1>Restaurants in City {id}</h1>
      <div>
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
