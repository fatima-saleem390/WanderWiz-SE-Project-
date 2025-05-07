const express = require('express');
const router = express.Router();

const {
  Accommodation,
  HistoricalPlace,
  OutdoorActivity,
  TransportOption,
  Restaurant
} = require('../models/ItineraryDataModels');

// Helper to shuffle an array
//function shuffle(arr) {
//  return arr.sort(() => Math.random() - 0.5);
//}


// Main itinerary generator
async function generateItineraryFromDB(input) {
  const {
    dateRange, budget, interests, pace, transport, accommodation, notes, people
  } = input;

  const cleanedInput = {
    ...input,
    transport: transport.trim(),
    accommodation: accommodation.trim(),
    pace: pace.trim(),
    interests: interests.map(i => i.trim().toLowerCase())
  };

  const start = new Date(dateRange.startDate);
  const end = new Date(dateRange.endDate);
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  const maxBudget = Array.isArray(budget) ? budget[1] : budget;
  const perPersonPerDayBudget = maxBudget / (people * totalDays);

  const transportPct = cleanedInput.transport !== 'Walk Only' ? 0.2 : 0;
  const accommodationPct = cleanedInput.accommodation !== 'None' ? 0.3 : 0;
  const interestsPct = 1 - (transportPct + accommodationPct);

  const transportBudget = transportPct * perPersonPerDayBudget;
  const accommodationBudget = accommodationPct * perPersonPerDayBudget;
  const interestBudget = interestsPct * perPersonPerDayBudget;

  // Fetch and shuffle all restaurants at once
  const allRestaurants = shuffle(await Restaurant.find({
    averageCost: { $lte: interestBudget / 3 }
  }));

  const usedRestaurantIds = new Set(); // Track used restaurants
  const dailyPlan = [];

  for (let day = 1; day <= totalDays; day++) {
    const dayPlan = { day, activities: [], meals: [] };
    let budget = 0;
  
    // TRANSPORT
    if (cleanedInput.transport !== 'Walk Only') {
      const transportData = await TransportOption.findOne({ type: cleanedInput.transport });
      if (transportData && transportData.options.length > 0) {
        const bestOption = transportData.options.find(opt => opt.pricePerRide <= transportBudget);
        if (bestOption) {
          dayPlan.activities.push({
            type: 'transport',
            name: bestOption.name,
            pricePerRide: bestOption.pricePerRide
          });
          budget += bestOption.pricePerRide;
        }
      }
    }
  
    // ACCOMMODATION
    if (cleanedInput.accommodation !== 'None') {
      const stay = await Accommodation.findOne({
        type: cleanedInput.accommodation,
        pricePerNight: { $lte: accommodationBudget }
      });
      if (stay) {
        dayPlan.activities.push({
          type: 'accommodation',
          name: stay.name,
          pricePerNight: stay.pricePerNight
        });
        budget += stay.pricePerNight;
      }
    }
  
    // INTERESTS
    const maxActivities = pace === 'Fast-Paced' ? 4 : pace === 'Balanced' ? 3 : 2;
    let count = 0;
  
    for (let interest of cleanedInput.interests) {
      if (count >= maxActivities) break;
  
      switch (interest) {
        case 'culture': {
          const places = await HistoricalPlace.find({
            genres: { $in: ['Culture'] },
            tourGuideFee: { $lte: interestBudget / maxActivities }
          });
          if (places.length > 0) {
            const place = places[Math.floor(Math.random() * places.length)];
            dayPlan.activities.push({
              type: 'historical place',
              name: place.name,
              entryFee: place.tourGuideFee,
              guideFee: place.tourGuideFee ? `(Optional guide: $${place.tourGuideFee})` : undefined
            });
            budget += place.tourGuideFee;
            count++;
          }
          break;
        }
  
        case 'adventure':
        case 'nature':
        case 'festivals':
        case 'shopping':
        case 'relaxation':
        case 'insta spots': {
          const activities = await OutdoorActivity.find({
            genres: { $in: [interest] },
            price: { $lte: interestBudget / maxActivities }
          });
          if (activities.length > 0) {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            dayPlan.activities.push({
              type: 'outdoor activity',
              name: activity.name,
              fee: activity.price
            });
            budget += activity.price;
            count++;
          }
          break;
        }
      }
    }
  
    // MEALS
    let mealsAdded = 0;
    for (let i = 0; i < allRestaurants.length && mealsAdded < 3; i++) {
      const rest = allRestaurants[i];
      if (!usedRestaurantIds.has(rest._id.toString())) {
        usedRestaurantIds.add(rest._id.toString());
        dayPlan.meals.push({
          name: rest.name,
          genre: rest.genres.join(', '),
          averageCost: rest.averageCost
        });
        budget += rest.averageCost;
        mealsAdded++;
      }
    }
  
    // Assign total day budget
    // Before pushing to dailyPlan
    dayPlan.budget = perPersonPerDayBudget.toFixed(2);
    dailyPlan.push(dayPlan);

  }
  

  return dailyPlan;
}

// Helper to shuffle an array
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}


// POST route to generate itinerary
router.post('/plan-trip', async (req, res) => {
  try {
    console.log("Request body received at /plan-trip:", req.body);

    const itinerary = await generateItineraryFromDB(req.body);

    const response = {
      people: req.body.people,
      budget: req.body.budget,
      startDate: req.body.dateRange.startDate,
      endDate: req.body.dateRange.endDate,
      plan: itinerary
    };

    console.log("Final itinerary response:", {
      ...response,
      plan: response.plan.map(dayPlan => ({
        ...dayPlan,
        activities: dayPlan.activities
      }))
    });

    res.json(response);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ message: 'Failed to generate itinerary' });
  }
});

module.exports = router;
