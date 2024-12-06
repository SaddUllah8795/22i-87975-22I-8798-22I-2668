const mongoose = require('mongoose');

const ElectionProgressSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  totalVoters: { type: Number, required: true },
  votesCast: { type: Number, default: 0 },
  voterTurnoutByRegion: [{
    region: { type: String, enum: ['KPK', 'Punjab', 'Sindh', 'Balochistan', 'Islamabad'] },
    totalVotersInRegion: { type: Number },
    votesCastInRegion: { type: Number, default: 0 },
    voterTurnoutByCity: [{
      city: { type: String, required: true },
      totalVotersInCity: { type: Number },
      votesCastInCity: { type: Number, default: 0 }
    }]
  }],
  progressStatus: { 
    type: String, 
    enum: ['Upcoming', 'Ongoing', 'Completed'], 
    default: 'Upcoming' 
  },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ElectionProgress', ElectionProgressSchema);
