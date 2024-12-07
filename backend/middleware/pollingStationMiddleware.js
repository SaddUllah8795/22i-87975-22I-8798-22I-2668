const PollingStation = require('../models/PollingStation');
const Voter = require('../models/Voter');

// Middleware to validate polling station data
const validatePollingStationData = (req, res, next) => {
  const { stationName, region, city, coordinatorId } = req.body;

  // Validate required fields
  if (!stationName || !region || !city || !coordinatorId) {
    return res.status(400).json({ error: 'All fields are required: stationName, region, city, coordinatorId' });
  }

  // Validate region
  const validRegions = ['KPK', 'Punjab', 'Sindh', 'Balochistan', 'Islamabad'];
  if (!validRegions.includes(region)) {
    return res.status(400).json({ error: 'Invalid region provided' });
  }

  next();
};

// Middleware to validate voter activity logging
const validateVoterActivity = async (req, res, next) => {
  const { stationId, voterId } = req.body;

  try {
    // Check if polling station exists
    const pollingStation = await PollingStation.findById(stationId);
    if (!pollingStation) {
      return res.status(404).json({ error: 'Polling station not found' });
    }

    // Check if voter exists and belongs to the correct region and city
    const voter = await Voter.findOne({
      _id: voterId,
      region: pollingStation.region,
      city: pollingStation.city,
    });

    if (!voter) {
      return res.status(400).json({ error: 'Voter is not eligible for this polling station' });
    }

    // Attach pollingStation and voter to the request object for use in the controller
    req.pollingStation = pollingStation;
    req.voter = voter;

    next(); // Proceed to the controller
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  validatePollingStationData,
  validateVoterActivity,
};
