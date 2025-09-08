import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {
  return (
<div className='w-[18%] min-h-screen border-r bg-white shadow-sm'>
  <div className='flex flex-col gap-3 pt-8 pl-[15%] text-[15px] font-medium'>

    <NavLink 
      className="flex items-center gap-3 px-4 py-2 rounded-l-lg border-l-4 border-transparent 
                 hover:border-black hover:bg-gray-100 transition-all duration-200" 
      to={'/add'}
    >   
      <img src={assets.add_icon} className='w-5 h-5 opacity-80' alt="" />
      <p className='hidden md:block'>Add Items</p>
    </NavLink>

    <NavLink 
      className="flex items-center gap-3 px-4 py-2 rounded-l-lg border-l-4 border-transparent 
                 hover:border-black hover:bg-gray-100 transition-all duration-200" 
      to={'/list'}
    >   
      <img src={assets.order_icon} className='w-5 h-5 opacity-80' alt="" />
      <p className='hidden md:block'>List Items</p>
    </NavLink>

    <NavLink 
      className="flex items-center gap-3 px-4 py-2 rounded-l-lg border-l-4 border-transparent 
                 hover:border-black hover:bg-gray-100 transition-all duration-200" 
      to={'/orders'}
    >   
      <img src={assets.order_icon} className='w-5 h-5 opacity-80' alt="" />
      <p className='hidden md:block'>Orders</p>
    </NavLink>

    <NavLink 
      className="flex items-center gap-3 px-4 py-2 rounded-l-lg border-l-4 border-transparent 
                 hover:border-black hover:bg-gray-100 transition-all duration-200" 
      to={'/sales'}
    >   
      <img src={assets.order_icon} className='w-5 h-5 opacity-80' alt="" />
      <p className='hidden md:block'>Sales</p>
    </NavLink>

  </div>
</div>

  )
}

export default Sidebar