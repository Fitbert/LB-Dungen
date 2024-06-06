import React, { useState } from 'react';

// Question component: dispays the question from the array of quesitons as the h3, maps through the array of answer choices to display them

//map throught the array of questions, then handle click event for choosing an answer
const Question = ({ question, choices, onAnswer }) => {
  const handleAnswer = (choice) => {
    onAnswer(choice);
  };

  return (
    <div>
      <h3>{question.question}</h3>
      <ul>
        {question.choices.map((choice, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(choice)}>{choice}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// QuizResult component: displays number of questions answered correctly
const QuizResult = ({ score, questions }) => {
  return (
    <div>
      <h2>Your Score: {score}/{questions.length}</h2>
      {/* You can display the correct answers here */}
    </div>
  );
};

// QuizContainer component quiz container component holds all the state/data for the current question index, quiz score, chosen answers

//handle answer gets called when you choose and answer and updates state/data of the score based on answer choice
//conditionally render either next question or end of quiz/results if it's the last question
const QuizContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
    const isCorrect = quizData[currentIndex].answer === answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed
    }
  };

  return (
    <div>
      {currentIndex < quizData.length ? (
        <Question
          question={quizData[currentIndex]}
          onAnswer={handleAnswer}
        />
      ) : (
        <QuizResult score={score} questions={quizData} />
      )}
    </div>
  );
};

export default QuizContainer;