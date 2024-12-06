const express = require('express');
const { publishProvisionalResults, publishFinalResults, generateReport } = require('../controllers/electionResultsController');
const { validateElection } = require('../middleware/electionMonitoringMiddleware'); // Validate election

const router = express.Router();

// Route to publish provisional results
router.put('/:electionId/provisional', validateElection, publishProvisionalResults);

// Route to publish final results
router.put('/:electionId/final', validateElection, publishFinalResults);

// Route to generate a report based on vote counts
router.get('/:electionId/report', validateElection, generateReport);

module.exports = router;
