// wander-backend/index.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample tours data (you can connect to DB later)
const tours = [
  { id: 1, title: "Lahore", rating: 4.7, image: "Lahore.jpg" },
  { id: 2, title: "Karachi", rating: 4.5, image: "Karachi.jpg" },
  { id: 3, title: "Islamabad", rating: 4.8, image: "Islamabad.jpg" },
  { id: 4, title: "Peshawar", rating: 4.4, image: "Peshawar.jpg" },
  { id: 5, title: "Quetta", rating: 4.3, image: "Quetta.jpg" },
  { id: 6, title: "Faisalabad", rating: 4.2, image: "Faisalabad.jpg" },
  { id: 7, title: "Hyderabad", rating: 4.1, image: "Hyderabad.jpg" },
  { id: 8, title: "Multan", rating: 4.6, image: "Multan.jpg" },
  { id: 9, title: "Sukkur", rating: 4.0, image: "Sukkur.jpg" },
  { id: 10, title: "Mansehra", rating: 4.2, image: "Mansehra.jpg" }
];

// Route
app.get('/api/tours', (req, res) => {
  res.json(tours);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
