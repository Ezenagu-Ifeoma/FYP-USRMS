const express = require('express');
const router = express.Router();
const { newStudent, newAdmin, validateUser, getUser } = require('../controllers/userInfoController')
const studentInfoModel = require('../models/studentInfo');

router.get('/', (req, res) => {
    res.render('index', { name: "Home Page" })
})//

router.get('/login', (req, res) => {
    res.render('login', { title: "USRMS LOGIN" })
})

router.post('/login', validateUser)

router.use((req,res,next)=>{
    if(!req.session.uid) return res.redirect('/login')
    next();
})

 router.get('/student',async (req, res)=>{
    const studentChecker = await studentInfoModel.find({ _id: req.session.uid })

    res.render('student-main',{title: "usrms ", student: studentChecker[0].StudentName});
 })


    


router.get('/admin', (req, res) => {
    res.render('admin-main', {
       title: "admin Page"
    })
})

router.post('/api/adminInfo', newAdmin)
router.post('/api/studentInfo', newStudent);


module.exports = router;
