import {
    ADD_TO_CART, 
    REMOVE_TO_CART,
    SAVE_SHIPPING_INFO,
} from '../constants/CartConstant';

import axios from 'axios';


const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

// add to cart

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${BASE_URL}/api/auth/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };




  // remove from cart items

  export const removeItmesfromCart = (id) => async(dispatch,getState) =>{
    dispatch({
        type: REMOVE_TO_CART,
        payload: id
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }

  // save shipping info func

  export const saveShippingInfo = (data) => async(dispatch) =>{
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
        });
        localStorage.setItem("shippingInfo",JSON.stringify(data));
  }
  