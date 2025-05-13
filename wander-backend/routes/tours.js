const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');

// Route: Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tours", error });
  }
});

// Route: Get a specific tour by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findOne({ id: parseInt(id) });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tour', error });
  }
});

// Route: Get a specific historical place
router.get('/:id/historical-places/:place', async (req, res) => {
  const { id, place } = req.params;
  const decodedPlace = decodeURIComponent(place);

  try {
    const tour = await Tour.findOne({ id: parseInt(id) });
    if (!tour) return res.status(404).json({ error: 'Tour not found' });

    const historicalPlace = tour.historicalPlaces?.find(p => p.name === decodedPlace);
    if (!historicalPlace) return res.status(404).json({ error: 'Historical place not found' });

    res.json({
      name: historicalPlace.name,
      description: historicalPlace.description || "No description available",
      image: historicalPlace.image,
      address: historicalPlace.location || 'No address available',
      reviews: historicalPlace.userReviews.length || 0,
      rating: historicalPlace.rating || 4.8,
      userReviews: historicalPlace.userReviews || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching historical place', error });
  }
});

// Route: Get a specific restaurant
router.get('/:id/restaurants/:restaurant', async (req, res) => {
  const { id, restaurant } = req.params;
  const decodedRestaurant = decodeURIComponent(restaurant);

  try {
    const tour = await Tour.findOne({ id: parseInt(id) });
    if (!tour) return res.status(404).json({ error: 'Tour not found' });

    const restaurantDetail = tour.restaurants?.find(r => r.name === decodedRestaurant);
    if (!restaurantDetail) return res.status(404).json({ error: 'Restaurant not found' });

    res.json({
      name: restaurantDetail.name,
      description: restaurantDetail.description || "No description available",
      image: restaurantDetail.image,
      address: restaurantDetail.location || 'No address available',
      reviews: restaurantDetail.userReviews.length || 0,
      rating: restaurantDetail.rating || 4.8,
      userReviews: restaurantDetail.userReviews || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error });
  }
});

// Route: Get a specific hotel
router.get('/:id/hotels/:hotel', async (req, res) => {
  const { id, hotel } = req.params;
  const decodedHotel = decodeURIComponent(hotel);

  try {
    const tour = await Tour.findOne({ id: parseInt(id) });
    if (!tour) return res.status(404).json({ error: 'Tour not found' });

    const hotelDetail = tour.hotels?.find(h => h.name === decodedHotel);
    if (!hotelDetail) return res.status(404).json({ error: 'Hotel not found' });

    res.json({
      name: hotelDetail.name,
      description: hotelDetail.description || "No description available",
      image: hotelDetail.image,
      address: hotelDetail.location || 'No address available',
      reviews: hotelDetail.userReviews.length || 0,
      rating: hotelDetail.rating || 4.8,
      userReviews: hotelDetail.userReviews || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel', error });
  }
});
router.post('/:id/restaurants/:restaurant/userReviews', async (req, res) => {
  const { id, restaurant } = req.params;
  const { username, review, rating } = req.body;

  try {
    const tour = await Tour.findOne({ id: parseInt(id) });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    const foundRestaurant = tour.restaurants.find(
      r => r.name.toLowerCase() === decodeURIComponent(restaurant).toLowerCase()
    );
    if (!foundRestaurant) return res.status(404).json({ message: 'Restaurant not found' });

    // Add new review
    foundRestaurant.userReviews.push({ username, review, rating });

    // Recalculate average rating
    const totalRatings = foundRestaurant.userReviews.reduce((sum, r) => sum + r.rating, 0);
    foundRestaurant.rating = totalRatings / foundRestaurant.userReviews.length;

    await tour.save();

    res.status(201).json({ message: 'Review added and rating updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/historical-places/:place/userReviews', async (req, res) => {
  const { id, place } = req.params;
  const { username, review, rating } = req.body;

  try {
    const tour = await Tour.findOne({ id: parseInt(id) });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    const historicalPlace = tour.historicalPlaces.find(
      p => p.name === decodeURIComponent(place)
    );
    if (!historicalPlace) return res.status(404).json({ message: 'Historical place not found' });

    historicalPlace.userReviews.push({ username, review, rating });

    // Recalculate rating
    const totalRatings = historicalPlace.userReviews.reduce((sum, r) => sum + r.rating, 0);
    historicalPlace.rating = totalRatings / historicalPlace.userReviews.length;

    await tour.save();

    res.status(201).json({ message: 'Review added and rating updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/:id/hotels/:hotel/userReviews', async (req, res) => {
  const { id, hotel } = req.params;
  const { username, review, rating } = req.body;

  try {
    const tour = await Tour.findOne({ id: parseInt(id) });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    const foundHotel = tour.hotels.find(
      h => h.name.toLowerCase() === decodeURIComponent(hotel).toLowerCase()
    );
    if (!foundHotel) return res.status(404).json({ message: 'Hotel not found' });

    foundHotel.userReviews.push({ username, review, rating });

    // Recalculate rating
    const totalRatings = foundHotel.userReviews.reduce((sum, r) => sum + r.rating, 0);
    foundHotel.rating = totalRatings / foundHotel.userReviews.length;

    await tour.save();

    res.status(201).json({ message: 'Review added and rating updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;