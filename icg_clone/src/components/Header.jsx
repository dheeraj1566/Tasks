import React from "react";
import { Link } from "react-router-dom";

import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";


function Header() {
  return (
    <div className="fix fixed left-0 right-0 bg-white top-0 z-10">

       
    <nav className=' shadow-xl  '>
        <div className="navbar flex flex-col md:flex-row justify-between items-center px-6 md:px-28  ">
      <div className="logo md:text-6xl text-gray-500 font-medium"> AJIO </div>
      <div className='flex-col md:flex-row items-center mt-4 md:mt-0'>

      <div className="sign flex flex-wrap items-center mb-2 md:mb-0">
        <h2 className='text-gray-500 mx-2 text-xs md:text-[12px]'>Sign in / AJIO</h2>
        <h2 className='text-gray-500 mx-2 text-xs md:text-[12px]'>Customer Care</h2>
        <button className='bg-gray-700 text-white mx-2 px-3 py-1 text-xs md:text-sm'> Visit AJIO </button>
        <button className='bg-black text-white mx-2 px-3 py-1 text-xs md:text-sm'> Visit AJIOLUXE </button>
      </div>
      <div className='lists flex  my-4'>
          <ul className='flex'>
           <li className=' text-gray-500 mx-2 pt-1 md:mx-3 text-sm'>AJORTE  </li> 
           <input type="text" placeholder='Search Ajorte Store' className='border-2 pl-3 rounded-lg h-7 w-40 md:w-52 mx-2 md:mx-3 text-xs md:text-sm' />
           <FaRegHeart className='bg-blue-950 rounded-full h-8 w-8 p-2 mx-2 text-white' /> 
           <IoBagHandleOutline className='bg-blue-950 rounded-full h-8 w-8 p-2 mx-2 text-white' />
          </ul>
      </div>
      </div>
        </div>
       
    </nav>
    <div className="center text-center mt-4  ">
        <h1 className='text-xl md:text-2xl text-gray-500 font-medium'>AZORTE </h1>
            <ul className='flex justify-center my-2'>
                <li className='mx-2 text-gray-500 text-sm md:text-base'>MEN</li>
                <li className='mx-2 text-gray-500 text-sm md:text-base'>WOMEN</li>
                <li className='mx-2 text-gray-500 text-sm md:text-base'>KIDS</li>
                <li className='mx-2 text-gray-500 text-sm md:text-base'>BRANDS</li>
            </ul>
       </div>
       </div>

  );
}

export default Header;
