// In routes file (e.g., constituencyRoutes.js)
const express = require('express');
const Constituency = require('../models/Constituency'); // Adjust path as needed

const router = express.Router();

// Get all constituencies
router.get('/', async (req, res) => {
  try {
    const constituencies = await Constituency.find();
    res.status(200).json(constituencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
