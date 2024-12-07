// models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter', required: true }, // Link to Voter
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true }, // Link to Election
  comments: { type: String, required: true }, // Feedback comments
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating (1 to 5)
  createdAt: { type: Date, default: Date.now }, // Feedback timestamp
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
