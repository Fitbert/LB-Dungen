const { User, Quiz, Question, Answer } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');

const quizzes = [
  {
    id: '1',
    title: 'Spanish Basics',
    questions: [
      {
        id: '1',
        content: 'What is the Spanish word for "apple"?',
        answers: [
          { id: '1', content: 'Manzana', questionId: '1' },
          { id: '2', content: 'Pera', questionId: '1' },
        ],
      },
      {
        id: '2',
        content: 'How do you say "Good morning" in Spanish?',
        answers: [
          { id: '3', content: 'Buenos días', questionId: '2' },
          { id: '4', content: 'Buenas noches', questionId: '2' },
        ],
      },
    ],
  },
];

export const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('quizzes');
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('quizzes');
    },
    quizzes: async () => {
      return quizzes;
    },
    quiz: async (_, { id }) => {
      return quizzes.find((quiz) => quiz.id === id);
    },
    questions: async () => {
      return quizzes.flatMap((quiz) => quiz.questions);
    },
    question: async (_, { id }) => {
      return quizzes.flatMap((quiz) => quiz.questions).find((question) => question.id === id);
    },
    answers: async () => {
      return quizzes.flatMap((quiz) =>
        quiz.questions.flatMap((question) => question.answers)
      );
    },
    answer: async (_, { id }) => {
      return quizzes
        .flatMap((quiz) => quiz.questions)
        .flatMap((question) => question.answers)
        .find((answer) => answer.id === id);
    },
  },
  Quiz: {
    questions: async (parent) => {
      return parent.questions;
    },
  },
  Question: {
    answers: async (parent) => {
      return parent.answers;
    },
  },
};
