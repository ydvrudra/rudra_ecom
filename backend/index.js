const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const router = require("./router/productRouter");
const user = require('./router/userRouter');
const order = require('./router/orderRouter');
const payment = require('./router/paymentRouter');
const errorhandle = require('./middlerware/error');
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");


// handling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`error ${err.message}`);
    console.log(`shutting down the server due to handling uncaugh exception`);
    process.exit(1);
});

dotenv.config();
app.use(express.json({ limit: '30mb' }));
app.use(cookieParser());
app.use(cors({
    origin: 'https://rudra-ecom-papp.vercel.app', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  }));
  



app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
app.use('/api/auth',router);
app.use('/api/auth',user);
app.use('/api/auth',order);
app.use('/api/auth/',payment);
app.use(errorhandle);



const PORT = process.env.PORT || 3031;

const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI,
         { useNewUrlParser: true, useUnifiedTopology:true
        });
        console.log("Connected to MongoDB");
} catch (error) {
    console.error("error",error);
    
}

const server =  app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection",(err) =>{
    console.error(`Error,${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    
    server.close(() => {
        process.exit(1);
        });
})