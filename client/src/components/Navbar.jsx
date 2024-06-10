import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/leaderBoard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li>
            <Link to="/donate">Donate</Link>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </nav>
  );
}
