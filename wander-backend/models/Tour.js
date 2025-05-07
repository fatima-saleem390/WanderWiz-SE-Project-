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
  rating: Number, 
});

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  description: String,
  userReviews: [reviewSchema],
  rating: Number, 
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
  historicalPlaces: [historicalPlaceSchema],
  restaurants: [restaurantSchema],
  hotels: [hotelSchema],
});

const Tour = mongoose.model('Tour', tourSchema); // Tour model
module.exports = Tour;