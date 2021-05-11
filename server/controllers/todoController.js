const {Todo} = require('../models/todo');

const { ObjectID } = require('bson');

const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

//ROUTE HANDLERS
exports.checkId = (req,res,next,val)=>{
    console.log(`The id is ${val}`);
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).json({
             message:'Invalid ID',
             status:'Fail'
         });
     }
     next();
};

exports.checkData = (req,res,next) => {
    if(!req.body.text){
        return res.status(400).json({
            'status':'fail',
            'message':'Empty text'
        });
    }
    next();
}

exports.aliasTodo = (req,res,next)=>{
    req.query.limit='3';
    req.query.sort='-price';
    next();
}


//ROUTE HANDLERS
exports.getAllTodos = catchAsync(async (req,res,next) => {
    // try{
    // if(req.query.page){
    //     const numTodos  = await Todo.countDocuments();
    //     if(skip >= numTodos){
    //         throw new Error ('This page does not exist');
    //     }
    // }
    
    //EXECUTE
    const features = new APIFeatures(Todo.find(),req.query).filter().sorting().fields().paginate();
    const result = await features.query; 

    res.status(200).send(
        { 
            count:result.length,
            data:result,
            
        }
    )
    ;
    
    // Todo.find(object).then(todos=>{
    //     res.send({todos});
    // }, error => {
    //     console.log(error);
    //     res.status(400).send(error);
    // });
    // }catch(error){
    //     console.log(error);
    //     res.status(400).json({
    //         status:'fail',
    //         message:error
    //     });
    // }
});


exports.addTodo = catchAsync(async (req,res,next) => {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(
        {
            status:'success',
            data:{
                todo: newTodo
            }
        }        
    );
    
//     let todo = new Todo(req.body);
//     todo.save().then( doc => {
//         res.send(doc);
//     }, error => {
        
//         res.status(400).json(
//             {
//                 status:'fail',
//                 msg:error
//             }        
//         );
//     });
})

exports.getTodobyId = catchAsync(async (req,res,next) => {
    let id = req.params.id;
    
    const todo = await Todo.findById(id);

    if(!todo){
        return next(new AppError('No tour Found with that ID',404));
    }
    res.status(200).json({
        data:{todo},
        requestAt : req.requestTime
    });

    // Todo.findById(id).then(todo=>{
    //     if(!todo){
    //        return res.status(404).send();
    //     }
    //     res.status(200).json({
    //         data:todo,
    //         requestAt : req.requestTime
    //     });
    // }, error => {
    //     res.status(400).send(error);
    // });
});

exports.updataTodo= catchAsync(async (req,res,next)=>{
    let id = req.params.id;
    // try{
        const result = await Todo.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });

        if(!result){
            return next(new AppError('No tour Found with that ID',404));
        }
        res.status(200).json({
            status:'success',
            data:{
                result
            }
        });
    // }catch(e){
    //     res.status(404).json({
    //         status:'fail',
    //         message:e
    //     });
    // }
});
exports.deleteTodo= catchAsync (async (req,res,next)=>{
    // try{
        const result = await Todo.findByIdAndDelete(req.params.id);
        if(!result){
            return next(new AppError('No tour Found with that ID',404));
        }
        res.status(200).json({
            status:'success',
            data:{
                result
            }
        });
    // }catch(e){
    //     res.status(404).json({
    //         status:'fail',
    //         message:e
    //     });
    // }
});
exports.getTodoStats = catchAsync (async (req,res,next) => {
    // try{
        const stats = await Todo.aggregate([
            {
                $match: { price : { $gte : 5 }}
            },
            {
                $group :{ // display name: { $action : column name}
                    _id :'$completed', // get data in the group of id,  _id:{ $toUpper : '$difficulty'}
                    avgPrice : { $avg : '$price'},
                    numTodo:{ $sum: 1 },
                    minPric:{ $min: '$price'},
                    maxPrice:{ $max: '$price'}
                }
            },
            {
                $sort : {
                    avgPrice:1  //1 ascending order and 0 descending order
                }
            }
            // {
            //     $match : { completedAt : { $ne : 'null'}} // you can match that is exist in group
            // }
        ]);

        res.status(200).json({
            status:'success',
            data:{
                stats
            }
        });
    // }catch(error){
    //     res.status(400).json({
    //         status:'fail',
    //         message:error
    //     });
    // }
})

exports.getMonthPlan = catchAsync (async (req,res,next) => {
    // try{
        const year = req.params.year * 1;

        const plan  = await Todo.aggregate([
            {
                $unwind:'$completedAt' // Array.count
            },
            {
                $match:{
                    completedAt:{
                        $gte : new Date(`${year}-01-01`),
                        $lte : new Date(`${year}-12-31`)
                    }
                },
            },
            { 
                $group :{
                        _id:{ $month : '$completedAt' },
                        numTodo:{ $sum: 1},
                        todo:{$push:'$text'}
                    }
            },
            {
                $addFields:{ date:'$_id'}
            },
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort : { numTodo:-1}
            },
            {
                $limit:12
            }
            
        ]);

        res.status(200).json({
            status:'success',
            data:{
                plan
            }
        });
    // }catch(error){
    //     res.status(400).json({
    //         status:'fail',
    //         message:error
    //     });
    // }
})