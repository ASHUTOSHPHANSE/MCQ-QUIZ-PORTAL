const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    chosenoption: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    marks: {
        type: Number
    }
    
}, {
    timestamps: true
});
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;