import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FraudDetectionManagement.css';

function FraudDetectionManagement() {
  const [irregularities, setIrregularities] = useState([]);
  const [formData, setFormData] = useState({
    voterId: '',
    ipAddress: '',
    action: '',
    irregularityId: '',
    resolutionDetails: '',
  });

  // Fetch irregularities
  const fetchIrregularities = async () => {
    try {
      const response = await axios.get('/api/fraud-detection');
      console.log('Fetched Irregularities:', response.data); // Debugging
      setIrregularities(response.data);
    } catch (error) {
      console.error('Error fetching irregularities:', error.response?.data || error.message);
    }
  };

  // Detect multiple votes
  const handleDetectMultipleVotes = async (e) => {
    e.preventDefault();
    try {
      console.log('Detecting Multiple Votes for:', formData.voterId); // Debugging
      const response = await axios.post('/api/fraud-detection/detect-multiple-votes', {
        voterId: formData.voterId,
      });
      console.log('Detection Response:', response.data); // Debugging
      fetchIrregularities(); // Refresh irregularities list
    } catch (error) {
      console.error('Error detecting multiple votes:', error.response?.data || error.message);
    }
  };

  // Detect unauthorized access
  const handleDetectUnauthorizedAccess = async (e) => {
    e.preventDefault();
    try {
      console.log('Detecting Unauthorized Access:', formData.ipAddress, formData.action); // Debugging
      const response = await axios.post('/api/fraud-detection/detect-unauthorized-access', {
        ipAddress: formData.ipAddress,
        action: formData.action,
      });
      console.log('Unauthorized Access Response:', response.data); // Debugging
      fetchIrregularities(); // Refresh irregularities list
    } catch (error) {
      console.error('Error detecting unauthorized access:', error.response?.data || error.message);
    }
  };

  // Resolve an irregularity
  const handleResolveIrregularity = async (e) => {
    e.preventDefault();
    try {
      console.log('Resolving Irregularity:', formData.irregularityId, formData.resolutionDetails); // Debugging
      const response = await axios.post('/api/fraud-detection/resolve', {
        irregularityId: formData.irregularityId,
        resolutionDetails: formData.resolutionDetails,
      });
      console.log('Resolution Response:', response.data); // Debugging
      fetchIrregularities(); // Refresh irregularities list
    } catch (error) {
      console.error('Error resolving irregularity:', error.response?.data || error.message);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchIrregularities();
  }, []);

  return (
    <div className="fraud-detection-management">
      <h1>Fraud Detection and Security Monitoring</h1>

      {/* Detect Multiple Votes */}
      <form onSubmit={handleDetectMultipleVotes}>
        <h2>Detect Multiple Votes</h2>
        <input
          type="text"
          name="voterId"
          placeholder="Voter ID"
          value={formData.voterId}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Detect</button>
      </form>

      {/* Detect Unauthorized Access */}
      <form onSubmit={handleDetectUnauthorizedAccess}>
        <h2>Detect Unauthorized Access</h2>
        <input
          type="text"
          name="ipAddress"
          placeholder="IP Address"
          value={formData.ipAddress}
          onChange={handleInputChange}
          required
        />
        <select
          name="action"
          value={formData.action}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="Authorized">Authorized</option>
          <option value="Unauthorized">Unauthorized</option>
        </select>
        <button type="submit">Detect</button>
      </form>

      {/* Resolve Irregularities */}
      <form onSubmit={handleResolveIrregularity}>
        <h2>Resolve Irregularity</h2>
        <select
          name="irregularityId"
          value={formData.irregularityId}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Irregularity
          </option>
          {irregularities
            .filter((irregularity) => !irregularity.resolved)
            .map((irregularity) => (
              <option key={irregularity._id} value={irregularity._id}>
                {irregularity.details}
              </option>
            ))}
        </select>
        <textarea
          name="resolutionDetails"
          placeholder="Resolution Details"
          value={formData.resolutionDetails}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Resolve</button>
      </form>

      {/* Irregularities List */}
      <div className="irregularities-list">
        <h2>Irregularities</h2>
        <ul>
          {irregularities.map((irregularity) => (
            <li key={irregularity._id}>
              <strong>Type:</strong> {irregularity.type}
              <br />
              <strong>Details:</strong> {irregularity.details}
              <br />
              <strong>Resolved:</strong> {irregularity.resolved ? 'Yes' : 'No'}
              {irregularity.resolved && (
                <>
                  <br />
                  <strong>Resolution:</strong> {irregularity.resolutionDetails}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FraudDetectionManagement;
