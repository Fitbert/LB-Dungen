import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderBoard">Leader Board</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
