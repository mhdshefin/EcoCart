import React from 'react'
import { ClipLoader } from 'react-spinners'

const Spinner = () => {

    const cssofspinner = {
        borderWidth: "4px",
    }

    return (
        <div className='w-full h-screen bg-[#f1f1f191] flex items-center justify-center fixed z-50 top-0 left-0 p-0 m-0'>
            <ClipLoader color="gray" size={window.innerWidth > 400 ? 100 : 80} cssOverride={cssofspinner} />
        </div>)
}

export default Spinner