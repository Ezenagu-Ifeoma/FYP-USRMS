const mongoose = require('mongoose');
const schoolInfoSchema = new mongoose.Schema({

    department: {
        name: {
            type: String,
            required: true
        },
        hod:{
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
 
        },
        lecturers: [
            {
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                phone: {
                    type: String,
                    required: true
                },
                course: {
                    type: String,
                    required: true
                }
            }
        ]

    }

})

const schoolInfoModel = mongoose.model('schoolInfo', schoolInfoSchema);
module.exports = schoolInfoModel; 