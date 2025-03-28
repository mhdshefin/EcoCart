import React, { useContext } from 'react'
import { shopContext } from '../Context/ShopContext';
import ProductItem from './productItem';

const RecentlyViewed = () => {

    const { allProducts } = useContext(shopContext)

    const recentlyViewedProductID = localStorage.getItem("recentlyViewed")

    const products = allProducts.filter((item) => recentlyViewedProductID.includes(item._id))

    return (
        <div className='w-full flex overflow-x-scroll py-3 gap-10 md:gap-3'>
            {
                products.reverse().map((item, index) => {
                    return <div key={index} className='flex-shrink-0 md:min-w-[250px] min-w-[160px] w-[150px] md:w-[250px]'> <ProductItem ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} offer={item.offer} id={item._id} section={item.section} itemCount={item.itemCount} /></div>
                })
            }
        </div>
    )
}

export default RecentlyViewed