const Product = require('../models/productModel');
const Errorhandler = require('../utils/errorhandler');
const catchAsyncError = require('../middlerware/catchAsyncError');
const Apifeatures  = require('../utils/apifeatures');
const cloudinary = require("cloudinary");


// create product -- Admin

const createProduct = catchAsyncError(async(req,res) =>{

  let images = [];
  if (typeof req.body.images === "string") {

    images.push(req.body.images);

    } else {
      images = req.body.images;
      }

      const imagesLink = [];

      for(let i = 0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
          });
          imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
            });
            }
            req.body.images = imagesLink;
            req.body.user = req.user.id 

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        message: 'Product created successfully', product});
});


// get all product 

const getAllProduct = catchAsyncError(async (req, res, next) => {
  
    const resultPerPage = 6;
    const productsCount = await Product.countDocuments();

    const apiFeature = new Apifeatures(Product.find(), req.query)
      .search()
      .filter()

    let products = await apiFeature.query; // Execute query once

    const filteredProductsCount = products.length; // Use the result from the query

    apiFeature.pegination(resultPerPage);
    


    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
});


// get all products(admin)

const getAdminProducts = catchAsyncError(async (req, res, next) => {
  
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});



    // update product -- admin

    const updateProduct = catchAsyncError(async(req,res,next) =>{

        let product = await Product.findById(req.params.id);

        if(!product){
            return next(new Errorhandler("product not Found",404));
            }
         product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true,
            useFIndAndModify:false
        });
        res.status(200).json({message: 'Product updated successfully', product});
    }
);


    // delete product --- Admin

    const deleteProduct = catchAsyncError(async(req,res,next) =>{
        let product = await Product.findById(req.params.id);

        if(!product){
            return next(new Errorhandler("product not found",404));
            }

            // delete images from cloudniary

            // for(i = 0; i < product.images.length; i++){
              
            //   await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            // }

        await product.deleteOne();
        res.status(200).json({message: 'Product deleted successfully'});
    });



    // get product details

    const getproductDetails = catchAsyncError(async(req,res,next) =>{
        let product = await Product.findById(req.params.id);

        if(!product){
            return next(new Errorhandler("product not Found",404));
            }
            res.status(200).json({message: 'Product details', product});
            });



  // Create New Review or Update the review

const createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
      message: 'Review added successfully',
    });
  });



  // get All reviews of a product

  const getAllProductReviews = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new Errorhandler("product not found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
        });
  });


  // delete review

  const deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });


const home = async (req,res) =>{
    try {
        res.status(200).send("this is home page bawa");
    } catch (error) {
        console.error(error);
    }
};


module.exports = { 
    home ,
    createProduct,
    getAllProduct,
    getAdminProducts,
    updateProduct,
    deleteProduct,
    getproductDetails,
    createProductReview,
    getAllProductReviews,
    deleteReview,
};