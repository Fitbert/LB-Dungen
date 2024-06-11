import React, { useState } from 'react';
//import apollo and useQuery hook to fetch data from graphQL API
import { useQuery, gql } from '@apollo/client';

//import the graphql query you will use to get the quiz info from the database in the quiz container logic: need to replace this placeholder query with our query
//is questions enough or will I have to dig a layer deeper to the 'question: content, answers' level of typedefs
//query gets a quiz by its unique identifier $id
//get quizzes const allows us to find quizzes by their Ids using useEffect hook below to randomly select a quiz by id


const GET_QUIZZES = gql`
  query {
    quizzes {
      _id
    }
  }
`;
const GET_QUIZ = gql`
  query GetQuiz($id: ID!) {
    quiz(_id: $id) {
      _id
      title
      questions {
        _id
        question
        options
        correctAnswer
      }
    }
  }
`;

//TO DO: Update the properties/data being accessed to reflect the query fields from our data and replace the example data fields currently used

// Question component: dispays the question from the array of quesitons as the h3, maps through the array of answer choices to display them
//map throught the array of questions, then handle click event for choosing an answer
//onAnswer gets used in the handleAnswer function for even handling when user answers a question
const Question = ({ question, onAnswer }) => {
  const handleAnswer = (choice) => {
    onAnswer(choice);
  };

  return (
    <div>
      <h3>{question.question}</h3>
      <ul>
        {question.options.map((choice, index) => (
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

// QuizContainer holds the logic and state/data for the quiz 
//handle answer compares user answer to the answer of the current quiz array item's answer and sets the data/state of score as +1 if right answer
//handle answer loops through all the quiz questions until it is done/at the last index of the questions
//quizResult component prints the score
//TO DO: make quizId dynamic instead of hard coded

const QuizContainer = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizId, setQuizId] = useState(null);


  const { loading: loadingQuizzes, error: errorQuizzes, data: quizzesData } = useQuery(GET_QUIZZES);
  const { loading: loadingQuiz, error: errorQuiz, data: quizData } = useQuery(GET_QUIZ, {
    variables: { id: quizId },
    skip: !quizId,
  });
  
  useEffect(() => {
    if (quizzesData && quizzesData.quizzes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quizzesData.quizzes.length);
      setQuizId(quizzesData.quizzes[randomIndex]._id);
    }
  }, [quizzesData]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
    const isCorrect = quizData?.quiz.questions[currentIndex].correctAnswer === answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentIndex < quizData?.quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed
    }
  };

  if (loadingQuizzes) return <p>Loading quizzes...</p>;
  if (errorQuizzes) return <p>Error loading quizzes by id </p>;

  if (loadingQuiz) return <p>Loading quiz...</p>;
  if (errorQuiz) return <p>Error loading quiz </p>;

  return (
    <div>
    {quizData && quizData.quiz.questions.length > 0 ? (
        currentIndex < quizData.quiz.questions.length ? (
          <Question
  question={quizData.quiz.questions[currentIndex]}
  onAnswer={handleAnswer}
/>
        ) : (
          <QuizResult score={score} questions={quizData.quiz.questions} />
        )
      ) : (
        <p>No quizzes available</p>
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