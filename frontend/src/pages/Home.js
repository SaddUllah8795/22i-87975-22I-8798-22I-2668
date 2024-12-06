import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get('/api/voters');
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching voters', error);
      }
    };

    fetchVoters();
  }, []);

  return (
    <div>
      <h2>Registered Voters</h2>
      <ul>
        {voters.map((voter) => (
          <li key={voter._id}>{voter.name} - {voter.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
