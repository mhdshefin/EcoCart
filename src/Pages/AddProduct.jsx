import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddProductFashion from '../Components/addProductFashion'
import AddProductsElectronics from '../Components/addProductsElectronics'
import AddProductsFurnitures from '../Components/AddProductsFurnitures'
import AddProductsAppliances from '../Components/AddProductsAppliances'

const AddProduct = () => {

    const userRequest = useParams()

    return (
        <div className='w-full'>
            {
                userRequest.section.toLowerCase() === 'fashion' ?
                    <AddProductFashion /> :
                    userRequest.section.toLowerCase() === 'electronics' ?
                        <AddProductsElectronics /> :
                        userRequest.section.toLowerCase() === 'furniture' ?
                        <AddProductsFurnitures/>:
                        <AddProductsAppliances/>
            }
        </div>
    )
}

export default AddProduct