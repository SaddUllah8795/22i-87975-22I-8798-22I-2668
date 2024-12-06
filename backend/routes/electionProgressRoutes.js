const express = require('express');
const { getElectionProgress, updateElectionProgress } = require('../controllers/electionProgressController');
const { validateElection, validateRegionAndCity } = require('../middleware/electionMonitoringMiddleware');  // Import the middleware

const router = express.Router();

// Route to get election progress
router.get('/:electionId', validateElection, getElectionProgress);

// Route to update election progress (with validation for election, region, and city)
router.put('/:electionId/update', validateElection, validateRegionAndCity, updateElectionProgress);

module.exports = router;
