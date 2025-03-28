import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import Footer from '../Components/Footer'

const About = () => {

    
    return (
        <div>
            <div className='bg-white md:px-36 px-5 pb-10'>

                <div className='text-2xl text-center pt-28 border-t'>
                    <Title name={"About Us"} />
                </div>
                <div className='my-10 flex flex-col md:flex-row gap-16'>
                    <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
                    <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                        <b className='text-gray-800'>Our Mission</b>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                </div>
                <div className='text-xl py-4'>
                    <Title name={'Why Choose Us'} />
                </div>
                <div className='flex flex-col md:flex-row text-sm mb-20'>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Quality Assurance </b>
                        <p className='text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Convenience </b>
                        <p className='text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Exceptional Customer Service</b>
                        <p className='text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                </div>
            </div>
            <div className='mt-[-6vh]'>
            <Footer />
            </div>
        </div>
    )
}

export default About