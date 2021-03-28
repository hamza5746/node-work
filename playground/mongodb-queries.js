const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {User} = require('../server/models/user');

var id = '604d5677e27e022002798d3011';
if(!ObjectID.isValid(id)){
    return console.log('User id not valid');
}
// User.find({
//     _id:id
// }).then( users =>{
//     console.log ("Users : " ,users);
// });

// User.findOne({
//     _id:id
// }).then( user =>{
//     console.log ("User : " ,user);
// });

User.findById(id).then( user =>{
    if(!user){
        return console.log('User not found');
    }
    console.log ("User by id  : " ,user);
}).catch(e=>console.log(e));
