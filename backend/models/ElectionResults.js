const mongoose = require('mongoose');

const ElectionResultsSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  totalVotes: { type: Number, default: 0 },
  resultStatus: {
    type: String,
    enum: ['Provisional', 'Final'],
    default: 'Provisional',
  },
  candidatesResults: [{
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    votes: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 }
  }],
  votesByRegion: [{
    region: { type: String, enum: ['KPK', 'Punjab', 'Sindh', 'Balochistan', 'Islamabad'] },
    totalVotesInRegion: { type: Number, default: 0 },
    votesForCandidates: [{
      candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
      votes: { type: Number, default: 0 }
    }]
  }],
  votesByCity: [{
    city: { type: String },
    votesForCandidates: [{
      candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
      votes: { type: Number, default: 0 }
    }]
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ElectionResults', ElectionResultsSchema);
