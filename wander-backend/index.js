const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Tours data
const tours = [
  {
    id: 1,
    title: "Lahore",
    rating: 4.7,
    reviews: 120,
    image: "Lahore.jpg",
    historicalPlaces: ["Badshahi Mosque", "Lahore Fort", "Shalimar Gardens"],
    restaurants: ["The Chaiwala", "Café Zouk", "Salt Bae"],
    hotels: ["Pearl Continental", "Lahore Marriott", "The Nishat Hotel"]
  },
  {
    id: 2,
    title: "Karachi",
    rating: 4.5,
    reviews: 95,
    image: "Karachi.jpg",
    historicalPlaces: ["Mazar-e-Quaid", "Karachi Marina Club", "Frere Hall"],
    restaurants: ["Kolachi", "Chai Wala", "Café Flo"],
    hotels: ["Pearl Continental Karachi", "The Oberoi", "Marriott Karachi"]
  },
  {
    id: 3,
    title: "Islamabad",
    rating: 4.8,
    reviews: 200,
    image: "Islamabad.jpg",
    historicalPlaces: ["Faisal Mosque", "Lok Virsa Museum", "Daman-e-Koh"],
    restaurants: ["Tuscany Courtyard", "Chaaye Khana", "Kabul Restaurant"],
    hotels: ["Serena Hotel", "Islamabad Marriott", "Pearl Continental"]
  },
  {
    id: 4,
    title: "Peshawar",
    rating: 4.4,
    reviews: 75,
    image: "Peshawar.jpg",
    historicalPlaces: ["Bala Hisar Fort", "Peshawar Museum", "Qissa Khwani Bazaar"],
    restaurants: ["Chai Wala", "The Monal", "Peshawar Club"],
    hotels: ["Pearl Continental Peshawar", "Hotel Pearl Inn", "Shelton's Rezidor"]
  },
  {
    id: 5,
    title: "Quetta",
    rating: 4.3,
    reviews: 50,
    image: "Quetta.jpg",
    historicalPlaces: ["Hazarganji Chiltan National Park", "Quetta Museum", "Bolan Pass"],
    restaurants: ["Restaurant at Pearl Continental", "Pakeeza Restaurant", "Chaiwala"],
    hotels: ["Pearl Continental Quetta", "Quetta Serena Hotel", "Zara's Hotel"]
  },
  {
    id: 6,
    title: "Faisalabad",
    rating: 4.2,
    reviews: 65,
    image: "Faisalabad.jpg",
    historicalPlaces: ["Clock Tower", "Lyallpur Museum", "Chiniot"],
    restaurants: ["Tandoor Restaurant", "Khyber Restaurant", "Sultan Restaurant"],
    hotels: ["Faisalabad Serena Hotel", "Faisalabad Marriott", "The Nishat Hotel"]
  },
  {
    id: 7,
    title: "Hyderabad",
    rating: 4.1,
    reviews: 30,
    image: "Hyderabad.jpg",
    historicalPlaces: ["Pakistani Gate", "Miani Sahib Graveyard", "Qutub Shahi Tombs"],
    restaurants: ["Hyderabadi Biryani", "The Kolachi", "Ramsar Restaurant"],
    hotels: ["Hotel One Hyderabad", "Pearl Continental Hyderabad", "The Hyderabad Hotel"]
  },
  {
    id: 8,
    title: "Multan",
    rating: 4.6,
    reviews: 110,
    image: "Multan.jpg",
    historicalPlaces: ["Multan Fort", "Shrine of Bahauddin Zakariya", "Multan Museum"],
    restaurants: ["Royal Restaurant", "The Monal", "Multan Grill"],
    hotels: ["Pearl Continental Multan", "The Nishat Hotel", "Multan Sarai"]
  },
  {
    id: 9,
    title: "Sukkur",
    rating: 4.0,
    reviews: 40,
    image: "Sukkur.jpg",
    historicalPlaces: ["Sukkur Barrage", "Naushero Feroz", "Rohri Hills"],
    restaurants: ["The Monal Sukkur", "Tandoor Restaurant", "Café Wali"],
    hotels: ["Sukkur Marriott", "Indus Hotel", "Sukkur Palace"]
  },
  {
    id: 10,
    title: "Mansehra",
    rating: 4.2,
    reviews: 60,
    image: "Mansehra.jpg",
    historicalPlaces: ["Mansehra Rock", "Balakot", "Shogran Valley"],
    restaurants: ["Haveli Restaurant", "The Cottage Restaurant", "Fazal Din Restaurant"],
    hotels: ["Pearl Continental Mansehra", "Mansehra Rest House", "Shogran Hotel"]
  }
];

// Route to get city name by ID
app.get('/api/city/:id', (req, res) => {
  const cityId = parseInt(req.params.id);
  const city = tours.find(t => t.id === cityId);

  if (!city) {
    return res.status(404).json({ message: 'City not found' });
  }

  res.json({ cityName: city.title });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
