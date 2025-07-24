import React from 'react'

const Error = ({ err }) => {
  return (
    <section
      id='hero'
      className='h-screen bg-gray-900 text-white relative flex items-center justify-center'
    >
      <div className='text-center space-y-4'>
        <h2 className='text-2xl font-bold text-red-400'>Oops! Something went wrong</h2>
        <p className='text-gray-300'>{err}</p>
        <button
          onClick={() => window.location.reload()}
          className='bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition-colors duration-200'
        >
          Try Again
        </button>
      </div>
    </section>
  )
}

export default Error