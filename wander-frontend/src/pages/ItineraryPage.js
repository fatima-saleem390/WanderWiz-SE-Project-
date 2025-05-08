import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ItineraryPage.css';

const ItineraryPage = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary || JSON.parse(localStorage.getItem('itinerary'));
  const navigate = useNavigate();

  if (!itinerary) {
    return (
      <div className="centered-message">
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
    const type = place.type || (place.genres?.join(', ') || 'undefined');
    return `${place.name} (${type}) – Rs ${price}`;
  };

  const startDate = itinerary.startDate || new Date();

  return (
    <div className="itinerary-container">
      <h2>Trip Plan for {itinerary.people} {itinerary.people > 1 ? 'people' : 'person'}</h2>
      <div className="trip-summary">
        <p><strong>Total Days:</strong> {itinerary.plan?.length || 0}</p>
        <p><strong>Total Budget:</strong> Rs {itinerary.budget[1]}</p>
      </div>
      <hr />

      {Array.isArray(itinerary.plan) && itinerary.plan.length > 0 ? (
        itinerary.plan.map((dayPlan) => {
          const activities = Array.isArray(dayPlan.activities) ? dayPlan.activities : [];
          const meals = Array.isArray(dayPlan.meals) ? dayPlan.meals : [];
          const transport = Array.isArray(dayPlan.transport) ? dayPlan.transport : [];

          return (
            <div className="day-card" key={dayPlan.day}>
              <h3 className="day-header">
                Day {dayPlan.day} – {getDateForDay(startDate, dayPlan.day - 1)}
              </h3>

              <table className="details-table">
                <tbody>
                  <tr>
                    <td>Activities:</td>
                    <td>
                      {activities.length > 0 ? (
                        <ul className="inline-list">
                          {activities.map((a, i) => <li key={i}>{renderPlace(a)}</li>)}
                        </ul>
                      ) : 'No activities planned.'}
                    </td>
                  </tr>
                  <tr>
                    <td>Meals:</td>
                    <td>
                      {meals.length > 0 ? (
                        <ul className="inline-list">
                          {meals.map((m, i) => <li key={i}>{renderPlace(m)}</li>)}
                        </ul>
                      ) : 'No meals planned.'}
                    </td>
                  </tr>
                  {transport.length > 0 && (
                    <tr>
                      <td>Transport:</td>
                      <td>
                        <ul className="inline-list">
                          {transport.map((t, i) => <li key={i}>{renderPlace(t)}</li>)}
                        </ul>
                      </td>
                    </tr>
                  )}
                  {dayPlan.accommodation && (
                    <tr>
                      <td>Stay:</td>
                      <td>{renderPlace(dayPlan.accommodation)}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Daily Budget:</td>
                    <td>Rs {dayPlan.budget}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <div className="centered-message">
          <p>No detailed plan available for this itinerary.</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryPage;
