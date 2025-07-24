import React from 'react'

const HeaderSection = ({ title }) => {
  return (
    <div className='flex items-center gap-4'>
      <h2 className='uppercase text-5xl text-nowrap'>{title}</h2>
      <div className='h-[3px] bg-black w-full' aria-hidden='true'></div>
    </div>
  )
}

export default HeaderSection;