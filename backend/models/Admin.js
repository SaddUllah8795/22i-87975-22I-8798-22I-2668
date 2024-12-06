const mongoose = require('mongoose');

// Import Constituency schema
const Constituency = require('./Constituency');

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,12}$/, // Phone number validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforce strong password policy
  },
  role: {
    type: String,
    default: 'admin', // Defaults to 'admin'
    enum: ['admin'], // Role restricted to 'admin'
  },
  assignedConstituencies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency', // Reference to Constituency schema
      required: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true, // Indicates if the admin account is active
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
adminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the schema as a Mongoose model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
