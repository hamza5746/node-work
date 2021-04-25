const mongoose = require('mongoose');
let todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true, 'Text has to required'],
        minlength:1 
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Date,
        default:Date.now()
    },
    price :{
        type:Number,
        required:[true,'Price must required']
    }
},
{
    toJSON:{virtuals : true},
    toObject:{ virtuals:true}
});

// if we want to convert km to meter , lit to ml
todoSchema.virtual('priceDividedby2').get(function() {
    return this.price / 2
});
const Todo = mongoose.model('Todo',todoSchema);

module.exports={Todo}