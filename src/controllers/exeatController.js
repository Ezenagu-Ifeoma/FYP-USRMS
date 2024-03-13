const studentInfoModel = require('../models/studentInfo');
const adminInfoModel = require('../models/adminInfo');
const residenceModel = require('../models/residence');
const exeatModel = require('../models/exeat')
const path = require('path')

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
        if (checkRequest) {
            console.log("you have already sent a request check request status ")
        } else {
            const { startDate, endDate, comment, requestType } = req.body;
            const fileName = `${Date.now()}_${file.name}`
            const uploadedFile = path.join(__dirname, 'uploads', fileName);

            file.mv(uploadedFile, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }
                const newRequest = await exeatModel.create({
                    student: studentId,
                    startDate: startDate[0],
                    endDate: endDate[0],
                    reason: comment[0],
                    type: requestType.trim(),
                    letterFileName: fileName,
                    letterFileSize: file.size,
                    letterFileType: file.mimetype,
                    letterFileUrl: uploadedFile
                });
                console.log(newRequest)
                const nextpage = '/status'
                res.send({ url: nextpage })
            });
        }



    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err });
    }

}