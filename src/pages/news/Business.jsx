import React from 'react'
import Hero from '../../components/Hero';
import NewsSection from '../../components/NewsSection';

const category = 'business';
const Business = () => {
  return (
    <>
      <Hero category={category} />
      <NewsSection category={category} />
    </>
  )
}

export default Business;