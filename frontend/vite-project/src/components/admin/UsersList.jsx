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
import { DELETE_USER_RESET } from "../../constants/UserConstant";
import { getAllUsers,clearErrors, deleteUser } from "../../actions/UserAction";


const UsersList = () => {
  const { error, users } = useSelector((state) => state.allUsers);

  const {error:deleteError,isDeleted,message} = useSelector((state) => state.profile);
  
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
      alert.success(message);
      navigate('/admin/users');
      dispatch({type:DELETE_USER_RESET});
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, navigate,deleteError,isDeleted,message]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 1, headerClassName: 'custom-header', },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1.5,
      headerClassName: 'custom-header',
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      minWidth: 100,
      flex: 0.5,
      headerClassName: 'custom-header',
    },
    {
      field: "role",
      headerName: "Role",
      type: "string",
      minWidth: 150,
      flex: 0.7,
      headerClassName: 'custom-header',
      cellClassName: (params) => {
        return params.row.role === "admin"
          ? "text-green-600"  
          : "text-red-600";
      },
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
          <Link to={`/admin/user/${params.row.id}`}>
            <EditIcon className="text-blue-600 hover:text-blue-800 transition duration-200 transform hover:scale-110" />
          </Link>

          <Button
            onClick={() => deleteUserHandler(params.row.id)}
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`All Users - Admin`} />

      <div className="flex flex-col lg:flex-row">
        <SideBar />

        <div className="flex-grow p-4 sm:p-6 ">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            ALL USERS
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

export default UsersList;
