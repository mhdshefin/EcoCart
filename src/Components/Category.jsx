import React from 'react'
import {  category } from '../assets/assets'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className='w-full border border-gray-300 flex sm:gap-10 gap-2 justify-center rounded-lg text-black text-xs sm:text-lg overflow-x-scroll mt-5 bg-[#fff] pt-3 pb-3'>
            {
                category.map((item, index) => {
                    return (
                        <Link  key={index}  to={`/category/${item.name}`}><div className='flex flex-col gap-2 items-center justify-center min-w-[5rem] max-w-[5rem] sm:max-w-[10rem] transition-all duration-200 hover:scale-105 hover:shadow-xl rounded-xl bg-white p-2'>
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                        </div></Link>
                    )
                })
            }
        </div>
    )
}

export default Category