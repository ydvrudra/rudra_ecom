import React, { useEffect, useState } from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdUnlock } from "react-icons/io";
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { LuUser } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, login, register } from '../../actions/UserAction';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticatedUser } = useSelector(
    (state) => state.user
  );

  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setRegisterShowPassword] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const [errors, setErrors] = useState({});

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrors({ ...errors, login: "Please fill in all fields." });
      return;
    }
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    resetForm();
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    // Name validation
    if (!name) newErrors.name = "Name is required.";
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Password must contain at least one special character.";
    }
    // Avatar validation
    if (avatar === '/Profile.png') newErrors.avatar = "Avatar is required.";

    return newErrors;
  };

  const resetForm = () => {
    setUser({ name: '', email: '', password: '' });
    setAvatar('/Profile.png');
    setAvatarPreview('/Profile.png');
    setErrors({});
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticatedUser) {
       navigate('/account');
    }
  }, [dispatch, error, alert, isAuthenticatedUser, loading, navigate]);

  const RegisterPasswordVisibility = () => {
    setRegisterShowPassword(!showRegisterPassword);
  };

  const LoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  return (
    <>
    <MetaData title="Login Register"/>
      {loading ? <Loader /> :
        <div className="flex flex-col items-center justify-center sm:min-h-screen h-[35rem] bg-gray-100">
          <div className="bg-white p-5 shadow-lg border border-gray-300">
            {/* Tab Switcher */}
            <div className="flex mb-4">
              <button
                className={`w-1/2 py-2 text-center font-roboto text-sm ${isLogin ? 'text-black bg-gray-100' : 'text-blue-500 bg-transparent'} transition duration-300`}
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </button>
              <button
                className={`w-1/2 py-2 text-center font-roboto text-sm ${!isLogin ? 'text-black bg-gray-100' : 'text-blue-500 bg-transparent'} transition duration-300`}
                onClick={() => setIsLogin(false)}
              >
                REGISTER
              </button>
            </div>

            {/* Conditional Rendering for Login/Signup Forms */}
            <div className="p-4">
              {isLogin ? (
                <div className="login-form">
                  <form onSubmit={loginSubmit}>
                    <div className="mb-8 relative">
                      <MdOutlineMailOutline size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type="email"
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-8 relative">
                      <IoMdUnlock size={35} className='absolute top-[2px] text-black font-bold px-2' />
                      <input
                        type={showLoginPassword ? "text" : "password"} // Toggle password visibility
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                       <span onClick={LoginPasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                          {showLoginPassword ? "👁️" : <AiOutlineEyeInvisible className='text-xl' />}
                        </span>
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)} // Toggle state
                        className="absolute right-3 top-3 text-gray-500"
                      >
                      </button>
                    </div>

                    <div className="text-right mb-6">
                      <Link to='/password/forgot' className='text-xs font-roboto text-gray-700 hover:text-red-500 border-b-[1px] hover:border-b-black'>Forget Password?</Link>
                    </div>
                    {errors.login && <p className="text-red-500">{errors.login}</p>}
                    <button
                      type="submit"
                      className="w-full bg-customOrange-tomato text-white p-2 hover:bg-customOrange-tomatohover transition duration-300 border border-blue-500 rounded-sm"
                    >
                      Login
                    </button>
                  </form>
                </div>
              ) : (
                <div className="signup-form">
                  <form onSubmit={registerSubmit} encType="multipart/form-data">
                    <div className="mb-8 relative">
                      <LuUser size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type="text"
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="Name"
                        name='name'
                        required
                        value={name}
                        onChange={registerDataChange}
                      />
                      {errors.name && <p className="text-red-500 absolute text-xs -bottom-5">{errors.name}</p>}
                    </div>

                    <div className="mb-8 relative">
                      <MdOutlineMailOutline size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type="email"
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="Email"
                        name='email'
                        required
                        value={email}
                        onChange={registerDataChange}
                      />
                      {errors.email && <p className="text-red-500 absolute text-xs -bottom-5">{errors.email}</p>}
                    </div>

                    <div className="mb-8 relative">
                      <IoMdUnlock size={35} className='absolute top-[3px] text-black font-bold px-2' />
                      <input
                        type={showRegisterPassword ? "text" : "password"}
                        className="w-full p-2 px-8 border font-serif border-gray-400 rounded-sm focus:ring-0"
                        placeholder="Password"
                        name='password'
                        required
                        value={password}
                        onChange={registerDataChange}
                      />
                       <span onClick={RegisterPasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                          {showRegisterPassword ? "👁️" : <AiOutlineEyeInvisible className='text-xl' />}
                        </span>
                        
                      {errors.password && <p className="text-red-500 absolute text-xs -bottom-8">{errors.password}</p>}
                    </div>

                    <div className="flex registerImage my-5">
                      <img src={avatarPreview} alt="Avatar preview" className='h-10 w-10' />
                      <input type="file" name='avatar' accept='image/*' onChange={registerDataChange}
                        className='text-xs rounded-sm'
                      />
                      {errors.avatar && <p className="text-red-500 absolute text-xs -bottom-5">{errors.avatar}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-customOrange-tomato text-white p-2 hover:bg-customOrange-tomatohover transition duration-300 border border-blue-500 rounded-sm"
                    >
                      Register
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LoginSignup;
