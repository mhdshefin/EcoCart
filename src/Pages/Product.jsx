import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Categorytitles from '../Components/Categorytitles'
import RelatedProducts from '../Components/RelatedProducts'
import RecomendedProduct from '../Components/RecomendedProduct'
import Footer from '../Components/Footer'
import { shopContext } from '../Context/ShopContext'
import RecentlyViewed from '../Components/RecentlyViewed'
import { toast } from 'react-toastify'

const Product = () => {

  const { addTocart, addToWIshlist, wishlistItems, allProducts } = useContext(shopContext)
  const [Product, setProduct] = useState(null)
  const [image, setImage] = useState([])
  const [newPrice, setNewPrice] = useState(Number)
  const [ratings, setRatings] = useState([])
  const [offer, setOffer] = useState(Number)
  const [ratingTo5, setRatingsTo5] = useState([])
  const [ratingBalance, setratingBalance] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [whishList, setWishList] = useState(false)
  const [size, setSize] = useState()


  const navigate = useNavigate()

  const userRequest = useParams()

  const fetchProduct = async () => {
    const product = allProducts.find((item) => item._id === userRequest.productId)
    if (product) {
      setProduct(product)
      setImage(product.images[0])
      const newPrice = Math.floor(product.price - (product.price * product.offer / 100))
      setNewPrice(newPrice)
      setRatings(product.ratings)
      setOffer(product.offer)
      if (product.ratings) {
        setRatingsTo5(product.ratings.slice(0, 4))
        setratingBalance(product.ratings.slice(4))
      }

    }

  }

  const ratingCount = Object.values(ratings).reduce((acc, item) => {
    const roundedRating = Math.round(item.rating)
    acc[roundedRating] = (acc[roundedRating] || 0) + 1
    return acc
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

  const ratingArray = Object.entries(ratingCount).map(([rating, count]) => ({
    rating: parseFloat(rating),
    count,
  }));

  const calculateAverageRating = (ratings) => {

    const total = Object.values(ratings).reduce((sum, item) => {
      return sum += item.rating
    }, 0)
    return (total / ratings.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(ratings)

  const renderStars = (rating) => {
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return null
    }
    const filledStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (filledStars + halfStar)

    return averageRating ? (
      <>
        {Array(filledStars).fill('★').map((_, i) => (
          <span key={`filled-${i}`} className={filledStars <= 1.5 ? 'text-red-500' : filledStars <= 2.5 ? 'text-yellow-500' : 'text-green-600'}>★</span>
        ))}
        {halfStar > 0 && <span className={filledStars <= 1 ? 'text-red-500' : filledStars <= 2 ? 'text-yellow-500' : 'text-green-600'}>★</span>}
        {Array(emptyStars).fill('★').map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </>
    ) : <></>
  }

  const GeneralDescription = ({ description }) => {
    return (
      <div className='border text-base mt-3'>
        <table className="table-auto w-full border">
          <tbody>
            {Object.entries(description).map(([key, value]) => (
              <tr key={key}>
                <td className="border p-2 text-gray-900 font-semibold ">{key.replace(/([A-Z])/g, " $1").trim()}</td>
                <td className="border p-2 ">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
  };

  const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

  if (Product) {
    if (!recentlyViewed.includes(Product._id)) {
      recentlyViewed.push(Product._id);
      if (recentlyViewed.length > 15) {
        recentlyViewed.shift();
      }
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  }

  const placeOrder = () => {
    if (Product.size) {
      if (!size) {
        toast.error("Select a size")
        return
      } else {
        navigate(`/place/${Product._id}/${size}`)
      }
    } else {
      navigate(`/place/${Product._id}/no_size`)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [userRequest.productId, userRequest.section, allProducts])

  return (
    Product ?
      <div className='w-full flex flex-col'>
        <div className='w-full flex flex-col px-3 md:px-8 md:flex-row bg-white'>
          <div className='w-full md:sticky md:top-[20px] sm:w-[40%] flex flex-col gap-1 md:h-[100vh] pt-16 md:pt-28'>
            <div className='w-full md:gap-3 gap-1 flex flex-col-reverse md:flex-row'>
              <div className='flex md:w-[16%] mt-5 md:mt-0 w-full flex-row md:flex-col gap-3'>
                {
                  Product.images.map((item, index) => (
                    <img onClick={() => setImage(item)} className='w-20 sm:w-32 md:w-32' key={index} src={item} alt="" />
                  ))
                }
              </div>
              <div className='md:w-[70%] w-full relative'>
                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-white border shadow-lg  absolute top-3 right-3 cursor-pointer transition-all duration-200 hover:scale-105'>
                  <img onClick={() => addToWIshlist(Product.id)} className={`${whishList ? 'w-6' : 'w-5'} `} src={!wishlistItems.includes(Product.id) ? assets.love_outline : assets.love} alt="" />
                </div>
                <img className='w-full ' src={image} alt="" />
              </div>
            </div>
            <div className={`md:w-[86%] w-full flex fixed z-40 left-0 md:relative top-[92vh] md:top-0 text-white min-h-14 md:gap-5 text-lg font-bold mt-5 `}>
              <button onClick={() => addTocart(Product._id, size)} className='bg-yellow-500 w-1/2  flex items-center gap-1 justify-center'>
                <img className='w-6' src={assets.cart} alt="" />
                <p>Add To Cart</p>
              </button>
              <button onClick={placeOrder} className='bg-green-600 w-1/2  flex items-center gap-1 justify-center'>
                <img className='w-6' src={assets.buy} alt="" />
                <p>Buy Now</p>
              </button>
            </div>
          </div>

          <div className='md:w-[60%] w-full flex flex-col gap-3 mt-8 md:mt-0  md:pt-36 pb-20'>
            <div className='gap-3 flex flex-col'>
              <p className='text-2xl font-semibold text-gray-400'>{Product.brand}</p>
              <p className='text-2xl text-black'>{Product.name}</p>
              {
                offer > 50 ?
                  <p className='text-green-600 text-xl'>Special Offer</p> :
                  <></>
              }
              <div className='flex gap-3 items-center '>
                <p className='text-3xl text-gray-800 font-semibold'>₹{newPrice}</p>
                <p className='text-gray-500 text-xl line-through'>₹{Product.price}</p>
                <p className='text-green-600 text-xl'>{Product.offer}% off</p>
              </div>
              {
                Product.ratings.length > 0 ?
                  <div className='flex items-center text-gray-400 text-lg'>
                    {renderStars(averageRating)}
                    {
                      ratings[0].rating > 0 ?
                        <p className='pl-1'>({ratings.length} Ratings and Reviews)</p>
                        : <></>
                    }
                  </div> :
                  <></>
              }

              <p className='text-xl text-gray-500'>{Product.ramCapacity ? 'Ram' : Product.size ? 'Sizes' : ''}</p>
              {
                Product.size ? (
                  <div className='flex gap-2 text-lg max-w-full'>
                    {Product.size.map((item, index) => {
                      console.log(item);

                      return <div onClick={() => setSize(item)} key={index} className={`p-2 ${size === item ? 'border-gray-700' : ''} cursor-pointer border min-w-10 h-10 flex items-center justify-center`}>{item}</div>
                    })}
                  </div>
                ) : <></>
              }


              <div className='flex flex-col text-base text-gray-500'>
                <p className='text-xl text-gray-500 mt-3 mb-1'>Highlights</p>
                {
                  Product.highlights.map((item, index) => {
                    if (!item) {
                      return null
                    } else {
                      return <p className='flex items-center gap-1 text-black' key={index}><span className='text-3xl text-gray-500'>•</span>{item}</p>
                    }
                  })
                }
              </div>

              <div className='flex flex-col text-base '>
                <p className='text-xl text-gray-500 mt-3 mb-2'>Description</p>
                {
                  Product.description ?
                    <p className='text-black'>{Product.description}</p>
                    :
                    <></>

                }
              </div>

              <div>
                {
                  Product.generalDescription ?
                    <div className='w-full flex flex-col '>
                      <p className='text-xl text-gray-500 mt-3 mb-1'>General Description</p>
                      <GeneralDescription description={Product.generalDescription} />
                    </div>
                    :
                    <></>
                }
              </div>

              <div className='text-base mt-5 text-gray-600 flex flex-col gap-1'>
                <p>100% orginal product</p>
                <p>cash on delivery is available</p>
                <p>Easy return and exchange policy in 7 days</p>
              </div>

              <div>
                {
                  ratings[0]?.rating > 0 ?
                    <div className='flex flex-col w-full mt-4'>
                      <div className='border rounded-t-lg px-3'>
                        <div className='w-full flex justify-between items-center px-2 py-2'>
                          <p className='text-xl text-gray-500 mt-3 mb-3'>Ratings and Reviews</p>
                          <Link to={`/rating/${Product._id}`}> <button className='bg-green-600 px-4 h-10 text-white font-medium text-lg rounded-xl'>Add Ratings</button></Link>
                        </div>
                        <div className='flex justify-start gap-3 mt-5'>
                          <div className='flex flex-col gap-1 md:text-5xl text-3xl text-gray-700 items-center justify-start md:w-[30%] w-[40%]'>
                            <div className='flex'>
                              <p>{calculateAverageRating(ratings)}</p>
                              <p>★</p>
                            </div>
                            <div className='flex items-start md:text-lg text-base'>
                              {
                                Product.ratings ?
                                  <p>{Product.ratings.length} Ratings <br /> and Reviews</p> :
                                  <></>
                              }
                            </div>
                          </div>
                          <div className='flex flex-col-reverse gap-2 text-sm mb-8 text-gray-600 justify-center md:w-[60%] w-[50%]'>
                            {
                              ratingArray.map((item, ind) => {
                                return (
                                  <div key={ind} className='flex gap-3 items-start justify-center'>
                                    <p>{item.rating}★</p>
                                    <div className='h-2 min-w-[100%] bg-gray-100 rounded-lg overflow-hidden mt-2'>
                                      <div
                                        className={`${item.rating < 2 ? 'bg-red-600' : item.rating < 4 ? 'bg-yellow-500' : 'bg-green-600'} h-2 rounded-lg`}
                                        style={{ width: `${(item.count / ratingArray.reduce((acc, rating) => acc + rating.count, 0)) * 100}%` }}></div>
                                    </div>
                                    <p>{item.count}</p>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                      {
                        ratingTo5.map((item, index) => {

                          return (
                            <div key={index} className='w-full flex flex-col gap-2 border p-5'>
                              <div className='w-full flex gap-2 text-lg font-semibold items-center justify-start'>
                                <img className='w-7 rounded-full' src={item.userProfile} alt="" />
                                <p>{item.userName}</p>
                              </div>
                              <div className='w-full flex items-center justify-start text-base text-gray-800'>
                                {
                                  renderStars(item.rating)
                                }
                                <b className='pl-2'>{item.ratingTitle}</b>
                              </div>
                              <div className='w-full flex flex-col items-start justify-start gap-2'>
                                <img className='w-14' src={item.image} alt="" />
                                <div className='w-full flex justify-between'>
                                  <p>{item.description}</p>
                                  <div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                      <div className={`${showMore ? '' : 'hidden'} w-full flex flex-col`}>
                        {
                          ratingBalance.map((item, index) => {
                            return (
                              <div key={index} className='w-full flex flex-col gap-2 border p-5'>
                                <div className='w-full flex gap-2 text-lg font-semibold items-center justify-start'>
                                  <img className='w-7 rounded-full' src={item.userProfile} alt="" />
                                  <p>{item.userName}</p>
                                </div>
                                <div className='w-full flex items-center justify-start text-base text-gray-800'>
                                  {
                                    renderStars(item.rating)
                                  }
                                  <p className='pl-2'>{item.ratingTitle}</p>
                                </div>
                                <div className='w-full flex flex-col items-start justify-start gap-2'>
                                  <img className='w-14' src={item.image} alt="" />
                                  <div className='w-full flex justify-between'>
                                    <p>{item.description}</p>
                                    <div>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                      <div className={`w-full flex items-center justify-start text-base min-h-8 border bg-gray-50 text-gray-600`}>
                        <p onClick={() => setShowMore(!showMore)} className='pl-2 cursor-pointer'>{!showMore ? ratingBalance.length : 'Show less'} {showMore ? '' : 'More'}</p>
                      </div>
                    </div>
                    :
                    <></>
                }

              </div>
              <div className='w-full flex items-center justify-end mt-5'>
                <Link to={`/rating/${Product._id}`}><button className='p-3 bg-black text-sm text-white rounded-lg hover:bg-gray-800 '>Add Ratings</button></Link>
              </div>

            </div>
          </div>

        </div>
        <div className='flex flex-col w-full'>
          <div className='w-full flex flex-col mt-3 rounded-xl pt-4 bg-white px-3 mb-10 '>
            <div className='w-full'>
              <Categorytitles name={'Related Products'} />
            </div>
            <div className='w-full overflow-x-auto gap-4'>
              <RelatedProducts category={Product.category} section={Product.section} />
            </div>
          </div>
          <div className='w-full flex flex-col gap-5 mt-[-2vh] rounded-xl pt-4 bg-white px-3 mb-10 '>
            <div className='w-full'>
              <Categorytitles name={'Recomended Products'} />
            </div>
            <div>
              <RecomendedProduct category={Product.category} section={Product.section} />
            </div>
          </div>
          <div className='w-full flex flex-col gap-5 mt-[-2vh] rounded-xl pt-4 bg-white px-3 mb-10 '>
            <div className='w-full'>
              <Categorytitles name={'Recently Viewed Products'} />
            </div>
            <div>
              <RecentlyViewed category={Product.category} section={Product.section} />
            </div>
          </div>

          <Footer />
        </div>
      </div >
      :
      <></>
  )
}

export default Product