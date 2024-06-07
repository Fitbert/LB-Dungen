const { Schema, model } = require('mongoose');

// define schema for answer
const answerSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
    },
});

// create the Answer model using the answerSchema
const Answer = model('Answer', answerSchema);

module.exports = Answer;