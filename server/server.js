const dotenv = require('dotenv');
dotenv.config({path:'./server/config.env'});
const mongoose = require('./db/mongoose');
const app = require('./app');

let port = process.env.PORT || 3000;

app.listen(port,()=> {
    console.log(`Server is listening in ${port}`);
})

