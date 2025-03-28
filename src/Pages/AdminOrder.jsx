import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/assets'

const AdminOrder = () => {

    const { backendUrl, adminToken } = useContext(shopContext)
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        try {

            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token: localStorage.getItem('adminToken') } })
            if (response.data.success) {
                setOrders(response.data.orders)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const statusHandler = async (status, orderId) => {
        try {
            console.log(status,orderId);
            
            const response = await axios.post(backendUrl + '/api/order/status', { "status": status, "orderId": orderId }, { headers: { token: localStorage.getItem('adminToken') } })
            if (response.data.success) {
                console.log(response.data);
                getOrders()
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className='pt-20 md:pt-28'>
            <Title name={'All Orders'} />
            <div className='w-full'>
                <div>
                    {orders?.reverse().map((order, index) => (

                        <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                            <img className='w-12 sm:w-16' src={assets.parcel_icon} alt="" />
                            <div>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return (<p className='text-[12px] sm:text-[15px] font-semibold mb-1 mt-1' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>)
                                    } else {
                                        return (<p className='text-[12px] sm:text-[15px] font-semibold mb-1 mt-1' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> ,</p>)
                                    }
                                })}
                                <p className='text-[13px] sm:text-[16px] mt-4 font-bold'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div>
                                    <div className='text-[12px] sm:text-[15px] mt-3 gap-1'>
                                        <p>{order.address.street + ","}</p>
                                        <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                    </div>
                                    <p className='text-[12px] sm:text-[15px]'>{order.address.phone}</p>
                                </div>
                            </div>
                            <div className='text-[12px] sm:text-[14px]'>
                                <p className='mt-1'>Items: {order.items.length}</p>
                                <p className='mt-1'>Method: {order.paymentMethod}</p>
                                <p className='mt-1'>Payment: {order.payment ? "Done" : "Pending"}</p>
                                <p className='mt-1'>Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p className='mt-2 font-semibold'>₹{order.amount}</p>
                            </div>
                            <select onChange={(e) => statusHandler(e.target.value, order._id)} value={order.status} className='h-10 outline-none border-2 border-gray-200 rounded-lg pl-2'>
                                <option value="Order placed">Order placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">shipped</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminOrder