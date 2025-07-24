import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

const NewsSectionError = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-6 max-w-md">
          {error}
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  )
}

export default NewsSectionError;