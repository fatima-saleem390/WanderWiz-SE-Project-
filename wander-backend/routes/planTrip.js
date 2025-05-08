const express = require('express');
const router = express.Router();

const {
  Accommodation,
  HistoricalPlace,
  OutdoorActivity,
  TransportOption,
  Restaurant
} = require('../models/ItineraryDataModels');

// Shuffle utility
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

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

  const allRestaurants = shuffle(await Restaurant.find({}));
  const usedRestaurantIds = new Set();
  const usedAccommodationIds = new Set();
  const usedActivityIds = new Set();

  const dailyPlan = [];

  for (let day = 1; day <= totalDays; day++) {
    const dayPlan = { day, activities: [], meals: [], accommodations: [] };
    let remainingBudget = perPersonPerDayBudget;

    // ACCOMMODATION
    if (cleanedInput.accommodation !== 'None') {
      const stay = await Accommodation.findOne({
        type: cleanedInput.accommodation,
        pricePerNight: { $lte: remainingBudget }
        // Removed _id filter so you can use same place multiple days
      });
      if (stay) {
        dayPlan.accommodation = {
          name: stay.name,
          pricePerNight: stay.pricePerNight
        };
        remainingBudget -= stay.pricePerNight;
        // No need to track accommodation usage if it's allowed daily
      }
    }

    // TRANSPORT
    if (cleanedInput.transport !== 'Walk Only') {
      const transportData = await TransportOption.findOne({ type: cleanedInput.transport });
      if (transportData && transportData.options.length > 0) {
        const bestOption = transportData.options.find(opt => opt.pricePerRide <= remainingBudget);
        if (bestOption) {
          dayPlan.activities.push({
            type: 'transport',
            name: bestOption.name,
            pricePerRide: bestOption.pricePerRide
          });
          remainingBudget -= bestOption.pricePerRide;
        }
      }
    }

    // MEALS (max 3)
    let mealsAdded = 0;

    const matchingRestaurants = allRestaurants.filter(rest =>
      rest.genres.some(g =>
        cleanedInput.interests.includes(g.trim().toLowerCase())
      )
    );

    const restaurantPool = matchingRestaurants.length > 0 ? matchingRestaurants : allRestaurants;

    for (let i = 0; i < restaurantPool.length && mealsAdded < 3; i++) {
      const rest = restaurantPool[i];
      if (
        !usedRestaurantIds.has(rest._id.toString()) &&
        rest.averageCost <= remainingBudget / (3 - mealsAdded)
      ) {
        usedRestaurantIds.add(rest._id.toString());
        dayPlan.meals.push({
          name: rest.name,
          genre: rest.genres.join(', '),
          averageCost: rest.averageCost
        });
        remainingBudget -= rest.averageCost;
        mealsAdded++;
      }
    }

    // INTERESTS / ACTIVITIES
    const maxActivities = cleanedInput.pace === 'Fast-Paced' ? 6 : cleanedInput.pace === 'Relaxed' ? 2 : 3;
    let count = 0;

    for (let interest of cleanedInput.interests) {
      if (count >= maxActivities) break;

      switch (interest) {
        case 'culture': {
          const places = await HistoricalPlace.find({
            genres: { $in: ['Culture'] },
            tourGuideFee: { $lte: remainingBudget },
            _id: { $nin: Array.from(usedActivityIds) }
          });
          if (places.length > 0) {
            const place = places[Math.floor(Math.random() * places.length)];
            dayPlan.activities.push({
              type: 'historical place',
              name: place.name,
              entryFee: place.tourGuideFee,
              guideFee: place.tourGuideFee ? `(Optional guide: $${place.tourGuideFee})` : undefined
            });
            // tourGuideFee is optional and not subtracted from remainingBudget
            usedActivityIds.add(place._id.toString());
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
            price: { $lte: remainingBudget },
            _id: { $nin: Array.from(usedActivityIds) }
          });
          if (activities.length > 0) {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            dayPlan.activities.push({
              type: 'outdoor activity',
              name: activity.name,
              fee: activity.price
            });
            remainingBudget -= activity.price;
            usedActivityIds.add(activity._id.toString());
            count++;
          }
          break;
        }
      }
    }

    // Calculate actual amount spent (including accommodation, transport, meals, and activities)
    let amountSpent = 0;

    for (let act of dayPlan.activities) {
      if (act.type === 'transport') {
        amountSpent += act.pricePerRide;
      } else if (act.type === 'historical place') {
        amountSpent += act.entryFee;
      } else if (act.type === 'outdoor activity') {
        amountSpent += act.fee;
      }
    }

    // Include accommodation cost if present
    if (dayPlan.accommodation) {
      amountSpent += dayPlan.accommodation.pricePerNight;
    }

    for (let meal of dayPlan.meals) {
      amountSpent += meal.averageCost;
    }

    dayPlan.budget = amountSpent.toFixed(2);  // Total amount spent for the day
    dailyPlan.push(dayPlan);
  }

  return dailyPlan;
}

// POST route
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
