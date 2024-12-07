const express = require('express');
const {
  detectMultipleVotes,
  detectUnauthorizedAccess,
  resolveIrregularity,
} = require('../controllers/fraudDetectionController');

const router = express.Router();

// Detect multiple votes
router.post('/detect-multiple-votes', detectMultipleVotes);

// Detect unauthorized access
router.post('/detect-unauthorized-access', detectUnauthorizedAccess);

// Resolve an irregularity
router.post('/resolve', resolveIrregularity);

module.exports = router;
