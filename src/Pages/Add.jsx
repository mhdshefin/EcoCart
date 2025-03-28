import React, { useContext, useState } from 'react'
import SidebarAdmin from '../Components/SidebarAdmin'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'
import AdminLogin from './AdminLogin'

const Add = () => {

    const { adminToken } = useContext(shopContext)

    return adminToken ? (
        <div className='w-full flex'>
            <div className='w-[15%]'>
                <SidebarAdmin />
            </div>
            <div className='w-full flex flex-col gap-5 pt-28'>
                <div className='w-full pl-3'>
                    <b>Select Product Section</b>
                </div>
                <div className='w-full flex flex-col gap-2 px-3'>
                    <div className='flex gap-2 w-full'>
                        <Link to={`/add/fashion`} className='w-1/2'><div className='flex flex-col  items-center justify-center p-3 gap-2 border border-gray-300 cursor-pointer hover:border-gray-600'>
                            <img className='w-36 md:w-48' src={assets.fashion} alt="" />
                            <p>Fashion</p>
                        </div></Link>
                        <Link to={`/add/appliances`} className='w-1/2'><div className='flex flex-col items-center justify-center p-3 gap-2 border border-gray-300 cursor-pointer hover:border-gray-600'>
                            <img className='w-36 md:w-48' src={assets.appliances} alt="" />
                            <p>Appliances</p>
                        </div></Link>
                    </div>
                    <div className='flex gap-2 w-full'>
                        <Link to={`/add/furniture`} className='w-1/2'><div className='flex flex-col items-center justify-center p-3 gap-2 border border-gray-300 cursor-pointer hover:border-gray-600'>
                            <img className='w-36 md:w-48' src={assets.home_products} alt="" />
                            <p>Furniture</p>
                        </div></Link>
                        <Link to={`/add/electronics`} className='w-1/2'><div className='flex flex-col items-center justify-center p-3 gap-2 border border-gray-300 cursor-pointer hover:border-gray-600'>
                            <img className='w-36 md:w-48' src={assets.gadgets} alt="" />
                            <p>Electronic</p>
                        </div></Link>
                    </div>
                </div>
            </div>
        </div>
    ) : 
    (
        <AdminLogin/>
    )
}

export default Add