import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { shopContext } from '../Context/ShopContext'

const ProductItem = ({ image, id, name, offer, Price, brand, itemCount, ratings, section }) => {

    const { wishlistItems, addToWIshlist } = useContext(shopContext)

    const newPrice = Math.floor(Price - (Price * offer / 100))
    const [whishList, setWishList] = useState(false)

    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;

        const total = Object.values(ratings).reduce((sum, item) => {
            return sum += item.rating
        }, 0)
        return Number((total / Object.keys(ratings).length).toFixed(1));
    };

    const averageRating = calculateAverageRating(ratings)

    const renderStars = (rating) => {

        rating = Number(rating)

        if (isNaN(rating) || rating < 0) rating = 0;
        if (rating > 5) rating = 5;

        const filledStars = Math.floor(rating)
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        let emptyStars = 5 - (filledStars + halfStar)

        emptyStars = Math.max(0, emptyStars);

        return (
            <>
                {Array(filledStars).fill('★').map((_, i) => (
                    <span key={`filled-${i}`} className={filledStars <= 1.5 ? 'text-red-500' : filledStars <= 2.5 ? 'text-yellow-500' : 'text-green-500'}>★</span>
                ))}
                {halfStar > 0 && <span className={filledStars <= 1 ? 'text-red-500' : filledStars <= 2 ? 'text-yellow-500' : 'text-green-500'}>★</span>}
                {Array(emptyStars).fill('★').map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-300">★</span>
                ))}
            </>
        )
    }

    return (
        <div className='relative transition-all bg-white cursor-pointer  max-h-[40vh] sm:min-h-[50vh] min-h-[32vh] duration-300 sm:hover:shadow-xl flex flex-col border rounded-xl'>
            <img onClick={(event) => {
                event.stopPropagation()
                addToWIshlist(id)
            }} className={`${whishList ? 'w-6' : 'w-5'} absolute top-3 right-3 cursor-pointer transition-all duration-200 hover:scale-105 `} src={!wishlistItems.includes(id) ? assets.love_outline : assets.love} alt="" />
            <Link onClick={() => window.scrollTo(top)} to={`/product/${section}/${id}`}> <div className='flex flex-col'>
                <div className='flex items-center w-full h-48 md:h-[35vh] justify-center'>
                    <img className='w-full rounded-t-xl h-full' src={image} alt="" />
                </div>
                <div className='flex flex-col p-2 max-w-full overflow-hidden'>
                    <div>
                        <b className='md:text-lg text-sm text-gray-500'>{brand}</b>
                        <p className='md:text-lg text-[14px] text-gray-600'>{name.length > 20 & window.innerWidth < 400 ? name.slice(0, 20) + '...' : name.slice(0, 22) + '...'}</p>
                    </div>
                    <div className="flex items-center">
                        {ratings.length > 0 ? renderStars(averageRating) : ''}
                        <span className="ml-2 text-gray-500 text-sm">{ratings.length > 0 ? `(${ratings.length})` : ''}</span>
                    </div>
                    <div className='flex gap-2'>
                        <p className=' text-small md:text-base text-black font-medium'>₹{newPrice}</p>
                        <p className='text-gray-600 text-[14px] md:text-sm line-through'>₹{Price}</p>
                        <p className='text-[13px] md:text-sm font-normal text-green-600'>{offer}% off</p>
                    </div>
                    <p className='text-sm text-red-500'>{itemCount < 10 ? 'Only few left' : ''}</p>
                </div>
            </div></Link>
        </div>
    )
}

export default ProductItem