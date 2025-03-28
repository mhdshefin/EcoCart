import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {

    const { allProducts, backendUrl, adminToken } = useContext(shopContext)

    const [products, setProducts] = useState([])
    const [section, setSection] = useState('all')

    const removeProduct = async (productType, productId) => {
        try {
            if (!productType || !productId) {
                return console.log("No productType or ProductId");
            }
            console.log(adminToken);

            const response = await axios.post(backendUrl + '/api/product/remove', { productType: productType, productId: productId }, { headers: { token: adminToken } })
            if (response.data.success) {
                setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
                toast.success("Product removed")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const sortedProducts = () => {
        let productCopy = allProducts.slice()
        console.log(section);
        
        switch (section) {
            case 'fashion':
                productCopy = productCopy.filter((item) => item.section.toLowerCase() === 'fashion')
                break
            case 'electronic':
                productCopy = productCopy.filter((item) => item.section.toLowerCase() === 'electronic' || item.section.toLowerCase() === 'electronics')
                break
            case 'furniture':
                productCopy = productCopy.filter((item) => item.section.toLowerCase() === 'furniture')
                break
            case 'appliances':
                productCopy = productCopy.filter((item) => item.section.toLowerCase() === 'appliances' || item.section.toLowerCase() === 'appliance')
                break
            case 'all':
                break
            default:
                console.log("super");
                
                break
        }
        setProducts(productCopy)
    }

    useEffect(() => {
        sortedProducts()
    }, [allProducts,section])
    return (
        <div className='pt-20 bg-[#f2f2f2] w-full min-h-screen'>
            <div className='w-full flex justify-between items-center'>
                <div className='w-full flex items-center pt-2 pl-2 justify-start gap-2'>
                    <Link to={'/admin'}><img src={assets.drop_down} className='w-2 rotate-180' alt="" /></Link>
                    <Link to={'/admin'}><p >Back</p></Link>
                </div>
                <div className='pr-5 pt-1'>
                    <select onChange={(e) => setSection(e.target.value)} className='w-28 h-10 rounded-lg pl-2 outline-none border'>
                        <option value="all">All</option>
                        <option value="fashion">Fasion</option>
                        <option value="electronic">Electronic</option>
                        <option value="furniture">Furniture</option>
                        <option value="appliances">Appliances</option>
                    </select>
                </div>
            </div>
            <div className='mt-2 px-2 flex flex-col gap-2 text-black'>
                {
                    products.map((item, index) => (
                        <div className='w-full p-2 min-h-28 rounded-md flex gap-2 text-sm md:text-base bg-white'>
                            <div className='md:w-[15%] w-[35%] h-36 border flex items-center justify-center'>
                                <img src={item.images[0]} className='h-full' alt="" />
                            </div>
                            <div className='w-[70%] pl-2 flex flex-col'>
                                <p className='text-lg font-semibold text-gray-600'>{item.brand}</p>
                                <p className='text-base text-black'>{item.name}</p>
                                <div className='flex gap-2'>
                                    <p className='text-[12px] md:text-sm text-black'>{item.category}</p>
                                    <p>|</p>
                                    <p className='text-[12px] md:text-sm'>{item.subCategory}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <p className='text-[12px] md:text-sm text-black'>₹{item.price}</p>
                                    <p>|</p>
                                    <p className='text-[12px] md:text-sm'>{item.offer}% off</p>
                                </div>
                                <div className='w-full flex gap-3 mt-3 text-sm font-medium'>

                                    <button onClick={() => removeProduct(item.section, item._id)} className='w-28 h-8 border flex items-center justify-center hover:bg-slate-100 hover:border-black gap-1 border-gray-300 rounded-sm'>
                                        <img className='w-5' src={assets.bin} alt="" />
                                        <p>Remove</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default List