const Voter = require('../models/Voter');

// Register a new voter
const registerVoter = async (req, res) => {
  try {
    console.log('Register Voter Request Body:', req.body); // Debug: Log incoming request body

    const { cnic, name, email, phone, address, dateOfBirth, password } = req.body;

  
    const voter = new Voter({
      cnic,
      name,
      email,
      phone, 
      address,
      dateOfBirth,
      password,
    });

    console.log('Voter Object to Save:', voter); // Debug: Log the voter object before saving

    await voter.save();

    console.log('Voter Saved Successfully:', voter); // Debug: Log successful save

    res.status(201).json({ message: 'Voter registered successfully', voter });
  } catch (error) {
    console.error('Error Registering Voter:', error); // Debug: Log errors
    res.status(400).json({ error: error.message });
  }
};



// Get all voters
const getAllVoters = async (req, res) => {
  try {
    console.log('Fetching all voters...'); // Debug: Log fetch attempt

    const voters = await Voter.find().populate('address.constituency', 'name code');

    console.log('Voters Fetched Successfully:', voters); // Debug: Log fetched voters

    res.status(200).json(voters);  
  } catch (error) {
    console.error('Error Fetching Voters:', error); // Debug: Log errors
    res.status(500).json({ error: error.message });
  }
};

// Update voter information
const updateVoter = async (req, res) => {
  try {
    console.log('Update Voter Request Body:', req.body); // Debug: Log update request

    const { id } = req.params;
    const updatedData = req.body;

    const voter = await Voter.findByIdAndUpdate(id, updatedData, { new: true }).populate(
      'address.constituency',
      'name code'
    );

    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    console.log('Voter Updated Successfully:', voter); // Debug: Log updated voter

    res.status(200).json({ message: 'Voter updated successfully', voter });
  } catch (error) {
    console.error('Error Updating Voter:', error); // Debug: Log errors
    res.status(400).json({ error: error.message });
  }
};

// Delete voter
const deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Delete Voter Request ID:', id); // Debug: Log voter ID

    const voter = await Voter.findByIdAndDelete(id);

    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    console.log('Voter Deleted Successfully:', voter); // Debug: Log deleted voter

    res.status(200).json({ message: 'Voter deleted successfully' });
  } catch (error) {
    console.error('Error Deleting Voter:', error); // Debug: Log errors
    res.status(500).json({ error: error.message });
  }
};

// Approve or reject voter
const approveOrRejectVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    console.log('Approve/Reject Voter Request:', { id, status }); // Debug: Log request details

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

    console.log(`Voter ${status} Successfully:`, voter); // Debug: Log approval/rejection

    res.status(200).json({ message: `Voter ${status} successfully`, voter });
  } catch (error) {
    console.error('Error Approving/Rejecting Voter:', error); // Debug: Log errors
    res.status(500).json({ error: error.message });
  }
};

// Update eligibility
const updateEligibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { eligibility } = req.body;  // true or false

    console.log('Update Eligibility Request:', { id, eligibility }); // Debug: Log request details

    if (typeof eligibility !== 'boolean') {
      return res.status(400).json({ error: 'Eligibility must be a boolean value' });
    }

    const voter = await Voter.findByIdAndUpdate(id, { eligibility }, { new: true });

    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    console.log('Voter Eligibility Updated Successfully:', voter); // Debug: Log updated eligibility

    res.status(200).json({ message: 'Voter eligibility updated successfully', voter });
  } catch (error) {
    console.error('Error Updating Eligibility:', error); // Debug: Log errors
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
