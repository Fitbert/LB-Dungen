import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure you have styles defined
import ldLogo from '../assets/LD_Logo_1000px.png';

export default function SplashPage() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup'); // Ensure you have a route for "/signup"
  };

  return (
    <div className="--background bungee-regular">
      <header className="text-center">
        <h1>Welcome to The Language Dungeon</h1>
      </header>

      <main>
        <img src={ldLogo} alt="logo" />
        <h2>About The Language Dungeon</h2>
        <p>
          The Language Dungeon is your ultimate destination for language learning and exploration. 
          Embark on an exciting journey through the realms of words and unlock the secrets of effective communication.
        </p>

        <h2>Get Started</h2>
        <p>Begin your adventure!</p>
        <button onClick={handleSignUpClick}>Sign Up Now</button>
      </main>

      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>

      <script src=".client/cursor.js"></script>
    </div>
  );
}
