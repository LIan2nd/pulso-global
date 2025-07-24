import React from 'react'
import { Link } from 'react-router';
import { FaArrowRightLong } from "react-icons/fa6";

const HeaderSection = ({ title, link }) => {
  return (
    <div className='flex items-center gap-4 mb-12'>
      <h2 className='uppercase text-3xl md:text-4xl lg:text-5xl text-wrap md:text-nowrap'>{title}</h2>
      <div className='h-[3px] bg-black w-full' aria-hidden='true'></div>
      {!!link && (
        <Link to='business' className='text-purple-500 text-wrap sm:text-nowrap flex items-center gap-2'>Read more <FaArrowRightLong /></Link>
      )}
    </div>
  )
}

export default HeaderSection;