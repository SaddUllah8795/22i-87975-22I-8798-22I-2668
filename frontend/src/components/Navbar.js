import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>Admin Panel</h1>
      <Link to="/">Home</Link> | <Link to="/register">Voter Management</Link>
    </nav>
  );
};

export default Navbar;
