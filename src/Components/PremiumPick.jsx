import React, { useContext } from 'react'
import Title from './Title'
import { topOffers } from '../assets/assets'
import { Link } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'

const PremiumPick = () => {
    const { allProducts } = useContext(shopContext)

    const premiumProducts = allProducts.filter((item) => item.premium === true).slice(0, 10)

    return (
        <div className='md:mt-8 mt-3 pt-4 bg-white rounded-lg'>
            <Title name={"Premium Picks"} />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5 text-black bg-[#fff] pt-5 pb-5 px-5 text-xl sm:text-2xl rounded-lg'>
                {
                    premiumProducts.map((item, index) => {
                        const newPrice = Math.floor(item.price - (item.price * item.offer / 100))
                      
                        return (
                            <Link key={index} to={`/collection/${item.section}/${item.category}/${item.subCategory}`}><div className='sm:min-w-[200px] w-[180px] h-[280px] md:w-[250px] lg:w-[250px] xl:w-[280px] md:h-[360px] flex flex-col items-center border border-gray-300 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                                <div className='absolute left-0 top-[4%] bg-gradient-to-r from-[#783cb0] via-[#a576d6] to-[#783cb0] animate-shimmer bg-[length:200%_100%] w-1/2 xl:w-[40%] h-6 sm:h-7 sm:text-lg text-xs text-white rounded-r-[3px] flex items-center justify-start pl-1 shadow-xl font-medium'>
                                    <p>Premium</p>
                                </div>
                                <div className='bg-[#fff] h-[223px] md:h-[330px] w-full flex-shrink-0 rounded-t-xl'>
                                    <img className='w-full h-full object-cover rounded-t-lg' src={item.images[0]} alt="" />
                                </div>
                                <div className='bg-[#7235ac] text-white rounded-b-xl h-14 w-full flex items-center justify-center'>From  ₹{newPrice}</div>
                            </div></Link>
                        )
                    })  
                }
            </div>
        </div>
    )
}

export default PremiumPick