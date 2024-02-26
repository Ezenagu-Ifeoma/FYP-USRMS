const mongoose = require('mongoose');
const residenceSchema = new mongoose.Schema({
    residenceID: {
        type: String,
        required: true,
    },
    residenceName: {
        type: String,
        required: true,
    },
    residenceType:{
        type: String,
        required: true,
    },
       capacity: {
        type: String,
        required: true,
    },
    availableSpace: {
        type: String,
        required: true,
    },
    minlevel: {
        type: String,
        required: true,
    },
    maxLevel: {
        type: String,
        required: true,
    },

})

const residenceModel = mongoose.model('residence', residenceSchema);
module.exports = residenceModel;