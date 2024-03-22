const mongoose = require('mongoose')
const studentInfoModel = require('../models/studentInfo');
const adminInfoModel = require('../models/adminInfo');
const residenceModel = require('../models/residence');
const exeatModel = require('../models/exeat')
const path = require('path');
const signedStudentModel = require('../models/signedStudents');

exports.exeatInfo = async (req, res) => {
    try {
        const studentChecker = await studentInfoModel.find({ _id: req.session.uid });
        res.render('studentExeat', {
            title: "Hall Management ",
            student: studentChecker[0].StudentName,
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }
}
exports.exeatRequest = async (req, res) => {
    try {
        const studentId = req.session.uid
        const file = req.files.signedFile
        const checkRequest = await exeatModel.find({ student: req.session.uid })
        if (checkRequest > 0) {
            console.log("you have already requested")
        } else {
            const { startDate, endDate, comment, requestType } = req.body;
            const fileName = `${Date.now()}_${file.name}`
            const uploadedFile = path.join(__dirname, 'uploads', fileName);

            file.mv(uploadedFile, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }
                console.log
                const newRequest = await exeatModel.create({
                    student: studentId,
                    studentId: studentId,
                    startDate: startDate[0],
                    endDate: endDate[0],
                    reason: comment[0],
                    type: requestType.trim(),
                    letterFileName: fileName,
                    letterFileSize: file.size,
                    letterFileType: file.mimetype,
                    letterFileUrl: uploadedFile
                });
                const nextpage = '/status'
                res.send({ url: nextpage })
            });
        }



    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }

}

exports.adminExeatReqInfo = async (req, res) => {
    try {
        const adminChecker = await adminInfoModel.find({ _id: req.session.uid });
        const residence = await residenceModel.find({ residenceName: adminChecker[0].residence })
        if (residence) {
            const exeatReq = await exeatModel.find().populate('student');
            if (exeatReq) {
                res.render('admin-requests', {
                    exeatData: exeatReq,
                    title: "Exeat Management        ",
                    admin: adminChecker[0].name,
                    resInfo: residence
                })
            } else {
                console.log("No requests found");
            }
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }
}

exports.adminGetAllExeatReq = async (req, res) => {
    try {

        const exeatReq = await exeatModel.find().populate('student');
        if (exeatReq) {
            res.send({
                exeatData: exeatReq
            })
        } else {
            console.log("No requests found");
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }
}
exports.approveStudents = async (req, res) => {
    try {

        const info = req.body;
        console.log(info);
        if (info && info.studentId && info.rowData) {
            // Update exeatModel to set status to 'Approved' for the student
            try {

                const approveReq = await exeatModel.findOneAndUpdate(
                    { studentId: info.studentId },
                    { status: 'approved' }, // Directly assign the new value
                    { new: true }

                )
                console.log(approveReq)

                if (approveReq) {
                    // Update signedStudentModel to set status to 'inactive' for the student
                    const signedUpdate = await signedStudentModel.findOneAndUpdate(
                        { matricNo: info.rowData.matricNo },
                        { $set: { status: 'inactive' } },
                        { new: true }
                    );

                    if (signedUpdate) {
                        return res.status(200).json({ message: 'Student approved and status updated.' });
                    } else {
                        return res.status(404).json({ message: 'Signed student not found.' });
                    }
                } else {
                    return res.status(404).json({ message: 'Student approval not found.' });
                }
            } catch (error) {
                console.error('Error approving student:', error);
                return res.status(500).json({ message: 'Internal server error.' });
            }
        } else {
            return res.status(400).json({ message: 'Missing information in request body.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


exports.rejectStudents = async (req, res) => {
    try {
        const info = req.body
        console.log(info)
        if (info) {
            const updatedStudent = await exeatModel.findOneAndUpdate(
                { 'student.MatricNo': info.matricNo },
                { $set: { status: 'rejected' } }, // Correct usage of $set operator to update the 'status' field
                { new: true } // To return the updated document
            );
            console.log(updatedStudent)
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }
}

exports.getStudentPdf = async (req, res) => {
    try {
        const pdfUrl = req.query.url;
        console.log(pdfUrl)
        // Example logic to read PDF file from the file system (replace with your logic)
        fs.readFile(pdfUrl, (err, data) => {
            if (err) {
                console.error('Error reading PDF file:', err);
                res.status(500).send('Error fetching PDF file.');
            } else {
                res.setHeader('Content-Type', 'application/pdf');
                res.send(data);
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error.' });

    }
}