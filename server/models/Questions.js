const { Schema, model } = require('mongoose');

// Define schema for question
const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
});

module.exports = questionSchema;