import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import CartProduct from '../Components/CartProduct'
import { shopContext } from '../Context/ShopContext'
import Footer from '../Components/Footer'
import CartTotal from '../Components/CartTotal'
import { NavLink } from 'react-router-dom'

const Cart = () => {

    const { cartItems, getUserCart,fetchAllProducts } = useContext(shopContext)
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        getUserCart()
        const tempData = [];

        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    const existingIndex = tempData.findIndex(
                        (item) => item._id === itemId && item.size === size
                    );
                    if (existingIndex === -1) {
                        tempData.push({
                            _id: itemId,
                            size: size,
                            quantity: cartItems[itemId][size],
                        });
                    }
                }
            }
        }

        setCartData(tempData);
    }, [cartItems]);
    useEffect(() => {
        fetchAllProducts()
    }, [])
    return (
        <div className='pt-14 w-full flex flex-col'>
            <div className={`w-full flex gap-3 border-b z-40 ${window.innerWidth > 600 ? 'items-center justify-start text-4xl' : 'items-start text-2xl'} pt-5 pl-5 md:pt-10 text-gray-700 font-medium bg-white md:pb-8 pb-4`}>
                <img className='w-6 md:w-8' src={assets.cart_icon} alt="" />
                <p>My Cart</p>
            </div>
            <div className='w-full flex flex-col'>
                <div className='w-full  flex gap-3 relative overflow-hidden'>

                    <div className='bg-[#f2f2f2] md:w-[59%] min-h-96 lg:w-[69%] w-full flex flex-col gap-2 border-t'>
                        {
                            cartData.length > 0 ?
                                cartData.map((item, index) => {
                                    return <CartProduct key={index} _id={item._id} section={item.section} price={item.price} quantity={item.quantity} size={item.size} />
                                })
                                :
                                <div className='w-full flex flex-col'>
                                    <div className='w-full h-[80vh] flex items-center justify-center text-xl bg-white md:text-3xl text-gray-700'>
                                        <p>No product found in cart!</p>
                                    </div>

                                </div>
                        }
                    </div>
                    <div className='md:w-[39%] lg:w-[30%] bg-white h-screen hidden md:flex flex-col gap-5 fixed right-4 top-[10%] z-20'>
                        <div>
                            <CartTotal />
                        </div>
                        <div className='w-full px-5'>
                            <NavLink to={'/placeorder'}><button className='w-full bg-black text-white min-h-12 font-medium text-lg rounded-md hover:bg-gray-800'>Proceed To Payment</button></NavLink>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col mt-3 md:hidden'>
                    <CartTotal />
                    <div className='w-full px-5 bg-white py-5'>
                        <NavLink to={'/placeorder'}><button className='w-full bg-black text-white min-h-12 font-medium text-lg rounded-md hover:bg-gray-800'>Proceed To Payment</button></NavLink>
                    </div>
                </div>
                <div className='mt-[-4vh]'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Cart