const mongoose = require('mongoose');

const FraudDetectionSchema = new mongoose.Schema({
  type: { type: String, enum: ['Multiple Votes', 'Unauthorized Access'], required: true }, // Irregularity type
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter', required: false }, // Reference to the Voter (if applicable)
  details: { type: String, required: true }, // Description of the irregularity
  detectedAt: { type: Date, default: Date.now }, // Timestamp
  resolved: { type: Boolean, default: false }, // Status of resolution
  resolutionDetails: { type: String, required: false }, // How the issue was resolved
});

module.exports = mongoose.model('FraudDetection', FraudDetectionSchema);
