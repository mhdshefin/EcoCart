import React, { useEffect, useState } from 'react'
import { assets, banner } from '../assets/assets'

const Header = () => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex(prevIndex => prevIndex === banner.length - 1 ? 0 : prevIndex + 1)
        }, 3000)

        return () => clearInterval(interval)

    }, [banner.length])


    const handleTransitionEnd = () => {
        if (currentIndex === banner.length) {
            setCurrentIndex(0)
        }
        setIsTransitioning(false);
    };


    return (
        <div className='w-full relative max-h-[60vh] overflow-hidden flex flex-col object-contain md:mt-5'>
            <div onClick={() => setCurrentIndex(currentIndex[0] ? banner.length - 1 : currentIndex - 1)} className='absolute left-[-0.2%] top-1/2 transform -translate-y-1/2 z-20 p-2 bg-[#fff] text-gray-800 text-lg w-8 h-16 rounded-lg flex items-center justify-center'><img className='rotate-180 w-3' src={assets.drop_down} alt="" /></div>
            <div onTransitionEnd={handleTransitionEnd} className={`flex transition-transform duration-1000 ease-in-out ${isTransitioning ? '' : 'transition-none'}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {[...banner, banner[0]].map((item, index) => {
                    return <img key={index} className="min-w-full max-h-[55vh]" src={item.image} alt={`Slide ${index + 1}`} />
                })}
            </div>
             <div onClick={() => setCurrentIndex(currentIndex === banner.length - 1 ? 0 : currentIndex + 1)} className='absolute right-[-0.2%] top-1/2 transform -translate-y-1/2 z-20 p-2 bg-[#fff] text-gray-800 text-lg w-8 h-16 rounded-lg flex items-center justify-center'><img className=' w-3' src={assets.drop_down} alt="" /></div>
            <div className="mt-3 ml-[50%] transform -translate-x-1/2 flex justify-center items-center w-full gap-3">
                {banner.map((_, index) => (
                    <div key={index} className={`w-1 h-1 rounded-full bg-gray-400 transition-all duration-300 ${currentIndex === index ? 'bg-gray-600' : ''}`} style={{ width: currentIndex === index ? '30px' : '8px' }}></div>
                ))}
            </div>
        </div>
    )
}

export default Header