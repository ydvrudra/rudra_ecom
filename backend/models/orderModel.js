const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address: {
            type: String, 
            required: true
        },
        city: {
            type: String, 
            required: true,
        },
        state: {
            type: String, 
            required: true,
        },
        country: {
            type: String, 
            required: true,
        },
        pinCode: {
            type: Number, 
            required: true,
        },
        phoneNo: {
            type: Number, 
            required: true,
        },
    },
    orderItems:[
        {
            name:{
                type: String,
                required: true,
            },
            price:{
                type: Number,
                required: true,
            },
            quantity:{
                type: Number,
                required: true,
            },
            image:{
                type: String,
                required: true,
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                },
        },
    ],
           user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
           },
           paymentInfo:{
            id:{
                type: String,
                required: true,
            },
            status:{
                type: String,
                required: true,
           },
        },
        paidAt:{
            type: Date,
            require:true,
            default: Date.now,
        },
        itemPrice:{
            type:Number,
            required:true,
            default:0
        },
        taxPrice:{
            type:Number,
            require:true,
            default:0
        },
        shippingPrice:{
            type:Number,
            require:true,
            default:0
        },
        totalPrice:{
            type:Number,
            require:true,
            default:0
        },
        orderStatus:{
            type:String,
            require:true,
            default: 'processing',
        },
        deliveredAt:Date,
        createdAt:{
            type:Date,
            default:Date.now
        },
    });

    const Order = mongoose.model('Order', orderSchema);
    module.exports = Order;