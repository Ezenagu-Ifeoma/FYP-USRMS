const studentInfoModel = require('../models/studentInfo');
const adminInfoModel = require('../models/adminInfo');
const residenceModel = require('../models/residence');
const schoolInfoModel = require('../models/schoolnfo');
const signedStudentsModel = require('../models/signedStudents')
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
exports.adminRegistrationInfo = async (req, res) => {
    try {

        const adminChecker = await adminInfoModel.find({ _id: req.session.uid });
        // console.log(adminChecker)
        if (!adminChecker) {
            res.send(404).json({ message: "admin not found" })
            console.log("admin not found")
        }

        const residence = await residenceModel.findOne({ residenceName: adminChecker[0].residence })
        // console.log(residence);x
        const studentRoomsMap = {};

        // Iterate through blocks and rooms
        residence.blocks.forEach(block => {
            block.rooms.forEach(room => {
                // Add student IDs and their rooms to the map
                room.students.forEach(studentId => {
                    if (!studentRoomsMap[studentId]) {
                        studentRoomsMap[studentId] = [];
                    }
                    studentRoomsMap[studentId].push({
                        blockLetter: block.blockLetter,
                        roomNumber: room.roomNum // Assuming you have room number
                    });
                });
            });
        });

        // Fetch student information and populate the studentRoomsMap
        const studentIds = Object.keys(studentRoomsMap);
        const studentsInfo = await studentInfoModel.find({ _id: { $in: studentIds } });

        // Populate studentRoomsMap with student information
        studentsInfo.forEach(student => {
            const studentId = student._id.toString();
            if (studentRoomsMap[studentId]) {
                studentRoomsMap[studentId].forEach(room => {
                    room.studentInfo = student;
                });
            }
        });
        if (studentRoomsMap) {
            const studentInfo = () => {
                const info = [];
                for (const key in studentRoomsMap) {
                    const rooms = studentRoomsMap[key]; // Get array of rooms for current student
                    const studentData = {
                        studentId: key,
                        rooms: rooms.map(room => ({ blockLetter: room.blockLetter, roomNumber: room.roomNumber })),
                        studentInfo: rooms[0].studentInfo // Assuming studentInfo is the same for all rooms
                    };
                    info.push(studentData);
                }
                return info;
            };
            const studentData = studentInfo();
            if (studentData.length > 0) {
                res.render('admin-students', { title: "Registration Management ", admin: adminChecker[0].name, resInfo: residence });
            } else {
                console.log("data not found");
            }
        }


    } catch (err) {
        res.status(404).json({ message: err });
        console.log(err);
    }
}

exports.adminGetAllStudent = async (req, res) => {
    try {

        const adminChecker = await adminInfoModel.find({ _id: req.session.uid });
        // console.log(adminChecker)
        if (!adminChecker) {
            res.send(404).json({ message: "admin not found" })
            console.log("admin not found")
        }

        const residence = await residenceModel.findOne({ residenceName: adminChecker[0].residence })
        // console.log(residence);
        const studentRoomsMap = {};

        // Iterate through blocks and rooms
        residence.blocks.forEach(block => {
            block.rooms.forEach(room => {
                // Add student IDs and their rooms to the map
                room.students.forEach(studentId => {
                    if (!studentRoomsMap[studentId]) {
                        studentRoomsMap[studentId] = [];
                    }
                    studentRoomsMap[studentId].push({
                        blockLetter: block.blockLetter,
                        roomNumber: room.roomNum // Assuming you have room number
                    });
                });
            });
        });

        // Fetch student information and populate the studentRoomsMap
        const studentIds = Object.keys(studentRoomsMap);
        const studentsInfo = await studentInfoModel.find({ _id: { $in: studentIds } });

        // Populate studentRoomsMap with student information
        studentsInfo.forEach(student => {
            const studentId = student._id.toString();
            if (studentRoomsMap[studentId]) {
                studentRoomsMap[studentId].forEach(room => {
                    room.studentInfo = student;
                });
            }
        });
        if (studentRoomsMap) {
            const studentInfo = () => {
                const info = [];
                for (const key in studentRoomsMap) {
                    const rooms = studentRoomsMap[key]; // Get array of rooms for current student
                    const studentData = {
                        studentId: key,
                        rooms: rooms.map(room => ({ blockLetter: room.blockLetter, roomNumber: room.roomNumber })),
                        studentInfo: rooms[0].studentInfo // Assuming studentInfo is the same for all rooms
                    };
                    info.push(studentData);
                }
                return info;
            };
            const studentData = studentInfo();
            if (studentData.length > 0) {
                return res.send({ studentData });
            } else {
                console.log("data not found");
            }
        }


    } catch (err) {
        res.status(404).json({ message: err });
        console.log(err);
    }
}



exports.statusInfo = async (req, res) => {
    try {

        const studentId = req.session.uid
        const studentChecker = await studentInfoModel.find({ _id: req.session.uid });
        const regStatusInfo = await signedStudentsModel.find({ studentId: studentId })
        const exeatStatusInfo = await exeatModel.findOne({ student: studentId }).populate('student')
        if (!exeatStatusInfo && regStatusInfo) {
            const toaster = "Exeat Status: No exeat Requet Sent"
            res.render('studentStatus', {
                student: studentChecker[0].StudentName,
                exeatInfo: toaster,
                regInfo: regStatusInfo
            })
        } else {
            res.render('studentStatus', {
                student: studentChecker[0].StudentName,
                exeatInfo: exeatStatusInfo,
                regInfo: regStatusInfo
            })
        }


    } catch (err) {
        res.status(404).json({ message: err });
        console.log(err)

    }
}

exports.regStatusInfo = async (req, res) => {
    try {


    } catch (err) {
        res.status(404).json({ message: err });
        console.log(err);

    }
}

exports.searchStudent = async (req, res) => {
    const { matricNo } = req.query

    try {
        const studentChecker = await studentInfoModel.findOne({ MatricNo: matricNo });
        const adminChecker = await adminInfoModel.find({ _id: req.session.uid });
        // console.log(adminChecker)
        if (!adminChecker) {
            res.send(404).json({ message: "admin not found" })
            console.log("admin not found")
        }

        const residence = await residenceModel.findOne({ residenceName: adminChecker[0].residence })
        // console.log(residence);x
        const studentRoomsMap = {};

        // Iterate through blocks and rooms
        residence.blocks.forEach(block => {
            block.rooms.forEach(room => {
                // Add student IDs and their rooms to the map
                room.students.forEach(studentId => {
                    if (!studentRoomsMap[studentId]) {
                        studentRoomsMap[studentId] = [];
                    }
                    studentRoomsMap[studentId].push({
                        blockLetter: block.blockLetter,
                        roomNumber: room.roomNum // Assuming you have room number
                    });
                });
            });
        });

        // Fetch student information and populate the studentRoomsMap
        const studentIds = Object.keys(studentRoomsMap);
        const studentsInfo = await studentInfoModel.find({ _id: { $in: studentIds } });

        // Populate studentRoomsMap with student information
        studentsInfo.forEach(student => {
            const studentId = student._id.toString();
            if (studentRoomsMap[studentId]) {
                studentRoomsMap[studentId].forEach(room => {
                    room.studentInfo = student;
                });
            }
        });
        if (studentRoomsMap) {
            const studentInfo = () => {
                const info = [];
                for (const key in studentRoomsMap) {
                    const rooms = studentRoomsMap[key]; // Get array of rooms for current student
                    const studentData = {
                        studentId: key,
                        rooms: rooms.map(room => ({ blockLetter: room.blockLetter, roomNumber: room.roomNumber })),
                        studentInfo: rooms[0].studentInfo // Assuming studentInfo is the same for all rooms
                    };
                    info.push(studentData);
                }
                return info;
            };
            const studentData = studentInfo();
            const myObjId = studentChecker._id.toString()
            const index = studentData.findIndex(e => e.studentId === myObjId)
            const newStudentData = studentData[index];
            if (newStudentData) {
                res.send({ newStudentData }); // Send the found students back as response
            } else {
                console.log("cannot find search data")
            }





        }
    } catch (err) {
        console.error('Error searching students:', err);
        res.status(500).json({ error: 'Error searching students' });
    }
}

