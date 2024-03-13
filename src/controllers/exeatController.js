const studentInfoModel = require('../models/studentInfo');
const adminInfoModel = require('../models/adminInfo');
const residenceModel = require('../models/residence');

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
    console.log(req.body)
    console.log(req.files.signedFile)

}

