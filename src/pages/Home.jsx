import React from 'react'
import Hero from '../components/Hero';
import LatestNewsSection from '../components/NewsSection/LatestNewsSection';

const Home = () => {
  return (
    <>
      <Hero category={'general'} />
      <LatestNewsSection />
    </>
  )
}

export default Home;