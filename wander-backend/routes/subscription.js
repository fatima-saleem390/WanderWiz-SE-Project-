const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema for subscriptions
const SubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

// POST /api/subscribe
router.post('/subscribe', async (req, res) => {
  const email = req.body.email?.trim();

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const newSub = new Subscription({ email });
    await newSub.save();
    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Email already subscribed' });
    } else {
      console.error('Subscription error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

module.exports = router;
