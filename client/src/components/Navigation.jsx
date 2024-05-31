// Bringing in the required import from 'react-router-dom'
import { Link } from 'react-router-dom';
import Navbar from './UI/Navbar';

export default function Navigation() {
  // pass link element to Navbar component as props so that Navbar function/component can map through the array of links and render them for use in the navbar on screen
  //TO DO: Decide exactly what page links we want so this can be edited to reflect that
  //TO DO: Remove classNames since not using bootstrap
  return (
    <Navbar
      links={[
        <Link key={1} className="nav-link text-light" to="/">
          Home
        </Link>,
        <Link key={2} className="nav-link text-light" to="/about">
          About Us
        </Link>,
      ]}
    />
  );
}
