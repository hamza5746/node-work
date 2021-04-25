const mongoose = require('mongoose');
let User = mongoose.model('User',{
    email:{
        type:String,
        minlength:1,
        required:[true, 'Email has to required'],
        trim:true, //"  sadds dsdf sad   " trim remove the white spaces in the beginning and end
    },
});

module.exports = {User}