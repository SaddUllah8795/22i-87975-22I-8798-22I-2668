const FraudDetection = require('../models/FraudDetection');
const Voter = require('../models/Voter');

// Detect multiple votes
const detectMultipleVotes = async (req, res) => {
  try {
    const { voterId } = req.body;

    // Query votes directly from the system to detect multiple votes
    const multipleVotes = await FraudDetection.find({ voter: voterId, type: 'Multiple Votes' });

    if (multipleVotes.length > 0) {
      return res.status(400).json({ error: `Voter with ID ${voterId} has already been flagged for multiple votes.` });
    }

    // Simulate detection of multiple votes (replace with actual vote checking logic)
    const irregularity = new FraudDetection({
      type: 'Multiple Votes',
      voter: voterId,
      details: `Multiple votes detected for voter ID ${voterId}.`,
    });

    await irregularity.save();
    res.status(200).json({ message: 'Irregularity logged', irregularity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Detect unauthorized access
const detectUnauthorizedAccess = async (req, res) => {
  try {
    const { ipAddress, action } = req.body;

    if (action !== 'Authorized') {
      const irregularity = new FraudDetection({
        type: 'Unauthorized Access',
        details: `Unauthorized access detected from IP address: ${ipAddress}.`,
      });

      await irregularity.save();
      return res.status(200).json({ message: 'Unauthorized access logged', irregularity });
    }

    res.status(200).json({ message: 'No unauthorized access detected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Resolve an irregularity
const resolveIrregularity = async (req, res) => {
  try {
    const { irregularityId, resolutionDetails } = req.body;

    const irregularity = await FraudDetection.findById(irregularityId);
    if (!irregularity) {
      return res.status(404).json({ error: 'Irregularity not found' });
    }

    irregularity.resolved = true;
    irregularity.resolutionDetails = resolutionDetails;

    await irregularity.save();
    res.status(200).json({ message: 'Irregularity resolved', irregularity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  detectMultipleVotes,
  detectUnauthorizedAccess,
  resolveIrregularity,
};
