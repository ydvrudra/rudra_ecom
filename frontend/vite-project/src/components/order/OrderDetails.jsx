import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
       <div className="max-w-5xl m-auto px-4 sm:px-6 lg:px-8 py-10">
       <div className="p-8 bg-white shadow-md rounded-lg border border-gray-400">
            <h2 className="sm:text-2xl font-semibold mb-4 text-red-600">Order #{order && order._id}</h2>
            
            {order && order.user && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Shipping Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">Name:</p>
                    <span>{order.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Phone:</p>
                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <p className="font-medium">Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {order && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Payment</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {order.paymentInfo && order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Amount:</p>
                    <span>₹{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {order && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Order Status</h3>
                <div className="space-y-2">
                  <p
                    className={
                      order.orderStatus === "Delivered"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {order.orderStatus}
                  </p>
                </div>
              </div>
            )}

            {order && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Order Items:</h3>
                <div className="space-y-4">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product} className="flex items-center justify-between">
                        <img src={item.image} alt="Product" className="w-16 h-16 object-cover" />
                        <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
       </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
