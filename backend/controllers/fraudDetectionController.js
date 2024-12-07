const FraudDetection = require('../models/FraudDetection');
const Voter = require('../models/Voter');
const AuditLog = require('../models/AuditLog'); // Assuming this model exists for Super Admin's audit logs

// Detect multiple votes
const detectMultipleVotes = async (req, res) => {
  try {
    const { voterId } = req.body;

    // Query audit logs or votes to detect multiple votes
    const multipleVotes = await AuditLog.find({ action: 'Vote Cast', voter: voterId });

    if (multipleVotes.length > 1) {
      const irregularity = new FraudDetection({
        type: 'Multiple Votes',
        voter: voterId,
        details: `Detected ${multipleVotes.length} votes from voter ID ${voterId}`,
        auditLogId: multipleVotes[0]._id,
      });

      await irregularity.save();
      return res.status(200).json({ message: 'Irregularity logged', irregularity });
    }

    res.status(200).json({ message: 'No irregularities detected for this voter' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Detect unauthorized access
const detectUnauthorizedAccess = async (req, res) => {
  try {
    const { auditLogId } = req.body;

    const auditLog = await AuditLog.findById(auditLogId);
    if (!auditLog) {
      return res.status(404).json({ error: 'Audit log not found' });
    }

    if (auditLog.action !== 'Authorized') {
      const irregularity = new FraudDetection({
        type: 'Unauthorized Access',
        details: `Unauthorized access detected. Audit log ID: ${auditLogId}`,
        auditLogId,
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
