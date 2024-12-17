import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { IoSearchSharp } from "react-icons/io5";

const Search = () =>{

    const [keyword,setKeyword] = useState('');

    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          navigate(`/products/${keyword}`);
        } else {
          navigate("/products");
        }
      };
    
    return(
        <>
        <MetaData title='Search a product... - Ecommerce'/>
        <form  className=" w-full" onSubmit={searchSubmitHandler}>
            <input
             type="text"
             placeholder='Search a product ...'
             value={keyword}
             onChange={(e) => setKeyword(e.target.value)}
             className=" sm:w-52 lg:w-32 xl:w-80  text-xs font-medium border-b-[1px] border-t-0 border-l-0 border-r-0 border-gray-600 focus:border-red-500 focus:outline-none focus:ring-0 sm:bg-white bg-gray-50" />

             {/* <input type="submit" value="Search" className='font-serif font-medium text-black outline-none' /> */}

             <button type='submit' className='mt-3 hover:text-red-600'><IoSearchSharp/></button>
        </form>
        </>
    );
};

export default Search;