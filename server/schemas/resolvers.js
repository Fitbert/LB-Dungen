const { User } = require('../models');
const { authMiddleware } = require('../utils/auth');

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

module.exports = {
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
    me: async (_, __, context) => {
      return User.findOne({ _id: context.user._id }).populate('quizzes');
    },
  },

  Mutation: {
    addUser: async (_, { username, password }) => {
      const user = await User.create({ username, password });
      const token = authMiddleware(user);
      return { token, user };
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Incorrect credentials');
      }

      const token = authMiddleware(user);
      return { token, user };
    },
    addQuiz: async (_, { title }) => {
      const quiz = { id: quizzes.length + 1, title, questions: [] };
      quizzes.push(quiz);
      return quiz;
    },
    addQuestion: async (_, { content, quizId }) => {
      const question = { id: quizzes.flatMap((quiz) => quiz.questions).length + 1, content, answers: [] };
      const quiz = quizzes.find((quiz) => quiz.id === quizId);
      quiz.questions.push(question);
      return question;
    },
    addAnswer: async (_, { content, questionId }) => {
      const answer = { id: quizzes.flatMap((quiz) => quiz.questions).flatMap((question) => question.answers).length + 1, content, questionId };
      const question = quizzes.flatMap((quiz) => quiz.questions).find((question) => question.id === questionId);
      question.answers.push(answer);
      return answer;
    },
  },
};
