import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrders } from "../../actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDERS_RESET } from "../../constants/OrderConstant";

const UpdateOrders = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.orderadmin);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrders(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDERS_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Update Order" />
      <div className="flex bg-gray-100 min-h-screen">
        <SideBar />
        <div className="w-full p-6 space-y-6">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid md:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6">
              {/* Shipping Info */}
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
              {/* Update Order Form */}
              {order?.orderStatus !== "Delivered" && (
                <form onSubmit={updateOrderSubmitHandler} className="space-y-6">
                  <h2 className="text-2xl font-semibold">Update Order</h2>
                  <div className="flex items-center space-x-2">
                    <AccountTreeIcon />
                    <select
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                       <option value="">Choose Status</option>
                       <option value="Shipped">Shipped</option>
                       <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading || !status}
                    className="w-full py-2 rounded-md"
                  >
                    Process
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrders;
