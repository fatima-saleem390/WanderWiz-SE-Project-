const mongoose = require('mongoose');

// Review Schema for Restaurants and Hotels
const reviewSchema = new mongoose.Schema({
  username: String,
  review: String,
  rating: Number,
});

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  description: String,
  userReviews: [reviewSchema],
  rating: Number, // Optional: average rating
});

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  description: String,
  userReviews: [reviewSchema],
  rating: Number, // Optional: average rating
});

// Historical Place Schema
const historicalPlaceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  location: String,
  rating: Number,
  userReviews: [reviewSchema],
});

// Tour Schema
const tourSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  image: String,
  historicalPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'historicalplace' }],
  restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' }],
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'hotel' }],
  rating: { type: Number, default: 0 },
});

// Prevent overwriting of the model by checking if it's already defined
const Tour = mongoose.models.tour || mongoose.model('tour', tourSchema);

module.exports = Tour;
