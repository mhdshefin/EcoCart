import React from 'react'

const Categorytitles = ({name}) => {
    return (
        <div className='w-full flex items-center pl-2 justify-start text-gray-700 md:text-3xl text-2xl font-semibold gap-2 bg-white'>
            <h1>{name}</h1>
        </div>
    )
}

export default Categorytitles