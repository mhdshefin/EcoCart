import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { addProductsFashion, assets } from '../assets/assets'
import axios from 'axios'
import { shopContext } from '../Context/ShopContext'
import AdminLogin from '../Pages/AdminLogin'


const addProductFashion = () => {

    const { backendUrl,adminToken } = useContext(shopContext)
    
    const [sizeType, setSIzeType] = useState('letter')

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [SubCategory, setSubCategory] = useState("topwear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])
    const [premium, setPremium] = useState(false)
    const [itemCount, setItemCount] = useState(0)
    const [offer, setOffer] = useState(0)
    const [barnd, setBrand] = useState("")
    const [generalDescription, setGeneralDescription] = useState({ "": "" })
    const [highlights, setHighlight] = useState([""])
    const [colours, setColours] = useState([])

    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)

    const addHighlights = () => {
        setHighlight([...highlights, ""])
    }

    const updateHighlights = (index, value) => {
        const newHighlights = [...highlights]
        newHighlights[index] = value
        setHighlight(newHighlights)
    }

    const removeHighlights = (index) => {
        const newHighlights = highlights.filter((_, i) => i !== index)
        setHighlight(newHighlights)
    }

    const addGeneralDescription = () => {
        setGeneralDescription({ ...generalDescription, "": "" })
    }

    const updateGeneralDescription = (oldKey, newKey, newValue) => {
        setGeneralDescription((prev) => {
            const newGeneralDescription = { ...prev };

            if (oldKey !== newKey) {
                delete newGeneralDescription[oldKey];
            }
            newGeneralDescription[newKey] = newValue;
            return newGeneralDescription;
        });
    };

    const removeGeneralDescription = (key) => {
        const newGeneralDescription = { ...generalDescription }
        delete newGeneralDescription[key]
        setGeneralDescription(newGeneralDescription)
    }

    const onSubmithandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("name", name);
        formData.append("section", "fashion");
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("subCategory", SubCategory);
        formData.append("bestSeller", bestseller);
        formData.append("premium", premium);
        formData.append("itemCount", itemCount);
        formData.append("offer", offer);
        formData.append("brand", barnd);
        formData.append("size", JSON.stringify(sizes))
        formData.append("colors", JSON.stringify(colours))
        formData.append("highlights", JSON.stringify(highlights))
        formData.append("generalDescription", JSON.stringify(generalDescription))

        formData.append("image1", image1)
        formData.append("image2", image2)
        formData.append("image3", image3)
        formData.append("image4", image4)


        console.log(formData);

        const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { 'Content-Type': 'multipart/form-data', token: adminToken } })

        if (response.data.success) {
            console.log(response.data);

        } else {
            console.log("oombi");

        }

    }

    return adminToken ?  (
        <div className='w-full flex flex-col pt-20 md:pt-24'>
            <div className='w-full flex items-center gap-2 justify-start pl-2 '>
                <Link to={'/add'}><img className='w-2 rotate-180 cursor-pointer' src={assets.drop_down} alt="" /></Link>
                <Link to={'/add'}><p className='cursor-pointer'>Back</p></Link>
            </div>

            <form onSubmit={onSubmithandler} className='w-full flex flex-col mt-10 items-start justify-start md:justify-center md:items-center px-3 pb-10'>

                <div className='w-full md:w-[600px] flex flex-col gap-3 pb-4 border px-3 text-lg text-gray-700 font-semibold'>
                    <p className='mt-2'>Images</p>
                    <div className='flex gap-4'>
                        <label htmlFor="image1">
                            <img className='w-[80px] h-[70px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
                            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                        </label>

                        <label htmlFor="image2">
                            <img className='w-[80px] h-[70px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
                            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                        </label>

                        <label htmlFor="image3">
                            <img className='w-[80px] h-[70px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
                            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                        </label>

                        <label htmlFor="image4">
                            <img className='w-[80px] h-[70px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
                            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                        </label>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='name...' className='h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md' />
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <p>Category</p>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className='border h-10 border-gray-300 rounded-md text-sm outline-none pl-2'>
                            {
                                addProductsFashion.category.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Sub Category</p>
                        <select onChange={(e) => setSubCategory(e.target.value)} value={SubCategory} className='border h-10 border-gray-300 rounded-md text-sm outline-none pl-2'>
                            {
                                addProductsFashion.subCategory.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Brand</p>
                        <input onChange={(e) => setBrand(e.target.value)} value={barnd} type="text" placeholder='brand...' className='h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md' />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='price...' className='h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md' />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Offer</p>
                        <input onChange={(e) => setOffer(e.target.value)} value={offer} type="number" placeholder='offer...' className='h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md' />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Sizes</p>
                        {
                            sizeType === 'letter' ?
                                <div className='w-full flex gap-3'>
                                    <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(size => size !== 'S') : [...prev, 'S'])} className={`${sizes.includes('S') ? 'border-gray-950 border-2' : ''} w-10 h-10 cursor-pointer border-gray-400 rounded-md text-sm flex items-center justify-center border`}>
                                        <p>S</p>
                                    </div>
                                    <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(size => size !== 'M') : [...prev, 'M'])} className={`${sizes.includes('M') ? 'border-gray-950 border-2' : ''} w-10 h-10 border-gray-400 rounded-md text-sm flex items-center justify-center border cursor-pointer`}>
                                        <p>M</p>
                                    </div>
                                    <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(size => size !== 'L') : [...prev, 'L'])} className={`${sizes.includes('L') ? 'border-gray-950 border-2' : ''} w-10 h-10 border-gray-400 rounded-md text-sm flex items-center justify-center border cursor-pointer`}>
                                        <p>L</p>
                                    </div>
                                    <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(size => size !== 'XL') : [...prev, 'XL'])} className={`${sizes.includes('XL') ? 'border-gray-950 border-2' : ''} w-10 h-10 border-gray-400 rounded-md text-sm flex items-center justify-center border cursor-pointer`}>
                                        <p>XL</p>
                                    </div>
                                    <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(size => size !== 'XXL') : [...prev, 'XXL'])} className={`${sizes.includes('XXL') ? 'border-gray-950 border-2' : ''} w-10 h-10 border-gray-400 rounded-md text-sm flex items-center justify-center border cursor-pointer`}>
                                        <p>XXL</p>
                                    </div>
                                    <div onClick={() => setSizes(prev => prev.includes('XXXL') ? prev.filter(size => size !== 'XXXL') : [...prev, 'XXXL'])} className={`${sizes.includes('XXXL') ? 'border-gray-950 border-2' : ''} w-10 h-10 border-gray-400 rounded-md text-sm flex items-center justify-center border cursor-pointer`}>
                                        <p>XXXL</p>
                                    </div>
                                </div>
                                :
                                <div className='w-full flex gap-3'>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item,) => (
                                            <div key={item} onClick={() => setSizes(prev => prev.includes(item) ? prev.filter(size => size !== item) : [...prev, item])} className={`${sizes.includes(item) ? 'border-gray-950 border-2' : ''} w-10 h-10 border-gray-400 rounded-md text-sm flex items-center justify-center border cursor-pointer`}>
                                                <p>{item}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                        <p onClick={() => {
                            setSizes([])
                            setSIzeType(sizeType === 'letter' ? 'number' : 'letter')
                        }} className='text-[12px] font-normal cursor-pointer'>Size {sizeType === 'letter' ? 'number' : 'letter'}</p>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Colours</p>
                        <div className='w-full flex gap-3 flex-wrap'>
                            {["red", "blue", "green", "yellow", "orange", "pink", "black", "white"].map((color) => (
                                <div key={color} onClick={() => setColours(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color])} className={`${colours.includes(color) ? 'border-gray-950 border-2' : ''} w-14 h-10 border-gray-400 rounded-md text-sm flex items-center justify-center border cursor-pointer`}>
                                    <p>{color}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <p>Highlights</p>
                        {
                            highlights.map((item, index) => (
                                <div className='w-full flex gap-2 items-center' key={index}>
                                    <input className='h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md w-[95%]' type="text" value={item} onChange={(e) => updateHighlights(index, e.target.value)} placeholder='highlights...' />
                                    <p className='text-xs text-black cursor-pointer' onClick={() => removeHighlights(index)}>x</p>
                                </div>
                            ))
                        }
                        <div onClick={addHighlights} className='text-xs text-white h-8 w-28 rounded-md cursor-pointer bg-black flex items-center justify-center'>Add More</div>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>General Description</p>
                        {Object.entries(generalDescription).map(([key, value], index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <div className='flex w-[95%] gap-3'>
                                    <input className="h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md w-[35%]" type="text" value={key} onChange={(e) => updateGeneralDescription(key, e.target.value, value)} placeholder='key...' />
                                    <input className="h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md w-[65%]" type="text" value={value} onChange={(e) => updateGeneralDescription(key, key, e.target.value)} placeholder="value..." />
                                </div>
                                <p className="text-xs text-black cursor-pointer" onClick={() => removeGeneralDescription(key)}>x</p>
                            </div>
                        ))}
                        <div onClick={addGeneralDescription} className='text-xs text-white h-8 w-28 rounded-md cursor-pointer bg-black flex items-center justify-center'>Add More</div>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Description</p>
                        <textarea onChange={(e) => setDescription(e.target.value)} className='w-full h-16 outline-none border border-gray-300 rounded-md pl-2 text-sm pt-2' placeholder='description...'></textarea>
                    </div>
                    <div className='w-full flex gap-2 text-sm items-center'>
                        <input onClick={() => setBestseller(!bestseller)} type="checkbox" />
                        <p>Best Seller</p>
                    </div>
                    <div onClick={() => setPremium(!premium)} className='w-full flex gap-2 text-sm items-center'>
                        <input type="checkbox" />
                        <p>Premium</p>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p>Item Count</p>
                        <input onChange={(e) => setItemCount(e.target.value)} value={itemCount} type="number" placeholder='price...' className='h-10 pl-2 text-sm outline-none border border-gray-300 rounded-md' />
                    </div>
                    <button type='submit' className='w-full h-10 flex items-center justify-center mt-4 bg-black rounded-sm hover:bg-gray-800 text-white text-sm md:text-base font-medium'>Add Product</button>
                </div>
            </form>

        </div>
    ) : 
    (
        <AdminLogin/>
    )
}

export default addProductFashion