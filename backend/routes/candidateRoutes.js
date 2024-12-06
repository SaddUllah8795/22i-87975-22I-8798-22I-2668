const express = require('express');
const {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidateById,
  assignCandidateToElection,
} = require('../controllers/candidateController');

const {
  validateCandidateInput,
  checkCandidateExists,
  preventDuplicateCandidateInElection,
} = require('../middleware/candidateMiddleware'); // Import middleware functions

const router = express.Router();

// Route to add a new candidate with validation
router.post('/', validateCandidateInput, addCandidate);

// Route to update an existing candidate with validation
router.put('/:id', checkCandidateExists, validateCandidateInput, updateCandidate);

// Route to delete a candidate after ensuring it exists
router.delete('/:id', checkCandidateExists, deleteCandidate);

// Route to get all candidates
router.get('/', getAllCandidates);

// Route to get a single candidate by ID
router.get('/:id', checkCandidateExists, getCandidateById);

// Route to assign a candidate to an election with checks
router.post(
  '/assignToElection',
  preventDuplicateCandidateInElection, // Ensure no duplicate assignments
  assignCandidateToElection
);

module.exports = router;
