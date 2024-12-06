const express = require('express');
const {
  registerVoter,
  getAllVoters,
  updateVoter,
  deleteVoter,
  approveOrRejectVoter,
  updateEligibility,
} = require('../controllers/voterController');
const { validateVoterInput } = require('../middleware/validationMiddleware');

const router = express.Router();

// Register voter
router.post('/register', validateVoterInput, registerVoter);

// Get all voters
router.get('/', getAllVoters);

// Update voter
router.put('/:id', validateVoterInput, updateVoter);

// Delete voter
router.delete('/:id', deleteVoter);

// Update voter Status
router.patch('/:id/status', approveOrRejectVoter);

// Updates voter eligibility
router.patch('/:id/eligibility', updateEligibility);


module.exports = router;
