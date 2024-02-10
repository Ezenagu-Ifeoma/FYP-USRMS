require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB ).then(()=>{
    console.log('Connected to MongoDb')   
}).catch((err)=>{
    console.log(err)
})