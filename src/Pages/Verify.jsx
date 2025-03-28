import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const [searchParams, setsearchParams] = useSearchParams()
    const { token, backendUrl, setCartItems, updateCartItems } = useContext(shopContext)

    const navigate = useNavigate()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const type = searchParams.get('type')
    const productId = searchParams.get("itemId")
    const size = searchParams.get("size")

    const verify = async () => {
        try {
            if (!localStorage.getItem('token')) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/verify', { success, orderId, type: type, productId: productId, size: size }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            if (response.data.success) {
                navigate('/orders')
                toast.success("Order placed")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verify()
    }, [])

    return (
        <div>

        </div>
    )
}

export default Verify