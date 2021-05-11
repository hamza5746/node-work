const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name has to required'],
    },
    email:{
        type:String,
        minlength:1,
        unique:true,
        required:[true, 'Email has to required'],
        trim:true, //"  sadds dsdf sad   " trim remove the white spaces in the beginning and end
        validate:[validator.isEmail,'Please provide a valid email'],
        lowercase:true
    },
    photo:String,
    password:{
        type:String,
        required:[true, 'Please provide a password '],
        minlength: 8
    },
    passwordConfirm :{
        type:String,
        required:[true, 'Please confirm your password '],
        minlength: 8,
        validate: {
            validator: function(val){
                return val === this.password;
            },
            message:'Password and ConfirmPassword should be same'
        }
    }

});
const User = mongoose.model('User',userSchema);

module.exports = {User}