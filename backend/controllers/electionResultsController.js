const ElectionResults = require('../models/ElectionResults');
const Election = require('../models/Election');
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');

// Publish Provisional Results
const publishProvisionalResults = async (req, res) => {
  try {
    const { electionId } = req.params;

    // Check if election exists
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    // Get the vote count from Voter panel (e.g., total votes per candidate)
    const electionResults = await ElectionResults.findOne({ election: electionId });
    if (!electionResults) {
      return res.status(404).json({ error: 'Election results data not found' });
    }

    // Set resultStatus to 'Provisional'
    electionResults.resultStatus = 'Provisional';

    // Calculate votes percentage and update result
    electionResults.candidatesResults.forEach(result => {
      const totalVotes = electionResults.totalVotes;
      result.percentage = (result.votes / totalVotes) * 100;
    });

    await electionResults.save();

    res.status(200).json({ message: 'Provisional results published successfully', electionResults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Publish Final Results
const publishFinalResults = async (req, res) => {
  try {
    const { electionId } = req.params;

    // Check if election exists
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    // Get the vote count from Voter panel (e.g., total votes per candidate)
    const electionResults = await ElectionResults.findOne({ election: electionId });
    if (!electionResults) {
      return res.status(404).json({ error: 'Election results data not found' });
    }

    // Set resultStatus to 'Final'
    electionResults.resultStatus = 'Final';

    // Calculate votes percentage and update result
    electionResults.candidatesResults.forEach(result => {
      const totalVotes = electionResults.totalVotes;
      result.percentage = (result.votes / totalVotes) * 100;
    });

    await electionResults.save();

    res.status(200).json({ message: 'Final results published successfully', electionResults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate Reports Based on Vote Counts
const generateReport = async (req, res) => {
  try {
    const { electionId } = req.params;

    const electionResults = await ElectionResults.findOne({ election: electionId });
    if (!electionResults) {
      return res.status(404).json({ error: 'Election results not found' });
    }

    // Generate a detailed report of the election results
    const report = {
      electionTitle: electionResults.election.title,
      totalVotes: electionResults.totalVotes,
      resultsByCandidate: electionResults.candidatesResults.map(result => ({
        candidate: result.candidate.name,
        votes: result.votes,
        percentage: result.percentage
      })),
      resultsByRegion: electionResults.votesByRegion,
      resultsByCity: electionResults.votesByCity
    };

    res.status(200).json({ message: 'Report generated successfully', report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  publishProvisionalResults,
  publishFinalResults,
  generateReport
};
