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
      return Quiz.find()
    },
    quizzes: async (_, { id }) => {
      return Quiz.findById(id).populate('questions');
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
    createQuiz: async (_, { title }) => {
      const newQuiz = new Quiz({ title });
      return await newQuiz.save();
    },
    addQuestion: async (_, { quizId, question, options, correctAnswer }) => {
      const newQuestion = new Question({ question, options, correctAnswer, quizId });
      return await newQuestion.save();
    },
  },
  Quiz: {
    questions: async (parent) => await Question.find({ quizId: parent.id }),
  },
};

module.exports = resolvers;