import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-red-500 text-6xl mb-4 flex justify-center">
          <FaExclamationTriangle className="animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4">404</h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Maybe try one of these instead:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Home
          </Link>
          <Link
            to="/business"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Business News
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl max-w-md">
          <p className="text-gray-300 mb-4">
            Looking for something specific?
          </p>
          <form
            onSubmit={handleSearchSubmit}
            className='flex gap-2'
          >
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors duration-200">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotFound;