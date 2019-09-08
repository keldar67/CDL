const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    nickname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Player', playerSchema);