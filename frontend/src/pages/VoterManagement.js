import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [newVoter, setNewVoter] = useState({
    name: '',
    email: '',
    cnic: '',
    contactNo: '',
  });
  const [editingVoter, setEditingVoter] = useState(null); // For editing voter info

  // Fetch voters from the backend
  const fetchVoters = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/voters`);
      setVoters(response.data);
    } catch (error) {
      console.error('Error fetching voters:', error);
    }
  };

  // Register a new voter
  const handleRegister = async () => {
    try {
      if (!/^3\d{4}-\d{7}-\d{1}$/.test(newVoter.cnic)) {
        alert('Invalid CNIC format. Format: 3xxxx-xxxxxxx-x');
        return;
      }
      if (!/^\d{11}$/.test(newVoter.contactNo)) {
        alert('Contact number must be 11 digits');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newVoter.email)) {
        alert('Invalid email format');
        return;
      }

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, newVoter);
      console.log('Registering voter:', newVoter);
      fetchVoters(); // Refresh the voter list
      setNewVoter({ name: '', email: '', cnic: '', contactNo: '' });
    } catch (error) {
      console.error('Error registering voter:', error);
    }
  };

  // Update voter status (approve/reject)
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/voters/${id}/status`, { status });
      fetchVoters(); // Refresh the voter list
    } catch (error) {
      console.error('Error updating voter status:', error);
    }
  };

  // Update voter information
  const handleUpdateVoter = async () => {
    try {
      if (!/^3\d{4}-\d{7}-\d{1}$/.test(editingVoter.cnic)) {
        alert('Invalid CNIC format. Format: 3xxxx-xxxxxxx-x');
        return;
      }
      if (!/^\d{11}$/.test(editingVoter.contactNo)) {
        alert('Contact number must be 11 digits');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingVoter.email)) {
        alert('Invalid email format');
        return;
      }

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/voters/${editingVoter._id}`,
        editingVoter
      );
      setEditingVoter(null); // Close the edit form
      fetchVoters(); // Refresh the voter list
    } catch (error) {
      console.error('Error updating voter:', error);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  return (
    <div>
      <h1>Voter Management</h1>

      <div>
        <h2>Register New Voter</h2>
        <input
          type="text"
          placeholder="Name"
          value={newVoter.name}
          onChange={(e) => setNewVoter({ ...newVoter, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newVoter.email}
          onChange={(e) => setNewVoter({ ...newVoter, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="CNIC (3xxxx-xxxxxxx-x)"
          value={newVoter.cnic}
          onChange={(e) => setNewVoter({ ...newVoter, cnic: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Number (11 digits)"
          value={newVoter.contactNo}
          onChange={(e) => setNewVoter({ ...newVoter, contactNo: e.target.value })}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Voter List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>CNIC</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter._id}>
                <td>{voter.name}</td>
                <td>{voter.email}</td>
                <td>{voter.cnic}</td>
                <td>{voter.contactNo}</td>
                <td>{voter.status}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(voter._id, 'approved')}>Approve</button>
                  <button onClick={() => handleStatusUpdate(voter._id, 'rejected')}>Reject</button>
                  <button onClick={() => setEditingVoter(voter)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingVoter && (
        <div style={{ marginTop: '20px' }}>
          <h2>Edit Voter Information</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingVoter.name}
            onChange={(e) => setEditingVoter({ ...editingVoter, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editingVoter.email}
            onChange={(e) => setEditingVoter({ ...editingVoter, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="CNIC (3xxxx-xxxxxxx-x)"
            value={editingVoter.cnic}
            onChange={(e) => setEditingVoter({ ...editingVoter, cnic: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Number (11 digits)"
            value={editingVoter.contactNo}
            onChange={(e) => setEditingVoter({ ...editingVoter, contactNo: e.target.value })}
          />
          <button onClick={handleUpdateVoter}>Save Changes</button>
          <button onClick={() => setEditingVoter(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default VoterManagement;

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [newVoter, setNewVoter] = useState({
    name: '',
    email: '',
    cnic: '',
    contactNo: '',
  });

  // Fetch voters from the backend
  const fetchVoters = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/voters`);
      setVoters(response.data);
    } catch (error) {
      console.error('Error fetching voters:', error);
    }
  };

  // Register a new voter
  const handleRegister = async () => {
    try {
      if (!/^3\d{4}-\d{7}-\d{1}$/.test(newVoter.cnic)) {
        alert('Invalid CNIC format. Format: 3xxxx-xxxxxxx-x');
        return;
      }
      if (!/^\d{11}$/.test(newVoter.contactNo)) {
        alert('Contact number must be 11 digits');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newVoter.email)) {
        alert('Invalid email format');
        return;
      }

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/voters/register`, newVoter);
      fetchVoters(); // Refresh the voter list
      setNewVoter({ name: '', email: '', cnic: '', contactNo: '' });
    } catch (error) {
      console.error('Error registering voter:', error);
    }
  };

  // Update voter status (approve/reject)
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/voters/${id}/status`, { status });
      fetchVoters(); // Refresh the voter list
    } catch (error) {
      console.error('Error updating voter status:', error);
    }
  };

  // Update voter information
  const handleUpdateVoter = async (id, updatedData) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/voters/${id}`, updatedData);
      fetchVoters(); // Refresh the voter list
    } catch (error) {
      console.error('Error updating voter:', error);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  return (
    <div>
      <h1>Voter Management</h1>
      
      <div>
        <h2>Register New Voter</h2>
        <input
          type="text"
          placeholder="Name"
          value={newVoter.name}
          onChange={(e) => setNewVoter({ ...newVoter, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newVoter.email}
          onChange={(e) => setNewVoter({ ...newVoter, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="CNIC (3xxxx-xxxxxxx-x)"
          value={newVoter.cnic}
          onChange={(e) => setNewVoter({ ...newVoter, cnic: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Number (11 digits)"
          value={newVoter.contactNo}
          onChange={(e) => setNewVoter({ ...newVoter, contactNo: e.target.value })}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Voter List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>CNIC</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter._id}>
                <td>{voter.name}</td>
                <td>{voter.email}</td>
                <td>{voter.cnic}</td>
                <td>{voter.contactNo}</td>
                <td>{voter.status}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(voter._id, 'approved')}>Approve</button>
                  <button onClick={() => handleStatusUpdate(voter._id, 'rejected')}>Reject</button>
                  {// You can add a form to update voter info here }
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
    
    export default VoterManagement;
    
    
    */
    