const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    marks: {
        type: Number,
    },
    starttime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
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
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
}, {
    timestamps: true
});
const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;