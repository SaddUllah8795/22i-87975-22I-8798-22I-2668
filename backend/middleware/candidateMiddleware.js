const mongoose = require('mongoose');
const Candidate = require('../models/Candidate');
const Election = require('../models/Election');

// Validate Candidate Input (now election is optional)
const validateCandidateInput = (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    election,  // Election is optional during candidate creation
  } = req.body;

  // Validate first name
  if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
    return res.status(400).json({ error: 'First name is required and must be a valid string' });
  }

  // Validate last name
  if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
    return res.status(400).json({ error: 'Last name is required and must be a valid string' });
  }

  // Validate gender (optional, could be 'Male', 'Female', 'Non-binary')
  if (!['Male', 'Female', 'Non-binary'].includes(gender)) {
    return res.status(400).json({ error: 'Gender must be one of Male, Female, or Non-binary' });
  }

  // Validate date of birth (candidate must be at least 18 years old)
  const dob = new Date(dateOfBirth);
  const age = new Date().getFullYear() - dob.getFullYear();
  if (isNaN(dob.getTime()) || age < 18) {
    return res.status(400).json({ error: 'Candidate must be at least 18 years old' });
  }

  // Validate phone number (10-12 digits)
  if (!/^[0-9]{10,12}$/.test(phoneNumber)) {
    return res.status(400).json({ error: 'Phone number must be 10-12 digits' });
  }

  // Validate email format
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // If election is provided, validate it
  if (election) {
    // Check if election exists in the database
    Election.findById(election)
      .then((foundElection) => {
        if (!foundElection) {
          return res.status(400).json({ error: 'Election does not exist' });
        }
        next();  // Proceed to the next middleware
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  } else {
    // If no election is provided, just call next() and allow candidate creation
    next();
  }
};

// Check if candidate ID exists before updating or deleting
const checkCandidateExists = (req, res, next) => {
  const { id } = req.params;

  Candidate.findById(id)
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      next();
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

// Prevent assigning the same candidate to the same election multiple times
const preventDuplicateCandidateInElection = async (req, res, next) => {
  const { candidateId, electionId } = req.body;

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Check if the candidate is already assigned to the election
    if (candidate.election && candidate.election.toString() === electionId) {
      return res.status(400).json({ error: 'Candidate is already assigned to this election' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  validateCandidateInput,
  checkCandidateExists,
  preventDuplicateCandidateInElection,
};
