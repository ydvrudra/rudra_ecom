import React, { useEffect } from "react";
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from "react-redux";
import {getAdminProducts } from "../../actions/ProductAction";
import {Chart as ChartJS, LinearScale,CategoryScale, PointElement,LineElement,ArcElement,Title,Tooltip,Legend,Filler } from 'chart.js';
import { getAllUsers } from "../../actions/UserAction";
import { getallOrders } from "../../actions/OrderAction";
import MetaData from "../layout/MetaData";

ChartJS.register(LinearScale,CategoryScale,PointElement,LineElement,ArcElement,Title,Tooltip,Legend, Filler);

const AdminDashboard = () => {

    const {products} = useSelector(state => state.products);  
    const {users} = useSelector(state => state.allUsers);
    const {orders} = useSelector(state => state.allOrders);


    const dispatch = useDispatch();

    let outOfStock = 0;

    products && products.forEach((item)=>{
        if(item.Stock === 0){
            outOfStock += 1;
        };
    });

    useEffect(()=>{
        dispatch(getAdminProducts());
        dispatch(getallOrders());
        dispatch(getAllUsers());
    },[dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
    <MetaData title="Admin Dashboard"/>
    <div className="flex">
      <Sidebar />
      <div className="flex-grow sm:p-6 p-2 bg-gray-100 -z-30">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-400">
            <p className="text-gray-600">Total Amount</p>
            <h3 className="text-2xl font-bold">₹{totalAmount}</h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-400">
            <Link to="/admin/products" className="">
              <p className="text-gray-600">Products</p>
              <h3 className="text-2xl font-bold">{ products && products.length}</h3>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-400">
            <Link to="/admin/orders">
              <p className="text-gray-600">Orders</p>
              <h3 className="text-2xl font-bold">{orders && orders.length}</h3>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-400">
            <Link to="/admin/users">
              <p className="text-gray-600">Users</p>
              <h3 className="text-2xl font-bold">{users && users.length }</h3>
            </Link>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white sm:p-6 p-2 rounded-lg shadow mb-6 border border-gray-400">
          <h3 className="sm:text-lg text-xs font-bold mb-4">Total Amount Overview</h3>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Line
                data={lineState}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      type: 'category',
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white sm:p-6 p-2 rounded-lg shadow border border-gray-400">
          <h3 className="sm:text-lg text-xs font-bold mb-4">Stock Overview</h3>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Doughnut
                data={doughnutState}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
