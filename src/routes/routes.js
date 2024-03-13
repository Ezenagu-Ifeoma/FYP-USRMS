const express = require('express');
const multer = require('multer');
const path = require('path')
const router = express.Router();
const { newStudent, newAdmin, newSchool, validateUser, studentInfo, studentDashboardInfo, adminDashboardInfo, statusInfo } = require('../controllers/userInfoController')
const { newResidence, regStudent } = require('../controllers/residenceController');
const { exeatInfo, exeatRequest } = require('../controllers/exeatController')

router.post('/api/residenceInfo', newResidence)
router.post('/api/adminInfo', newAdmin)
router.post('/api/studentInfo', newStudent);
router.post('/api/schoolInfo', newSchool)



router.get('/', (req, res) => {
    res.render('index', { name: "Home Page" })
})//

router.get('/login', (req, res) => {
    res.render('login', { title: "USRMS LOGIN" })
})

router.post('/login', validateUser)

router.use((req, res, next) => {
    // req.session.uid ="20/1903"
    if (!req.session.uid) return res.redirect('/login')
    next();
})

router.post('/regStudent', regStudent)




router.post("/exeatRequest", exeatRequest);


// router.post('/exeatRequest', upload.single('signedFile'), exeatRequest)

router.get('/index', studentDashboardInfo)
router.get('/admin', adminDashboardInfo)
router.get('/student', studentInfo)
router.get('/exeat', exeatInfo)
router.get('/status', statusInfo)







router.get('/admin', (req, res) => {
    res.render('admin-main', { title: "admin Page" })
})




module.exports = router;
