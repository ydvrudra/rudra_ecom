const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsyncError = require('../middlerware/catchAsyncError');
const Errorhandler = require('../utils/errorhandler');



// create new order

const newOrder = catchAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxtPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxtPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        success:true,
        order
        });
});


// get single order

const getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('user','name email')
    if(!order){
        return next(new Errorhandler('Order not found',404));
        }
        res.status(200).json({
            success:true,
            order
            });          
});


// get logged in user orders

const myOrders = catchAsyncError(async(req,res,next) =>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({
        success:true,
        orders
        });
});


// get All orders -- Admin

const getAllOrders = catchAsyncError(async(req,res,next) =>{
    
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
        });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
        });
});


// update order status -- admin

const updateOrder = catchAsyncError(async(req,res,next) =>{
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
        return next(new Errorhandler("Order not found with this Id", 404));
      }
    
    if(order.orderStatus === "Delivered"){
        return next(new Errorhandler('you have already delivered this order',400));
        }

        if(req.body.status === "Shipped")
        order.orderItems.forEach(async order =>{
            await updateStock(order.product,order.quantity);
        });

        order.orderStatus = req.body.status;
        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now();
        }


        await order.save({ValidateBeforeSave:false});
        res.status(200).json({
            success:true,
            order
            });
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ValidateBeforeSave:false});
}


// delete order -- admin
const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new Errorhandler("Order not found with this Id", 404));
    }
  
    await order.deleteOne();
  
    res.status(200).json({
      success: true,
    });
  });
module.exports = {newOrder,getSingleOrder,myOrders,getAllOrders,updateOrder,deleteOrder};