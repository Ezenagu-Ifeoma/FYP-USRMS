const mongoose = require('mongoose');

const exeatSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'studentinfos', required: true },
    studentId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    type: { type: String, required: true },
    letterFileType: { type: String, required: true },
    letterFileSize: { type: String, required: true },
    letterFileName: { type: String, required: true },
    letterFileUrl: { type: String, required: true },
    status: { type: String, default: 'pending' }
});

const exeatModel = mongoose.model('exeat', exeatSchema);
module.exports = exeatModel; 
