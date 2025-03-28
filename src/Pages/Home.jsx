import React from 'react'
import Header from '../Components/Header'
import Category from '../Components/Category'
import Topoffers from '../Components/Topoffers'
import Bestsellers from '../Components/Bestsellers'
import Topfashiondeals from '../Components/Topfashiondeals'
import PremiumPick from '../Components/PremiumPick'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className='pt-20'>
        <Header/>
        <Category/>
        <Topoffers/>
        <Bestsellers/>
        <Topfashiondeals/>
        <PremiumPick/>
        <div className='mt-[-4vh] md:mt-0'>
        <Footer/>
        </div>
    </div>
  )
}

export default Home