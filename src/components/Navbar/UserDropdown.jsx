import { useState, useRef, useEffect } from 'react';
import { FaArrowRightFromBracket, FaRegUser, FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserDropdown = ({ isAuthenticated, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => navigate('/login')}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 text-sm xl:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
        Log In
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
        aria-label="User menu"
      >
        <div className="relative">
          <FaUser />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm text-white">Signed in as</p>
            <p className="text-sm font-medium text-purple-400 truncate">
              {user.email}
            </p>
          </div>

          <button
            onClick={() => {
              navigate('/profile');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <FaRegUser />
              Your Profile
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <FaArrowRightFromBracket />
              Sign out
            </div>
          </button>
        </div >
      )}
    </div >
  );
};

export default UserDropdown;