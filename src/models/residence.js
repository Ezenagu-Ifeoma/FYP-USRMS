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
        required: true
    },
    availableSpace: {
        type: Number,
        required: true
    },
    minLevel: {
        type: Number,
        required: true,
    },
    maxLevel: {
        type: Number,
        required: true,
    },
    numBlocks: {
        type: Number,
        required: true,
    },
    maxPerRoom: {
        type: Number,
        required: true
    },
    blocks: [
        {
            blockLetter: {
                type: String,
                required: true,
            },
            numRooms: {
                type: Number,
                required: true,
            },
            rooms: [
                {
                    roomNum: {
                        type: Number,
                        required: true,
                    },
                    students: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "studentInfo"
                        }
                    ]
                }
            ]
        }
    ]

});

const residenceModel = mongoose.model('residence', residenceSchema);
module.exports = residenceModel;