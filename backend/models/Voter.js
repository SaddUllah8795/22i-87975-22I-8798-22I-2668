const mongoose = require('mongoose');

// Import Constituency schema
const Constituency = require('./Constituency'); // Ensure this file exists

// Voter Schema
const voterSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    unique: true,
    index: true,  // Index CNIC for better performance on searches
    validate: {
      validator: function (v) {
        return /^3\d{4}-\d{7}-\d{1}$/.test(v);
      },
      message: 'Invalid CNIC format. Format: 3xxxx-xxxxxxx-x',
    },
  },
  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows optional emails while ensuring uniqueness
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,12}$/, // Basic phone number validation (local/overseas)
  },
  address: {
    province: {
      type: String,
      required: true,
      enum: ['Punjab', 'Sindh', 'Balochistan', 'Khyber Pakhtunkhwa', 'Islamabad'],
    },
    city: {
      type: String,
      required: true,
    },
    constituency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency', // Reference to Constituency model
      required: true,
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (dob) {
        const age = new Date().getFullYear() - dob.getFullYear();
        return age >= 18; // Voter must be at least 18 years old
      },
      message: 'Voter must be at least 18 years old.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
      },
      message: 'Password must be at least 8 characters long, including uppercase, lowercase, a number, and a special character.',
    },
  },

  verified: {
    type: Boolean,
    default: false, // Becomes true after admin approval
  },
  verifiedAt: {
    type: Date,
  },  
  
  voted: {
    type: Boolean,
    default: false, // Indicates whether the voter has cast their vote
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },


});

// Pre-save hook to update the updatedAt field automatically
voterSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the schema as a Mongoose model
const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;

