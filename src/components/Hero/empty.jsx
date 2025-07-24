import React from 'react'

const Empty = () => {
  return (
    <section
      id='hero'
      className='h-screen bg-gray-900 text-white relative flex items-center justify-center'
    >
      <div className='text-center space-y-4'>
        <h2 className='text-2xl font-bold'>No Articles Available</h2>
        <p className='text-gray-300'>There are no articles to display for this category.</p>
      </div>
    </section>
  )
}

export default Empty