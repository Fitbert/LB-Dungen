const { User, Quiz, Questions, Answer } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('quizzes');
        },
        quizzes: async () => {
            return Quiz.find();
        },
        quiz: async (parent, { quizId }) => {
            return Quiz.findOne({ _id: quizId }).populate('questions');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('quizzes');
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        addUser: async (parent, { username, password }) => {
            const user = await User.create({ username, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No user found with this username');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addQuiz: async (parent, { title }, context) => {
            if (context.user) {
                const quiz = await Quiz.create({ title });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { quizzes: quiz._id } }
                );
                return quiz;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addQuestion: async (parent, { quizId, questionText }) => {
            const question = await Questions.create({ questionText });
            await Quiz.findOneAndUpdate(
                { _id: quizId },
                { $addToSet: { questions: question._id } }
            );
            return Quiz.findOne({ _id: quizId }).populate('questions');
        }
        ,
        addAnswer: async (parent, { questionId, answerText, correct }) => {
            const answer = await Answer.create({ answerText, correct });
            await Questions.findOneAndUpdate(
                { _id: questionId },
                { $addToSet: { answers: answer._id } }
            );
            return Questions.findOne({ _id: questionId }).populate('answers');
        },
    },
};

module.exports = resolvers;