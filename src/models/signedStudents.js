const mongoose = require('mongoose');

const signedStudentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'studentinfos', required: true },
    matricNo: { type: String, required: true },
    name: { type: String, required: true },
    programme: { type: String, required: true },
    level: { type: String, required: true },
    address: { type: String, required: true },
    block: { type: String, required: true },
    roomNum: { type: Number, required: true },
    status: { type: String, default: 'inactive' },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true // Create an index on the createdAt field
    }
});

const signedStudentModel = mongoose.model('signedStudents', signedStudentSchema);
module.exports = signedStudentModel;
