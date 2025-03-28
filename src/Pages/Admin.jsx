import React, { useContext } from 'react'
import SidebarAdmin from '../Components/SidebarAdmin'
import { assets } from '../assets/assets'
import { shopContext } from '../Context/ShopContext'
import AdminLogin from './AdminLogin'

const Admin = () => {
    const { adminToken  } = useContext(shopContext)
    return adminToken ? (
        <div className='w-full flex'>
            <div className='w-[15%]'>
                <SidebarAdmin />
            </div>
            <div className='w-[75%]'>
                {
                    window.location.pathname === '/admin' ?
                        <div className='w-full flex items-center justify-center min-h-screen pt-20'>
                            <img className='w-[28vh] md:w-[60vh]' src={assets.admin_page} alt="" />
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    ) : (
        <AdminLogin/>
    )
}

export default Admin