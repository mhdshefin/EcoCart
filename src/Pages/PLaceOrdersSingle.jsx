import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const PLaceOrdersSingle = () => {

    const { allProducts, backendUrl, token } = useContext(shopContext)

    const [paymentMethod, setPaymentMethod] = useState('cod')
    const [product, setProduct] = useState({})

    const Navigate = useNavigate()
    const userRequest = useParams()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })


    const onchangehandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData((data) => ({ ...data, [name]: value }))
    }

    const getProduct = () => {
        const item = allProducts.find((item) => item._id === userRequest.id);
        setProduct(item);
    };

    useEffect(() => {
        getProduct()
    }, [])


    const onSubmithandler = async (e) => {
        try {
            e.preventDefault()

            let orderItem = []

            if (product) {
                product.size = userRequest.size;
                product.quantity = 1
                orderItem.push(product)
            }

            const newPrice = Math.floor(product?.price - (product.price * product.offer / 100))

            let orderData = {
                address: formData,
                items: orderItem,
                amount: newPrice,
                type: 'single'
            }

            switch (paymentMethod) {
                case 'cod':
                    console.log(orderData);

                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (response.data.success) {
                        toast.success("Order placed")
                        Navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break
                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break
                default:
                    break
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmithandler} className='flex flex-col bg-white px-5 sm:flex-row justify-between gap-5 pt-10 sm:py-14 min-h-[80vh] border-t'>
            <div className='flex flex-col w-full pt-16 bg-white gap-9 sm:max-w-[600px]'>
                <div className='text-xl my-3 sm:text-2xl'>
                    <Title name={"Delivery Informations"} />
                </div>
                <div className='flex gap-3'>
                    <input onChange={onchangehandler} name='firstName' value={formData.firstName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="text" placeholder='First Name' />
                    <input onChange={onchangehandler} name='lastName' value={formData.lastName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="text" placeholder='Last Name' />
                </div>

                <input onChange={onchangehandler} name='email' value={formData.email} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="email" placeholder='Email Address' />
                <input onChange={onchangehandler} name='street' value={formData.street} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="text" placeholder='Street' />

                <div className='gap-3 flex'>
                    <input onChange={onchangehandler} name='city' value={formData.city} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="text" placeholder='City' />
                    <input onChange={onchangehandler} name='state' value={formData.state} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="text" placeholder='State' />
                </div>

                <div className='gap-3 flex'>
                    <input onChange={onchangehandler} name='zipcode' value={formData.zipcode} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="number" placeholder='Zipcode' />
                    <input onChange={onchangehandler} name='country' value={formData.country} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="text" placeholder='Country' />
                </div>

                <input onChange={onchangehandler} name='phone' value={formData.phone} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none' type="number" placeholder='Phone' />

            </div>

            <div className='mt-8 w-1/2'>

                <div className='mt-12'>
                    <Title name={"Payment Method"} />
                    <div className='flex justify-between mt-14 flex-col lg:flex-col items-center min-w-80 gap-3'>

                        <div onClick={() => setPaymentMethod('stripe')} className='sm:min-w-[45%] max-w-80 flex items-center border gap-3 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'stripe' ? 'bg-green-400' : ''} `}></p>
                            <img className='h-5 mx-1.5' src={assets.stripe_logo} alt="" />
                        </div>

                        <div onClick={() => setPaymentMethod('cod')} className='flex sm:min-w-[45%] max-w-80 items-center border gap-3 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cod' ? 'bg-green-400' : ''} `}></p>
                            <p className='text-gray-500 text-sm font-medium mx-1.5'>Cash On delivery</p>
                        </div>

                        <div className='w-full flex items-center justify-center mt-8'>
                        <button type='submit' className='text-white bg-black px-16 py-3 text-sm rounded hover:bg-gray-800'>PLACE ORDER</button>
                    </div>
                    </div>

                    
                </div>
            </div>
        </form>
    )
}
export default PLaceOrdersSingle