const express = require('express');
const router = express.Router();
const { newStudent, newAdmin, validateUser } = require('../controllers/userInfoController')

router.get('/', (req, res) => {
    res.render('index', { name: "Home Page" })
})//

router.get('/login', (req, res) => {
    res.render('login', { title: "USRMS LOGIN" })
})

router.post('/login', validateUser)

router.get('/student', (req, res) => {
    res.render('student-main', {
       title: "student Page"
    })
})

router.get('/admin', (req, res) => {
    res.render('admin-main', {
       title: "admin Page"
    })
})

router.post('/api/adminInfo', newAdmin)
router.post('/api/studentInfo', newStudent);


module.exports = router;
