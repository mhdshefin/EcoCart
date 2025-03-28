import React from 'react'

const Title = ({ name }) => {
    return (
        <div className='w-full flex items-center justify-center text-gray-700 md:text-4xl text-2xl font-semibold gap-2'>
            <h1>{name}</h1>
        </div>
    )
}

export default Title