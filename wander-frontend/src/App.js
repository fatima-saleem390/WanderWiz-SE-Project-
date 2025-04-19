import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AllTours from './pages/AllTours'; // example main page

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AllTours />} />
          {/* Add more routes here */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
