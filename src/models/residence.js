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
    residenceType: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        
    },
    availableSpace: {
        type: Number,
        
    },
    minlevel: {
        type: Number,
        required: true,
    },
    maxLevel: {
        type: Number,
        required: true,
    },
    number_of_blocks: {
        type: Number,
        required: true,
    },
    blocks: [
        {
            block_letter: {
                type: String,
                required: true,
            },
            number_of_rooms: {
                type: Number,
                required: true,
            },
            rooms: [
                {
                    room_number: {
                        type: Number,
                        required: true,
                    },
                    students: [{
                        type: mongoose.Schema.ObjectId,
                        ref: 'studentInfo',
                    }]
                }
            ]
        }
    ]

});

const residenceModel = mongoose.model('residence', residenceSchema);
module.exports = residenceModel;