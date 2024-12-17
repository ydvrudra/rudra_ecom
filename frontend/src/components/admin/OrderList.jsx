import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { deleteOrders, getallOrders, clearErrors } from "../../actions/OrderAction";
import { DELETE_ORDERS_RESET } from "../../constants/OrderConstant";


const OrderList = () => {
  const { error, orders } = useSelector((state) => state.allOrders);

  const {error: deleteError,isDeleted} = useSelector((state) => state.orderadmin);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success('Order Deleted Successfully');
      navigate('/admin/orders');
      dispatch({type:DELETE_ORDERS_RESET});
    }

    dispatch(getallOrders());
  }, [dispatch, alert, error, navigate,deleteError,isDeleted]);

  const deleteOrdersHandler = (id) => {
    dispatch(deleteOrders(id));
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1, headerClassName: 'custom-header'},
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      headerClassName: 'custom-header',
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "text-green-600"  
          : "text-red-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: 'custom-header',
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      headerClassName: 'custom-header',
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      headerClassName: 'custom-header',
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2 items-center justify-center">
          <Link to={`/admin/order/${params.row.id}`}>
            <EditIcon className="text-blue-600 hover:text-blue-800 transition duration-200 transform hover:scale-110" />
          </Link>

          <Button
            onClick={() => deleteOrdersHandler(params.row.id)}
            className="min-w-0 p-0"
          >
            <DeleteIcon
              className="text-red-600 hover:text-red-800 transition duration-200 transform hover:scale-110"
              style={{ fontSize: "20px" }}
            />
          </Button>
        </div>
      ),
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title={`All Orders - Admin`} />

      <div className="flex flex-col lg:flex-row">
        <SideBar />

        <div className="flex-grow p-4 sm:p-6 ">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            ALL PRODUCTS
          </h1>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-400 w-full overflow-x-auto">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="w-full"
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
