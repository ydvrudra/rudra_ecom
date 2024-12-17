import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartItemCart from './CartItemCart';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart,removeItmesfromCart } from '../../actions/CartAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const Cart = () => {

    const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const increaseQunatity = (id,quantity,stock) =>{

        const newQty = quantity + 1;
        if(stock <= quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQty));
    } 

    const decreaseQuantity = (id,quantity) =>{

        const newQty = quantity  - 1;
        if(1 >= quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQty));
    }
    
    const deleteCartItems = (id) =>{
        dispatch(removeItmesfromCart(id));
        alert.success("Item remove from Cart");

    };

    const checkoutHandler = () =>{
        navigate('/shipping');
    }

    return (
       <>
       <MetaData title="Cart-Ecommerce"/>
       {cartItems.length === 0 ?
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Icon or Image */}
            <AiOutlineShoppingCart size={120} className="text-customOrange-tomato mb-4" />

            {/* Empty Cart Text */}
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything to your cart yet.</p>

            {/* Continue Shopping Button */}
            <Link to="/products">
                <button className="bg-customOrange-tomato text-white px-6 py-2 hover:bg-customOrange-tomatohover transition duration-300">
                    Continue Shopping
                </button>
            </Link>
        </div>
        </>

        :
        <>
         <div className="container mx-auto p-2">
            {/* Header for cart items */}
            <div className="flex items-center justify-between  bg-customOrange-tomato text-white p-2 text-center">
                <p className="font-semibold">Product</p>
                <p className="font-semibold">Price</p>
                <p className="font-semibold">SubTotal</p>
            </div>

            {/* Cart item */}
          {cartItems && cartItems.map((item)=>(
            <>
              <div key={item.product} className=" flex items-center justify-between gap-2 px-2 py-10 bg-white shadow-md border border-gray-300 rounded-lg my-4">
                {/* Product section */}
                <CartItemCart item={item} deleteCartItems = {deleteCartItems} />

                {/* Quantity section */}
                <div className="flex items-center justify-center">
                    <button onClick={() =>decreaseQuantity(item.product,item.quantity)} className="px-2 bg-gray-300">-</button>
                    <input type="number" readOnly value={item.quantity} className="w-7 md:w-12 text-xs p-1 h-[1.5rem] border-none focus:ring-0 text-center  text-black" />
                    <button onClick={() =>increaseQunatity(item.product,item.quantity,item.stock)} className="px-2 bg-gray-300">+</button>
                </div>

                {/* Subtotal section */}
                <p className="text-center font-semibold">{`₹${item.price * item.quantity}`}</p>
            </div>
            </>
          ))}
            

            {/* Gross Total Section */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-lg">Gross Total</p>
                <p className="font-semibold text-lg">{`₹${cartItems.reduce((acc,item)=> 
                    acc + item.price * item.quantity,0
                    )}`}</p>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-end mt-4">
                <button onClick={checkoutHandler} className="bg-customOrange-tomato text-white px-4 py-2 hover:bg-customOrange-tomatohover transition duration-300">
                    Check Out
                </button>
            </div>
        </div>
        </>
        }
       </>
    );
}

export default Cart;
