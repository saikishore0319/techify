import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-4 px-[5%] shadow-md bg-white'>
  <img 
    className='w-[max(12%,90px)] cursor-pointer hover:opacity-80 transition-all duration-200' 
    src={assets.logo} 
    alt="logo" 
  />
  <button 
    onClick={() => setToken("")} 
    className='bg-black text-white px-6 py-2 sm:px-8 sm:py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer 
               hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-sm'
  >
    Logout
  </button>
</div>

  )
}

export default Navbar