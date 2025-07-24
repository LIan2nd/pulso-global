import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const PaginationSection = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='col-span-4 mt-12 flex gap-6 justify-center items-center'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-purple-500 disabled:opacity-50'
      >
        <FaArrowLeft />
      </button>

      <ul className='flex gap-4'>
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer py-2 px-4 rounded shadow-md
              ${currentPage === page ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800'}
            `}
          >
            {page}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-purple-500 disabled:opacity-50'
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default PaginationSection;
