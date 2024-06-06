//need home page welcome here: instructions for logged in users
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
// import '../cursor.js';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = '../cursor.js';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const handleStartQuizClick = () => {
    // Navigate to the quiz page
    navigate('/quiz');
  };

  return (
    <div className="home-page">
      

      <h1>Welcome, [User]!</h1>
      <img src="src/assets/LD_Logo_1000px.png" alt="logo" className="logo" />

      <h2>Continue Your Language Learning Journey</h2>
      <div className="paragraph-container">
        <p>
          <span className="paragraph-text">
            Pick up where you left off and dive into the exciting world of language learning.
            Choose a quiz to test your skills and unlock new levels of language mastery.
          </span>
        </p>
      </div>

      <div className="quiz-container">
        <h2>Start a Quiz</h2>
        <button onClick={handleStartQuizClick}>Begin Quiz</button>
      </div>

      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>
    </div>
  );
}