import { useNavigate } from 'react-router-dom';
import '../styles/QuizPage.css';
// Import QuizContainer component which has logic to render all the quiz content
import QuizContainer from '../components/QuizContainer';

export default function QuizPage() {
  

  

   
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
      <QuizContainer />
      {/*<div className="start-quiz-container">
        <button onClick={handleStartQuizClick}>Start Quiz</button>
      </div>
      */}

      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>
    </div>
  );
}
