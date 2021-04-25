const express = require('express');
// const bodyParser = require('body-parser');

const todoRouter = require('./routes/todoRoutes');
const morgan = require('morgan');

let app = express();

//MiddleWare Functions
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json()); 

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/todos',todoRouter);



// app.post('/todos', addTodo);

// Get List Method
// app.get('/todos', getAllTodos);

// Get by id Method
// app.get('/todos/:id', getTodobyId)
// app.patch('/todos/:id',);


module.exports = app;
/* let newTodo = new Todo({
    text:'Cook dinner',
    completed:false,
    completedAt:10
});

newTodo.save().then( doc=>{
    console.log(doc);
}, error => {
    console.log(error);
}); */
 


// let user = new User({
//     email:"hamza_hanif77@hotmail.com"
// })

// user.save().then( doc => {
//     console.log('Save User',doc);
// }, error => {
//     console.log(error);
// });