const catchAsyncError = require('../middlerware/catchAsyncError');
const Errorhandler = require('../utils/errorhandler');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");



const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies; // Check if the token is in cookies
    
    if (!token) {
        return next(new Errorhandler('Please login to access this resource', 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);

    next();
});


// authrize role for admin 
const authrozeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler("You don't have permission to perform this action",403));
            }
            next();
    }
};

module.exports = {isAuthenticatedUser,authrozeRoles};