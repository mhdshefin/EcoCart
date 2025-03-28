import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { shopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'

const CartProduct = ({ _id, quantity, size, section }) => {


    const navigate = useNavigate()
    
    const { updateCartItems, allProducts, fetchAllProducts, addToWIshlist, wishlistItems } = useContext(shopContext)
    const [product, setProduct] = useState([])

    const newPrice = Math.floor(product.price - (product.price * product.offer / 100))
    const safePrice = isNaN(newPrice) ? 'N/A' : newPrice;

    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;

        const total = ratings.reduce((sum, rating) => sum + parseFloat(rating), 0);
        return parseFloat((total / ratings.length).toFixed(1));
    };

    const averageRating = calculateAverageRating(product.ratings)

    const renderStars = (rating) => {
        const filledStars = Math.floor(rating)
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - (filledStars + halfStar)

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

    const placeOrder = () => {
        if (product.size) {
            if (!size) {
                toast.error("Select a size")
                return
            } else {
                navigate(`/place/${product._id}/${size}`)
            }
        } else {
            navigate(`/place/${product._id}/no_size`)
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    useEffect(() => {
        if (!allProducts || allProducts.length === 0) {
            return;
        }
        const findProduct = () => {
            const foundProduct = allProducts.find((item) => String(item._id) === String(_id));
            if (foundProduct) {
                setProduct(foundProduct);
            }
        };
        findProduct();
    }, [_id, allProducts]);

    return (

        <div className='flex flex-col p-2 bg-white pl-5 pb-3 rounded-lg'>
            <div className='flex gap-5 w-full'>
                <div className='flex flex-col gap-3 max-w-[20%]'>
                    <img className='w-20' src={product?.images?.[0] || '/placeholder.jpg'} alt={product?.name || 'Product Image'} />
                    <input onClick={(e) => updateCartItems(product._id, size, Number(e.target.value))} type="number" placeholder='Quantity' className='pl-2 outline-none border w-20 border-gray-600' defaultValue={quantity} />
                </div>
                <Link to={`/product/${section}/${_id}`}><div className='flex flex-col '>
                    <p className='text-base md:text-lg text-gray-600 font-medium'>{product.brand}</p>
                    <p className='text-lg md:text-[25px] text-gray-900 font-medium'>{product.name}</p>
                    <div className='flex gap-1 items-center'>
                        <p className='text-base md:text-lg font-medium text-gray-900'>{safePrice}</p>
                        <p className='text-[13px] md:text-sm text-gray-600 line-through'>{product.price}</p>
                        <p className='text-[14px] md:text-sm text-green-600'>{product.offer}% off</p>
                    </div>
                    <div className='text-[15px] flex md:hidden mt-4'>
                        <p className='text-[14px] md:text-sm text-black'>Delivery Free</p>
                    </div>
                </div>
                </Link>
            </div>
            <div className='mt-3 flex items-center'>
                <div className='w-[15%] xl-w-[10%] hidden md:flex'>
                    <p className='text-[14px] md:text-sm text-black'>Delivery Free</p>
                </div>
                <div className={`${window.innerWidth > 600 ? 'flex' : 'hidden'}  text-[12px] xl-w-[80%] w-[90%] gap-3 text-gray-800`}>
                    <div onClick={() => addToWIshlist(product._id)} className='flex gap-1 w-1/3 cursor-pointer hover:bg-gray-100 p-3 items-center justify-center border max-h-10'>
                        <img className='min-w-5 w-5' src={!wishlistItems.includes(product._id) ? assets.love_outline : assets.love} alt="" />
                        <p>{wishlistItems.includes(product._id) ? 'Remove from wishlist' : 'Add To Wishlist'}</p>
                    </div>
                    <div onClick={() => updateCartItems(product._id, size, 0)} className='flex  cursor-pointer gap-1 w-1/3 hover:bg-gray-100 p-3 items-center justify-center border max-h-10'>
                        <img className='min-w-5 w-5' src={assets.bin} alt="" />
                        <p>Remove</p>
                    </div>
                    <div onClick={placeOrder} className='flex gap-1 p-3 hover:bg-gray-100  w-1/3 items-center cursor-pointer justify-center border max-h-10'>
                        <img className='min-w-5 w-5' src={assets.buy_outline} alt="" />
                        <p>Buy Now</p>
                    </div>
                </div>
            </div>
            {
                product.itemCount ?
                    <div>
                        {product.itemCount < 10 ?
                            <p>Only few left</p>
                            : product.itemCount === 0 ?
                                <p>Out od stock</p>
                                :
                                ''
                        }
                    </div> :
                    <></>
            }
            {
                window.innerWidth < 600 ?

                    <div className='flex text-[10px] text-gray-800 w-full'>
                        <div onClick={() => { addToWIshlist(_id) }} className='flex gap-1 p-1 hover:bg-gray-100  w-1/3 items-center justify-center border max-h-10'>
                            <img className='min-w-4 w-4' src={assets.love_outline} alt="" />
                            <p>Add To Wishlist</p>
                        </div>
                        <div className='flex gap-1 p-3 hover:bg-gray-100  w-1/3 items-center justify-center border max-h-10'>
                            <img className='min-w-5 w-5' src={assets.bin} alt="" />
                            <p>Remove</p>
                        </div> <div className='flex gap-1 p-3 hover:bg-gray-100  w-1/3 items-center justify-center border max-h-10'>
                            <img className='min-w-5 w-5' src={assets.buy_outline} alt="" />
                            <p>Buy Now</p>
                        </div>
                    </div> :
                    <div></div>
            }
        </div>


    )



}

export default CartProduct