import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
  return (
    <>
      <main className='bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6 text-center min-h-screen' >
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout;