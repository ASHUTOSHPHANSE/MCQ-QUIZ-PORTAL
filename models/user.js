const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema( {
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
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    usertype: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;