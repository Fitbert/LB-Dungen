const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  correct: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  answers: [answerSchema],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
