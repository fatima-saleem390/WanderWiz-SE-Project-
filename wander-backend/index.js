const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const planTripRoute = require('./routes/planTrip');
const subscriptionRoute = require('./routes/subscription'); 
const tourRoutes = require('./routes/tours');


const Tour= require('./models/Tour');
dotenv.config();

const app = express(); 

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const atlasUri = 'mongodb+srv://wanderuser:wanderuser123@wanderwiz.rog2ctz.mongodb.net/wanderwiz?retryWrites=true&w=majority';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api', planTripRoute);
app.use('/api', subscriptionRoute); // ✅ Now correctly added
app.use('/api/tours', tourRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});