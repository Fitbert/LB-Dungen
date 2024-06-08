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
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
});

const Question = model('Question', questionSchema);

module.exports = Question;