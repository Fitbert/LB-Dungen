import React, { useState } from 'react';
//import apollo
import { useQuery, gql } from '@apollo/client';

//import the graphql query you will use to get the quiz info from the database in the quiz container logic: need to replace this placeholder query with our query
//is questions enough or will I have to dig a layer deeper to the 'question: content, answers' level of typedefs
//TO DO: Fix the query to match our typedefs after ceci updates their structure and queries are working
const GET_QUIZZES = gql`
  query {
    quizzes {
      id
      questions
    }
    answers {
      content
      questionId
    }
  }
`;
//TO DO: Update the properties/data being accessed to reflect the query fields from our data and replace the example data fields currently used

// Question component: dispays the question from the array of quesitons as the h3, maps through the array of answer choices to display them
//map throught the array of questions, then handle click event for choosing an answer
//onAnswer gets used in the handleAnswer function for even handling when user answers a question
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

// QuizContainer hold the logic and state/data for the quiz 
//handle answer compares user answer to the answer of the current quiz array item's answer and sets the data/state of score as +1 if right answer
//handle answer loops through all the quiz questions until it is done/at the last index of the questions
//quizResult component prints the score

const QuizContainer = () => {
  const { loading, error, data } = useQuery(GET_QUIZZES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
    const isCorrect = data?.quizzes[currentIndex].answer === answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentIndex < data?.quizzes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {currentIndex < data?.quizzes.length ? (
        <Question
          question={data.quizzes[currentIndex]}
          onAnswer={handleAnswer}
        />
      ) : (
        <QuizResult score={score} questions={data.quizzes} />
      )}
    </div>
  );
};

export default QuizContainer;

//VERSION BELOW NOT COMPATIBLE WITH MONGO DATA AND IS COMMENTED OUT:

// // Question component: dispays the question from the array of quesitons as the h3, maps through the array of answer choices to display them
// //map throught the array of questions, then handle click event for choosing an answer
// const Question = ({ question, choices, onAnswer }) => {
//   const handleAnswer = (choice) => {
//     onAnswer(choice);
//   };

//   return (
//     <div>
//       <h3>{question.question}</h3>
//       <ul>
//         {question.choices.map((choice, index) => (
//           <li key={index}>
//             <button onClick={() => handleAnswer(choice)}>{choice}</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // QuizResult component: displays number of questions answered correctly
// const QuizResult = ({ score, questions }) => {
//   return (
//     <div>
//       <h2>Your Score: {score}/{questions.length}</h2>
//       {/* You can display the correct answers here */}
//     </div>
//   );
// };

// // QuizContainer component quiz container component holds all the state/data for the current question index, quiz score, chosen answers

// //handle answer gets called when you choose and answer and updates state/data of the score based on answer choice
// //conditionally render either next question or end of quiz/results if it's the last question
// const QuizContainer = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [answers, setAnswers] = useState({});

//   const handleAnswer = (answer) => {
//     setAnswers({ ...answers, [currentIndex]: answer });
//     const isCorrect = quizData[currentIndex].answer === answer;
//     if (isCorrect) {
//       setScore(score + 1);
//     }
//     if (currentIndex < quizData.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       // Quiz completed
//     }
//   };

//   return (
//     <div>
//       {currentIndex < quizData.length ? (
//         <Question
//           question={quizData[currentIndex]}
//           onAnswer={handleAnswer}
//         />
//       ) : (
//         <QuizResult score={score} questions={quizData} />
//       )}
//     </div>
//   );
// };

// export default QuizContainer;