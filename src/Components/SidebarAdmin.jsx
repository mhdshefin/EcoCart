import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const SidebarAdmin = () => {
  return (
    <div className='w-full flex flex-col gap-5 bg-white min-h-screen border-r border-gray-300 pt-28'>
      <Link to={'/list'}><div className={`w-full flex gap-2 h-14 hover:shadow-lg hover:bg-slate-50 border border-r-0 rounded-l-md py-2 pl-3 items-center justify-start cursor-pointer ${window.location.pathname === '/list' ? 'bg-slate-100' : ''}`}>
        <img className='w-5' src={assets.order_icon} alt="" />
        <p className='text-sm md:text-lg text-black font-medium hidden md:flex'>List Items</p>
      </div></Link>
      <Link to={'/add'}><div className={`w-full flex gap-2 h-14 hover:shadow-lg hover:bg-slate-50 border-2 border-r-0 rounded-l-md py-2 pl-3 items-center justify-start cursor-pointer ${window.location.pathname === '/add' ? 'bg-slate-100' : ''}`}>
        <img className='w-6' src={assets.add_icon} alt="" />
        <p className='text-sm md:text-lg text-black font-medium hidden md:flex'>Add Items</p>
      </div></Link>
      <Link to={'/order'}><div className={`w-full flex gap-2 h-14 hover:shadow-lg hover:bg-slate-50 border border-r-0 rounded-l-md py-2 pl-3 items-center justify-start cursor-pointer ${window.location.pathname === '/order' ? 'bg-slate-100' : ''}`}>
        <img className='w-8' src={assets.order} alt="" />
        <p className='text-sm md:text-lg text-black font-medium hidden md:flex'>Orders</p>
      </div></Link>
    </div>
  )
}

export default SidebarAdmin