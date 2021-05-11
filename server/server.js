const dotenv = require('dotenv');
dotenv.config({path:'./server/config.env'});
process.on('uncaughtException',err => {
    console.log(err.name,err.messsage);
    console.log('UNHANDLED REJECTION! Shutting down');

    server.close(()=>{
        process.exit(1);
    });
});
const mongoose = require('./db/mongoose');
const app = require('./app');

let port = process.env.PORT || 3000;

const server = app.listen(port,()=> {
    console.log(`Server is listening in ${port}`);
});


process.on('unhandledRejection',err => {
    console.log(err.name,err.messsage);
    console.log('UNHANDLED REJECTION! Shutting down');

    server.close(()=>{
        process.exit(1);
    });
});

