import React, { useContext } from 'react'
import ProductItem from './productItem';
import { shopContext } from '../Context/ShopContext';

const RelatedProducts = ({ category, section }) => {

    const { allProducts } = useContext(shopContext)

    const relatedProducts = allProducts.filter((item) => item.category === category || item.section === section)

    return (
        <div className='w-full flex overflow-x-scroll py-3 gap-10 md:gap-3'>
            {
                relatedProducts.map((item, index) => {
                    return <div key={index} className='flex-shrink-0 md:min-w-[250px] min-w-[160px] w-[150px] md:w-[250px]'> <ProductItem ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} offer={item.offer} id={item._id} section={item.section} itemCount={item.itemCount} /></div>
                })
            }
        </div>
    )
}

export default RelatedProducts