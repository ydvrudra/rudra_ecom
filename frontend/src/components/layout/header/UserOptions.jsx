import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/UserAction';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
//import Draggable from 'react-draggable';


const UserOptions = ({user}) => {
  const [open, setOpen] = useState(false);

  const {cartItems} = useSelector((state) =>state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const dashboard = () => {
    navigate('/admin/dashboard');
  };

  const orders = () => {
    navigate('/orders');
  };

  const account = () => {
    navigate('/account');
  };

  const cart = () => {
    navigate('/cart');
  }

  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout Successfully!");
  }; 


  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    { icon: <ShoppingCartIcon style={{color:cartItems.length >0 ? "red" :"unset" }}/> , name:`Cart(${cartItems.length})`, func:cart},
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />, name: "Dashboard", func: dashboard,
    });
  }

  // const { user, isAuthenticatedUser } = useSelector((state) => state.user);



 

  return (
    <>
    <Backdrop open={open} className='z-10'/>
      {user &&  (
        // <Draggable>
        <SpeedDial className='fixed lg:top-[8vmax] top-[10vmax] right-[2vmax]'
          ariaLabel="Speeddial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction='down'
          icon={
            <img
              src={user.avatar && user.avatar.url ? user.avatar.url : '/Profile.png'}
              alt="profile"
              className='rounded-full border border-blue-500'
            />
          }
        >
          {options.map((item, index) => (
            <SpeedDialAction className=''
              key={item.name}
              icon={item.icon}
              tooltipTitle={<span style={{ fontSize: '10px' }}>{item.name}</span>}
              onClick={item.func}
              tooltipOpen ={window.innerWidth <=700 ? true : false}
            />
          ))}
        </SpeedDial>
       
      )}
    </>
  );
};

export default UserOptions;
