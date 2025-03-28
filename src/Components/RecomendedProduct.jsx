import React, { useContext } from 'react'
import { products } from '../assets/assets'
import ProductItem from './productItem'
import { shopContext } from '../Context/ShopContext'

const RecomendedProduct = ({ category }) => {

    const { allProducts } = useContext(shopContext)

    const products = [...allProducts].sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0));

    return (
        <div className='w-full flex overflow-x-scroll py-3 gap-10 md:gap-3'>
            {
                products.slice(0, 14).map((item, index) => {
                    return <div key={index} className='flex-shrink-0 md:min-w-[250px] min-w-[160px] w-[150px] md:w-[250px]'> <ProductItem ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} offer={item.offer} id={item._id} section={item.section} itemCount={item.itemCount} /></div>
                })
            }
        </div>
    )
}

export default RecomendedProduct