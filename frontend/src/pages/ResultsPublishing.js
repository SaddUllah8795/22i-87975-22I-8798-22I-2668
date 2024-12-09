import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ResultsPublishing.css';

function ResultsPublishing() {
  const [elections, setElections] = useState([]); // List of elections
  const [selectedElection, setSelectedElection] = useState(null); // Current election
  const [report, setReport] = useState(null); // Report data
  const [message, setMessage] = useState(''); // Success/Error messages

  // Fetch all elections (assuming an endpoint exists to list them)
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get('/api/elections');
        setElections(response.data);
      } catch (error) {
        console.error('Error fetching elections:', error.response?.data || error.message);
      }
    };

    fetchElections();
  }, []);

  // Publish provisional results
  const publishProvisionalResults = async () => {
    try {
      const response = await axios.put(`/api/results/${selectedElection}/provisional`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while publishing provisional results.');
    }
  };

  // Publish final results
  const publishFinalResults = async () => {
    try {
      const response = await axios.put(`/api/results/${selectedElection}/final`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while publishing final results.');
    }
  };

  // Generate report
  const generateReport = async () => {
    try {
      const response = await axios.get(`/api/results/${selectedElection}/report`);
      setReport(response.data.report);
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while generating the report.');
    }
  };

  return (
    <div className="results-publishing">
      <h1>Results Publishing</h1>

      <div className="election-selector">
        <h2>Select Election</h2>
        <select
          value={selectedElection || ''}
          onChange={(e) => setSelectedElection(e.target.value)}
        >
          <option value="" disabled>
            Select an election
          </option>
          {elections.map((election) => (
            <option key={election._id} value={election._id}>
              {election.title}
            </option>
          ))}
        </select>
      </div>

      {selectedElection && (
        <div className="actions">
          <button onClick={publishProvisionalResults}>Publish Provisional Results</button>
          <button onClick={publishFinalResults}>Publish Final Results</button>
          <button onClick={generateReport}>Generate Report</button>
        </div>
      )}

      {message && <div className="message">{message}</div>}

      {report && (
        <div className="report">
          <h2>Election Report</h2>
          <p><strong>Election Title:</strong> {report.electionTitle}</p>
          <p><strong>Total Votes:</strong> {report.totalVotes}</p>
          <h3>Results By Candidate</h3>
          <ul>
            {report.resultsByCandidate.map((result, index) => (
              <li key={index}>
                {result.candidate}: {result.votes} votes ({result.percentage.toFixed(2)}%)
              </li>
            ))}
          </ul>
          <h3>Results By Region</h3>
          <ul>
            {report.resultsByRegion.map((region, index) => (
              <li key={index}>
                <strong>{region.region}</strong>: {region.totalVotesInRegion} votes
              </li>
            ))}
          </ul>
          <h3>Results By City</h3>
          <ul>
            {report.resultsByCity.map((city, index) => (
              <li key={index}>
                <strong>{city.city}</strong>: {city.votesForCandidates.length} candidates participated
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResultsPublishing;
