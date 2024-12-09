
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ElectionMonitoring.css';

function ElectionMonitoring() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [progressData, setProgressData] = useState(null);

  // Fetch all elections
  const fetchElections = async () => {
    try {
      const response = await axios.get('/api/elections');
      setElections(response.data);
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  };

  // Fetch election progress data
  const fetchProgressData = async (electionId) => {
    try {
      const response = await axios.get(`/api/elections/${electionId}/progress`);
      setProgressData(response.data);
    } catch (error) {
      console.error('Error fetching election progress data:', error);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleElectionSelect = (electionId) => {
    setSelectedElection(electionId);
    fetchProgressData(electionId);
  };

  return (
    <div className="election-monitoring">
      <h1>Election Monitoring</h1>
      <div className="election-list">
        <h2>Available Elections</h2>
        {elections.length === 0 ? (
          <p>No elections available.</p>
        ) : (
          <ul>
            {elections.map((election) => (
              <li key={election._id}>
                <button onClick={() => handleElectionSelect(election._id)}>
                  {election.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {progressData && (
        <div className="election-progress">
          <h2>Election Progress</h2>
          <p><strong>Total Voters:</strong> {progressData.totalVoters}</p>
          <p><strong>Votes Cast:</strong> {progressData.votesCast}</p>
          <p><strong>Status:</strong> {progressData.progressStatus}</p>
          <div className="regions">
            <h3>Voter Turnout by Region</h3>
            {progressData.voterTurnoutByRegion.map((region) => (
              <div key={region.region} className="region">
                <p><strong>Region:</strong> {region.region}</p>
                <p><strong>Total Voters:</strong> {region.totalVotersInRegion}</p>
                <p><strong>Votes Cast:</strong> {region.votesCastInRegion}</p>
                <div className="cities">
                  <h4>Voter Turnout by City</h4>
                  {region.voterTurnoutByCity.map((city) => (
                    <div key={city.city} className="city">
                      <p><strong>City:</strong> {city.city}</p>
                      <p><strong>Total Voters:</strong> {city.totalVotersInCity}</p>
                      <p><strong>Votes Cast:</strong> {city.votesCastInCity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ElectionMonitoring;
