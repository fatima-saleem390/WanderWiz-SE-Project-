import React from 'react';
import './InfoCard.css';

const InfoCard = ({ name, city }) => {
  return (
    <div className="info-card">
      <h3>{name}</h3>
      <p>{city}</p>
    </div>
  );
};

export default InfoCard;
