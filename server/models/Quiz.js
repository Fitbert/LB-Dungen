const { Schema, model } = require('mongoose');
const Question = require('./Question');

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [Question.schema],
    });

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;