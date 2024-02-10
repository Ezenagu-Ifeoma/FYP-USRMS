const mongoose = require('mongoose');
const adminInfoSchema= new mongoose.Schema({
    adminNo:{
        type: String,
        required:true
    },
    password:{
        type: String,
        require: true

    }
})

const adminInfoModel = mongoose.model('adminInfo', adminInfoSchema);
module.exports = adminInfoModel;