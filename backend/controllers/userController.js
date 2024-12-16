const Errorhandler = require('../utils/errorhandler');
const catchAsyncError = require('../middlerware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require("cloudinary");


// register a user

const registerUser = catchAsyncError(async(req,res,next) =>{

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
    });

   sendToken(user,201,res);

});




// login a user
const loginUser = catchAsyncError(async(req,res,next) =>{
    const {email,password} = req.body;

    // checking if user have email or password already given
    
    if(!email || !password){
        return next(new Errorhandler("Please Enter Email & Password",400));
        }
        // checking if user exist in database
        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return next(new Errorhandler("Invalid email or password",401));
            }

            // checking if password is correct
            const isMatch = await user.comparePassword(password);

            if(!isMatch){
                return next(new Errorhandler("Invalid email or password",401));
            }
            // generating token for user

           sendToken(user,200,res);
});



// logout a user
const logoutUser = catchAsyncError(async(req,res,next) =>{
    res.cookie("token",null,{expires:new Date(Date.now()),httpOnly:true});
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
        });
});




// forget password

const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new Errorhandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = await user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new Errorhandler(error.message, 500));
    }
  });




  // Reset password

  const resetPassword = catchAsyncError(async(req,res,next) => {
    
    // creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{ $gt: Date.now() }});

    if(!user){
      return next(new Errorhandler('Reset password Token is Invalid or has been expired', 400));
    }
    if(req.body.password !== req.body.confirmPassword){
      return next(new Errorhandler('Password does not match', 400));
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

   await user.save();

   sendToken(user,200,res);

  });



  // get user details

  const getUserDetails = catchAsyncError(async(req,res,next)=>{


    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  });



  // update user password

  const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    console.log("Old Password from Request Body:", req.body.oldPassword);
    console.log("Hashed Password from DB:", user.password);
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new Errorhandler("old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new Errorhandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });



   // update user profile

   const updateProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  

  

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true, 
      runValidators:true,
      useFindAndModify:false,
      });
      res.status(200).json({
        success: true,
        user,
    })
   });




   // get all user -- admin

   const getAllUser = catchAsyncError(async(req,res,next) =>{

    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
   });



   // get single user -- admin
   const getSingleUser = catchAsyncError(async(req,res,next) =>{

    const user = await User.findById(req.params.id);
    if(!user){
      return next(new Errorhandler(`user does not Exist with Id ${req.paras.id}`));
    }
    res.status(200).json({
      success: true,
      user,
      })
   });


   // update user role -- admin

   const updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });



  // delete user by --- admin

  const deleteUser = catchAsyncError(async(req,res,next) =>{
    
    const user = await User.findById(req.params.id);

    if(!user){
      return next(new Errorhandler(`User does not exist with id ${req.params.id}`))
    }
    const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
      
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      });
  });

module.exports = {registerUser,loginUser,logoutUser,forgotPassword ,resetPassword, getUserDetails,updatePassword,updateProfile,getAllUser,getSingleUser,updateUserRole,deleteUser};