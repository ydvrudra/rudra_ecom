import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData';
import { clearErrors, getProducts } from '../../actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert'
import ProductCard from '../product/ProductCard';


const Home = () =>{

    const {loading,error,products} = useSelector((state) =>state.products); 

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(()=>{
        if(error){
           alert.error(error);
           dispatch(clearErrors());
        }
        dispatch(getProducts());
    },[dispatch , error, alert]);

    

    return(
        <>
       {loading ?
        <Loader/> :
       <>
        <MetaData title = "Ecommerce"/>
        <div style={{backgroundImage:`url("https://img.freepik.com/premium-photo/red-basket-with-white-handle-sits-against-dark-background_337384-107265.jpg?w=1060")`}} className="relative h-40 md:h-screen sm:h-60 flex flex-col items-center justify-center space-y-5 text-white bg-cover bg-center">
            <div  style={{ clipPath: 'polygon(100% 80%, 0% 100%, 100% 100%)' }} 
            className="absolute top-0 left-0 bg-white h-screen w-full"></div>
            <p className="font-medium sm:text-xl text-xs">Welcome to Ecommerce</p>
            <h1 className="sm:text-3xl text-sm font-roboto font-bold sm:pt-4">FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container" className="border-[1px] px-5 py-2 text-xs font-roboto cursor-pointer bg-customOrange-tomato hover:bg-customOrange-tomatohover  hover:text-black duration-500">
               <div className="flex">
                 <button className='flex items-center gap-2'>
                    Scroll <CgMouse/>
                </button>
               </div>
            </a>
        </div>
        <h2 className="text-center font-roboto text-xl m-auto my-10 p-1 text-gray-800 border-b-[1px] border-[rgba(21,21,21,0.5)] w-60 shadow-xl shadow-slate-100">Featured Product</h2>

        <div className="container mx-auto flex flex-wrap justify-center gap-4" id ="container">
            {products && products.map((product)=><ProductCard product={product}/>)}
        </div>
       </>
       }
        </>
    );
};

export default Home;