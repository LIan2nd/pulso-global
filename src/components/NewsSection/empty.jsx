import React from 'react'

const NewsSectionEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Latest News Available
        </h3>
        <p className="text-gray-500 mb-6 max-w-md">
          We couldn't find any latest news articles at the moment. Please check back later or try refreshing the page.
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
      >
        Refresh
      </button>
    </div>
  )
}

export default NewsSectionEmpty;