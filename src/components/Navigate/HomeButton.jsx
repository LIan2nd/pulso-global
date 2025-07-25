import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router'

const HomeButton = () => {
  return (
    <div className='absolute top-8 left-8 z-20'>
      <Link
        to='/'
        className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 inline-flex items-center gap-2 border border-white/20"
      >
        <FaArrowLeft />
        Home
      </Link>
    </div>
  )
}

export default HomeButton