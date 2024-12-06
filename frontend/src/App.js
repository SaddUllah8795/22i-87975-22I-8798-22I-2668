import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VoterManagement from './pages/VoterManagement';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to the Admin Panel</h1>} />
        <Route path="/register" element={<VoterManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
