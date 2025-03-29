import React, { useContext } from 'react'
import Title from './Title'
import { topOffers } from '../assets/assets'
import { Link } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'

const Topfashiondeals = () => {
    const { allProducts } = useContext(shopContext)

    const Topfashiondeals = allProducts.filter((item) => item.section.toLowerCase() === 'fashion').sort((a, b) => b.offer - a.offer).slice(0, 10)

    return (
        <div className='md:mt-8 mt-3 pt-4 bg-white rounded-lg'>
            <Title name={"Top Fashion Deals"} />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5 text-black bg-[#fff] pt-5 pb-5 px-5 text-xl sm:text-2xl rounded-lg'>
                {
                    Topfashiondeals.map((item, index) => {
                        return (
                            <Link to={`/collection/${item.section}/${item.category}/${item.subCategory}`} key={index}><div className='sm:min-w-[200px] w-[180px] h-[280px] md:w-[250px] lg:w-[250px] xl:w-[280px] md:h-[360px] flex flex-col items-center border border-gray-300 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                                <div className='bg-[#fff] h-[223px] md:h-[330px] w-full flex-shrink-0 rounded-t-xl'>
                                    <img className='w-full h-full object-cover rounded-t-lg' src={item.images[0]} alt="" />
                                </div>
                                <div className='bg-white border-t-[1.5px] rounded-b-xl h-14 w-full flex items-center justify-center'>Up to {item.offer}% off</div>
                            </div></Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Topfashiondeals