import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {

    const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

     <div className="bg-gray-50">
         {/* Main container with two columns */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 px-6 lg:px-0 py-5">
        
        {/* Left section: Shipping Info and Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
            <h2 className="text-xl font-semibold mb-4">
              Shipping Information
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Name:</p>
                <span className="text-gray-700">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Phone:</p>
                <span className="text-gray-700">{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Address:</p>
                <span className="text-gray-700">{address}</span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
            <h2 className= "text-xl font-semibold mb-4">
              Your Cart Items:
            </h2>
            <div className="divide-y divide-gray-200">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex justify-between py-4 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} x ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right section: Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-400 sticky top-20 self-start">
          <h2 className="text-xl font-semibold border-b-[1px] border-black w-40 pb-2 mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <p>Shipping Charges:</p>
              <span>{shippingCharges === 0 ? "Free" : `₹${shippingCharges}`}</span>
            </div>
            <div className="flex justify-between">
              <p>GST (18%):</p>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
            <p>Total:</p>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-2 mt-6 hover:bg-orange-600 transition-all"
            onClick={proceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
     </div>
    </>
  );
};

export default ConfirmOrder;
