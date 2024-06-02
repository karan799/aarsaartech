// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import './styles/Navbar.css'; // Add your CSS styling here

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-customer">Add Customer</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
