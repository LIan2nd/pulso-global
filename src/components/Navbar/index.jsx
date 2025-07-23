import React, { useState } from 'react'
import { Link } from 'react-router'
import { FaMagnifyingGlass } from "react-icons/fa6";
import Logo from '../../assets/logo.png'

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const toggleOpenSearch = () => {
    setOpenSearch(!openSearch);
  }

  return (
    <header className='absolute top-0 left-0 w-full bg-transparent p-12 text-white z-50'>
      <nav className='flex justify-between items-center'>
        <img src={Logo} alt="Logo Pulso Global" width={'100px'} height={'90px'} draggable='false' />
        <ul className='flex items-center gap-6'>
          <li><Link to='/business'>Business</Link></li>
          <li><Link to='/technology'>Technology</Link></li>
          <Link to='/'><h1 className='text-5xl font-bold text-center mx-4'>Pulso<br />Global</h1></Link>
          <li><Link to='/health'>Health</Link></li>
          <li><Link to='science'>Science</Link></li>
        </ul>
        <div className='flex items-center justify-end gap-8'>
          <button>Log In</button>
          <form className={`border-b-1 flex transition-all delay-75 py-1 ${openSearch ? 'w-42' : 'w-0'} gap-2 items-center`}>
            <input type="text" placeholder='Search' className='border-0 focus:outline-0 w-full' />
            <button type={'button'} className='cursor-pointer' onClick={toggleOpenSearch}>
              <FaMagnifyingGlass />
            </button>
          </form>
        </div>
      </nav>
    </header>
  )
}

export default Navbar