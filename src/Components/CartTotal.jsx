import React, { useContext } from 'react'
import { shopContext } from '../Context/ShopContext'

const CartTotal = () => {

    const { getTotalCartAmount, getTotalCartDiscount,getTotalamount } = useContext(shopContext)

    return (
        <div className='w-full flex md:pt-40 flex-col items-end  bg-white p-5'>
            <div className='w-full px-2 gap-5'>
                <div className='w-full md:text-xl text-lg text-gray-800 font-semibold'>
                    <p>Cart Total</p>
                </div>
                <div className='flex w-full flex-col gap-2 mt-5 text-sm'>
                <div className='flex justify-between'>
                        <p>Total</p>
                        <p>₹{getTotalamount()}.00</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Total Discount</p>
                        <p className='text-green-600'>₹{getTotalCartDiscount()}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Sub Total</p>
                        <p>₹{getTotalCartAmount()}.00</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <b>Total</b>
                        <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}.00</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartTotal