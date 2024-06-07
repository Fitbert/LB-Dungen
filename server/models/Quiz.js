const { Schema, model } = require('mongoose');

// Define schema for quiz
const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;