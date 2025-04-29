// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import AllTours from './pages/AllTours';
import PlanTrip from './pages/PlanTrip';
import TourDetails from './pages/TourDetails';
import HistoricalPlaces from './pages/HistoricalPlaces';  // Import HistoricalPlaces page
import Restaurants from './pages/Restaurants';            // Import Restaurants page
import Hotels from './pages/Hotels';                      // Import Hotels page
import HistoricalPlaceDetail from './pages/HistoricalPlaceDetail';  // Import HistoricalPlaceDetail component
import RestaurantDetail from './pages/RestaurantDetail';
import HotelDetail from './pages/HotelDetail';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listing" element={<AllTours />} />
          <Route path="/plan-trip" element={<PlanTrip />} />
          
          {/* Tour Details Route */}
          <Route path="/tour-details/:id" element={<TourDetails />} />
          
          {/* Nested Routes for each category (Historical Places, Restaurants, Hotels) */}
          <Route path="/tour-details/:id/historical-places" element={<HistoricalPlaces />} />
          <Route path="/tour-details/:id/restaurants" element={<Restaurants />} />
          <Route path="/tour-details/:id/hotels" element={<Hotels />} />
          
          {/* Dynamic Route for Historical Place Details */}
          <Route path="/tour-details/:id/historical-places/:place" element={<HistoricalPlaceDetail />} />
          <Route path="/tour-details/:id/restaurants/:restaurant" element={<RestaurantDetail />} />
          <Route path="/tour-details/:id/hotels/:hotel" element={<HotelDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
