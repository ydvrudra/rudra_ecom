const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require:[true,"please Enter Your Name"],
        maxLength:[25,"Name cannot exceed 30 Characters"],
        minLength:[2,"name should have more than 2 Characters"],
    },
    email: {
        type: String,
        require:[true,"please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"],
    },
    password: {
        type: String,
        require:[true,"please Enter Your Password"],
        minLength:[8,"Password should be at least 8 Characters"],
        maxLength:[15,"Password should not exceed 15 Characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
        },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
        this.password = await bcrypt.hash(this.password,10);
        }); 

// jwt Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

// compare password
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password );
};

// generating password reset token

userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };
  



module.exports = mongoose.model("User",userSchema);