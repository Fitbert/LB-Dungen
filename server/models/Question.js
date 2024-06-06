const { Schema, model } = require('mongoose');

// Define the answer schema
const answerSchema = new Schema({
  content: { type: String, required: true },
  correct: { type: Boolean, required: true },
});

// Define the question schema
const questionSchema = new Schema({
  content: { type: String, required: true },
  answers: [answerSchema],
});

// Create the Question model using the questionSchema
const Question = model('Question', questionSchema);

module.exports = Question;
