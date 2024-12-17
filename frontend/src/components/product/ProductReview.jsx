import React from 'react';
import ReactStars from "react-rating-stars-component";
import ProfileImg from '../../images/Profile.png'


const ProductReview = ({ review }) =>{

    const options = {
        edit: false,
        color: "rgba(20,20,20,.1)",
        activeColor: "red",
        value: review.rating,
        size: 20,
        isHalf:true
    }
    return(
        <>
        <div className="flex flex-col flex-none items-center p-4 m-4 w-72   border border-gray-600 shadow-xl">
            <img src={ProfileImg} alt="User" className="w-16" />
            <p className="text-xl font-bold">{review.name}</p>
            <ReactStars { ...options}/>
            <span className='text-xs text-gray-600 font-medium'>{review.comment}</span>
        </div>
        </>
    );
};

export default ProductReview;