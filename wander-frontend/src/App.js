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
import Gallery from './pages/Gallery';  // Import Gallery
import Register from './pages/Register';  // Import Register

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
          <Route path="/gallery" element={<Gallery />} />  {/* Route for Gallery */}
          <Route path="/register" element={<Register />} />  {/* Route for Register */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
