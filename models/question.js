const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },
    mark: {
        type: Number,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },

}, {
    timestamps: true
});
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;