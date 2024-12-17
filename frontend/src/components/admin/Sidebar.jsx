import React, { useState } from "react";
import logo from "../../images/ecom.png";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  const [isProductsOpen, setProductsOpen] = useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
  };

  return (
    <div className="bg-gray-800 text-white h-screen p-6 space-y-6">
      <Link to="/">
        <img src={logo} alt="Ecommerce" className="w-40 mx-auto" />
      </Link>

      <Link to="/admin/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
        <DashboardIcon /> <p>Dashboard</p>
      </Link>

      <div>
        <div
          onClick={toggleProducts}
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
        >
          {isProductsOpen ? <ExpandMoreIcon /> : <ImportExportIcon />}
          <span>Products</span>
        </div>
        {isProductsOpen && (
          <div className="ml-4 space-y-2">
            <Link to="/admin/products" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
              <PostAddIcon /> <span>All</span>
            </Link>
            <Link to="/admin/product" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
              <AddIcon /> <span>Create</span>
            </Link>
          </div>
        )}
      </div>

      <Link to="/admin/orders" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
        <ListAltIcon /> <p>Orders</p>
      </Link>

      <Link to="/admin/users" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
        <PeopleIcon /> <p>Users</p>
      </Link>

      <Link to="/admin/reviews" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
        <RateReviewIcon /> <p>Reviews</p>
      </Link>
    </div>
  );
};

export default Sidebar;
