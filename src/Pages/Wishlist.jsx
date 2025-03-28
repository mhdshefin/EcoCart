import React, { useContext } from 'react'
import WishlistProductItem from '../Components/WishlistProductItem'
import Footer from '../Components/Footer'
import { shopContext } from '../Context/ShopContext'

const Wishlist = () => {

    const { wishlistItems, allProducts } = useContext(shopContext)


    return (
        <div className='pt-14 flex flex-col'>
            <div className='w-full pt-8 bg-white '>
                <p className='md:text-3xl text-2xl font-medium text-gray-700 pl-3 md:pl-10'>My Wishlist</p>
            </div>
            <div className='w-full bg-white pt-6 pb-8 rounded-lg grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:px-10 px-2 gap-1'>
                {
                    wishlistItems.map((id) => {
                        const product = allProducts.find((item) => item._id === id);
                        if (product) {
                            return <WishlistProductItem key={product.id} section={product.section} ratings={product.ratings} name={product.name} image={product.images[0]} brand={product.brand} Price={product.price} offer={product.offer} id={product._id} itemCount={product.itemCount} />
                        }

                        return null
                    }).filter(Boolean)
                }

            </div>
            <div className='w-full mt-[-4vh]'>
                <Footer />
            </div>
        </div>
    )
}

export default Wishlist