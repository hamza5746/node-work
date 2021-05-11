const AppError = require("../utils/appError");

handleCastError = (err) =>{
    return new AppError(`${err.path} : ${err.value} is invalid`,400);
}   

handleDuplicateError=(err)=>{
    let value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate Field value : ${value} . Please use another value!`;
    return new AppError(message,400); 

}

const handleValidationError = (err) => {
   const errors = Object.values(err.errors).map(el=> el.message);
    return new AppError(`Invalid input data ${errors.join('. ')}`,400);
}
const sendErrForDev = (err,res) => {
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message : err.message,
        stack :err.stack
    });
}


const sendErrForProd = (err,res)=>{ 

    // res.status(err.statusCode).json({
    //     status:err.status,
    //     error:err,
    //     message : err.message,
    //     stack :err.stack
    // });
    //Operational , trusted error :send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message : err.message
        });
        // Programming or other unknown error :don't leak error detail
    }else{

        // console.error('Error',err);
        res.status(500).json({
            status:'error',
            message:'Something went very wrong'
        });
    }
}

module.exports = (err,req,res,next)=>{
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    console.log(process.env.NODE_ENV);
    
    
    if(process.env.NODE_ENV=== 'development'){
  
        sendErrForDev(err,res);
        
    } else if(process.env.NODE_ENV=== 'production') {
        
        // let error = { ...err };
        // if(error.name === 'CastError') error = handleCastError(error);
        
        // if(error.code === 11000) error = handleDuplicateError(error);
        // console.log(error);
        if(err.name === 'ValidationError') err = handleValidationError(err);
        sendErrForProd(err,res);
        // sendErrForProd(error,res);

    }
  
}