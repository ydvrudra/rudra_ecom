import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import SideBar from "./Sidebar";
import {  UPDATE_USER_RESET } from "../../constants/UserConstant";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser , clearErrors} from "../../actions/UserAction";

const UpdateUser = () => {

  const { error,loading,user } = useSelector((state) => state.userDetails);
  const { loading:updateLoading, error:updateError,isUpdated } = useSelector((state) => state.profile);
  
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} = useParams();


  const [name, setName] = useState("");
  const [email, setEmail] = useState(0);
  const [role, setRole] = useState("");

  const userId = id;

   useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setRole(user.role);
      setEmail(user.email);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    userId,
    user,
    updateError,
  ]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId ,myForm));
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="flex flex-col sm:flex-row bg-gray-100">
        <SideBar />
        <div className="flex-grow p-6">
          <form
            className="bg-white shadow-lg p-4 max-w-lg mx-auto border border-gray-400"
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            <h1 className="text-2xl font-bold text-gray-700 mb-6">
              Update User
            </h1>

            {/* Product Name */}
            <div className="flex items-center mb-4">
              <PersonIcon className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="User Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md"
              />
            </div>

            {/* Price */}
            <div className="flex items-center mb-4">
              <MailOutlineIcon className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md"
              />
            </div>

            {/* Role */}
            <div className="flex items-center mb-4">
              <VerifiedUserIcon className="mr-2 text-gray-500" />
              <select 
               value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded-md">
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading ? true : false}
              className="w-full bg-customOrange-tomato text-white py-2 px-4 hover:bg-customOrange-tomatohover transition duration-500"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
