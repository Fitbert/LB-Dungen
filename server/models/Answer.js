const { Schema, model } = require('mongoose');

// define schema for answer
const answerSchema = new Schema({
    answerText: {
        type: String,
        required: true,
    },
    correct: {
        type: Boolean,
        required: true,
    },
});

// create the Answer model using the answerSchema
const Answer = model('Answer', answerSchema);

export default Answer;