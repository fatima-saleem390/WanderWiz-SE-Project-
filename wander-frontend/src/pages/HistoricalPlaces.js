// HistoricalPlaces.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HistoricalPlaces = () => {
  const { id } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // You can fetch historical places for the city using the `id` from the API
    // For now, we're using mock data.
    const fetchPlaces = async () => {
      // Replace this with a real API call to fetch historical places
      const mockPlaces = [
        { name: "Badshahi Mosque", description: "A historical mosque in Lahore." },
        { name: "Lahore Fort", description: "A historical fort in Lahore." },
        { name: "Shalimar Gardens", description: "A historical garden in Lahore." },
      ];
      setPlaces(mockPlaces);
    };

    fetchPlaces();
  }, [id]);

  return (
    <div>
      <h1>Historical Places in City {id}</h1>
      <div>
        {places.map((place, index) => (
          <div key={index} className="place-card">
            <h3>{place.name}</h3>
            <p>{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalPlaces;
