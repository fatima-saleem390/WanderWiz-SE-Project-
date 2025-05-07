import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ItineraryPage = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary || JSON.parse(localStorage.getItem('itinerary'));
  const navigate = useNavigate();

  if (!itinerary) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
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

  const renderPlace = (place) => {
    if (typeof place === 'string') return place;
    const price = place.price || place.pricePerRide || place.pricePerNight || place.averageCost || place.tourGuideFee || place.fee || 'N/A';
    return `${place.name} (${place.type}) – Rs ${price}`;
  };

  // Adjust the way you handle itinerary's startDate and endDate
  const startDate = itinerary.startDate || new Date();
  const endDate = itinerary.endDate;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Trip Plan for {itinerary.people} {itinerary.people > 1 ? 'people' : 'person'}</h2>
      <p><strong>Total Days:</strong> {itinerary.plan && Array.isArray(itinerary.plan) ? itinerary.plan.length : 0}</p>
      <p><strong>Total Budget:</strong> Rs {itinerary.budget[1]}</p>
      <hr style={{ margin: '20px 0' }} />

      {itinerary.plan && Array.isArray(itinerary.plan) && itinerary.plan.length > 0 ? (
        itinerary.plan.map((dayPlan) => {
          // Ensure activities exist before trying to map them
          const activities = Array.isArray(dayPlan.activities) ? dayPlan.activities : [];
          const meals = Array.isArray(dayPlan.restaurants) ? dayPlan.restaurants : [];
          const transport = Array.isArray(dayPlan.transport) ? dayPlan.transport : [];

          return (
            <div
              key={dayPlan.day}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ marginBottom: '10px' }}>
                Day {dayPlan.day} – {getDateForDay(startDate, dayPlan.day - 1)}
              </h3>

              <div style={{ marginBottom: '8px' }}>
                <strong>Activities:</strong>
                <ul>
                  {activities.length > 0 ? (
                    activities.map((activity, idx) => (
                      <li key={idx}>{renderPlace(activity)}</li>
                    ))
                  ) : (
                    <li>No activities planned.</li>
                  )}
                </ul>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <strong>Meals:</strong>
                <ul>
                  {meals.length > 0 ? (
                    meals.map((meal, idx) => (
                      <li key={idx}>{renderPlace(meal)}</li>
                    ))
                  ) : (
                    <li>No meals planned.</li>
                  )}
                </ul>
              </div>

              {transport.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <strong>Transport:</strong>
                  <ul>
                    {transport.map((t, idx) => (
                      <li key={idx}>{renderPlace(t)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {dayPlan.accommodation && (
                <div style={{ marginBottom: '8px' }}>
                  <strong>Stay:</strong>
                  <p>{renderPlace(dayPlan.accommodation)}</p>
                </div>
              )}

              <p><strong>Daily Budget:</strong> Rs {dayPlan.budget}</p>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p>No detailed plan available for this itinerary.</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryPage;
