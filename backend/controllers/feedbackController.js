const Feedback = require('../models/Feedback');
const Voter = require('../models/Voter');
const Election = require('../models/Election');

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { voterId, electionId, comments, rating } = req.body;

    // Validate voter and election existence
    const voter = await Voter.findById(voterId);
    if (!voter) {
      return res.status(404).json({ error: 'Voter not found' });
    }

    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    // Save feedback
    const feedback = new Feedback({
      voter: voterId,
      election: electionId,
      comments,
      rating,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all feedback for an election
const getElectionFeedback = async (req, res) => {
  try {
    const { electionId } = req.params;

    const feedbacks = await Feedback.find({ election: electionId }).populate('voter', 'name email');
    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this election' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Analyze feedback for an election
const analyzeFeedback = async (req, res) => {
  try {
    const { electionId } = req.params;

    const feedbacks = await Feedback.find({ election: electionId });
    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this election' });
    }

    const totalFeedbacks = feedbacks.length;
    const averageRating =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedbacks;

    res.status(200).json({
      totalFeedbacks,
      averageRating,
      comments: feedbacks.map(feedback => feedback.comments),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getElectionFeedback,
  analyzeFeedback,
};
