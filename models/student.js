const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    attempts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam'
        }
    ]
}, {
    timestamps: true
});
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;