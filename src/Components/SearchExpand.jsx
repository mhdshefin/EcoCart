import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'

const SearchExpand = () => {

    const { setSearch, searchExpand, setSearchExpand } = useContext(shopContext)
    const [searches, setSearches] = useState([])

    useEffect(() => {
        const fetchSearches = localStorage.getItem('latestSearches')
        if (fetchSearches) {
            setSearches(JSON.parse(fetchSearches))
        }
    }, [])

    return searchExpand ? (
        <div onClick={() => setSearchExpand(false)} className='w-full bg-transparent'>

            <div className='full flex flex-col z-40 rounded-b-lg border-2 border-t-0 h-auto border-gray-200 pt-2 bg-white shadow-xl'>
                {
                    searches.length === 1 ?
                        <div onClick={() =>{ 
                            setSearch(searches[0])}}
                         className=' w-full border-b min-h-8 flex items-center justify-center pl-2 text-base text-gray-700'>
                            <p className='cursor-pointer'>{searches[0]}</p>
                        </div>
                        :
                        searches.map((item, index) => {
                            return (
                                <div onClick={() =>{ 
                                    setSearch(item)}} 
                                    key={index} className='hover:bg-gray-100 w-full min-h-10 border-b border-e-gray-100 flex items-center justify-start pl-2 text-base text-gray-800'>
                                    <p className='cursor-pointer'>{item}</p>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    ) :
        <></>
}

export default SearchExpand