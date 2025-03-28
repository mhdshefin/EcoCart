import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Category from './Pages/Category'
import Footer from './Components/Footer'
import Collection from './Pages/Collection'
import Product from './Pages/Product'
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Placeorder from './Pages/Placeorder'
import Login from './Pages/Login'
import Rating from './Pages/rating'
import Account from './Pages/account'
import { ToastContainer } from 'react-toastify'
import Admin from './Pages/Admin'
import NavbarAdmin from './Components/NavbarAdmin'
import Add from './Pages/Add'
import AddProduct from './Pages/AddProduct'
import AdminLogin from './Pages/AdminLogin'
import List from './Pages/List'
import Verify from './Pages/Verify'
import Order from './Pages/Order'
import AdminOrder from './Pages/AdminOrder'
import PLaceOrdersSingle from './Pages/PLaceOrdersSingle'
import { shopContext } from './Context/ShopContext'
import Spinner from './Components/Spinner'

const App = () => {

  const { loading } = useContext(shopContext)
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }

  }, [loading])

  return (
    <>
      <div className='w-full'>
        {
          loading ? <Spinner /> : <></>
        }
        {
          window.location.pathname !== '/admin' && window.location.pathname !== '/add' && window.location.pathname !== '/add/:section' && window.location.pathname !== '/list' && window.location.pathname !== '/order' ?
            <Navbar /> : <NavbarAdmin />
        }
      </div>
      <ToastContainer />
      <div className={`px-0 md:px-4 ${window.location.pathname === '/collection' || '/admin' ? 'bg-white' : 'bg-[#f1f3f6]'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:sectionId' element={<Category />} />
          <Route path='/collection/:sectionId/:category/:subCategory' element={<Collection />} />
          <Route path='/product/:section/:productId' element={<Product />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/placeorder' element={<Placeorder />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={<Account />} />
          <Route path='/rating/:id' element={<Rating />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/list' element={<List />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/add' element={<Add />} />
          <Route path='/add/:section' element={<AddProduct />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/order' element={<AdminOrder />} />
          <Route path='/place/:id/:size' element={<PLaceOrdersSingle />} />
        </Routes>
      </div>
      {
        window.location.pathname === '/collection' && <Footer />
      }

    </>
  )
}

export default App