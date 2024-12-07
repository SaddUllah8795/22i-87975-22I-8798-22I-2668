const express = require('express');
const {
  submitFeedback,
  getElectionFeedback,
  analyzeFeedback,
} = require('../controllers/feedbackController');

const router = express.Router();

// Submit feedback
router.post('/submit', submitFeedback);

// Get all feedback for a specific election
router.get('/:electionId', getElectionFeedback);

// Analyze feedback for a specific election
router.get('/:electionId/analyze', analyzeFeedback);

module.exports = router;
