import { createStore, combineReducers,applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import { ProductDetailsReducer, ProductReducer, deleteProductReducer, newProductReducer, newReviewReducer } from "../reducers/ProductReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "../reducers/UserReducer";
import { cartReducer } from "../reducers/CartReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from "../reducers/OrderReducer";



const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist the user reducer
};


const reducer = combineReducers({
  products:ProductReducer,
  productDetails:ProductDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
  newProduct:newProductReducer,
  deleteProduct:deleteProductReducer,
  allOrders:allOrdersReducer,
  orderadmin:ordersReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
});


const persistedReducer = persistReducer(persistConfig, reducer);


let initialState = {

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo : localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
      
  },
}

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

