import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector,useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import {clearErrors , createOrder} from '../../actions/OrderAction';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  //const dispatch = useDispatch();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    description: "Purchase of electronics", 
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          
        },
        withCredentials: true, 
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/process/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        }
        else {
            alert.error("There's some issue while processing payment ");
          }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(()=>{
    if(error){
        alert.error(error.message);
        dispatch(clearErrors());
    }
  },[dispatch,error,alert]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="flex justify-center items-center sm:min-h-screen h-96 bg-gray-50 px-4">
        <form
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm border border-gray-400"
          onSubmit={(e) => submitHandler(e)}
        >
          <h2 variant="h5" className="mb-4 text-center font-semibold text-2xl">
            Card Info
          </h2>
          <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
            <CreditCardIcon className="mr-2 text-gray-600" />
            <CardNumberElement className="paymentInput flex-1 p-2 outline-none" />
          </div>
          <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
            <EventIcon className="mr-2 text-gray-600" />
            <CardExpiryElement className="paymentInput flex-1 p-2 outline-none" />
          </div>
          <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
            <VpnKeyIcon className="mr-2 text-gray-600" />
            <CardCvcElement className="paymentInput flex-1 p-2 outline-none" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="bg-customOrange-tomato hover:bg-customOrange-tomatohover text-white font-semibold py-2 px-4 w-full cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
