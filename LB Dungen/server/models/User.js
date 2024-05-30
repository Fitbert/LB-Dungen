const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    quizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
    }],
    });

module.exports = model('User', userSchema);