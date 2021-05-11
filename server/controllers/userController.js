const {User} = require('../models/user');

const { ObjectID } = require('bson');

const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

//ROUTE HANDLERS
exports.getAllUsers = catchAsync(async (req,res,next) => {
    
    
    //EXECUTE
    res.status(500).json(
        {
            status:'error',
            message:'This route is not yet defined'
        }        
    );
    
    
    
});

exports.addUser = catchAsync(async (req,res,next) => {

    res.status(500).json(
        {
            status:'error',
            message:'This route is not yet defined'
        }        
    );
    
})

exports.getUserbyId = catchAsync(async (req,res,next) => {
    let id = req.params.id;
    
    res.status(500).json(
        {
            status:'error',
            message:'This route is not yet defined'
        }        
    );
});

exports.updataUser= catchAsync(async (req,res,next)=>{
    res.status(500).json(
        {
            status:'error',
            message:'This route is not yet defined'
        }        
    );
});
exports.deleteUser= catchAsync (async (req,res,next)=>{
    res.status(500).json(
        {
            status:'error',
            message:'This route is not yet defined'
        }        
    );
});
// exports.getTodoStats = catchAsync (async (req,res,next) => {
//     res.status(500).json(
//         {
//             status:'error',
//             message:'This route is not yet defined'
//         }        
//     );
// })

// exports.getMonthPlan = catchAsync (async (req,res,next) => {
//     res.status(500).json(
//         {
//             status:'error',
//             message:'This route is not yet defined'
//         }        
//     );
// })