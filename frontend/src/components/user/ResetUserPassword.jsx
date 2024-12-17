import React, { useState,useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {clearErrors,resetPassword} from '../../actions/UserAction';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdUnlock } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEyeInvisible } from 'react-icons/ai';



const ResetUserPassword = () =>{

    const dispatch = useDispatch();
    const { token } = useParams();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error,success,loading} = useSelector((state)=>state.forgotPassword);


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(token, myForm));
      };
     
   
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Seccessufully");
            navigate('/login')
        }

      }, [dispatch, error, alert,success,navigate]);

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
          <MetaData title='Reset Password'/>
          <div className="flex flex-col items-center justify-center h-96 bg-gray-100">
          <div className="bg-white p-5 shadow-lg border border-gray-300">
            <h2 className="text-center pb-2 border border-l-0 border-r-0 border-t-0 border-b-black text-xl font-semibold uppercase">Reset Password</h2>
          <div className="signup-form mt-10">
                  <form onSubmit={resetPasswordSubmit}>

                  <div className="mb-8 relative">
                      <RiLockPasswordFill size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="New Password"
                        required
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}
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

export default ResetUserPassword;