// Bringing in the required import from 'react-router-dom'
import { Link } from 'react-router-dom';
import Navbar from './UI/Navbar';

export default function Navigation() {
  // pass link element to Navbar component as props so that Navbar function/component can map through the array of links and render them for use in the navbar on screen
  
  return (
    <Navbar
      links={[
        <Link key={1}  to="/home">
          Home
        </Link>,
        <Link key={2}  to="/leaderboard">
          Leader Board
        </Link>,
        <Link key={3}  to="/quiz">
        Quiz
      </Link>,
      ]}
    />
  );
}
