const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models from `itinerarydata` database
const db = mongoose.connection.useDb('itinerarydata');

const Accommodation = db.model('Accommodation', new mongoose.Schema({
  name: String,
  type: String,
  pricePerNight: Number,
}), 'accommodations');

const Transport = db.model('Transport', new mongoose.Schema({
  type: String,
  pricePerDay: Number,
}), 'transport_options');

const HistoricalPlace = db.model('HistoricalPlace', new mongoose.Schema({
  name: String,
  description: String,
  tourGuideFee: Number,
}), 'historical_places');

const OutdoorActivity = db.model('OutdoorActivity', new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
}), 'outdoor_activities');

router.post('/plan-trip', async (req, res) => {
  const {
    dateRange,
    budget,
    interests,
    pace,
    transport,
    accommodation,
    notes,
    people
  } = req.body;

  const totalDays = Math.ceil(
    (new Date(dateRange.endDate) - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24)
  ) + 1;

  const totalBudget = budget[1] - budget[0];
  const budgetPerDay = Math.floor(totalBudget / totalDays);

  try {
    const selectedAccommodations = await Accommodation.find({ type: { $in: accommodation } });
    const selectedTransports = await Transport.find({ type: { $in: transport } });
    const selectedActivities = await OutdoorActivity.find({ type: { $in: interests } });
    const selectedHistorical = await HistoricalPlace.find({});

    const plan = [];

    for (let day = 1; day <= totalDays; day++) {
      const dayPlan = {
        day,
        activities: [],
        meals: [],
        transport: [],
        budget: budgetPerDay,
        notes: `Plan based on ${pace} pace and interests: ${interests.join(', ')}`,
      };

      if (day % 2 === 0 && selectedActivities.length) {
        const activity = selectedActivities[Math.floor(Math.random() * selectedActivities.length)];
        dayPlan.activities.push(`Outdoor: ${activity.name}`);
      } else if (selectedHistorical.length) {
        const place = selectedHistorical[Math.floor(Math.random() * selectedHistorical.length)];
        dayPlan.activities.push(`Visit: ${place.name}`);
      }

      if (selectedAccommodations.length) {
        const stay = selectedAccommodations[Math.floor(Math.random() * selectedAccommodations.length)];
        dayPlan.meals.push(`${stay.type} - ${stay.name}`);
      }

      if (selectedTransports.length) {
        const ride = selectedTransports[Math.floor(Math.random() * selectedTransports.length)];
        dayPlan.transport.push(`${ride.type}`);
      }

      plan.push(dayPlan);
    }

    res.json({
      totalDays,
      budget: totalBudget,
      people,
      plan,
    });
  } catch (err) {
    console.error("❌ Error generating plan:", err);
    res.status(500).json({ error: "Failed to generate plan." });
  }
});

module.exports = router;
