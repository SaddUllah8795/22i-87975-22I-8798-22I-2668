const mongoose = require('mongoose');

// Vote Schema
const voteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voter', // Reference to the Voter model
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate', // Reference to the Candidate model
    required: true,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election', // Reference to the Election model
    required: true,
  },
  voteTimestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['valid', 'invalid'], // Allows only "valid" or "invalid" votes
    default: 'valid', // Default status is valid
  },
  uniqueVoteId: {
    type: String,
    required: true,
    unique: true, // Ensures each vote has a unique identifier
  },
});

// Pre-save hook to generate a unique vote ID
voteSchema.pre('save', function (next) {
  if (!this.uniqueVoteId) {
    this.uniqueVoteId = `${this.voter}-${this.candidate}-${this.election}-${Date.now()}`;
  }
  next();
});

// Export the schema as a Mongoose model
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
