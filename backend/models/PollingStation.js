const mongoose = require('mongoose');

const PollingStationSchema = new mongoose.Schema({
  stationName: { type: String, required: true, unique: true },
  region: { type: String, enum: ['KPK', 'Punjab', 'Sindh', 'Balochistan', 'Islamabad'], required: true },
  city: { type: String, required: true },
  coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Coordinator reference
  totalVoters: { type: Number, default: 0 }, // Total number of voters assigned to this polling station
  votersParticipated: { type: Number, default: 0 }, // Number of voters who have voted
  voterActivity: [{
    voter: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter' }, // Reference to Voter
    timestamp: { type: Date, default: Date.now } // Activity timestamp
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PollingStation', PollingStationSchema);
