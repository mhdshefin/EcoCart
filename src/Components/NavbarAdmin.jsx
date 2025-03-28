import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, Navigate } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'

const NavbarAdmin = () => {
    const {  adminToken } = useContext(shopContext)
    return (
        <div className='w-full flex items-center justify-between px-5 md:px-10 min-h-20 bg-white border-b border-gray-300 z-10 fixed top-0 left-0 right-0'>
            <div className='flex items-center justify-center'>
                <Link to={'/admin'}><img className='w-36' src={assets.logo} alt="" /></Link>
            </div>
            <div className='flex items-center justify-center text-white font-medium text-sm md:text-lg'>
                <button onClick={() =>{ 
                    if (adminToken) {
                        localStorage.removeItem("adminToken")
                        window.location.reload()
                    }else{
                        Navigate('/adminlogin')
                    }
                    }} className='bg-gray-800 rounded-full px-8 py-2 hover:bg-gray-700'>Logout</button>
            </div>
        </div>
    )
}

export default NavbarAdmin