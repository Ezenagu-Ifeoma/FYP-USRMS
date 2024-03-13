require('./src/config/dbConfig');// allows access to .env files 

const express = require('express');
const router = require('./src/routes/routes');
const axios = require('axios')
const session = require('express-session');
const PORT = process.env.PORT;
const path = require('path');
const fileUpload = require('express-fileupload')
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ encoded: true }))
app.use(fileUpload())


var sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.static(path.join(__dirname, 'src/assets')))

//set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'))

//route prefix
app.use(router);

app.use('/', (req, res) => {
    res.send("Welcome to Registration")
    // console.log(session)
    // console.log(path.join(__dirname, 'views'))
    //console.log(__dirname)
})


app.listen(PORT, () => {
    console.log('listening on port', PORT)
})