const Voter = require('../models/Voter');

// Register a new voter
const registerVoter = async (req, res) => {
  try {
    const { cnic, name, email, phone, address, dateOfBirth, password } = req.body;

    // Create a new voter
    const voter = new Voter({
      cnic,
      name,
      email,
      phone,
      address,
      dateOfBirth,
      password,
    });

    await voter.save();

    res.status(201).json({ message: 'Voter registered successfully', voter });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all voters
const getAllVoters = async (req, res) => {
  try {
    const voters = await Voter.find().populate('address.constituency', 'name code');
    res.status(200).json(voters);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update voter information
const updateVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const voter = await Voter.findByIdAndUpdate(id, updatedData, { new: true }).populate(
      'address.constituency',
      'name code'
    );

    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    res.status(200).json({ message: 'Voter updated successfully', voter });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete voter
const deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;

    const voter = await Voter.findByIdAndDelete(id);

    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    res.status(200).json({ message: 'Voter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveOrRejectVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // If approved, set the verifiedAt field
    const updateFields = { status };
    if (status === 'approved') {
      updateFields.verifiedAt = Date.now(); // Set the approval time
    }

    const voter = await Voter.findByIdAndUpdate(id, updateFields, { new: true });
    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    res.status(200).json({ message: `Voter ${status} successfully`, voter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEligibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { eligibility } = req.body;  // true or false

    if (typeof eligibility !== 'boolean') {
      return res.status(400).json({ error: 'Eligibility must be a boolean value' });
    }

    const voter = await Voter.findByIdAndUpdate(id, { eligibility }, { new: true });
    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    res.status(200).json({ message: 'Voter eligibility updated successfully', voter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  registerVoter,
  getAllVoters,
  updateVoter,
  deleteVoter,
  approveOrRejectVoter,
  updateEligibility,
};
