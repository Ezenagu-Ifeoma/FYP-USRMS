const mongoose = require('mongoose');

const exeatSchema = new mongoose.Schema({
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

const exeatModel = mongoose.model('exeat', exeatSchema);
module.exports = exeatModel; 
