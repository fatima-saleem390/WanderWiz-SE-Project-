const express = require('express');
const router = express.Router();

const {
  Accommodation,
  HistoricalPlace,
  OutdoorActivity,
  TransportOption,
  Restaurant
} = require('../models/ItineraryDataModels');

async function generateItineraryFromDB(input) {
  const {
    dateRange, budget, interests, pace, transport, accommodation, notes, people
  } = input;

  const perPersonPerDayBudget = budget / (people * dateRange);
  const transportPct = transport !== 'walk only' ? 0.2 : 0;
  const accommodationPct = accommodation !== 'none' ? 0.3 : 0;
  const interestsPct = 1 - (transportPct + accommodationPct);

  const transportBudget = transportPct * perPersonPerDayBudget;
  const accommodationBudget = accommodationPct * perPersonPerDayBudget;
  const interestBudget = interestsPct * perPersonPerDayBudget;

  const dailyPlan = [];

  for (let day = 1; day <= dateRange; day++) {
    const dayPlan = { day, activities: [] };

    // TRANSPORT
    if (transport !== 'walk only') {
      const transportData = await TransportOption.findOne({ type: transport });
      if (transportData && transportData.options.length > 0) {
        const bestOption = transportData.options.find(opt => opt.pricePerRide <= transportBudget);
        if (bestOption) {
          dayPlan.activities.push({
            type: 'transport',
            name: bestOption.name,
            pricePerRide: bestOption.pricePerRide
          });
        }
      }
    }

    // ACCOMMODATION
    if (accommodation !== 'none') {
      const stay = await Accommodation.findOne({
        type: accommodation,
        pricePerNight: { $lte: accommodationBudget }
      });
      if (stay) {
        dayPlan.activities.push({
          type: 'accommodation',
          name: stay.name,
          pricePerNight: stay.pricePerNight
        });
      }
    }

    // INTERESTS
    const maxActivities = pace === 'fast' ? 4 : pace === 'balanced' ? 3 : 2;
    let count = 0;

    for (let interest of interests.map(i => i.trim().toLowerCase())) {
      if (count >= maxActivities) break;

      switch (interest) {
        case 'food': {
          const rest = await Restaurant.findOne({
            averageCost: { $lte: interestBudget / maxActivities },
            genres: { $in: ['food'] }
          });
          if (rest) {
            dayPlan.activities.push({
              type: 'restaurant',
              name: rest.name,
              pricePerPerson: rest.averageCost
            });
            count++;
          }
          break;
        }

        case 'culture': {
          const place = await HistoricalPlace.findOne({
            genres: { $in: ['culture'] },
            tourGuideFee: { $lte: interestBudget / maxActivities }
          });
          if (place) {
            dayPlan.activities.push({
              type: 'historical place',
              name: place.name,
              entryFee: place.tourGuideFee,
              guideFee: place.tourGuideFee ? `(Optional guide: $${place.tourGuideFee})` : undefined
            });
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
          const activity = await OutdoorActivity.findOne({
            genres: { $in: [interest] },
            price: { $lte: interestBudget / maxActivities }
          });
          if (activity) {
            dayPlan.activities.push({
              type: 'outdoor activity',
              name: activity.name,
              fee: activity.price
            });
            count++;
          }
          break;
        }
      }
    }

    dailyPlan.push(dayPlan);
  }

  return dailyPlan;
}

router.post('/plan-trip', async (req, res) => {
  try {
    const itinerary = await generateItineraryFromDB(req.body);
    res.json(itinerary);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ message: 'Failed to generate itinerary' });
  }
});

module.exports = router;
