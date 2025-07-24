import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <main className='bg-gray-200'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default HomeLayout;