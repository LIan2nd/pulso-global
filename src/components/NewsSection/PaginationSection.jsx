import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const PaginationSection = ({ currentPage, totalPages, onPageChange }) => {
  // Don't show pagination if only one page
  if (totalPages <= 1) return null;

  // Create array of page numbers [1, 2, 3, ...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle page change with boundary checks
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Page Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md transition-colors ${currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        aria-label="Previous page"
      >
        <FaArrowLeft />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${currentPage === page
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md transition-colors ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        aria-label="Next page"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default PaginationSection;