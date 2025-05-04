const mongoose = require('mongoose');

// Use the second DB from the current mongoose connection
const itineraryDb = mongoose.connection.useDb('itinerarydata');

// Accommodation Schema
const Accommodation = itineraryDb.model('Accommodation', new mongoose.Schema({
  name: String,
  type: String,
  pricePerNight: Number
}), 'accommodations');

// Historical Places
const HistoricalPlace = itineraryDb.model('HistoricalPlace', new mongoose.Schema({
  name: String,
  tourGuideFee: Number,
  genres: [String]
}), 'historical_places');

// Outdoor Activities
const OutdoorActivity = itineraryDb.model('OutdoorActivity', new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  genres: [String]
}), 'outdoor_activities');

// Transport Options
const TransportOption = itineraryDb.model('TransportOption', new mongoose.Schema({
  type: String,
  options: [{
    name: String,
    pricePerRide: Number
  }]
}), 'transport_options');

// Restaurants
const Restaurant = itineraryDb.model('Restaurant', new mongoose.Schema({
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
