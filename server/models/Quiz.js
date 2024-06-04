const { Schema, model } = require('mongoose');
const Question = require('./Question');
// define schema for quiz
const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [Question.schema],
    });
// create the Quiz model using the quizSchema
const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;