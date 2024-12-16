const Errorhandler = require('../utils/errorhandler');


const errorhandle = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

//  mongodb error
    if(err.name === "CastError"){
        const message = `resource not found .Invalid: ${err.path}`;
        err = new Errorhandler(message,400); 
    }
    //  mongoose validation error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new Errorhandler(message,400);
        }

        // wrong jwt web token error
        if(err.name === "JsonWebTokenError"){
            const message = "Please provide a valid token";
            err = new Errorhandler(message,401);
            }
            
            // jwt expire error

            if(err.name === "TokenExpiredError"){
                const message = "json web token is expired, try again ";
                err = new Errorhandler(message,401);
                }
                

    console.log(err);
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}
module.exports = errorhandle;