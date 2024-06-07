const { User, Quiz, Question } = require('../models');
const { authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('quizzes');
    },
    quizzes: async () => {
      return Quiz.find().populate('questions');
    },
    quiz: async (_, { id }) => {
      return Quiz.findById(id).populate('questions');
    },
    questions: async (_, { quizId }) => {
      return Question.find({ quizId });
    },
    question: async (_, { id }) => {
      return Question.findById(id).populate('answers');
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

module.exports = resolvers;