const mongoose = require('mongoose');
const adminInfoSchema = new mongoose.Schema({
    adminNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true

    },
    residence: {
        type: String,
        required: true
    }
})

const adminInfoModel = mongoose.model('adminInfo', adminInfoSchema);
module.exports = adminInfoModel;