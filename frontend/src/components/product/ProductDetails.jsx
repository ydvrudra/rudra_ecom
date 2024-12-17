import React, { useEffect, useState } from "react";
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getproductDetails,newReview } from "../../actions/ProductAction";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ProductReview from "./ProductReview";
import Loader from "../layout/loader/Loader";
import { useAlert } from 'react-alert'
import MetaData from "../layout/MetaData";
import { addItemsToCart } from '../../actions/CartAction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from '../../constants/ProductConstant'

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success('Item added to cart');
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getproductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "red",
    value: product.ratings,
    size: 20,
    isHalf: true
  };

  return (
    <>
      {loading ? <Loader /> : <>
        <MetaData title={`${product.name} -- Ecommerce`} />
        <div className="bg-gray-200 flex flex-wrap justify-evenly p-14 gap-10">
          <div className=" w-72">
            <Carousel>
              {product.images && product.images.map((item, i) => (
                <img
                  key={item.url}
                  className="h-full w-72"
                  src={item.url}
                  alt={`${i} Slide`} />
              ))}
            </Carousel>
          </div>

          <div className="">
            <div className="">
              <h2 className="font-bold text-xl">{product.name}</h2>
              <p className="text-xs text-gray-600">product # {product._id}</p>
            </div>

            <div className="flex items-center text-xs text-gray-600 gap-2 py-4 my-4 border border-l-0 border-r-0 border-gray-600">
              <ReactStars {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>

            <div className="">
              <h1 className="text-xl font-bold mt-4">{`₹${product.price}`}</h1>
              <div className="flex items-center gap-4 my-4">
                <div className="flex justify-center items-center">
                  <button onClick={decreaseQuantity} className="bg-gray-500 text-white hover:bg-gray-700 transition-all duration-500 w-6">-</button>
                  <input type="text" readOnly value={quantity} className="w-10 h-6 px-2 focus:ring-0 text-center outline-none text-xs" />
                  <button onClick={increaseQuantity} className="bg-gray-500 text-white hover:bg-gray-700 transition-all duration-500 w-6">+</button>
                </div>
                <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler} className="text-xs text-white font-medium bg-customOrange-tomato hover:bg-customOrange-tomatohover duration-500 px-5 py-1 rounded-xl">Add to Cart</button>
              </div>
              <p className="py-4 border border-l-0 border-r-0 border-gray-600 text-gray-600">
                Status:
                <b className={product.Stock < 1 ? "text-red-500" : "text-green-500"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="text-xl font-bold my-4">
              Description <p className="text-xs font-medium text-gray-600">{product.description}</p>
            </div>

            <button onClick={submitReviewToggle} className="text-xs text-white font-medium bg-customOrange-tomato hover:bg-customOrange-tomatohover transition-all duration-500 px-5 py-1 rounded-xl">Submit Reviews</button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-600 text-center w-60 m-auto py-6 border border-l-0 border-r-0 border-b-gray-600">Reviews</h3>

        {/* Review Dialog */}
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
          className="dialog-box"
        >
          <DialogTitle className="bg-gray-200 text-gray-800 text-xl font-semibold">Submit Your Review</DialogTitle>
          <DialogContent className="bg-white p-6">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
              className="my-2"
            />

            <textarea
              className="w-full border border-gray-300 p-3 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your review..."
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions className="bg-gray-100 p-3">
            <Button onClick={submitReviewToggle} className="bg-gray-500 text-white hover:bg-gray-700 px-4 py-2 rounded-lg">Cancel</Button>
            <Button onClick={reviewSubmitHandler} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Reviews Section */}
        {product.reviews && product.reviews[0] ? (
          <div className="flex overflow-auto">
            {product.reviews && product.reviews.map((reviewData) => <ProductReview review={reviewData} />)}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-6 font-medium">No review Yet</p>
        )}
      </>
      }
    </>
  );
};

export default ProductDetails;
