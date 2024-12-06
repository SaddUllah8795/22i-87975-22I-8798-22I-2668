const Election = require('../models/Election');
const Voter = require('../models/Voter');  // Assuming Voter model is available for city data

// Middleware to validate election ID
const validateElection = async (req, res, next) => {
  try {
    const { electionId } = req.params;

    // Check if the election exists in the database
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    next();  // If election is valid, proceed to the next middleware/controller
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware to validate region and city (if provided)
const validateRegionAndCity = async (req, res, next) => {
  const { region, city } = req.body;

  // Validate region
  const validRegions = ['KPK', 'Punjab', 'Sindh', 'Balochistan', 'Islamabad'];
  if (!validRegions.includes(region)) {
    return res.status(400).json({ error: 'Invalid region provided' });
  }

  // If city is provided, check if it's a valid city within the given region
  if (city) {
    const validCities = await Voter.distinct('city', { region });  // Get all unique cities for the region
    if (!validCities.includes(city)) {
      return res.status(400).json({ error: `City ${city} is not valid for the region ${region}` });
    }
  }

  next();  // If region and city are valid, proceed to the next middleware/controller
};

module.exports = {
  validateElection,
  validateRegionAndCity
};
