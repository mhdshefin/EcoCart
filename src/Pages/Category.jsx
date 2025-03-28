import React, { useContext, useEffect, useState } from 'react'
import { assets, banner } from '../assets/assets'
import { useParams } from 'react-router-dom'
import ProductItem from '../Components/productItem'
import Categorytitles from '../Components/Categorytitles'
import { Link } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'


const Category = () => {

  const { sectionId } = useParams()
  const { allProducts } = useContext(shopContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [Categorybanner, setCategoryBanner] = useState([])

  const settingCategory = () => {
    setCategoryBanner(banner.filter((item)=>item.section.toLowerCase() === sectionId.toLowerCase()))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex(prevIndex => prevIndex === Categorybanner.length - 1 ? 0 : prevIndex + 1)
    }, 4000)

    return () => clearInterval(interval)

  }, [banner.length])


  const handleTransitionEnd = () => {
    if (currentIndex === Categorybanner.length - 1) {
      setCurrentIndex(0)
    }
    setIsTransitioning(false);
  };

  const uniqueSectionProducts = allProducts.filter((item) => item.section.toLowerCase() === sectionId.toLowerCase())

  let uniqueProduct = uniqueSectionProducts.filter((item, index, self) => {
    return self.findIndex(p => p.category === item.category) === index;
  })

  const topOfferProducts = uniqueSectionProducts.sort((a, b) => b.offer - a.offer).slice(0, window.innerWidth > 450 ? 5 : 6)

  useEffect(() => {
    settingCategory()
  }, [])

  return (
    <div className='pt-20'>
      <div className='w-full relative max-h-[60vh] overflow-hidden  flex flex-col bg-white object-contain md:mt-5'>
        <div onClick={() => setCurrentIndex(currentIndex[0] ? banner.length - 1 : currentIndex - 1)} className='absolute left-[-0.2%] top-1/2 transform -translate-y-1/2 z-20 p-2 bg-[#ffff] shadow-lg text-gray-800 text-lg w-8 h-16 rounded-lg flex items-center justify-center'><img className='rotate-180 w-3' src={assets.drop_down} alt="" /></div>
        <div onTransitionEnd={handleTransitionEnd} className={`flex transition-transform duration-1000 ease-in-out ${isTransitioning ? '' : 'transition-none'}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {
            Categorybanner.length > 0 ?
              (
                [...Categorybanner, Categorybanner[0]]?.map((item, index) => {
                  return <img key={index} className="min-w-full max-h-[50vh]" src={item.image} alt={`Slide ${index + 1}`} />
                })
              ) :
              <></>
          }

        </div>
        <div onClick={() => setCurrentIndex(currentIndex === banner.length - 1 ? 0 : currentIndex + 1)} className='absolute right-[-0.2%] top-1/2 transform -translate-y-1/2 z-20 p-2 bg-[#ffffff] shadow-lg text-gray-800 text-lg w-8 h-16 rounded-lg flex items-center justify-center'><img className='w-3' src={assets.drop_down} alt="" /></div>
      </div>

      <div>
        {
          uniqueProduct.length > 0 ?
            <div className={`flex ${window.innerWidth > 550 ? 'justify-center' : 'justify-start'} items-center mt-5 gap-6 bg-[#fff] rounded-xl p-5 overflow-x-scroll`}>
              {
                uniqueProduct.map((item, index) => {
                  return (
                    <Link key={index} to={`/collection/${item.section}/${item.category}/${item.subCategory}`}><div className=' border border-gray-300 flex flex-col text-lg md:text-xl text-gray-800 items-center rounded-lg bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg'>
                      <div className='w-32 md:w-52 h-32 md:h-56'>
                        <img className='w-full h-full rounded-t-lg' src={item.images[0]} alt="" />
                      </div>
                      <div className='w-full flex items-center justify-center h-8 md:h-10'>
                        <b>{item.category}</b>
                      </div>
                    </div></Link>
                  )
                })
              }
            </div>
            :
            <></>
        }
        {
          topOfferProducts.length > 0 ?
            <div className='w-full mt-3 flex flex-col bg-white pt-3 pl-1 rounded-lg'>
              <Categorytitles name={"Top Offers"} />
              <div className='w-full sm:pb-5 pt-1  mt-5 px-1 sm:px-5 sm:gap-3 gap-1 bg-[#fff] rounded-xl grid justify-between grid-cols-2 md:grid-cols-4 xl:grid-cols-6'>
                {
                  topOfferProducts.map((item, index) => {
                    return <ProductItem key={index} ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} section={item.section} offer={item.offer} id={item._id} itemCount={item.itemCount} />
                  })
                }
              </div>
            </div>
            :
            <></>
        }
        {
          uniqueProduct[0] ?

            <div className='w-full mt-3 pb-3 flex flex-col pt-3 pl-1 bg-white rounded-lg'>
              <Categorytitles name={`${uniqueProduct[0].category}${sectionId.toLowerCase() === 'fashion' ? "'s collection" : ''}`} />
              <div className='w-full sm:pb-5 pt-1 pb-1 mt-5 px-1 sm:px-5 sm:gap-3 gap-1 bg-[#fff] rounded-xl grid justify-between grid-cols-2 md:grid-cols-4 xl:grid-cols-6'>
                {
                  allProducts.filter((item) => item.category.toLowerCase() === uniqueProduct[0].category.toLowerCase()).slice(0, window.innerWidth > 450 ? 5 : 6).map((item, index) => {
                    return <ProductItem key={index} ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} section={item.section} offer={item.offer} id={item._id} itemCount={item.itemCount} />
                  })
                }
              </div>
            </div>
            :
            <></>
        }
        {
          uniqueProduct[1] ?

            <div className='w-full mt-3 pb-3 flex flex-col pt-3 pl-1 bg-white rounded-lg'>
              <Categorytitles name={`${uniqueProduct[1].category}${sectionId.toLowerCase() === 'fashion' ? "'s collection" : ''}`} />
              <div className='w-full sm:pb-5 pt-1 pb-1 mt-5 px-1 sm:px-5 sm:gap-3 gap-1 bg-[#fff] rounded-xl grid justify-between grid-cols-2 md:grid-cols-4 xl:grid-cols-6'>
                {
                  allProducts.filter((item) => item.category.toLowerCase() === uniqueProduct[1].category.toLowerCase()).slice(0, window.innerWidth > 450 ? 5 : 6).map((item, index) => {
                    return <ProductItem key={index} ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} section={item.section} offer={item.offer} id={item._id} itemCount={item.itemCount} />
                  })
                }
              </div>
            </div>
            :
            <></>
        }
        {
          uniqueProduct[2] ?
            <div className='w-full mt-3 pb-3 flex flex-col pt-3 pl-1 bg-white rounded-lg'>
              <Categorytitles name={`${uniqueProduct[2].category}${sectionId.toLowerCase() === 'fashion' ? "'s collection" : ''}`} />
              <div className='w-full sm:pb-5 pt-1 pb-1 mt-5 px-1 sm:px-5 sm:gap-3 gap-1 bg-[#fff] rounded-xl grid justify-between grid-cols-2 md:grid-cols-4 xl:grid-cols-6'>
                {
                  allProducts.filter((item) => item.category.toLowerCase() === uniqueProduct[2].category.toLowerCase()).slice(0, window.innerWidth > 450 ? 5 : 6).map((item, index) => {
                    return <ProductItem key={index} ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} section={item.section} offer={item.offer} id={item._id} itemCount={item.itemCount} />
                  })
                }
              </div>
            </div>
            :
            <></>
        }


      </div>
    </div>
  )
}

export default Category