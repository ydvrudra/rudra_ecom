import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../product/Search';
import logo from '../../../images/ecom.png';
//import { IoSearchSharp } from "react-icons/io5";



const Header = () =>{

  return(
    <div class="bg-white antialiased shadow-xl sticky top-0 z-40">
  <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
    <div class="flex items-center justify-between">

      <div class="flex items-center space-x-8">
        <div class="shrink-0">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} class="h-6" alt="Logo" />
        {/* <span class="self-center sm:text-xl lg:mb-1 text-xs font-bold whitespace-nowrap">Ecommerce</span> */}
    </a>
        </div>

        <ul class="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-4 sm:justify-center">
          <li>
            <Link to="/" title="" class="flex text-sm font-medium text-gray-900 hover:text-primary-700">
              Home
            </Link>
          </li>
          <li class="shrink-0">
            <Link to="/about" title="" class="flex text-sm font-medium text-gray-900 hover:text-primary-700">
              About
            </Link>
          </li>
          <li class="shrink-0">
            <Link to="/products" title="" class="flex text-sm font-medium text-gray-900 hover:text-primary-700">
              Products
            </Link>
          </li>
          <li class="shrink-0">
            <Link to="/contact" title="" class="text-sm font-medium text-gray-900 hover:text-primary-700">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div class="flex items-center lg:space-x-2">
        {/* <a href="/search" className="hover:bg-gray-100 p-2 rounded-lg text-gray-900"><IoSearchSharp/></a> */}
       <span className="hidden sm:block"> <Search/></span>

        {/* <button id="myCartDropdownButton1" data-dropdown-toggle="myCartDropdown1" type="button" class="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 text-sm font-medium leading-none text-gray-900">
          <span class="sr-only">
            Cart
          </span>
         
          <svg class="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
          </svg> 
          <svg class="hidden sm:flex w-4 h-4 text-gray-900  ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
          </svg>              
        </button>

        <div id="myCartDropdown1" class="hidden z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg">
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900  hover:underline">Apple iPhone 15</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 ">$599</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500">Qty: 1</p>
      
              <button data-tooltip-target="tooltipRemoveItem1a" type="button" class="text-red-600 hover:text-red-700">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem1a" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900  hover:underline">Apple iPad Air</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 ">$499</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 ">Qty: 1</p>
      
              <button data-tooltip-target="tooltipRemoveItem2a" type="button" class="text-red-600 hover:text-red-700">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem2a" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900  hover:underline">Apple Watch SE</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 ">$598</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 ">Qty: 2</p>
      
              <button data-tooltip-target="tooltipRemoveItem3b" type="button" class="text-red-600 hover:text-red-700">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem3b" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900  hover:underline">Sony Playstation 5</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 ">$799</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 ">Qty: 1</p>
      
              <button data-tooltip-target="tooltipRemoveItem4b" type="button" class="text-red-600 hover:text-red-700">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem4b" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900  hover:underline">Apple iMac 20"</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 ">$8,997</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 ">Qty: 3</p>
      
              <button data-tooltip-target="tooltipRemoveItem5b" type="button" class="text-red-600 hover:text-red-700">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem5b" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <a href="#" title="" class="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300" role="button"> Proceed to Checkout </a>
        </div> */}

        <a href='/login' class="inline-flex items-center justify-center px-3 py-2 bg-customOrange-tomato hover:bg-customOrange-tomatohover text-xs  font-medium leading-none text-white ">
                      
          Login
        </a>

      

        <button type="button" data-collapse-toggle="ecommerce-navbar-menu-1" aria-controls="ecommerce-navbar-menu-1" aria-expanded="false" class="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md p-2 text-gray-900 ">
          <span class="sr-only">
            Open Menu
          </span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
          </svg>                
        </button>
      </div>
    </div>

    <div id="ecommerce-navbar-menu-1" class="bg-gray-50 border border-gray-200 rounded-lg py-3 hidden px-4 mt-4">
      <ul class="text-gray-900  text-sm font-medium  space-y-3">
        <li>
          <a href="/" class="hover:text-primary-700">Home</a>
        </li>
        <li>
          <a href="/about" class="hover:text-primary-700">About</a>
        </li>
        <li>
          <a href="/products" class="hover:text-primary-700">Products</a>
        </li>
        <li>
          <a href="/contact" class="hover:text-primary-700">Contact</a>
        </li>
        <li className=''>
          <Search/>
        </li>
      </ul>
    </div>
  </div>
</div>
  );
};

export default Header;





// import React from 'react';
// import { ReactNavbar } from 'overlay-navbar';
// import logo from '../../../images/logo.png';
// import { IoSearchSharp } from "react-icons/io5";
// import { FaUserAlt } from "react-icons/fa";
// import { FiShoppingBag } from "react-icons/fi";

// const options = {
//   backgroundColor:"gray",
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "#f0f0f0",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "About",
//   link3Text: "Products",
//   link4Text: "Contact",
//   link1Url: "/",
//   link2Url: "/about",
//   link3Url: "/products",
//   link4Url: "/contact",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
//   searchIcon: true,
//   SearchIconElement: IoSearchSharp,
//   profileIcon: true,
//   ProfileIconElement: FaUserAlt,
//   cartIcon: true,
//   CartIconElement: FiShoppingBag,

  
// };

// const Header = () => {
//   return (
//     <>
//       <ReactNavbar {...options} />
//     </>
//   );
// };

// export default Header;
