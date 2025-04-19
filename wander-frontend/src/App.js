import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About'; // Create this if it doesn't exist
import Login from './pages/Login'; // Create this if it doesn't exist
import AllTours from './pages/AllTours';
import PlanTrip from './pages/PlanTrip';

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
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
