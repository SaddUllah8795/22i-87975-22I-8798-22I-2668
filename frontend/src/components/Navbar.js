import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Admin Panel</div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${menuOpen ? 'dropdown show' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/manage-voters" onClick={() => setMenuOpen(false)}>Manage Voters</Link></li>
        <li><Link to="/manage-candidates" onClick={() => setMenuOpen(false)}>Manage Candidates</Link></li>
        <li><Link to="/monitor-elections" onClick={() => setMenuOpen(false)}>Monitor Elections</Link></li>
        <li><Link to="/results-publishing" onClick={() => setMenuOpen(false)}>Results Publishing</Link></li>
        <li><Link to="/polling-station-management" onClick={() => setMenuOpen(false)}>Polling Station Management</Link></li>
        <li><Link to="/feedback-management" onClick={() => setMenuOpen(false)}>User Feedback</Link></li>
        <li><Link to="/fraud-detection" onClick={() => setMenuOpen(false)}>Fraud Detection</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
