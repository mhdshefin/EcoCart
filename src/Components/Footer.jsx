import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className=' bg-white sticky z-40'>
            <div className='flex pl-5 flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-12 pt-5 text-sm border-t'>

                <div>
                    <img className='mb-5 w-32' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                    </p>
                </div>


                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>


                <div >
                    <p className='text-xl mb-5 font-medium'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1 1234567891</li>
                        <li>Random@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>
                    Copyright 2024@ foreever.com - All Rigth reserved
                </p>
            </div>
        </div>
    )
}

export default Footer