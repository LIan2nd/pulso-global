import React from 'react'
import Hero from '../components/Hero';
import LatestNewsSection from '../components/NewsSection/LatestNewsSection';
import CategoryNewsSection from '../components/NewsSection/CategoryNewsSection';

const Home = () => {
  return (
    <>
      <Hero category={'general'} />
      <LatestNewsSection />
      <CategoryNewsSection category={'business'} link={'/business'} />
      <CategoryNewsSection category={'technology'} link={'/technology'} />
      <CategoryNewsSection category={'health'} link={'/health'} />
      <CategoryNewsSection category={'science'} link={'/science'} />
    </>
  )
}

export default Home;