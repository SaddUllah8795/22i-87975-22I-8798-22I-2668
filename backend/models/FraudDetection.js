const mongoose = require('mongoose');

const FraudDetectionSchema = new mongoose.Schema({
  type: { type: String, enum: ['Multiple Votes', 'Unauthorized Access'], required: true }, // Type of irregularity
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter', required: false }, // Link to the Voter (if applicable)
  details: { type: String, required: true }, // Detailed description of the irregularity
  detectedAt: { type: Date, default: Date.now }, // Timestamp of detection
  resolved: { type: Boolean, default: false }, // Whether the issue is resolved
  resolutionDetails: { type: String, required: false }, // Details on how the issue was resolved
  auditLogId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditLog', required: false }, // Link to Super Admin’s audit logs
});

module.exports = mongoose.model('FraudDetection', FraudDetectionSchema);
