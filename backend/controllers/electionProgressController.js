const ElectionProgress = require('../models/ElectionProgress');
const Election = require('../models/Election');
const Voter = require('../models/Voter'); // Assuming you have the Voter model

// Get Election Progress (Fetch election progress data)
const getElectionProgress = async (req, res) => {
  try {
    const { electionId } = req.params; // Get the electionId from the URL parameters

    // Find election progress for the given election ID
    const electionProgress = await ElectionProgress.findOne({ election: electionId }).populate('election');

    if (!electionProgress) {
      return res.status(404).json({ error: 'Election progress data not found' });
    }

    // Return the election progress data
    res.status(200).json(electionProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Election Progress (e.g., when votes are cast)
const updateElectionProgress = async (req, res) => {
  try {
    const { electionId } = req.params;
    const { region, city, votesCastInRegion, votesCastInCity } = req.body;

    const electionProgress = await ElectionProgress.findOne({ election: electionId });

    if (!electionProgress) {
      return res.status(404).json({ error: 'Election progress data not found' });
    }

    // Update total votes cast
    electionProgress.votesCast += votesCastInRegion;

    // Update regional votes
    const regionData = electionProgress.voterTurnoutByRegion.find(r => r.region === region);
    if (regionData) {
      regionData.votesCastInRegion += votesCastInRegion;
    } else {
      electionProgress.voterTurnoutByRegion.push({
        region,
        totalVotersInRegion: await Voter.countDocuments({ region }),  // Get the total number of voters in the region
        votesCastInRegion
      });
    }

    // Update city-level votes within the region
    const cityData = regionData.voterTurnoutByCity.find(c => c.city === city);
    if (cityData) {
      cityData.votesCastInCity += votesCastInCity;
    } else {
      regionData.voterTurnoutByCity.push({
        city,
        totalVotersInCity: await Voter.countDocuments({ region, city }), // Get total voters in the city
        votesCastInCity
      });
    }

    // Update last updated time
    electionProgress.lastUpdated = new Date();

    await electionProgress.save();

    res.status(200).json({ message: 'Election progress updated successfully', electionProgress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getElectionProgress,
  updateElectionProgress
};
