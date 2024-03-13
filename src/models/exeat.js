const mongoose = require('mongoose');

const exeatSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    type: { type: String, required: true },
    letterFileUrl: { type: String, required: true }
});

const exeatModel = mongoose.model('exeat', exeatSchema);
module.exports = exeatModel; 
