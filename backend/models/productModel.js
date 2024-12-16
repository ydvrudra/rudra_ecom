const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"],
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price Cannot Exceed 8 characters"],
    },
    ratings:{
        type:Number,
        default:0,

    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        }
    ],
    category:{
        type:String,
        required:[true,"Please Select Category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Stock"],
        maxLength:[4,"Stock Cannot Exceed 4 characters"],
        default:1,
        },
        numOfReviews:{
            type:Number,
            default:0,
        },
        reviews:[
            {
                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    require:true,
                },
                name:{
                    type:String,
                    require:true,
                },
                rating:{
                    type:Number,
                    require:true,
            },
            comment:{
                type:String,
                require:true,
            },

        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        },
});

const Product = mongoose.model("Product",productSchema);

module.exports = Product;