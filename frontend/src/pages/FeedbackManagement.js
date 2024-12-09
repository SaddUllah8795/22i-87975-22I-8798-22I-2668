import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FeedbackManagement.css';

function FeedbackManagement() {
  const [electionId, setElectionId] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [analyzedData, setAnalyzedData] = useState(null);
  const [formData, setFormData] = useState({
    voter: '',
    election: '',
    comments: '',
    rating: '',
  });

  // Fetch feedback for a specific election
  const fetchFeedback = async (electionId) => {
    try {
      console.log('Fetching feedback for election ID:', electionId); // Debugging
      const response = await axios.get(`/api/feedback/${electionId}`);
      console.log('Fetched Feedback:', response.data); // Debugging
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error.response?.data || error.message);
    }
  };

  // Analyze feedback for a specific election
  const analyzeFeedback = async (electionId) => {
    try {
      console.log('Analyzing feedback for election ID:', electionId); // Debugging
      const response = await axios.get(`/api/feedback/${electionId}/analyze`);
      console.log('Analyzed Feedback Data:', response.data); // Debugging
      setAnalyzedData(response.data);
    } catch (error) {
      console.error('Error analyzing feedback:', error.response?.data || error.message);
    }
  };

  // Handle form submission for feedback
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data Before Submission:', formData); // Debugging
      const response = await axios.post('/api/feedback/submit', formData);
      console.log('Feedback Submitted:', response.data); // Debugging
      setFormData({ voter: '', election: '', comments: '', rating: '' });
      if (formData.election) {
        fetchFeedback(formData.election); // Refresh feedback for the election
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.response?.data || error.message);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="feedback-management">
      <h1>Feedback Management</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="voter"
          placeholder="Voter Name"
          value={formData.voter}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="election"
          placeholder="Election Title"
          value={formData.election}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleInputChange}
          required
        ></textarea>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        <button type="submit">Submit Feedback</button>
      </form>

      <div className="feedback-view">
        <h2>View Feedback</h2>
        <input
          type="text"
          placeholder="Enter Election Title"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
        />
        <button onClick={() => fetchFeedback(electionId)}>Fetch Feedback</button>
        <ul>
          {feedbackList.map((feedback, index) => (
            <li key={index}>
              <strong>Voter Name:</strong> {feedback.voter}
              <br />
              <strong>Comments:</strong> {feedback.comments}
              <br />
              <strong>Rating:</strong> {feedback.rating}
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback-analysis">
        <h2>Analyze Feedback</h2>
        <button onClick={() => analyzeFeedback(electionId)}>Analyze Feedback</button>
        {analyzedData && (
          <div>
            <p><strong>Average Rating:</strong> {analyzedData.averageRating}</p>
            <p><strong>Total Feedback:</strong> {analyzedData.totalFeedbacks}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackManagement;
