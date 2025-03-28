import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import Footer from '../Components/Footer'

const Order = () => {

    const { orderItems } = useContext(shopContext)
    const [orders, setOrder] = useState([])

    const loadOrderData = async () => {
        let allOrderItem = []
        if (orderItems) {
            orderItems.map((order) => {

                console.log(order);
                order.items.map((item) => {
                    item['status'] = order.status
                    item['payment'] = order.payment
                    item['paymentMethod'] = order.paymentMethod
                    item['date'] = order.date
                    allOrderItem.push(item)
                })
            })
        }
        setOrder(allOrderItem.reverse())
    }
    useEffect(() => {
        loadOrderData()
    }, [orderItems])



    return (
        <div className='border-t pt-20 md:pt-28'>

            <div className='text-2xl'>
                <Title name={'My Orders'} />
            </div>
            <div className='mt-5'>
                {
                    orders.map((item, index) => {
                        let newPrice = Math.floor(item.price - (item.price * item.offer / 100))
                        return (
                            <div key={index} className='py-4 px-5 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
                                <div className='flex items-start gap-6 text-sm'>
                                    <img src={item.images[0]} className='w-16 sm:w-20' alt="" />
                                    <div>
                                        <p className='sm:text-base font-medium'>{item.name}</p>
                                        <div className='flex flex-col md:gap-3 mt-1 text-base text-gray-700'>
                                            <div className='flex gap-2 items-center'>
                                                <p className='text-lg text-black font-medium'>₹{newPrice}</p>
                                                <p className='text-lg text-green-500 font-medium'>{item.offer}%</p>
                                                <p className='text-sm text-gray-600 font-medium line-through'>₹{item.price}</p>
                                            </div>
                                            <p>Quantity:{item.quantity}</p>
                                            {
                                                item.size === 'no_Size' ?
                                                    <p>Size : {item.size}</p> : <></>
                                            }
                                        </div>
                                        <p className='mt-1'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                                        <p className='mt-1'>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>
                                    </div>
                                </div>

                                <div className='md:w-1/2 flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className='text-sm md:text-base'>{item.status}</p>
                                    </div>
                                    <button onClick={() => window.location.reload()} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default Order