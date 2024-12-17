import React from 'react';
import { Link } from 'react-router-dom';

const CartItemCart = ({ item, deleteCartItems }) => {
    return (
        <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <img src={item.image} alt="productimg" className="w-20 h-20 object-cover rounded-md" />

            <div className="text-center md:text-left mt-2 md:mt-0">
                <Link to={`/product/${item.product}`} className="font-bold text-lg">{item.name}</Link>
                <p className="text-sm text-gray-600">Price: {item.price} ₹</p>
                <p onClick={() =>deleteCartItems(item.product)} className="text-red-500 cursor-pointer">Remove</p>
            </div>
        </div>
    );
};

export default CartItemCart;
