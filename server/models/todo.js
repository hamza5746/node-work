const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const { default: validator } = require('validator');



let todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true, 'Text has to required'],
        minlength:[5,'A text should have more or equal than 5'],
        // validate:[validator.isAlpha,'Text must only contain characters only'] custom validators 
    },
    slug:String,
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
    },
    secret:{
        type:Boolean,
        default:false
    },
    priceDiscount:{ // this validator would not work with update
        type:Number,
        validate: {
            validator: function(val){
                return val < this.price;
            },
            message:'Discount price {{VALUE}} should be below regular price'
        }
    },
    level:{
        type:String,
        enum : {
            values: ['easy','medium','hard'],
            required:[true,'Level must be required'],
            message:'Field is either easy,medium,hard'
        }
    }
},
{
    toJSON:{virtuals : true},
    toObject:{ virtuals:true}
});

// if we want to convert km to meter , lit to ml
todoSchema.virtual('priceDividedby2').get(function() {
    return this.price / 2;
});

//DOCUMENT MIDDLEWARE : runs before .save() and .create()
todoSchema.pre('save', function(next){
    this.slug = slugify(this.text,{lower:true});
    next();
})

// todoSchema.pre('save', (next) => {
//     console.log('Will Saving the document......');
//     next();
// })

// todoSchema.post('save',(doc,next)=>{
//     console.log(doc);
//     next();
// })


//QUERY MIDDLEWARE : 
todoSchema.pre(/^find/, function(next){
    this.find({secretTour : { $ne :true }});
    this.completedAt = Date.now();
    next();
})
todoSchema.post(/^find/, function(doc,next){
    console.log(`Query took ${Date.now() - this.completedAt} milliseconds`);
    next();
})

//AGGREGATE MIDDLWARE
todoSchema.pre('aggregate',function(next){
    this.pipeline().unshift({ $match : { secret : { $ne: true } } });
    console.log(this.pipeline());
    next();
})
const Todo = mongoose.model('Todo',todoSchema);

module.exports={Todo}