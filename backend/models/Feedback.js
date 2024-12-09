// models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  voter: { type: String,  required: true }, 
  election: { type: String , required: true },
  comments: { type: String, required: true }, // Feedback comments
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating (1 to 5)
  createdAt: { type: Date, default: Date.now }, // Feedback timestamp
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
