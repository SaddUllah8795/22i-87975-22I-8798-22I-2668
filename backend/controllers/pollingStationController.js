const PollingStation = require('../models/PollingStation');
const Voter = require('../models/Voter'); // Assuming Voter model is defined

// Create a new polling station
const createPollingStation = async (req, res) => {
  try {
    const { stationName, region, city, coordinatorId } = req.body;

    const pollingStation = new PollingStation({
      stationName,
      region,
      city,
      coordinator: coordinatorId,
    });

    await pollingStation.save();

    res.status(201).json({ message: 'Polling station created successfully', pollingStation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a coordinator to a polling station
const assignCoordinator = async (req, res) => {
  try {
    const { stationId, coordinatorId } = req.body;

    const pollingStation = await PollingStation.findById(stationId);
    if (!pollingStation) {
      return res.status(404).json({ error: 'Polling station not found' });
    }

    pollingStation.coordinator = coordinatorId;
    await pollingStation.save();

    res.status(200).json({ message: 'Coordinator assigned successfully', pollingStation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Monitor polling station activity
const monitorPollingActivity = async (req, res) => {
  try {
    const { stationId } = req.params;

    const pollingStation = await PollingStation.findById(stationId).populate('voterActivity.voter');
    if (!pollingStation) {
      return res.status(404).json({ error: 'Polling station not found' });
    }

    const votersInRegionAndCity = await Voter.find({
      region: pollingStation.region,
      city: pollingStation.city,
    });

    res.status(200).json({
      pollingStation,
      votersInRegionAndCity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Log voter activity in a polling station
const logVoterActivity = async (req, res) => {
  try {
    const { stationId, voterId } = req.body;

    const pollingStation = await PollingStation.findById(stationId);
    if (!pollingStation) {
      return res.status(404).json({ error: 'Polling station not found' });
    }

    const voter = await Voter.findOne({
      _id: voterId,
      region: pollingStation.region,
      city: pollingStation.city,
    });

    if (!voter) {
      return res.status(400).json({ error: 'Voter is not eligible for this polling station' });
    }

    const alreadyVoted = pollingStation.voterActivity.find(activity => activity.voter.toString() === voterId);
    if (alreadyVoted) {
      return res.status(400).json({ error: 'Voter has already participated' });
    }

    pollingStation.voterActivity.push({ voter: voterId });
    pollingStation.votersParticipated += 1;

    await pollingStation.save();

    res.status(200).json({ message: 'Voter activity logged successfully', pollingStation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPollingStation,
  assignCoordinator,
  monitorPollingActivity,
  logVoterActivity,
};
