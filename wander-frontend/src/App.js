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
import HistoricalPlaces from './pages/HistoricalPlaces';
import Restaurants from './pages/Restaurants';
import Hotels from './pages/Hotels';
import Register from './pages/Register'; // 👈 import the Register page

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* 👈 added Register route */}
          <Route path="/listing" element={<AllTours />} />
          <Route path="/plan-trip" element={<PlanTrip />} />
          
          {/* Tour Details Route */}
          <Route path="/tour-details/:id" element={<TourDetails />} />
          <Route path="/tour-details/:id/historical-places" element={<HistoricalPlaces />} />
          <Route path="/tour-details/:id/restaurants" element={<Restaurants />} />
          <Route path="/tour-details/:id/hotels" element={<Hotels />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
