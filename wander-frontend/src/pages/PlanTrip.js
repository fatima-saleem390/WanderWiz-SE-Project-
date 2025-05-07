// src/pages/PlanTrip.js
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'rc-slider/assets/index.css';
import bannerImg from '../assets/Plan_Trip_Image.jpg';
import './PlanTrip.css'; 

const PlanTrip = () => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: 'selection' }
  ]);
  const [people, setPeople] = useState(1);
  const [budget, setBudget] = useState([0, 50000]);
  const [interests, setInterests] = useState([]);
  const [pace, setPace] = useState('');
  const [transport, setTransport] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [notes, setNotes] = useState('');

  const navigate = useNavigate();

  const handleCheckbox = (e) => {
    const value = e.target.value;
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    // Remove emojis from the interests array
    const cleanedInterests = interests.map((interest) => interest.replace(/[^\w\s]/gi, ''));
  
    // Remove emojis from the selected pace, transport, and accommodation options
    const cleanedPace = pace.replace(/[^\w\s]/gi, '');
    const cleanedTransport = transport.replace(/[^\w\s]/gi, '');
    const cleanedAccommodation = accommodation.replace(/[^\w\s]/gi, '');
  
    const formData = {
      dateRange: dateRange[0],
      budget,
      interests: cleanedInterests, // Use the cleaned interests
      pace: cleanedPace, // Use the cleaned pace
      transport: cleanedTransport, // Use the cleaned transport
      accommodation: cleanedAccommodation, // Use the cleaned accommodation
      notes,
      people,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('Generated Itinerary:', data);
  
      localStorage.setItem('itinerary', JSON.stringify(data));
      navigate('/itinerary');

    } catch (error) {
      console.error('Error generating trip:', error);
      alert('Failed to generate trip. Please try again.');
    }
  };
  
  
  

  return (
    <div className="plan-trip-container">
      {/* Banner Section with text overlay */}
      <div className="banner-container">
        <img
          src={bannerImg}
          alt="Banner"
          className="banner"
        />
        <div className="banner-text">
          <h1>Plan Your Dream Trip</h1>
        </div>
      </div>

      <div className="grid">
        {/* Date Picker */}
        <div className="section">
          <h3>📅 How long will be your stay?</h3>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </div>

        {/* Budget Slider */}
        <div className="section">
          <h3>💰 What is your budget?</h3>
          <Slider
            range
            min={0}
            max={100000}
            defaultValue={budget}
            onChange={setBudget}
          />
          <div className="budget-labels">
            <span>Rs {budget[0]}</span>
            <span>Rs {budget[1]}</span>
          </div>
        </div>

        {/* Interests */}
        <div className="section">
          <h3>✨ What excites you the most?</h3>
          <div className="options-grid">
            {[' Festivals 🎊', ' Culture 🏛️', ' Nature 🌿', ' Adventure 🌋', ' Shopping 🛍️', ' Food 🍕', ' Relaxation 🏖️', ' Insta Spots 📸'].map((item) => (
              <label key={item} className="checkbox">
                <input type="checkbox" value={item} onChange={handleCheckbox} />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Travel Pace */}
        <div className="section">
          <h3>🏃 Travel pace?</h3>
          <div className="options-grid">
            {[' Relaxed🐌', ' Balanced🧭', ' Fast-Paced🚀'].map((item) => (
              <label key={item} className="radio">
                <input type="radio" name="pace" value={item} onChange={(e) => setPace(e.target.value)} />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Transport */}
        <div className="section">
          <h3>🚗 Preferred Transport?</h3>
          <div className="options-grid">
            {[' Public Transport 🚌', ' Ride-Hailing 🚖', ' Rental Car 🚗', ' Walk Only 👟'].map((item) => (
              <label key={item} className="radio">
                <input type="radio" name="transport" value={item} onChange={(e) => setTransport(e.target.value)} />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Accommodation */}
        <div className="section">
          <h3>🏨 Preferred Accommodation?</h3>
          <div className="options-grid">
            {[' Hostel 🛏️', ' Hotel 🛎️', ' Guest House 🏠', ' Airbnb 🏡', ' Resort 🍹', ' Unique Stays ⛺', 'None ❎'].map((item) => (
              <label key={item} className="radio">
                <input type="radio" name="accommodation" value={item} onChange={(e) => setAccommodation(e.target.value)} />
                {item}
              </label>
            ))}
          </div>
        </div>
        
        {/* Number of People */}
        <div className="section">
          <h3>👥 How many people are going?</h3>
          <div className="number-stepper">
            <button onClick={() => setPeople((prev) => Math.max(1, prev - 1))}>−</button>
            <input
              type="number"
              value={people}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= 20) {
                  setPeople(val);
                }
              }}
              min="1"
              max="20"
            />
            <button onClick={() => setPeople((prev) => Math.min(20, prev + 1))}>+</button>
          </div>
        </div>

        {/* Notes */}
        <div className="section">
          <h3>📝 Anything Missed?</h3>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Write anything here..." />
        </div>
      </div>

      <button className="generate-button" onClick={handleSubmit}>
        Generate Plan
      </button>
    </div>
  );
};

export default PlanTrip;
