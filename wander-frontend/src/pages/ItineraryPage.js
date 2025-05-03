import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ItineraryPage = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary;
  const navigate = useNavigate();

  if (!itinerary) {
    return (
      <div>
        <p>No itinerary data found. Please generate a trip first.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const getDateForDay = (startDate, offset) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + offset);
    return date.toDateString();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🗺️ Itinerary for {itinerary.people} {itinerary.people > 1 ? 'people' : 'person'}</h2>
      <p>Total Days: {itinerary.totalDays}</p>
      <p>Total Budget: Rs {itinerary.budget}</p>
      <hr />
      {itinerary.plan.map((dayPlan) => (
        <div
          key={dayPlan.day}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h3>Day {dayPlan.day} - {getDateForDay(itinerary.plan[0].date || new Date(), dayPlan.day - 1)}</h3>
          <p><strong>Activities:</strong> {dayPlan.activities.join(', ')}</p>
          <p><strong>Meals:</strong> {dayPlan.meals.join(', ')}</p>
          <p><strong>Daily Budget:</strong> Rs {dayPlan.budget}</p>
          <p><strong>Notes:</strong> {dayPlan.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default ItineraryPage;