import React from 'react'
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='w-full p-12 flex items-center justify-between shadow-xl'>
      <p className='text-md text-black/60'>&copy; Alfian Nur Usyaid. All right reserved</p>
      <ul className='flex gap-4 items-center'>
        <li>
          <a className='text-xl text-black/70' href="https://github.com/LIan2nd" target='_blank'><BsGithub /></a>
        </li>
        <li>
          <a className='text-xl text-black/70' href="https://www.linkedin.com/in/alfian-nur-usyaid/" target='_blank'><BsLinkedin /></a>
        </li>
        <li>
          <a className='text-xl text-black/70' href="https://www.instagram.com/lforthissielu/" target='_blank'><BsInstagram /></a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;