const express = require('express');
const {
  createPollingStation,
  assignCoordinator,
  monitorPollingActivity,
  logVoterActivity,
} = require('../controllers/pollingStationController');
const { validatePollingStationData } = require('../middleware/pollingStationMiddleware');

const router = express.Router();

// Create a new polling station
router.post('/', validatePollingStationData, createPollingStation);

// Assign coordinator to a polling station
router.put('/assign-coordinator', assignCoordinator);

// Monitor activity in a polling station
router.get('/:stationId/monitor', monitorPollingActivity);

// Log voter activity
router.post('/log-activity', logVoterActivity);

module.exports = router;
