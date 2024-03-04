const studentInfoModel = require('../models/studentInfo');
const adminInfoModel = require('../models/adminInfo');
const residenceModel = require('../models/residence');
const { getAllResidence } = require('../controllers/loginValidatorController')

exports.newStudent = async (req, res) => {
    try {
        const student = await studentInfoModel.create(req.body);
        res.status(200).json({ message: "successful creation of student", student })
        // 

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.newAdmin = async (req, res) => {
    try {
        const admin = await adminInfoModel.create(req.body);
        res.status(200).json({ message: "successful creation of admin", admin })
        console.log(admin)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.validateUser = async (req, res) => {
    try {
        const { user, password } = req.body;
        const studentPattern = /^\d{2}\/\d{4}$/;
        const adminPattern = /^BU\/\d{5}$/;
        const studentChecker = await studentInfoModel.find({ MatricNo: user })
        const adminChecker = await adminInfoModel.find({ adminNo: user })
        const student = studentChecker[0].StudentName
        const studentId = studentChecker[0]._id

        const studentUrl = '/index'
        const adminUrl = '/admin';

        if (!studentChecker) return res.send("student not found")
        if (!adminChecker) return res.send("student not found")

        req.session.uid = studentChecker[0]._id

        if (studentPattern.test(user) && studentChecker[0].password === password) return res.send({ studentUrl, studentChecker })

        if (adminPattern.test(user) && adminChecker[0].password === password) return res.send('/admin')

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "page not seen" });

    }
}
exports.studentInfo = async (req, res) => {
    try {
        const studentChecker = await studentInfoModel.find({ _id: req.session.uid });
        const allResidence = await residenceModel.find();
        res.render('student', {
            title: "Hall Management ",
            student: studentChecker[0].StudentName,
            res: allResidence,
        });

    } catch (err) {
        console.log(err);
    }
}

exports.dashboardInfo = async (req, res) => {
    try {
        const studentChecker = await studentInfoModel.find({ _id: req.session.uid });
        res.render('index', { title: "Hall Management ", student: studentChecker[0].StudentName });


    } catch (err) {
        console.log(err);
    }
}
