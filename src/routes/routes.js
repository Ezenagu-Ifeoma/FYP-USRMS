const express = require('express');
const router = express.Router();
const { newStudent, newAdmin, validateUser, studentInfo, dashboardInfo, getUser } = require('../controllers/userInfoController')
const { newResidence, regStudent } = require('../controllers/residenceController');
const { exeatInfo } = require('../controllers/exeatController')

router.post('/api/residenceInfo', newResidence)
router.post('/api/adminInfo', newAdmin)
router.post('/api/studentInfo', newStudent);



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

router.get('/index', dashboardInfo)
router.get('/student', studentInfo)

router.post('/regStudent',regStudent)
//  router.get('/exeat', exeatInfo)





router.get('/admin', (req, res) => {
    res.render('admin-main', { title: "admin Page" })
})




module.exports = router;
