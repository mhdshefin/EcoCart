import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, filterOptions } from '../assets/assets'
import Categorytitles from '../Components/Categorytitles'
import ProductItem from '../Components/productItem'
import { shopContext } from '../Context/ShopContext'

const Collection = () => {

  const userRequest = useParams()
  const { allProducts } = useContext(shopContext)
  const [Products, setProducts] = useState([])
  const [filteredProducts, setFilteredProduct] = useState([])
  const [showFIlter, setShowFilter] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [subcategory, setsubCategory] = useState([])
  const [sizes, setSizes] = useState([]);
  const [colours, setColours] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [operatingSystem, setOpreatingSystem] = useState([])
  const [processor, setProcessor] = useState([])
  const [ram, setRam] = useState([])
  const [internalStorage, setInternalStorage] = useState([]);
  const [networkType, setNetworkType] = useState([]);
  const [type, setType] = useState([])
  const [connection, setConnection] = useState([])
  const [usage, setUsage] = useState([])
  const [screen, setScreen] = useState([])
  const [resolutions, setResolutions] = useState([])
  const [features, setFeatures] = useState([])
  const [star, setStar] = useState([])
  const [material, setMaterial] = useState([])
  const [capacity, setCapacity] = useState([])
  const [sortType, setSortType] = useState('relavent')

  useEffect(() => {
    setProducts(
      allProducts.filter((item) => {
        const isMatchingSection = item.section.toLowerCase() === userRequest.sectionId.toLowerCase();
        const isMatchingSubCategory = item.category.toLowerCase() === userRequest.category.toLowerCase();
        if (userRequest.sectionId.toLowerCase() === 'fashion') {
          return (
            isMatchingSection &&
            isMatchingSubCategory &&
            item.subCategory.toLowerCase() === userRequest.subCategory.toLowerCase()
          );
        }
        return isMatchingSection && isMatchingSubCategory;
      })
    )
  }, [allProducts])

  useEffect(() => {
    console.log(category);

  }, [category])

  const toggleItem = (value, state, setState) => {
    if (state.includes(value)) {
      setState((prev) => prev.filter((item) => item !== value))
    } else {
      setState((prev) => [...prev, value])
    }
  }


  const applyFilter = () => {
    let productCopy = Products.slice()
    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.some((cat) => cat.toLowerCase().includes(item.category.toLowerCase())))
    }
    if (colours.length > 0) {
      productCopy = productCopy.filter((item) => colours.some((colour) => item.colors.some((col) => col.toLowerCase() === colour.toLowerCase())));
    }
    if (subcategory.length > 0) {
      productCopy = productCopy.filter((item) => subcategory.some((subCat) => subCat.toLowerCase().includes(item.subCategory.toLowerCase())))
    }
    if (brand.length > 0) {
      productCopy = productCopy.filter((item) => brand.some((brand) => brand.toLowerCase().includes(item.brand.toLowerCase())))
    }
    if (sizes.length > 0) {
      productCopy = productCopy.filter((item) => {
        if (item.size.some((size) => typeof size === "number")) {
          return item.size.some((size) => sizes.map(Number).includes(size));
        } else {
          return item.size.some((size) => sizes.includes(size));
        }
      });
    }
    if (discount.length > 0) {
      productCopy = productCopy.filter((item) =>
        discount.some((dis) => item.offer >= Number(dis))
      )
    }
    if (ratings.length > 0) {
      productCopy = productCopy.filter((item) => {
        let total = item.ratings.reduce((sum, rating) => sum + parseFloat(rating), 0)
        const averageRating = parseFloat(total / item.ratings.length)
        return ratings.some((rating) => averageRating >= Number(rating))
      })
    }
    if (operatingSystem.length > 0) {
      productCopy = productCopy.filter((item) => operatingSystem.some((operatingSys) => operatingSys.toLowerCase().includes(item.operatingSystem.toLowerCase())))
    }
    if (processor.length > 0) {
      productCopy = productCopy.filter((item) => processor.some((process) => process.toLowerCase().includes(item.processor.toLowerCase())))
    }
    if (ram.length > 0) {
      productCopy = productCopy.filter((item) => ram.some((Ram) => Ram.toLowerCase().includes(item.ram.toLowerCase())))
    }
    if (internalStorage.length > 0) {
      productCopy = productCopy.filter((item) => internalStorage.some((storage) => storage.toLowerCase().includes(item.internalStorage.toLowerCase())))
    }
    if (networkType.length > 0) {
      productCopy = productCopy.filter((item) => networkType.some((net) => net.toLowerCase().includes(item.networkType.toLowerCase())))
    }
    if (type.length > 0) {
      productCopy = productCopy.filter((item) => type.some((typ) => typ.toLowerCase().includes(item.type.toLowerCase())))
    }
    if (connection.length > 0) {
      productCopy = productCopy.filter((item) => connection.includes(item.connection))
    }
    if (usage.length > 0) {
      productCopy = productCopy.filter((item) => usage.includes(item.usage))
    }
    if (screen.length > 0) {
      productCopy = productCopy.filter((item) => screen.includes(item.screen))
    }
    if (resolutions.length > 0) {
      productCopy = productCopy.filter((item) => resolutions.includes(item.resolutions))
    }
    if (features.length > 0) {
      productCopy = productCopy.filter((item) => features.includes(item.features))
    }
    if (star.length > 0) {
      productCopy = productCopy.filter((item) => star.includes(item.energyRatings))
    }
    if (material.length > 0) {
      productCopy = productCopy.filter((item) => material.includes(item.material))
    }
    if (capacity.length > 0) {
      productCopy = productCopy.filter((item) => capacity.includes(item.capacities))
    }
    setFilteredProduct(productCopy)
  }

  const filterReset = () => {
    setCategory([])
    setsubCategory([])
    setBrand([])
    setSizes([])
    setColours([])
    setRatings([])
    setDiscount([])
    applyFilter()
  }

  const sortProduct = () => {
    let fpCopy = filteredProducts.slice()
    filteredProducts.map((item) => {
      item.newPrice = Math.floor(item.price - (item.price * item.offer / 100))
    })
    switch (sortType) {
      case 'high-low':
        setFilteredProduct(fpCopy.sort((a, b) => b.newPrice - a.newPrice))
        break;
      case 'low-high':
        setFilteredProduct(fpCopy.sort((a, b) => a.newPrice - b.newPrice))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    applyFilter()
  }, [Products])

  useEffect(() => {
    sortProduct()
  }, [sortType])


  return (
    <div className='flex flex-col md:flex-row w-full md:pt-20 pt-14'>
      <div className={`md:fixed md:top-[10vh] sm:pl-3 pl-0 overflow-x-hidden md:pb-24 z-30 bg-white lg:min-w-[20%] md:min-w-[18%] lg:max-w-[20%] md:max-w-[18%] w-full md:max-h-screen overflow-y-scroll flex flex-col md:items-start items-center`}>
        <div className='mt-3 hidden md:flex'>
          <Categorytitles name={"Filter"} />
        </div>
        <div className='flex w-full md:hidden cursor-pointer pt-2 sm:pt-6 '>
          <div onClick={() => setShowFilter(!showFIlter)} className='w-1/2 border h-10 flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M427-120v-225h60v83h353v60H487v82h-60Zm-307-82v-60h247v60H120Zm187-166v-82H120v-60h187v-84h60v226h-60Zm120-82v-60h413v60H427Zm166-165v-225h60v82h187v60H653v83h-60Zm-473-83v-60h413v60H120Z" /></svg>
            Filter</div>
          <div onClick={() => setShowSort(!showSort)} className='w-1/2 border h-10 flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M400-240v-60h160v60H400ZM240-450v-60h480v60H240ZM120-660v-60h720v60H120Z" /></svg>
            Sort</div>
        </div>
        <div onClick={() => setShowFilter(!showFIlter)} className={`w-full cursor-pointer flex px-2 items-center justify-start gap-3 text-lg min-h-12 ${showFIlter ? '' : 'hidden'}`}>
          <img src={assets.drop_down} className='rotate-180 w-3' alt="" />
          <p>Back</p>
        </div>
        <div className={`w-[95%] mt-2 md:mt-0 ${showFIlter ? '' : 'hidden'} md:flex bg-white`}>
          {
            userRequest.sectionId.toLowerCase() === 'fashion' ? (
              <div className='w-full flex flex-col md:gap-2 md:mt-6 pb-2 md:flex text-sm text-gray-700 '>
                <div className=' w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                  <p className='text-base font-medium text-black'>CATEGORY</p>
                  {
                    filterOptions[0].category.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, category, setCategory)} className='w-3' type="checkbox" />{item}</p>)
                    })
                  }
                </div>
                <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                  <p className='text-base font-medium text-black'>SUB CATEGORY</p>
                  {
                    filterOptions[0].subCategory.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, subcategory, setsubCategory)} className='w-3' type="checkbox" />{item}</p>)
                    })
                  }
                </div>
                <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                  <p className='text-base font-medium text-black'>BRAND</p>
                  {userRequest.subCategory.toLowerCase() !== 'footwear' ?
                    filterOptions[0].brandDress.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                    }) :
                    filterOptions[0].brandShoes.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                    })
                  }
                </div>
                <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                  <p className='text-base font-medium text-black'>SIZES</p>
                  {userRequest.subCategory.toLowerCase() !== 'footwear' ?
                    filterOptions[0].sizeDress.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, sizes, setSizes)} className='w-3' type="checkbox" />{item}</p>)
                    }) :
                    filterOptions[0].sizeShoes.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, sizes, setSizes)} className='w-3' type="checkbox" />{item}</p>)
                    })
                  }
                </div>
                <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                  <p className='text-base font-medium text-black'>COLOURS</p>
                  {
                    filterOptions[0].colors.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, colours, setColours)} className='w-3' type="checkbox" />{item}</p>)
                    })
                  }
                </div>
                <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                  <p className='text-base font-medium text-black'>DISCOUNT</p>
                  {
                    filterOptions[0].discount.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, discount, setDiscount)} className='w-3' type="checkbox" />{item}% off or more</p>)
                    })
                  }
                </div>
                <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                  <p className='text-base font-medium text-black'>CUSTOMER RATINGS</p>
                  {
                    filterOptions[0].ratings.map((item, index) => {
                      return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, ratings, setRatings)} className='w-3' type="checkbox" />{item}★ and above </p>)
                    })
                  }
                </div>
                <div className='flex items-center mt-2 justify-between'>
                  <button onClick={() => filterReset()} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1'>Reset</button>
                  <button onClick={() => {
                    setShowFilter(false)
                    applyFilter()
                  }} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1 flex '>Apply</button>
                </div>
              </div>
            ) :
              userRequest.category.toLowerCase() === 'mobile' || userRequest.category.toLowerCase() === 'laptop' || userRequest.category.toLowerCase() === 'watch' ? (
                <div className='w-full flex flex-col md:gap-2 md:mt-6 md:flex text-sm text-gray-700 '>
                  <div className=' w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                    <p className='text-base font-medium text-black'>BRANDS</p>
                    {
                      filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : userRequest.category.toLowerCase() === 'laptop' ? 2 : 3].brands.map((item) => {
                        return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                      })
                    }
                  </div>
                  <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                    <p className='text-base font-medium text-black'>OPERATING SYSTEM</p>
                    {
                      filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : userRequest.category.toLowerCase() === 'laptop' ? 2 : 3].operatingSystem.map((item) => {
                        return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, operatingSystem, setOpreatingSystem)} className='w-3' type="checkbox" />{item}</p>)
                      })
                    }
                  </div>

                  {
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>PROCESSOR</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : 2].processor.map((item) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, processor, setProcessor)} className='w-3' type="checkbox" />{item}</p>)
                          })
                        }
                      </div>
                  }
                  <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                    <p className='text-base font-medium text-black'>RAM</p>
                    {
                      filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : userRequest.category.toLowerCase() === 'laptop' ? 2 : 3].ramCapacity.map((item) => {
                        return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, ram, setRam)} className='w-3' type="checkbox" />{item}</p>)
                      })
                    }
                  </div>
                  <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                    <p className='text-base font-medium text-black'>INTERNAL STORAGE</p>
                    {
                      filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : userRequest.category.toLowerCase() === 'laptop' ? 2 : 3].storageCapacity.map((item) => {
                        return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, internalStorage, setInternalStorage)} className='w-3' type="checkbox" />{item}</p>)
                      })
                    }
                  </div>
                  {
                    userRequest.category.toLowerCase() === 'mobile' ?
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>NETWORK TYPE</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : 2].netWork.map((item) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, networkType, setNetworkType)} className='w-3' type="checkbox" />{item}</p>)
                          })
                        }
                      </div>
                      : <></>
                  }
                  <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                    <p className='text-base font-medium text-black'>DISCOUNT</p>
                    {
                      filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : userRequest.category.toLowerCase() === 'laptop' ? 2 : 3].discount.map((item, index) => {
                        return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, discount, setDiscount)} className='w-3' type="checkbox" />{item}% off or more</p>)
                      })
                    }
                  </div>
                  <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                    <p className='text-base font-medium text-black'>CUSTOMER RATINGS</p>
                    {
                      filterOptions[userRequest.category.toLowerCase() === 'mobile' ? 1 : userRequest.category.toLowerCase() === 'laptop' ? 2 : 3].ratings.map((item, index) => {
                        return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, ratings, setRatings)} className='w-3' type="checkbox" />{item}★ and above </p>)
                      })
                    }
                  </div>
                  <div className='flex items-center mt-2 justify-between'>
                    <button onClick={() => filterReset()} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1'>Reset</button>
                    <button onClick={() => {
                      setShowFilter(false)
                      applyFilter()
                    }} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1 flex '>Apply</button>
                  </div>
                </div>
              ) :
                userRequest.category.toLowerCase() === 'headset' || userRequest.category.toLowerCase() === 'speaker' ? (
                  <div className='w-full flex flex-col md:gap-2 md:mt-6 md:flex text-sm text-gray-700 '>
                    <div className=' w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                      <p className='text-base font-medium text-black'>BRANDS</p>
                      {
                        filterOptions[userRequest.category.toLowerCase() === 'headset' ? 4 : 11].brand.map((item) => {
                          return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                        })
                      }
                    </div>
                    <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                      <p className='text-base font-medium text-black'>CONNECTION</p>
                      {
                        filterOptions[userRequest.category.toLowerCase() === 'headset' ? 4 : 11].connection.map((item) => {
                          return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, connection, setConnection)} className='w-3' type="checkbox" />{item}</p>)
                        })
                      }
                    </div>
                    <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                      <p className='text-base font-medium text-black'>USAGE</p>
                      {
                        filterOptions[userRequest.category.toLowerCase() === 'headset' ? 4 : 11].usage.map((item) => {
                          return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, usage, setUsage)} className='w-3' type="checkbox" />{item}</p>)
                        })
                      }
                    </div>
                    <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                      <p className='text-base font-medium text-black'>COLOURS</p>
                      {
                        filterOptions[userRequest.category.toLowerCase() === 'headset' ? 4 : 11].colors.map((item, index) => {
                          return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, colours, setColours)} className='w-3' type="checkbox" />{item}</p>)
                        })
                      }
                    </div>
                    <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                      <p className='text-base font-medium text-black'>DISCOUNT</p>
                      {
                        filterOptions[userRequest.category.toLowerCase() === 'headset' ? 4 : 11].discount.map((item, index) => {
                          return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, discount, setDiscount)} className='w-3' type="checkbox" />{item}% or more</p>)
                        })
                      }
                    </div>
                    <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                      <p className='text-base font-medium text-black'>CUSTOMER RATINGS</p>
                      {
                        filterOptions[userRequest.category.toLowerCase() === 'headset' ? 4 : 11].ratings.map((item, index) => {
                          return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, ratings, setRatings)} className='w-3' type="checkbox" />{item}★ and above </p>)
                        })
                      }
                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                      <button onClick={() => filterReset()} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1'>Reset</button>
                      <button onClick={() => {
                        setShowFilter(false)
                        applyFilter()
                      }} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1 flex '>Apply</button>
                    </div>
                  </div>) :
                  userRequest.sectionId.toLowerCase() === 'appliance' ? (
                    <div className='w-full flex flex-col md:gap-2 md:mt-6 md:flex text-sm text-gray-700 '>
                      <div className=' w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>BRANDS</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'refrigerator' ? 6 : userRequest.category.toLowerCase() === 'ac' ? 7 : 8].brands.map((item) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                          })
                        }
                      </div>
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>STAR</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'refrigerator' ? 6 : userRequest.category.toLowerCase() === 'ac' ? 7 : 8].energyRatings.map((item) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, star, setStar)} className='w-3' type="checkbox" />{item}</p>)
                          })
                        }
                      </div>
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>CAPACITY</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'refrigerator' ? 6 : userRequest.category.toLowerCase() === 'ac' ? 7 : 8].capacities.map((item) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, capacity, setCapacity)} className='w-3' type="checkbox" />{item}</p>)
                          })
                        }
                      </div>
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>FEATURES</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'refrigerator' ? 6 : userRequest.category.toLowerCase() === 'ac' ? 7 : 8].features.map((item) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, features, setFeatures)} className='w-3' type="checkbox" />{item}</p>)
                          })
                        }
                      </div>
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>COLOURS</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'refrigerator' ? 6 : userRequest.category.toLowerCase() === 'ac' ? 7 : 8].colors.map((item, index) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, colours, setColours)} className='w-3' type="checkbox" />{item}</p>)
                          })
                        }
                      </div>
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>DISCOUNT</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'refrigerator' ? 6 : userRequest.category.toLowerCase() === 'ac' ? 7 : 8].discount.map((item, index) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, discount, setDiscount)} className='w-3' type="checkbox" />{item}% or more</p>)
                          })
                        }
                      </div>
                      <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                        <p className='text-base font-medium text-black'>CUSTOMER RATINGS</p>
                        {
                          filterOptions[userRequest.category.toLowerCase() === 'refrigerator' ? 6 : userRequest.category.toLowerCase() === 'ac' ? 7 : 8].ratings.map((item, index) => {
                            return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, ratings, setRatings)} className='w-3' type="checkbox" />{item}★ and above </p>)
                          })
                        }
                      </div>
                      <div className='flex items-center mt-2 justify-between'>
                        <button onClick={() => filterReset()} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1'>Reset</button>
                        <button onClick={() => {
                          setShowFilter(false)
                          applyFilter()
                        }} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1 flex '>Apply</button>
                      </div>
                    </div>)
                    :
                    userRequest.sectionId.toLowerCase() === 'furniture' ? (
                      <div className='w-full flex flex-col md:gap-2 md:mt-6 md:flex text-sm text-gray-700 '>
                        <div className=' w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>BRANDS</p>
                          {
                            filterOptions[10].brands.map((item) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>TYPE</p>
                          {
                            filterOptions[10].types.map((item) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, type, setType)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>MATERIAL</p>
                          {
                            filterOptions[10].materials.map((item) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, material, setMaterial)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>SIZE</p>
                          {
                            filterOptions[10].sizes.map((item) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, sizes, setSizes)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>FEATURE</p>
                          {
                            filterOptions[10].features.map((item) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, features, setFeatures)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>COLOURS</p>
                          {
                            filterOptions[10].colors.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, colours, setColours)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>DISCOUNT</p>
                          {
                            filterOptions[10].discount.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, discount, setDiscount)} className='w-3' type="checkbox" />{item}% or more</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>CUSTOMER RATINGS</p>
                          {
                            filterOptions[10].ratings.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, ratings, setRatings)} className='w-3' type="checkbox" />{item}★ and above </p>)
                            })
                          }
                        </div>
                        <div className='flex items-center mt-2 justify-between'>
                          <button onClick={() => filterReset()} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1'>Reset</button>
                          <button onClick={() => {
                            setShowFilter(false)
                            applyFilter()
                          }} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1 flex '>Apply</button>
                        </div>
                      </div>) : <><div className='w-full flex flex-col md:gap-2 md:mt-6 pb-2 md:flex text-sm text-gray-700 '>
                        <div className=' w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>CATEGORY</p>
                          {
                            filterOptions[0].category.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, category, setCategory)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>SUB CATEGORY</p>
                          {
                            filterOptions[0].subCategory.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, subcategory, setsubCategory)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>BRAND</p>
                          {userRequest.subCategory.toLowerCase() !== 'footwear' ?
                            filterOptions[0].brandDress.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                            }) :
                            filterOptions[0].brandShoes.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, brand, setBrand)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>SIZES</p>
                          {
                            filterOptions[0].sizeDress.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, sizes, setSizes)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>COLOURS</p>
                          {
                            filterOptions[0].colors.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, colours, setColours)} className='w-3' type="checkbox" />{item}</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>DISCOUNT</p>
                          {
                            filterOptions[0].discount.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, discount, setDiscount)} className='w-3' type="checkbox" />{item}% off or more</p>)
                            })
                          }
                        </div>
                        <div className='w-full flex flex-col gap-1 border border-gray-300 rounded pl-5 py-3'>
                          <p className='text-base font-medium text-black'>CUSTOMER RATINGS</p>
                          {
                            filterOptions[0].ratings.map((item, index) => {
                              return (<p className='flex gap-2' key={item}><input value={item} onChange={(e) => toggleItem(e.target.value, ratings, setRatings)} className='w-3' type="checkbox" />{item}★ and above </p>)
                            })
                          }
                        </div>
                        <div className='flex items-center mt-2 justify-between'>
                          <button onClick={() => filterReset()} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1'>Reset</button>
                          <button onClick={() => {
                            setShowFilter(false)
                            applyFilter()
                          }} className='bg-black  text-white text-base rounded-lg py-2 px-10 right-1 flex '>Apply</button>
                        </div>
                      </div></>
          }
        </div>
      </div>
      {
        filteredProducts.length > 0 ?
          <div className=' md:ml-[20%] md:pl-2 w-full md:min-h-screen md:w-[80%] lg:w-[82%] rounded-xl bg-white'>
            <div className={`w-full md:flex tems-center pt-3 md:pt-5 md:min-h-[10vh] justify-end pr-3 ${showSort ? 'flex' : 'hidden'}`}>
              <select onChange={(e) => setSortType(e.target.value)} className='border-2 rounded-lg w-44 h-10 outline-none border-gray-300 text-sm px-2'>
                <option value="relavent">sort by: Relavent</option>
                <option value="low-high">sort by: Low-High</option>
                <option value="high-low">sort by: High-Low</option>
              </select>
            </div>
            <div className={`${showFIlter ? 'hidden' : ''} grid justify-center pl-2 md:pl-0 grid-cols-2 sm:grid-cols-3 md:mt-0 gap-2 md:gap-3 lg:grid-cols-4 xl:grid-cols-5 px-1 py-2 bg-[#fff] min-h-screen rounded-xl`}>
              {
                filteredProducts.map((item, index) => {
                  return <ProductItem key={index} ratings={item.ratings} name={item.name} image={item.images[0]} brand={item.brand} Price={item.price} offer={item.offer} id={item._id} section={item.section} itemCount={item.itemCount} />
                })
              }
            </div>
          </div>
          :
          <div className='w-full min-h-screen flex items-center justify-center bg-white'>
            <h1 className='font-medium text-lg text-gray-700 md:text-2xl'>No Product Found !</h1>
          </div>
      }

    </div>
  )
}

export default Collection