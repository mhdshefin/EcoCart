import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import Footer from '../Components/Footer'

const Contact = () => {
  return (
    <div className='bg-white'>

      <div className='text-center text-2xl pt-28 border-t'>
        <Title name={"Contact Us"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center px-5 gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] rounded-md' src={assets.contact_img} alt="" />

      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl text-gray-600'>Our Store</p>
        <p className='text-gray-500'>76087 Willms Station <br /> Suite 350, Washington , USA</p>
        <p className='text-gray-500'>Tel: (415) 555-1234 <br /> Email: Forever@gmail.com </p>
        <p className='font-semibold text-xl text-gray-600'>Careers At Forever</p>
        <p className='text-gray-500'>Learn more about our team and job openings.</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact