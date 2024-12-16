import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProducts,deleteProduct } from "../../actions/ProductAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/ProductConstant";


const ProductList = () => {
  const { error, products } = useSelector((state) => state.products);

  const {error:deleteError,isDeleted} = useSelector((state) => state.deleteProduct);
  
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
      alert.success('Product Deleted Successfully');
      navigate('/admin/dashboard');
      dispatch({type:DELETE_PRODUCT_RESET});
    }

    dispatch(getAdminProducts());
  }, [dispatch, alert, error, navigate,deleteError,isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 1, headerClassName: 'custom-header', },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1.5,
      headerClassName: 'custom-header',
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      headerClassName: 'custom-header',
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.7,
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
          <Link to={`/admin/product/${params.row.id}`}>
            <EditIcon className="text-blue-600 hover:text-blue-800 transition duration-200 transform hover:scale-110" />
          </Link>

          <Button
            onClick={() => deleteProductHandler(params.row.id)}
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`All Products - Admin`} />

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

export default ProductList;
