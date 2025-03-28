import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import { shopContext } from '../Context/ShopContext'
import Footer from '../Components/Footer'
import { Link, Navigate } from 'react-router-dom'

const account = () => {

    const [page, setPage] = useState('profile')
    const { profileImage, userName, updateUserProfile, userId, updateUserName } = useContext(shopContext)
    const [name, setName] = useState('')
    const [showInput, setShowInput] = useState(false)


    return (
        <div className='w-full md:pt-20 pt-14 flex flex-col'>
            <div className='w-full bg-white pt-5 pb-8 md:pt-8'>
                <Title name={'My Account'} />
            </div>

            <div className='w-full flex flex-col md:flex-row md:mt-3 bg-[#f2f2f2]'>
                <div className='w-full md:w-[20%] border-r flex flex-col bg-white gap-2 pb-5 md:min-h-screen'>
                    <div className='w-full flex flex-row md:flex-col gap-2 px-5 md:px-0'>
                        <div className='w-full border md:border-0  gap-2 border-gray-300 cursor-pointer shadow-sm md:border-b flex items-center justify-center text-sm md:text-xl bg-white text-black hover:bg-[#f9f9f9] md:h-20 rounded-md h-16'>
                            <img className='w-5' src={assets.profile_icon} alt="" />
                            <p>Profile</p>
                        </div>
                        <Link className='w-full' to={'/cart'}><div className='min-w-full border-gray-300 border md:border-0 gap-3 cursor-pointer shadow-sm md:border-b flex items-center justify-center text-sm md:text-xl bg-white text-black hover:bg-[#f9f9f9] md:h-20 rounded-md h-16'>
                            <img className='w-5' src={assets.cart_icon} alt="" />
                            <p>Cart</p>
                        </div></Link>
                    </div>
                    <div className='w-full flex flex-row md:flex-col gap-2 px-5 md:px-0'>
                        <Link className='w-full' to={'/wishlist'}><div className='border border-gray-300 md:border-0 gap-3 cursor-pointer shadow-sm md:border-b flex items-center justify-center text-sm md:text-xl bg-white text-black hover:bg-[#f9f9f9] md:h-20 rounded-md h-16'>
                            <img className='w-5' src={assets.love_outline} alt="" />
                            <p>Wishlist</p>
                        </div></Link>
                        <Link className='w-full' to={'/orders'}> <div className='w-full border border-gray-300 md:border-0 gap-3 cursor-pointer shadow-sm md:border-b flex items-center justify-center text-sm md:text-xl bg-white text-black hover:bg-[#f9f9f9] md:h-20 rounded-md h-16'>
                            <img className='w-5' src={assets.order_icon} alt="" />
                            <p>Orders</p>
                        </div></Link>

                    </div>
                </div>

                <div className='md:w-[80%] mt-[-1vh] md:mt-0'>
                    {
                        page === 'profile' ?
                            (
                                <div className='w-full flex flex-col min-h-screen bg-white'>
                                    <div className='w-full flex items-center justify-center flex-col mt-10 gap-3'>
                                        <div className='md:w-48 md:h-48 w-36 h-36 rounded-full relative border'>
                                            <img className='w-full h-full rounded-full object-contain' src={profileImage ? profileImage : assets.profile_icon} alt="" />
                                        </div>
                                        <label htmlFor="fileInput" className='absolute md:top-[46%] top-[48%] md:right-[31%] right-[29%] bg-white rounded-full flex items-center justify-center w-14 h-14'>
                                            <img className='w-14 cursor-pointer' src={assets.edit} alt="" />
                                            <input onChange={(e) => {
                                                updateUserProfile(e.target.files[0])
                                            }} type="file" hidden id="fileInput" />
                                        </label>
                                        <input onChange={(e) => setName(e.target.value)} value={name} className={`${showInput ? ' ' : 'hidden'} w-36 h-10 outline-none border px-2 rounded-lg mt-5 `} type="text" />
                                        <button onClick={() => {
                                            updateUserName(name)
                                            setShowInput(false)
                                        }} className={`${showInput ? "" : 'hidden'} w-24 h-8 p-3 bg-black text-white text-sm flex items-center justify-center rounded-md`}>change</button>
                                        <b className={`text-2xl mt-5 ${showInput ? 'hidden' : 'flex'}`}>{userName ? userName : 'User'}</b>
                                        <p onClick={() => setShowInput(true)} className={`text-[12px] ${showInput ? 'hidden' : ''} mt-[-10px] cursor-pointer`}>Change username</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center mt-8'>
                                        <Link to={'/'}><button onClick={() => {
                                            localStorage.removeItem("token")
                                            window.location.reload()
                                            Navigate('/')
                                        }} className='bg-black text-white text-sm px-5 py-2 rounded-md'>Logout</button></Link>
                                    </div>
                                </div>
                            ) :
                            <div className='w-full min-h-screen bg-white'>

                            </div>
                    }
                </div>
            </div>
            <div className='w-full mt-[-6vh]'>
                <Footer />
            </div>
        </div>
    )
}

export default account