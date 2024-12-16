import axios from "axios";

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_SUCCESS,
    UPDATE_ORDERS_FAIL,
    UPDATE_ORDERS_RESET,

    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
    DELETE_ORDERS_RESET,

    CLEAR_ERRORS,
} from '../constants/OrderConstant';


    const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

// create order
export const createOrder = (order) => async(dispatch) =>{
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, 
        };
        const {data} = await axios.post(`${BASE_URL}/api/auth/order/new` ,order,config);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
            });
        
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });

        
    };

};


// my orders

export const myOrders = () => async(dispatch) =>{
    try {
        dispatch({
            type: MY_ORDERS_REQUEST
        });

        const config = {
            withCredentials: true, 
        };
        const {data} = await axios.get(`${BASE_URL}/api/auth/orders/me`, config);
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
            });
        
    } catch (error) {
        dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });

        
    };

};



// get all orders - admin

export const getallOrders = () => async(dispatch) =>{
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST
        });
 
        const config = {
            withCredentials: true, 
        };
        const {data} = await axios.get(`${BASE_URL}/api/auth/admin/orders`, config);
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders
            });
        
    } catch (error) {
        dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });

        
    };
};


// update orders - admin

export const updateOrders = (id,order) => async(dispatch) =>{
    try {
        dispatch({
            type: UPDATE_ORDERS_REQUEST
        });

        const config = {
            withCredentials: true, 
        };
        const {data} = await axios.put(`${BASE_URL}/api/auth/admin/order/${id}` ,order,config);
        dispatch({
            type: UPDATE_ORDERS_SUCCESS,
            payload: data.success
            });
        
    } catch (error) {
        dispatch({ type: UPDATE_ORDERS_FAIL, payload: error.response.data.message });

        
    };
};



// delete orders - admin

export const deleteOrders = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: DELETE_ORDERS_REQUEST
        });

        const config = {
            withCredentials: true, 
        };

        const {data} = await axios.delete(`${BASE_URL}/api/auth/admin/order/${id}` ,config);
        dispatch({
            type: DELETE_ORDERS_SUCCESS,
            payload: data.success
            });
        
    } catch (error) {
        dispatch({ type: DELETE_ORDERS_FAIL, payload: error.response.data.message });

        
    };
};




// get order details

export const getOrderDetails = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const config = {
            withCredentials: true, // Include cookies in request
        };

        const {data} = await axios.get(`${BASE_URL}/api/auth/order/${id}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
            });
        
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message });

        
    };

};



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

