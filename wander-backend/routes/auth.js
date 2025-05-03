const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const User = require('../models/User');
const router = express.Router();

// Joi validation schema
const schema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  mobileNumber: joi.string().min(10).max(15).required(),
});

// Registration Route
router.post('/register', async (req, res) => {
  try {
    console.log('📥 Incoming request body:', req.body);

    // Validate request body
    const { error } = schema.validate(req.body);
    if (error) {
      console.log('❌ Joi validation failed:', error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password, mobileNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ Email already in use:', email);
      return res.status(400).json({ message: 'Email already in use.' });
    }

  

    // Create and save new user
    const user = new User({
      username,
      email,
      password,
      mobileNumber,
    });
    
    const savedUser = await user.save();
    console.log('✅ User successfully registered:', savedUser.email);

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
      },
    });
  } catch (err) {
    console.error('🔥 Server error during registration:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('⚠️ User not found with email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Log entered password and stored password hash
    console.log('🔑 Entered password:', password);
    console.log('🔑 Stored password hash:', user.password);
    console.log('🟦 Raw request password:', `'${password}'`);
    if (!user) {
        console.log('❌ No user found with email:', email);
      } else {
        console.log('🟩 Fetched user from DB:', user);
      }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Optionally: create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { email: user.email, username: user.username },
    });
  } catch (err) {
    console.error('🔥 Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
