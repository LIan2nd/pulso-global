import React from 'react'
import Skeleton from 'react-loading-skeleton'

const HeroLoading = () => {
  return (
    <section
      id='hero'
      className='h-screen bg-gray-900 text-white relative flex items-center justify-center'
    >
      <div className='relative w-full h-full flex flex-col justify-center p-8 md:p-16 lg:p-24'>
        <div className="max-w-4xl space-y-6">
          <article>
            <Skeleton height={10} />
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <Skeleton count={2} height={60} />
            </h1>
            <p className="mt-4 text-gray-200 text-sm">
              <Skeleton width={200} />
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default HeroLoading