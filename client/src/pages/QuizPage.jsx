import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizPage.css';
// import '../cursor.js';
// 
export default function QuizPage() {
  // const navigate = useNavigate();

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
    // Navigate to the first question of the quiz
    navigate('/quiz/question/1');
  };

  return (
    <div className="quiz-page">

      <h1>Welcome to The Knowledge Crypt:</h1>
      <img src="src/assets/LD_Logo_1000px.png" alt="logo" className="logo" />

      <h2>Test Your Language Skills</h2>
      <div className="paragraph-container">
        <p>
          <span className="paragraph-text">
            Get ready to embark on an exciting quiz to challenge your language knowledge.
            Click the button below to start the quiz and prove your language mastery!
          </span>
        </p>
      </div>

      {/*<div className="start-quiz-container">
        <button onClick={handleStartQuizClick}>Start Quiz</button>
        <QuizContainer/>
      </div>
      */}

      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>
    </div>
  );
}

