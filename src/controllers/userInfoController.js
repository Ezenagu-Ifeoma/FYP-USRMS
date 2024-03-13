const studentInfoModel = require('../models/studentInfo');
const adminInfoModel = require('../models/adminInfo');
const residenceModel = require('../models/residence');
const schoolInfoModel = require('../models/schoolnfo');
const exeatModel = require('../models/exeat')
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
exports.newSchool = async (req, res) => {
    try {
        const school = await schoolInfoModel.create(req.body)
        res.status(200).json({ message: "new school info created succesfully" + school })
    } catch (err) {
        res.status(404).json({ message: err });
        console.log(err)
    }
}

// exports.validateUser = async (req, res) => {
// try {
//     const { user, password } = req.body;
//     const studentPattern = /^\d{2}\/\d{4}$/;
//     const adminPattern = /^BU\/\d{5}$/;
//     const studentChecker = await studentInfoModel.find({ MatricNo: user });
//     const adminChecker = await adminInfoModel.find({ adminNo: user });

//     const studentUrl = '/index'
//     const adminUrl = '/admin';

//     if (!studentChecker) {
//         const admin = adminChecker[0].name;
//         req.session.uid = adminChecker[0]._id;

//         if (!adminChecker) {
//             const student = studentChecker[0].StudentName;
//             req.session.uid = studentChecker[0]._id;

//         }
//     }
//     else {
//         res.send("user not found")
//     }




//     if (studentPattern.test(user) && studentChecker[0].password === password) return res.send({ studentUrl, studentChecker })

//     if (adminPattern.test(user) && adminChecker[0].password === password) return res.send({ adminUrl, adminChecker })

// } catch (err) {
//     console.log(err);
//     res.status(404).json({ message: "page not seen" });

// }
// }

exports.validateUser = async (req, res) => {
    try {
        const { user, password } = req.body;
        const studentPattern = /^\d{2}\/\d{4}$/;
        const adminPattern = /^BU\/\d{5}$/;
        const studentChecker = await studentInfoModel.find({ MatricNo: user });
        const adminChecker = await adminInfoModel.find({ adminNo: user });

        const studentUrl = '/index';
        const adminUrl = '/admin';

        if (studentChecker.length === 0 && adminChecker.length > 0) {
            req.session.uid = adminChecker[0]._id;
            if (adminPattern.test(user) && adminChecker[0].password === password) {
                return res.send({ adminUrl, adminChecker });
            }
        }

        if (studentChecker.length > 0 && adminChecker.length === 0) {
            req.session.uid = studentChecker[0]._id;
            if (studentPattern.test(user) && studentChecker[0].password === password) {
                return res.send({ studentUrl, studentChecker });
            }
        }
        else {
            return res.send("User not found");
        }

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Page not found" });
    }
};

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

exports.studentDashboardInfo = async (req, res) => {
    try {
        const studentChecker = await studentInfoModel.find({ _id: req.session.uid });

        res.render('index', { title: "Hall Management ", student: studentChecker[0].StudentName });


    } catch (err) {
        console.log(err);
    }
}
exports.adminDashboardInfo = async (req, res) => {
    try {
        const adminChecker = await adminInfoModel.find({ _id: req.session.uid });
        const residence = await residenceModel.find({ residenceName: adminChecker[0].residence })
        if (residence) {

            res.render('admin', { title: "Exeat Management ", admin: adminChecker[0].name, resInfo: residence });

        }
    } catch (err) {
        console.log(err);
    }
}


exports.statusInfo = async (req, res) => {
    try {
        studentId = req.session.uid
        const studentChecker = await studentInfoModel.find({ _id: req.session.uid });
        const exeatStatusInfo = await exeatModel.find({ student: studentId })
        console.log(exeatStatusInfo)
        res.render('studentStatus', {
            studentInfo: studentChecker[0],
            exeatInfo: exeatStatusInfo[0]
        })


    } catch (err) {
        res.status(404).json({ message: err });
        console.log(err)

    }
}