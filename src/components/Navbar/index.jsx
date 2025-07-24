import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Logo from '../../assets/logo.png';

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleOpenSearch = () => {
    setOpenSearch(!openSearch);
    if (!openSearch) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        if (openSearch && searchQuery === '') {
          setOpenSearch(false);
        }
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpenSearch(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openSearch, searchQuery]);

  const navigationLinks = [
    { to: '/business', label: 'Business' },
    { to: '/technology', label: 'Technology' },
    { to: '/health', label: 'Health' },
    { to: '/science', label: 'Science' },
  ];

  return (
    <header className='absolute top-0 left-0 w-full bg-transparent p-4 md:p-8 text-white z-50 border-b-1'>
      <nav className='flex justify-between items-center relative'>
        <div className='flex items-center'>
          <img
            src={Logo}
            alt="Logo Pulso Global"
            className='w-16 h-14 md:w-[100px] md:h-[90px]'
            draggable='false'
          />
        </div>

        <div className='hidden lg:flex items-center gap-6'>
          <ul className='flex items-center gap-6'>
            <li>
              <Link
                to='/business'
                className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
              >
                Business
              </Link>
            </li>
            <li>
              <Link
                to='/technology'
                className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
              >
                Technology
              </Link>
            </li>

            <Link to='/' className='mx-8'>
              <h1 className='text-3xl xl:text-5xl font-bold text-center leading-tight hover:text-gray-300 transition-colors duration-200'>
                Pulso<br />Global
              </h1>
            </Link>

            <li>
              <Link
                to='/health'
                className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
              >
                Health
              </Link>
            </li>
            <li>
              <Link
                to='/science'
                className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
              >
                Science
              </Link>
            </li>
          </ul>
        </div>

        <div className='lg:hidden flex-1 text-center'>
          <Link to='/'>
            <h1 className='text-2xl md:text-3xl font-bold leading-tight hover:text-gray-300 transition-colors duration-200'>
              Pulso<br />Global
            </h1>
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <button className='hidden md:block hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'>
            Log In
          </button>

          <div ref={searchRef} className={`relative transition-all duration-300 ease-in-out ${openSearch ? 'w-48 md:w-64' : 'w-10'
            }`}>
            <form
              onSubmit={handleSearchSubmit}
              className={`flex items-center transition-all duration-300 ease-in-out ${openSearch ? 'bg-white/20 backdrop-blur-md px-4 py-2 rounded-full' : ''
                }`}
            >
              {openSearch && (
                <input
                  type="text"
                  placeholder='Search articles...'
                  className='bg-transparent border-0 focus:outline-none w-full text-white placeholder-white/70 text-sm'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  ref={searchRef}
                />
              )}
              <button
                type={openSearch ? 'submit' : 'button'}
                className={`text-white cursor-pointer hover:scale-110 transition-transform ${openSearch ? 'ml-2' : ''
                  }`}
                onClick={!openSearch ? toggleOpenSearch : undefined}
              >
                <FaMagnifyingGlass className='text-sm md:text-base' />
              </button>
              {openSearch && (
                <button
                  type='button'
                  className='text-white/70 hover:text-white ml-2 transition-colors hover:scale-110'
                  onClick={() => {
                    setSearchQuery('');
                    if (searchQuery === '') {
                      setOpenSearch(false);
                    }
                  }}
                >
                  <FaTimes className='text-sm' />
                </button>
              )}
            </form>
          </div>

          <button
            className='lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors duration-200'
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <FaBars className='text-xl' />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className='lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40' onClick={closeMobileMenu} />
        )}

        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-50 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-xl font-bold'>Menu</h2>
              <button
                onClick={closeMobileMenu}
                className='p-2 hover:bg-white/10 rounded-md transition-colors duration-200'
                aria-label="Close mobile menu"
              >
                <FaTimes className='text-xl' />
              </button>
            </div>

            <nav className='space-y-6'>
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className='block text-lg font-medium hover:text-gray-300 transition-colors duration-200 py-2 border-b border-white/10'
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}

              <button
                className='block w-full text-left text-lg font-medium hover:text-gray-300 transition-colors duration-200 py-2 border-b border-white/10'
                onClick={closeMobileMenu}
              >
                Log In
              </button>
            </nav>

            <div className='mt-8 pt-6 '>
              <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4'>
                Quick Search
              </h3>
              <form onSubmit={handleSearchSubmit} className='flex gap-2'>
                <input
                  type="text"
                  placeholder='Search articles...'
                  className='flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none text-sm'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className='bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors duration-200'
                >
                  <FaMagnifyingGlass />
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;