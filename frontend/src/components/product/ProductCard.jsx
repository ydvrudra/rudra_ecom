import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,.1)",
        activeColor: "red",
        value: product.ratings,
        size: 20,
        isHalf: true,
    };

   
    const productImage = product.images && product.images.length > 0 
        ? product.images[0].url 
        : "path/to/placeholder/image.jpg"; 

    return (
        <>
            <Link 
                to={`/product/${product._id}`} 
                className='w-52 flex flex-col border border-gray-200 text-[rgb(48,48,48)] pb-10 my-4 shadow-xl hover:translate-y-2 duration-500'
            >
                <img 
                    className='w-52 h-52' 
                    src={productImage} 
                    alt={product.name} 
                />
                <p className="mx-2 my-2 font-roboto text-black">{product.name}</p>
                <div className="text-xs flex items-center gap-1 mx-2">
                    <ReactStars {...options} /> 
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <span className='mx-2 my-2 text-red-500 font-medium'>{`₹${product.price}`}</span>
            </Link>
        </>
    );
};

export default ProductCard;
