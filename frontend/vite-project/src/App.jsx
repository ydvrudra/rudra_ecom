import React ,{ useEffect, useState }from 'react';
import './App.css';
import './index.css';
import axios from 'axios';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Header from './components/layout/header/Header';
import Home from './components/home/Home';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
//import Search from './components/product/Search';
import LoginSignup from './components/user/LoginSignup';
//import { store } from './redux/store'
//import { loadUser } from './actions/UserAction';
import UserOptions from './components/layout/header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateUserProfile from './components/user/UpdateUserProfile';
import UpdateUserPassword from './components/user/UpdateUserPassword';
import ForgotUserPassword from './components/user/ForgotUserPassword';
import ResetUserPassword from './components/user/ResetUserPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import {loadStripe} from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import MyOrders from './components/order/MyOrders';
import OrderDetails from './components/order/OrderDetails';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductList from './components/admin/ProductList';
import CreateProduct from './components/admin/CreateProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrders from './components/admin/UpdateOrders';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import AboutUs from './components/layout/about/AboutUs';
import ContactUs from './components/layout/about/contact/ContactUs';
import NotFound from './components/layout/NotFound';



const  App = () => {

  const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


  const {isAuthenticatedUser,user} = useSelector((state)=>state.user);

  const [stripeApiKey,setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error('Error fetching Stripe API Key:', error);
    }
  }
  
  useEffect(()=>{
   WebFont.load({
      google: {
        families: ['Roboto','Droid Sans','Chilanka'],
        },
        });

        // store.dispatch(loadUser());
        getStripeApiKey();
  },[]);

  return (
    <>
    <Router>
      <Header />
      { isAuthenticatedUser && <UserOptions user = {user}/>}
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = '/product/:id' element = {<ProductDetails/>} />
        <Route path='/products' element = {<Products/>}/>
        <Route path='/products/:keyword' element = {<Products/>}/>
        <Route path='/about' element = {<AboutUs/>}/>
        <Route path='/contact' element = {<ContactUs/>}/>
        <Route path='/login' element = {<LoginSignup/>}/>
        <Route path='/*' element = {<NotFound/>}/>
        
        <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path='/me/update' element = {
            <ProtectedRoute>
              <UpdateUserProfile/>
            </ProtectedRoute>
          }
          />

          <Route path='/password/update' element = {
            <ProtectedRoute>
              <UpdateUserPassword/>
            </ProtectedRoute>
          }/>

          <Route path='/password/forgot' element = {
              <ForgotUserPassword/>
          }/>

          <Route path='/password/reset/:token' element = {
            <ResetUserPassword/>
          }/>

          <Route path='/cart' element = {<Cart/>}/>

          <Route path='/shipping' element = {
            <ProtectedRoute>
              <Shipping/>
            </ProtectedRoute>
          }/>

          <Route path='/order/confirm' element = {
            <ProtectedRoute>
              <ConfirmOrder/>
            </ProtectedRoute>
          }/>

         {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            }
          />
        )}

        <Route path='/success' element = {
          <ProtectedRoute>
            <OrderSuccess/>
          </ProtectedRoute>
        }/>

        <Route path='/orders' element = {
          <ProtectedRoute>
            <MyOrders/>
          </ProtectedRoute>
        }/>

        <Route path='/order/:id' element = {
          <ProtectedRoute>
            <OrderDetails/>
          </ProtectedRoute>
        }/>

        <Route path='/admin/dashboard' element = {
          <ProtectedRoute isAdmin={true}>
            <AdminDashboard/>
          </ProtectedRoute>
        }/>

        <Route path='/admin/products' element = {
          <ProtectedRoute isAdmin={true}>
            <ProductList/>
          </ProtectedRoute>
        }/>

        <Route path='/admin/product' element = {
          <ProtectedRoute isAdmin={true}>
            <CreateProduct/>
          </ProtectedRoute>
        }/>

        <Route path='/admin/product/:id' element = {
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct/>
          </ProtectedRoute>
        }/>

        <Route path='/admin/orders' element = {
          <ProtectedRoute isAdmin={true}>
            <OrderList/>
          </ProtectedRoute>
        }/>

        <Route path='/admin/order/:id' element = {
          <ProtectedRoute isAdmin={true}>
            <UpdateOrders/>
          </ProtectedRoute>
        }/>

       <Route path='/admin/users' element = {
          <ProtectedRoute isAdmin={true}>
            <UsersList/>
          </ProtectedRoute>
        }/>

      <Route path='/admin/user/:id' element = {
          <ProtectedRoute isAdmin={true}>
            <UpdateUser/>
          </ProtectedRoute>
        }/>

      </Routes>
    </Router>
    </>
  );
};

export default App;
