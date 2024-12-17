import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const OrderSuccess = () => {
  return (
    <>
    <MetaData title = 'Order Success'/>

    <div className="md:min-h-screen h-[32rem] flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white sm:p-8 p-4 shadow-lg rounded-lg text-center border border-gray-400">
        <CheckCircleIcon className="text-green-500" style={{ fontSize: '5rem' }} />
        <h2 className="sm:text-2xl text-xl font-semibold mt-4">
          Your Order has been Placed Successfully!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your purchase. You can view your order details below.
        </p>
        <Link
          to="/orders"
          className="mt-6 inline-block bg-customOrange-tomato text-white py-2 px-4 hover:bg-customOrange-tomatohover transition-colors duration-300"
        >
          View Orders
        </Link>
      </div>
    </div>
    </>
  );
};

export default OrderSuccess;
