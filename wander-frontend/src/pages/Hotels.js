// Hotels.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Hotels = () => {
  const { id } = useParams();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // You can fetch hotel data for the city using the `id` from the API
    // For now, we're using mock data.
    const fetchHotels = async () => {
      // Replace this with a real API call to fetch hotels
      const mockHotels = [
        { name: "Karachi Hotel", description: "Luxury hotel in Karachi." },
        { name: "Lahore Continental", description: "5-star hotel in Lahore." },
        { name: "Islamabad Suites", description: "Premium hotel in Islamabad." },
      ];
      setHotels(mockHotels);
    };

    fetchHotels();
  }, [id]);

  return (
    <div>
      <h1>Hotels in City {id}</h1>
      <div>
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
