const express = require('express');
const router = express.Router();

router.post('/plan-trip', (req, res) => {
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

  const plan = [];

  for (let day = 1; day <= totalDays; day++) {
    const dayPlan = {
      day,
      activities: [],
      meals: [],
      budget: budgetPerDay,
      notes: `Plan based on ${pace} pace and interests: ${interests.join(', ')}`,
    };

    if (interests.includes(' Adventure 🌋')) {
      dayPlan.activities.push('Outdoor adventure');
    } else if (interests.includes(' Culture 🏛️')) {
      dayPlan.activities.push('Visit museum or temple');
    } else {
      dayPlan.activities.push('Explore local area');
    }

    dayPlan.meals.push(accommodation.includes('Hotel') ? 'Hotel buffet' : 'Local diner');

    plan.push(dayPlan);
  }

  res.json({
    totalDays,
    budget: totalBudget,
    people,
    plan,
  });
});

module.exports = router;
