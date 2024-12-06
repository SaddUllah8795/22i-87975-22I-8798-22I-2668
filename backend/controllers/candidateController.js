// controllers/candidateController.js
const Candidate = require('../models/Candidate');
const Election = require('../models/Election'); // Import Election model


// Add a new candidate (without election initially)
const addCandidate = async (req, res) => {
  try {
    // If no election is provided in the request, set it to null or undefined
    const { election, ...candidateData } = req.body;

    const candidate = new Candidate({
      ...candidateData,
      election: election || null, // If election isn't provided, it will be null
    });

    await candidate.save();
    res.status(201).json({ message: 'Candidate added successfully', candidate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a candidate's profile
const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const candidate = await Candidate.findByIdAndUpdate(id, updatedData, { new: true });
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate updated successfully', candidate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a candidate
const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all candidates
const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const assignCandidateToElection = async (req, res) => {
  const { candidateId, electionId } = req.body;

  try {
    // Update the candidate to associate them with the election
    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { election: electionId },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Update the election's candidates array
    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    // Ensure the candidate is not already assigned
    if (election.candidates.includes(candidateId)) {
      return res.status(400).json({ error: 'Candidate is already assigned to this election' });
    }

    // Add the candidate to the election's candidates array
    election.candidates.push(candidateId);

    // Optionally, add candidate's information (e.g., noOfVotes) to candidatesInfo in the election
    election.candidatesInfo.push({
      candidate: candidateId,
      votes: [],
      noOfVotes: 0, // Set initial vote count to 0
    });

    await election.save();

    res.status(200).json({ message: 'Candidate assigned to election successfully', election });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidateById,
  assignCandidateToElection,
};
