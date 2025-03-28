import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'

const rating = () => {

    const { allProducts, addRatings } = useContext(shopContext)
    const userRequest = useParams()
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(1)
    const [ratingText, setRatingText] = useState('excellent')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')

    useEffect(() => {

        const Product = allProducts.find((item) => item._id === userRequest.id)
        if (Product) {
            setProduct(Product)
        }
    }, [userRequest, allProducts])


    const ratingOptions = [
        { value: "excellent", label: "🌟 Excellent" },
        { value: "good", label: "👍 Good" },
        { value: "average", label: "👌 Average" },
        { value: "poor", label: "😕 Poor" },
        { value: "terrible", label: "😡 Terrible" },
    ];

    return (
        <div className='pt-20 w-full min-h-screen'>
            <div className='w-full flex flex-col gap-3'>
                <div className='w-full bg-white flex flex-col md:flex-row gap-5'>
                    <div className='flex w-full md:w-[20%] md:max-h-[40vh] border border-gray-300'>
                        <img className='w-full h-full' src={product?.images?.[0]} alt="" />
                    </div>
                    <div className='w-full gap-2 pl-3 md:pl-0 md:w-[70%] '>
                        <div className='flex flex-col text-xl mt-6'>
                            <p className='font-semibold text-gray-600'>{product.brand}</p>
                            <p>{product.name}</p>
                        </div>

                        <div className='flex flex-col text-base text-gray-500'>
                            <p className='text-xl text-gray-500 mt-3 mb-1'>Highlights</p>
                            {
                                product.highlights?.map((item, index) => {
                                    if (!item) {
                                        return null
                                    } else {
                                        return <p className='flex items-center gap-1 text-black' key={index}><span className='text-3xl text-gray-500'>•</span>{item}</p>
                                    }
                                })
                            }
                        </div>

                    </div>
                </div>
                <div className='w-full bg-white min-h-screen'>
                    <div className='w-full flex items-center justify-center h-20'>
                        <p className='text-xl font-medium'>Add Ratings</p>
                    </div>
                    <div className='w-full flex items-center  justify-center'>
                        <div className='w-[400px] px-3 flex flex-col md:w-[600px] xl:w-[800px] h-[62vh] md:h-[73vh] border'>
                            <div className='w-full'>
                                <label className="block text-gray-700 font-semibold mb-2">Star Rating</label>
                                <select className="w-full p-2 border outline-none rounded-lg" value={star} onChange={(e) => setStar(Number(e.target.value))}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <option key={star} value={star} className='border cursor-pointer'>
                                            {"⭐".repeat(star)}
                                        </option>
                                    ))}
                                </select>
                                <div className='mt-5 w-full'>
                                    <label className="block text-gray-700 font-semibold mb-2">Rating Text</label>
                                    <select className="w-full p-2 border rounded-lg" value={ratingText} onChange={(e) => setRatingText(e.target.value)}>
                                        {ratingOptions.map((option) => (
                                            <option className='outline-none border cursor-pointer' onClick={(e) => setRatingText(e.target.value)} key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-full mt-5'>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        <div className='mt-3 mb-3'>
                                            Image
                                        </div>
                                        <img className='cursor-pointer w-28 md:w-36' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} id='image' hidden />
                                    </label>
                                </div>
                                <div className='w-full h-24 mt-5'>
                                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} className='w-full h-full outline-none border px-3 py-2 rounded-md' placeholder='Type here...'></textarea>
                                </div>
                                <div className='mt-14 flex items-center justify-end'>
                                    <Link to={`/product/${product.section}/${product._id}`}><button onClick={() => {
                                        addRatings(star, ratingText, image, description, product.section, product._id)
                                    }} className='p-3 px-5 bg-black text-white rounded-lg text-sm'>Submit</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default rating