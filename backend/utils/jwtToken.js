// Create Token and save token in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
     expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true, // Prevents JS access to the cookie
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    sameSite: 'Lax' // Prevents CSRF attacks
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;