import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PollingStationManagement.css';

const PollingStationManagement = () => {
  const [pollingStations, setPollingStations] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [formData, setFormData] = useState({
    stationName: '',
    region: '',
    city: '',
    coordinatorId: '',
  });

  const [message, setMessage] = useState('');

  // Fetch coordinators and polling stations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coordinatorsResponse = await axios.get('/coordinators');
        const pollingStationsResponse = await axios.get('/polling-stations');
        setCoordinators(coordinatorsResponse.data);
        setPollingStations(pollingStationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to fetch data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/polling-station', formData);
      setPollingStations([...pollingStations, response.data.pollingStation]);
      setMessage('Polling station created successfully!');
    } catch (error) {
      console.error('Error creating polling station:', error);
      setMessage('Failed to create polling station.');
    }
  };

  return (
    <div className="polling-station-management">
      <h1>Polling Station Management</h1>
      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="stationName">Polling Station Name</label>
          <input
            type="text"
            id="stationName"
            name="stationName"
            value={formData.stationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="">Select Region</option>
            <option value="KPK">KPK</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Islamabad">Islamabad</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coordinatorId">Coordinator</label>
          <select
            id="coordinatorId"
            name="coordinatorId"
            value={formData.coordinatorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Coordinator</option>
            {coordinators.map((coordinator) => (
              <option key={coordinator._id} value={coordinator._id}>
                {coordinator.name} ({coordinator.region})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Polling Station</button>
      </form>

      <h2>Existing Polling Stations</h2>
      <div className="report">
        {pollingStations.map((station) => (
          <div key={station._id}>
            <h3>{station.stationName}</h3>
            <p>Region: {station.region}</p>
            <p>City: {station.city}</p>
            <p>Coordinator: {station.coordinator?.name || 'Unassigned'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollingStationManagement;
