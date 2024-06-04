const { Schema, model } = require('mongoose');
// define schema for question
const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true,
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer',
        },
    ],
});

// create the Question model using the questionSchema
const Question = model('Question', questionSchema);

module.exports = Question;