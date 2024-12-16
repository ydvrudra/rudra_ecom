import axios from 'axios';
import {
     ALL_PRODUCT_REQUEST,
     ALL_PRODUCT_SUCCESS,
     ALL_PRODUCT_FAIL,

     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAIL,

     NEW_REVIEW_REQUEST,
     NEW_REVIEW_SUCCESS,
     NEW_REVIEW_FAIL,

     NEW_PRODUCT_REQUEST,
     NEW_PRODUCT_SUCCESS,
     NEW_PRODUCT_FAIL,
     NEW_PRODUCT_RESET,

     ADMIN_PRODUCT_REQUEST,
     ADMIN_PRODUCT_SUCCESS,
     ADMIN_PRODUCT_FAIL,

     DELETE_PRODUCT_REQUEST,
     DELETE_PRODUCT_SUCCESS,
     DELETE_PRODUCT_FAIL,
     DELETE_PRODUCT_RESET,

     UPDATE_PRODUCT_REQUEST,
     UPDATE_PRODUCT_SUCCESS,
     UPDATE_PRODUCT_FAIL,
     UPDATE_PRODUCT_RESET,


     CLEAR_ERRORS 
    } from '../constants/ProductConstant';

    const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


// get product from backend api

export const getProducts = ( keyword = "",currentPage = 1, price = [0,60000],category,ratings = 0 ) => async(dispatch) =>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});
        

        let productApi = `${BASE_URL}/api/auth/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    
        if(category){
            productApi = `${BASE_URL}/api/auth/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const {data} = await axios.get(productApi);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
        
    }
};



// get product details from backend api 

export const getproductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`${BASE_URL}/api/auth/product/${id}`);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
        });
        
    }
};

// get All products Admin

export const getAdminProducts = () => async (dispatch) =>{
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST});

        const config = {
            withCredentials: true, // Include cookies in request
        };

        const {data} = await axios.get(`${BASE_URL}/api/auth/admin/products`,config);

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products,
        })
        
    } catch (error) {
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
        
    }
};

// create products - admin

export const createProduct = (productData) => async (dispatch) =>{
    try {
        dispatch({type:NEW_PRODUCT_REQUEST});

        const config = {
            headers: { "Content-Type": "application/json" },withCredentials:true,
          };

        const {data} = await axios.post(`${BASE_URL}/api/auth/admin/product/new`,productData,config);

        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
        
    }
};


// update product by --admin

export const updateProduct = (id,productData) => async (dispatch) =>{
    try {
        dispatch({type:UPDATE_PRODUCT_REQUEST});

        const config = {
            headers: { "Content-Type": "application/json" },withCredentials:true,
          };

        const {data} = await axios.put(`${BASE_URL}/api/auth/admin/product/${id}`,productData,config);

        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success,
        })
        
    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
        
    }
};


// delete product - admin
export const deleteProduct = (id) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST});

        const config = {
            headers: { "Content-Type": "application/json" },withCredentials:true,
          };

        const {data} = await axios.delete(`${BASE_URL}/api/auth/admin/product/${id}`,config);

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success,
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
        
    }
};


// new review action

export const newReview = (reviewData) => async (dispatch) =>{
    try {

        dispatch({type: NEW_REVIEW_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, 
            
        }
        const {data} = await axios.put(`${BASE_URL}/api/auth/review`,reviewData,config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload:data.success,
        })
        
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload:error.response.data.message,
        });
        
    }
};

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS,
    })
}