const mongoose = require('mongoose');

// Import required schemas
const Admin = require('./Admin'); // Admin schema reference
const Candidate = require('./Candidate'); // Candidate schema reference
const Vote = require('./Vote'); // Vote schema reference
const Constituency = require('./Constituency'); // Constituency schema reference

// Candidate Election Information Schema
const CandidateElectionInfoSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true }, // Reference to Candidate
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }], // Array of references to Vote schema
    noOfVotes: { 
        type: Number, 
        default: 0 
    } // Total number of votes, updated automatically
});

// Middleware to update noOfVotes automatically
CandidateElectionInfoSchema.pre('save', async function (next) {
    if (this.votes) {
        this.noOfVotes = this.votes.length; // Update the vote count based on the array length
    }
    next();
});

// Main Election Schema
const ElectionSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Election title (e.g., "Pakistani General Elections 2024")
    date: { type: Date, required: true }, // Election date
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to Admin
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }], // Array of Candidate references
    constituencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Constituency' }], // Array of Constituency references
    candidatesInfo: [CandidateElectionInfoSchema], // Array of Candidate Election Information
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' }, // Status of the election
    createdAt: { type: Date, default: Date.now } // Creation timestamp
});

// Export Election model
module.exports = mongoose.model('Election', ElectionSchema);
