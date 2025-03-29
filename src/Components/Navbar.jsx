import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import SearchExpand from './SearchExpand.jsx'
import { shopContext } from '../Context/ShopContext.jsx'

const Navbar = () => {

    const navigate = useNavigate()

    const { search, setSearch, searchExpand, setSearchExpand, allProducts, token, profileImage, getCartCount, fetchAllProducts } = useContext(shopContext)
    const [visible, setVisible] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [product, setProduct] = useState([])

    const findProduct = (name) => {
        const product = allProducts.filter((item) => {
            return (
                item.name.toLowerCase().includes(name.toLowerCase()) ||
                item.category.toLowerCase().includes(name.toLowerCase()) ||
                item.section.toLowerCase().includes(name.toLowerCase())
            )
        })
        setProduct(product)
    }

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            setSearchExpand(false)
            if (search) {
                findProduct(search)
                fetchAllProducts()
            }
            if (search) {
                const key = 'latestSearches'
                let latestSearch = JSON.parse(localStorage.getItem(key)) || [];
                if (!latestSearch.includes(search)) {
                    latestSearch.unshift(search)
                    if (latestSearch.length > 10) latestSearch.pop()
                    localStorage.setItem(key, JSON.stringify(latestSearch));
                }
            }
            setSearch('')
        }
    }

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (product.length > 0) {
            navigate(`/collection/${product[0].section}/${product[0].category}/${product[0].subCategory}`)
            setProduct([])
        }
    }, [product, navigate])

    return (
        <div className='w-full flex fixed z-50 border-b-2 bg-white shadow-sm transition-all duration-500 transform'>
            <div className='md:w-[25%] w-[25%] py-5 flex sm:pl-0 pl-3 justify-center items-center'>
                <Link to={'/'}><img className='w-32 sm:w-44 cursor-pointer' src={assets.logo} alt="" /></Link>
            </div>

            <div className='flex flex-col w-[60%] md:w-[55%] sm:py-5 py-3 left-[25%] justify-center'>
                <div className='flex items-center justify-center'>
                    <input value={search} onChange={(e) => onChangeHandler(e)} onKeyDown={handleKey} onClick={() => setSearchExpand(true)} className={`w-[90%] h-8 md:h-10 outline-none border-2 border-gray-200  pl-5 ${searchExpand & window.innerWidth > 600 ? 'rounded-t-3xl border-b-0' : 'rounded-full'}`} type="text" placeholder='Search here...' />
                    <i onClick={() => {
                        setSearchExpand(false)
                        findProduct(search)
                    }} className="fa-solid fa-magnifying-glass absolute right-[22%] md:right-[25%] top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"></i>
                </div>
                {searchExpand && (
                    <div className={`absolute sm:top-[6.5vh] top-[90%] justify-center mt-2 md:w-[61.5%]  md:right-[16.75%] w-full ${window.innerWidth > 600 ? '' : 'left-0 '} md:px-[6%] bg-transparent z-50`}>
                        <SearchExpand />
                    </div>
                )}
            </div>

            <div className='justify-center gap-10 py-6 px-16 w-[20%] sm:left-[75%] hidden md:flex group relative:'>
                <div className='flex gap-1'>
                    <Link to={'/wishlist'}><img className='min-w-7 min-h-7 w-5 h-5 cursor-pointer' src={assets.love_outline} alt="" /></Link>
                </div>
                <div className='relative'>
                    <Link to={'/cart'}><div className='w-4 h-4 cursor-pointer flex items-center justify-center absolute bg-black text-white top-[45%] left-[60%] rounded-full p-1'>
                        <p className='text-[8px]'>{getCartCount()}</p>
                    </div></Link>
                    <Link to={'/cart'}><img className='min-w-6 min-h-7 w-5 h-5 cursor-pointer' src={assets.cart_icon} alt="" /></Link>
                </div>
                <Link to={token ? '/account' : '/login'}>
                    <div className='w-6 rounded-full'>
                        <img className={`rounded-full w-full h-full object-contain cursor-pointer`} src={token ? profileImage : assets.profile_icon} alt="" />
                    </div></Link>
                <img onClick={() => setShowMore(true)} className='min-w-8 min-h-8 w-5 h-5 cursor-pointer flex' src={assets.more} alt="" />
            </div>



            <div className='flex justify-end items-center pr-2  md:hidden w-[16%]'>
                <Link to={token ? '/account' : '/login'}><img className='w-5 cursor-pointer rounded-full' src={token ? profileImage : assets.profile_icon} alt="" /></Link>
                <div className='flex items-center justify-end'>
                <img onClick={() => setShowMore(true)} className=' w-5 h-5 cursor-pointer flex' src={assets.more} alt="" />
                </div>
            </div>

            {
                showMore ?
                    <div className={`absolute top-0 bottom-0 right-0 h-screen overflow-hidden bg-white transition-all z-50 shadow-xl border-l ${showMore && window.innerWidth > 600 ? 'w-2/12' : showMore && window.innerWidth < 600  ? 'w-1/3' : ''}`}>
                        <div className='flex gap-2 text-black font-medium mt-4 ml-4 items-center'>
                            <img onClick={() => setShowMore(false)} className='w-3 h-4 rotate-180 cursor-pointer' src={assets.drop_down} alt="" />
                            <p onClick={() => setShowMore(false)} className='text-lg cursor-pointer'>Back</p>
                        </div>

                        <div className='flex flex-col text-lg mt-4 border-t-2'>
                            <NavLink onClick={() => setShowMore(false)} to='/about' className='py-2 p-3 hover:bg-gray-100 hover:text-black border-b '>About Us</NavLink>
                            <NavLink onClick={() => setShowMore(false)} to='/contact' className='py-2 p-3 hover:bg-gray-100 hover:text-black border-b '>Contact Us</NavLink>
                        </div>
                    </div>

                    : <></>
            }

        </div>
    )
}

export default Navbar