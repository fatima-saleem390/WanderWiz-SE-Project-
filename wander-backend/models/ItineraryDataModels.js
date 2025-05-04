const mongoose = require('mongoose');

// Accommodation Schema
const Accommodation = mongoose.model('Accommodation', new mongoose.Schema({
  name: String,
  type: String,
  pricePerNight: Number
}), 'accommodations');

// Historical Places
const HistoricalPlace = mongoose.model('HistoricalPlace', new mongoose.Schema({
  name: String,
  tourGuideFee: Number,
  genres: [String]
}), 'historical_places');

// Outdoor Activities
const OutdoorActivity = mongoose.model('OutdoorActivity', new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  genres: [String]
}), 'outdoor_activities');

// Transport Options
const TransportOption = mongoose.model('TransportOption', new mongoose.Schema({
  type: String,
  options: [{
    name: String,
    pricePerRide: Number
  }]
}), 'transport_options');

// Restaurants
const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
  name: String,
  type: String,
  averageCost: Number,
  genres: [String]
}), 'restaurants');

module.exports = {
  Accommodation,
  HistoricalPlace,
  OutdoorActivity,
  TransportOption,
  Restaurant
};
