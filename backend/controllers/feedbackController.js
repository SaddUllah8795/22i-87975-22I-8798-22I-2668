const Feedback = require('../models/Feedback');

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { voter, election, comments, rating } = req.body;

    // Save feedback
    const feedback = new Feedback({
      voter, // Store voter as string
      election, // Store election as string
      comments,
      rating,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error submitting feedback:', error.message); // Debugging log
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all feedback for an election
const getElectionFeedback = async (req, res) => {
  try {
    const { electionId } = req.params;

    // Find feedback by election string
    const feedbacks = await Feedback.find({ election: electionId });
    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this election' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error retrieving feedback:', error.message); // Debugging log
    res.status(500).json({ error: error.message });
  }
};

// Analyze feedback for an election
const analyzeFeedback = async (req, res) => {
  try {
    const { electionId } = req.params;

    // Find feedback by election string
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
      comments: feedbacks.map((feedback) => feedback.comments),
    });
  } catch (error) {
    console.error('Error analyzing feedback:', error.message); // Debugging log
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getElectionFeedback,
  analyzeFeedback,
};
