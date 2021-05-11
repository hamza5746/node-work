const { Server } = require('mongodb');
const mongoose = require('mongoose');
// const dotenv  = require('dotenv');

// dotenv.config({path: '../config.env'});


mongoose.Promise = global.Promise;
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB,
{
    useNewUrlParser:true, 
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB connection successful');
});


module.exports = {mongoose}