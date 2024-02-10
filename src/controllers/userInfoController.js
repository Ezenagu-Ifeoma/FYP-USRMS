const studentInfoModel = require('../models/studentInfo');
const adminInfoModel = require('../models/adminInfo');

exports.newStudent = async (req, res, next) => {
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
        const adminChecker = await adminInfoModel.find({ adminNo: user})

        if (!studentChecker) return res.send("student not found")   
        if (!adminChecker) return res.send("student not found")


        if(studentPattern.test(user) && studentChecker[0].password === password) return res.send('/student')

        if(adminPattern.test(user) && adminChecker[0].password === password) return res.send('/admin')

        
    }catch (err) {
        res.status(404).json({ message: "page not seen" });

    }
} 
