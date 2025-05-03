const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const tours = db.collection('tours');

  router.post('/plan-trip', async (req, res) => {
    const {
      dateRange, budget, interests, pace,
      transport, accommodation, notes, people
    } = req.body;

    const totalDays = Math.ceil(
      (new Date(dateRange.endDate) - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24)
    ) + 1;

    const totalBudget = budget[1] - budget[0];
    const budgetPerDay = Math.floor(totalBudget / totalDays);

    // Fetch and filter tours from DB
    try {
      const allTours = await tours.find({}).toArray();

      const matchedTours = allTours.filter(tour => {
        return interests.some(interest => tour.tags?.includes(interest.trim()));
      });

      const plan = [];
      for (let day = 1; day <= totalDays; day++) {
        const tour = matchedTours[day % matchedTours.length]; // just rotate

        const dayPlan = {
          day,
          activities: [tour?.name || 'Explore local area'],
          meals: [accommodation.includes('Hotel') ? 'Hotel buffet' : 'Local diner'],
          budget: budgetPerDay,
          notes: `Plan based on ${pace} pace and interests: ${interests.join(', ')}`,
        };

        plan.push(dayPlan);
      }

      res.json({ totalDays, budget: totalBudget, people, plan });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to generate trip plan' });
    }
  });

  return router;
};
