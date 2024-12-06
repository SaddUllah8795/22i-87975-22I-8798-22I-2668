// models/Candidate.js
const mongoose = require('mongoose');

const Election = require('./Election'); // Import Election model

// Sibling Schema
const SiblingSchema = new mongoose.Schema({
    name: { type: String, required: true } // Only the sibling's name
  });
  
// Spouse Schema
const SpouseSchema = new mongoose.Schema({
    name: { type: String },
    dateOfBirth: { type: Date },
    occupation: { type: String }
});

// Child Schema
const ChildSchema = new mongoose.Schema({
    name: { type: String },
    dateOfBirth: { type: Date },
    occupation: { type: String },
    educationalBackground: { type: String }
});

// Other schemas (Sibling, SocialMedia, etc.)...

// Main Candidate Schema
const CandidateSchema = new mongoose.Schema({
    candidateID: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, default: function () { return `${this.firstName} ${this.lastName}`; } },
    gender: { type: String, enum: ['Male', 'Female', 'Non-binary'] },
    dateOfBirth: { type: Date },
    placeOfBirth: { type: String },
    nationality: { type: String, default: 'Pakistan' },
    religion: { type: String },
    maritalStatus: { type: String },
    spouse: SpouseSchema,
    children: [ChildSchema],
    familyBackground: { parentsOccupation: { type: String },
     parentsPoliticalAffiliations: { type: String },
      siblings: [SiblingSchema] 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        match: /^[0-9]{10,12}$/ // Matches 10-12 digit phone numbers
      },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/, 
      },
    website: { type: String, required: false },
    address: { type: String, required: true },
    occupation: { type: String },
    skills: [String],
    education: { highestDegree: { type: String }, university: { type: String }, yearOfGraduation: { type: Date }, subjectsOfStudy: [String], otherCertifications: [String] },
    politicalBackground: { partyMembership: { type: String }, politicalPositionsHeld: { type: String }, keyPoliticalStance: [String], publicServiceRecord: { type: String } },
    legalAndCriminalBackground: {
        criminalRecord: { type: Boolean, default: false }, // Default false
        legalIssues: { type: String, required: false  }
      },
    election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election', // Reference to Election model
    required: false, 
  },
  isVisible: { type: Boolean, default: true }, // Manage visibility of candidates


});

module.exports = mongoose.model('Candidate', CandidateSchema);
