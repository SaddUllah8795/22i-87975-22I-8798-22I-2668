import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/VoterManagement.css'; // Assuming you have a CSS file for styling

function VoterManagement() {
  const [voters, setVoters] = useState([]);
  const [constituencies, setConstituencies] = useState([]); // For dropdown
  const [formData, setFormData] = useState({
    cnic: '',
    name: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    constituency: '',
    dateOfBirth: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingVoterId, setEditingVoterId] = useState(null);

  // Fetch all voters
  const fetchVoters = async () => {
    try {
      const response = await axios.get('/api/voters');
      setVoters(response.data);
    } catch (error) {
      console.error('Error fetching voters:', error);
    }
  };

  // Fetch all constituencies
  const fetchConstituencies = async () => {
    try {
      const response = await axios.get('/api/constituencies');
      setConstituencies(response.data);
    } catch (error) {
      console.error('Error fetching constituencies:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        address: {
          province: formData.province,
          city: formData.city,
          constituency: formData.constituency,
        },
      };

      if (isEditing) {
        await axios.put(`/api/voters/${editingVoterId}`, dataToSend);
        setIsEditing(false);
        setEditingVoterId(null);
      } else {
        await axios.post('/api/voters/register', dataToSend);
      }

      setFormData({
        cnic: '',
        name: '',
        email: '',
        phone: '',
        province: '',
        city: '',
        constituency: '',
        dateOfBirth: '',
        password: '',
      });
      fetchVoters();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle delete voter
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/voters/${id}`);
      fetchVoters();
    } catch (error) {
      console.error('Error deleting voter:', error);
    }
  };

  // Handle edit voter
  const handleEdit = (voter) => {
    setFormData({
      ...voter,
      province: voter.address.province,
      city: voter.address.city,
      constituency: voter.address.constituency,
    });
    setIsEditing(true);
    setEditingVoterId(voter._id);
  };

  // Approve or reject voter
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`/api/voters/${id}/status`, { status });
      fetchVoters();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Update eligibility
  const handleEligibilityUpdate = async (id, eligibility) => {
    try {
      await axios.patch(`/api/voters/${id}/eligibility`, { eligibility });
      fetchVoters();
    } catch (error) {
      console.error('Error updating eligibility:', error);
    }
  };

  useEffect(() => {
    fetchVoters();
    fetchConstituencies();
  }, []);

  return (
    <div className="voter-management">
      <h1>Voter Management</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleInputChange} required />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required />
        <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
        <select name="constituency" value={formData.constituency} onChange={handleInputChange} required>
          <option value="" disabled>Select Constituency</option>
          {constituencies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
        <button type="submit">{isEditing ? 'Update Voter' : 'Add Voter'}</button>
      </form>

      <div className="voter-list">
        <table>
          <thead>
            <tr>
              <th>CNIC</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Province</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter._id}>
                <td>{voter.cnic}</td>
                <td>{voter.name}</td>
                <td>{voter.email}</td>
                <td>{voter.phone}</td>
                <td>{voter.address.province}</td>
                <td>{voter.address.city}</td>
                <td>
                  <button onClick={() => handleEdit(voter)}>Edit</button>
                  <button onClick={() => handleDelete(voter._id)}>Delete</button>
                  <button onClick={() => handleStatusUpdate(voter._id, 'approved')}>Approve</button>
                  <button onClick={() => handleStatusUpdate(voter._id, 'rejected')}>Reject</button>
                  <button onClick={() => handleEligibilityUpdate(voter._id, true)}>Make Eligible</button>
                  <button onClick={() => handleEligibilityUpdate(voter._id, false)}>Revoke Eligibility</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VoterManagement;
