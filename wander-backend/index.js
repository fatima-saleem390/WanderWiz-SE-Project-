const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/wanderwiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define a flexible schema (we'll insert raw tour objects)
const tourSchema = new mongoose.Schema({}, { strict: false });
const Tour = mongoose.model('Tour', tourSchema, 'tours'); // collection name: tours

// Route: Get all tours
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tours", error });
  }
});

// Route: Get a specific tour by ID
app.get('/api/tours/:id', async (req, res) => {
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
app.get('/api/tours/:id/historical-places/:place', async (req, res) => {
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
      reviews: historicalPlace.reviews || 0,
      rating: historicalPlace.rating || 4.8,
      userReviews: historicalPlace.userReviews || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching historical place', error });
  }
});

// Route: Get a specific restaurant
app.get('/api/tours/:id/restaurants/:restaurant', async (req, res) => {
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
      reviews: restaurantDetail.reviews || 0,
      rating: restaurantDetail.rating || 4.8,
      userReviews: restaurantDetail.userReviews || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error });
  }
});

// Route: Get a specific hotel
app.get('/api/tours/:id/hotels/:hotel', async (req, res) => {
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
      reviews: hotelDetail.reviews || 0,
      rating: hotelDetail.rating || 4.8,
      userReviews: hotelDetail.userReviews || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel', error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
