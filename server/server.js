const mongoose = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');

var {Todo} =require('./models/todo');
var {User} = require('./models/user');
const { ObjectID } = require('bson');

let app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    let todo = new Todo({
        text:req.body.text
    });

    todo.save().then( doc => {
        res.send(doc);
    }, error => {
        res.status(400).send(error);
    });
});

// Get List Method
app.get('/todos', (req,res) => {
    Todo.find().then(todos=>{
        res.send({todos});
    }, error => {
        res.status(400).send(error);
    });
})

// Get by id Method
app.get('/todos/:id', (req,res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }

    Todo.findById(id).then(todo=>{
        if(!todo){
           return res.status(404).send();
        }
        res.status(200).send({todo});
    }, error => {
        res.status(400).send(error);
    });
})

app.listen(3000,()=> {
    console.log('Server is listening in 3000');
})

module.exports = {app};
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