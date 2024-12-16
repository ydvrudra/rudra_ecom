import React, { useState,useEffect } from 'react';
import { useAlert } from 'react-alert';
import { IoMdUnlock } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoMdKey } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {clearErrors,updatePassword} from '../../actions/UserAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/UserConstant';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';

const UpdateUserPassword = () =>{

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error,isUpdated,loading} = useSelector((state)=>state.profile);


    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    



    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
      };
     
   
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('Password updated successfully');
          navigate('/account');

          dispatch({
            type:UPDATE_PASSWORD_RESET
          })
        }
      }, [dispatch, error, alert, loading, navigate, isUpdated]);


      const oldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
      };
    
      const NewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
      };

      const ConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
      };
    

    return(
        <>
        {loading ? <Loader /> :
          <>
          <MetaData title='Change Password'/>
          <div className="flex flex-col items-center justify-center sm:min-h-screen h-[35rem] bg-gray-100">
          <div className="bg-white p-5 shadow-lg border border-gray-300">
            <h2 className="text-center pb-5 text-xl font-semibold uppercase">Update Password</h2>
          <div className="signup-form">
                  <form onSubmit={updatePasswordSubmit}>
                  <div className="mb-8 relative">
                      <IoMdKey size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type={showOldPassword ? "text" : "password"}
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="Old Password"
                        required
                        value={oldPassword}
                        onChange={(e) =>setOldPassword(e.target.value)}
                      />
                       <span onClick={oldPasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                          {showOldPassword ? "👁️" : <AiOutlineEyeInvisible className='text-xl' />}
                        </span>
                    </div>

                    <div className="mb-8 relative">
                      <RiLockPasswordFill size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="New Password"
                        required
                        value={newPassword}
                        onChange={(e) =>setNewPassword(e.target.value)}
                      />
                       <span onClick={NewPasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                           {showNewPassword ? "👁️" : <AiOutlineEyeInvisible className='text-xl' />}
                        </span>
                    </div>



                     <div className="mb-8 relative">
                      <IoMdUnlock size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                         onChange={(e) =>setConfirmPassword(e.target.value)}
                      />
                       <span onClick={ConfirmPasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                          {showConfirmPassword ? "👁️" : <AiOutlineEyeInvisible className='text-xl' />}
                        </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-customOrange-tomato text-white p-2 hover:bg-customOrange-tomatohover transition duration-300 border border-blue-500 rounded-sm"
                    >
                      Update
                    </button>
                  </form>
                </div>
             </div>
         </div>
          </>
        }
      </>
    );
};

export default UpdateUserPassword;