const mongoose = require('mongoose');

const studentRegSchema = new mongoose.Schema({
    MaritalStatus: {
        type: String,
        required: true,
    },
    Nationality: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Town: {
        type: String,
        required: true,
    },
})

const studentRegModel = mongoose.model('studentReg', studentRegSchema);
module.exports = studentRegModel; 
