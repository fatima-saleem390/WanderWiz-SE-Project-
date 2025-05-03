const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const planTripRoute = require('./routes/planTrip');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define a flexible schema (we'll insert raw tour objects)
const tourSchema = new mongoose.Schema({}, { strict: false });
const Tour = mongoose.model('Tour', tourSchema, 'tours'); // collection name: tours

// Tour routes
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tours", error });
  }
});

app.get('/api/tours/:id', async (req, res) => {
  try {
    const tour = await Tour.findOne({ id: parseInt(req.params.id) });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tour', error });
  }
});

app.get('/api/tours/:id/historical-places/:place', async (req, res) => {
  const decodedPlace = decodeURIComponent(req.params.place);
  try {
    const tour = await Tour.findOne({ id: parseInt(req.params.id) });
    const place = tour?.historicalPlaces?.find(p => p.name === decodedPlace);
    if (!place) return res.status(404).json({ error: 'Historical place not found' });

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

app.get('/api/tours/:id/restaurants/:restaurant', async (req, res) => {
  const decodedRestaurant = decodeURIComponent(req.params.restaurant);
  try {
    const tour = await Tour.findOne({ id: parseInt(req.params.id) });
    const rest = tour?.restaurants?.find(r => r.name === decodedRestaurant);
    if (!rest) return res.status(404).json({ error: 'Restaurant not found' });

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

app.get('/api/tours/:id/hotels/:hotel', async (req, res) => {
  const decodedHotel = decodeURIComponent(req.params.hotel);
  try {
    const tour = await Tour.findOne({ id: parseInt(req.params.id) });
    const hotel = tour?.hotels?.find(h => h.name === decodedHotel);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

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
