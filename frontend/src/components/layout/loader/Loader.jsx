import React from 'react';

const Loader = () =>{
    return (
        <>
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="loading w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
        </>
    );
};
export default Loader;