const express = require('express');
const router = express.Router();
const { newStudent, newAdmin, validateUser,studentInfo, dashboardInfo,getUser}= require('../controllers/userInfoController')
const {newResidence} = require('../controllers/residenceController');

router.post('/api/residenceInfo',newResidence)
router.post('/api/adminInfo', newAdmin)
router.post('/api/studentInfo', newStudent);



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

 router.get('/student',studentInfo)
 router.get('/index',dashboardInfo)
 

    


router.get('/admin', (req, res) => {
    res.render('admin-main', {      title: "admin Page"  })
})




module.exports = router;
