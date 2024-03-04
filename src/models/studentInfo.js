
const mongoose = require('mongoose');

const studentInfoSchema = new mongoose.Schema({
    MatricNo: {
        type: String,
        required: true,
    },
    StudentName: {
        type: String,
        required: true,
    },
    Programme: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    EntryLevel: {
        type: String,
        required: true,
    },
    StudyLevel: {
        type: String,
        required: true,
    },
    Religion: {
        type: String,
        required: true,
    },
    Denomination: {
        type: String,
        required: true,
    },
    Sex: {
        type: String,
        required: true,
    },
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
    Country: {
        type: String,
        required: true,
    },
    OnProbation: {
        type: String,
        required: true,
    },
    OffCampus: {
        type: String,
        required: true,
    },
    SchoolDetails: {
        type: String,
        required: true,
    },
    DepartmentDetails: {
        type: String,
        required: true,
    },
    AccountNumber: {
        type: String,
        required: true,
    },
    ETranzactCardNumber: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

const studentInfoModel = mongoose.model('studentInfo', studentInfoSchema);
module.exports = studentInfoModel; 