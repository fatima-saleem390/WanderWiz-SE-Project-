import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoricalPlaces = ({ cityId }) => {
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/city/${cityId}`);
        setCityData(response.data);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, [cityId]);

  if (!cityData) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cityData.historicalPlaces.map((place, index) => (
        <div key={index} className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <img
            src={`/images/${cityData.image}`}
            alt={place}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{place.split('(')[0].trim()}</h2>
            <p className="text-sm text-gray-600">
              {place.match(/\((.*?)\)/)?.[1] || cityData.location}
            </p>
            <p className="mt-2 text-yellow-500 font-bold">⭐ {cityData.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoricalPlaces;
