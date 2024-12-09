import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CandidateManagement.css';

function CandidateManagement() {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    candidateID: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
    occupation: '',
    skills: '',
    isVisible: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCandidateId, setEditingCandidateId] = useState(null);

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
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
      let response;
      if (isEditing) {
        response = await axios.put(`/api/candidates/${editingCandidateId}`, formData);
        setIsEditing(false);
        setEditingCandidateId(null);
      } else {
        response = await axios.post('/api/candidates', formData);
      }
      console.log('Server Response:', response.data);
      fetchCandidates();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      candidateID: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      address: '',
      occupation: '',
      skills: '',
      isVisible: true,
    });
  };

  // Handle delete candidate
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/candidates/${id}`);
      fetchCandidates();
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  // Handle edit candidate
  const handleEdit = (candidate) => {
    setFormData(candidate);
    setIsEditing(true);
    setEditingCandidateId(candidate._id);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="candidate-management">
      <h1>Candidate Management</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="candidateID"
          placeholder="Candidate ID"
          value={formData.candidateID}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? 'Update Candidate' : 'Add Candidate'}</button>
      </form>
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <div key={candidate._id} className="candidate-item">
            <p>
              <strong>ID:</strong> {candidate.candidateID}
            </p>
            <p>
              <strong>Name:</strong> {candidate.fullName}
            </p>
            <p>
              <strong>Gender:</strong> {candidate.gender}
            </p>
            <p>
              <strong>Email:</strong> {candidate.email}
            </p>
            <button onClick={() => handleEdit(candidate)}>Edit</button>
            <button onClick={() => handleDelete(candidate._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateManagement;
