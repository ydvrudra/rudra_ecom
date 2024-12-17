import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:h-screen h-96 bg-gray-50 text-white text-center">
      <ErrorIcon className="text-red-500" style={{ fontSize: "5rem" }} />
      
      <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      
      <p className="mt-2 text-gray-600 text-xs">The page you're looking for doesn't exist or has been moved.</p>
      
      <Link 
        to="/" 
        className="mt-6 px-4 py-2 bg-customOrange-tomato text-white hover:bg-customOrange-tomatohover transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
