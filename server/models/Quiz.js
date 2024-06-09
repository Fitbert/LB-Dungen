const { Schema, model } = require('mongoose');
const questionSchema = require('./Questions');

// Define schema for quiz
const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [
        questionSchema,
    ],
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;