// Assuming you've required the User model and other necessary modules at the top
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const User = require('../models/User');
const Tour= require('../models/Tour');
const router = express.Router();

// Joi validation schema for registration and login
const schema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  mobileNumber: joi.string().min(10).max(15).required(),
});




// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password, mobileNumber } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const user = new User({ username, email, password, mobileNumber });
    const savedUser = await user.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: savedUser._id, email: savedUser.email, username: savedUser.username },
    });
  } catch (err) {
    console.error('Server error during registration:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { email: user.email, username: user.username },
    });
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to bookmark a tour (city)
// Route to bookmark a tour (city)
// Route to bookmark a tour (city) by title
router.post('/bookmark', async (req, res) => {
  const { cityTitle } = req.body;
  const authHeader = req.headers.authorization;

  if (!cityTitle) {
    return res.status(400).json({ message: 'City title is required' });
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already bookmarked by title
    if (user.bookmarkedCities.includes(cityTitle)) {
      return res.status(400).json({ message: 'City already bookmarked' });
    }

    user.bookmarkedCities.push(cityTitle); // Store the string directly
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'City bookmarked successfully',
      bookmarkedCities: user.bookmarkedCities,
    });
  } catch (err) {
    console.error('Error bookmarking city:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/save-place', async (req, res) => {
  const { placeName, placeType } = req.body;
  const authHeader = req.headers.authorization;

  if (!placeName) {
    return res.status(400).json({ message: 'Place name is required' });
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if place is already saved by cityTitle and placeName
    const alreadySaved = user.savedPlaces?.some(
      (place) =>  place.placeName === placeName
    );

    if (alreadySaved) {
      return res.status(400).json({ message: 'Place already saved' });
    }

    // Save the place (cityTitle, placeName, placeType) to the user's savedPlaces array
    user.savedPlaces.push({placeName, placeType });
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Place saved successfully',
      savedPlaces: user.savedPlaces,
    });
  } catch (err) {
    console.error('Error saving place:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
