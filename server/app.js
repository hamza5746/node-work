const express = require('express');
// const bodyParser = require('body-parser');

const todoRouter = require('./routes/todoRoutes');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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

app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     mesage:`Can't find ${req.originalUrl} on this server` 
    // })
    const err = new AppError(`Can't find ${req.originalUrl} on this server`,400 );
    next(err);
})

//GLOBAL HANDLING MIDDLEWARE ERROR
app.use(globalErrorHandler);


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