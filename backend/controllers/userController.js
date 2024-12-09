const User = require('../models/User');

// Get all coordinators
const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await User.find({ role: 'Coordinator' }, 'name email region city'); // Fetch only relevant fields
    console.log('Coordinators fetched:', coordinators);
    res.status(200).json(coordinators);
  } catch (error) {
    console.error('Error fetching coordinators:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCoordinators };
