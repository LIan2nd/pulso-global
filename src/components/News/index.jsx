import React from 'react'
import formatDate from '../../utils/formatDate'
import { Link } from 'react-router'

const LargeNews = ({ urlToImage, category, title, url, publishedAt, author, content, detailUrl }) => {
  return (
    <article className='w-full space-y-4 p-8 bg-gray-50 shadow-lg'>
      <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
        {category}
      </p>
      <img src={urlToImage} alt={`image ${title}`} />
      {url ? (
        <Link
          to={`/news/${detailUrl}`}
          rel="noopener noreferrer"
          className="block group"
          state={{ article: { urlToImage, category, title, url, publishedAt, author, content } }}
        >
          <h2 className="text-xl md:text-2xl font-bold group-hover:text-gray-700 leading-tight transition-colors duration-200">
            {title}
          </h2>
        </Link>
      ) : (
        <h2 className="text-xl md:text-2xl font-bold leading-tight">
          {title}
        </h2>
      )}

      <p className="mt-4 text-gray-800 text-sm">
        {publishedAt ? (
          <>
            {formatDate(publishedAt)} | By {author || "Anonymous"}
          </>
        ) : (
          `By ${author || "Anonymous"}`
        )}
      </p>
    </article>
  )
}

const News = ({ urlToImage, category, title, url, publishedAt, author, content, detailUrl }) => {
  return (
    <article className='h-full w-full space-y-4 flex flex-col-reverse md:flex-row md:justify-between md:items-center md:space-x-12 bg-gray-50 shadow-lg'>
      <div className='p-4'>
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mt-4 mb-1 md:mt-0 md:mb-4">
          {category}
        </p>
        {url ? (
          <Link
            to={`/news/${detailUrl}`}
            rel="noopener noreferrer"
            className="block group"
            state={{ article: { urlToImage, category, title, url, publishedAt, author, content } }}
          >
            <h2 className="text-xl md:text-2xl font-bold group-hover:text-gray-700 leading-tight transition-colors duration-200">
              {title}
            </h2>
          </Link>
        ) : (
          <h2 className="text-xl md:text-2xl font-bold leading-tight">
            {title}
          </h2>
        )}

        <p className="mt-4 text-gray-800 text-sm">
          {publishedAt ? (
            <>
              {formatDate(publishedAt)} | By {author || "Anonymous"}
            </>
          ) : (
            `By ${author || "Unknown Author"}`
          )}
        </p>
      </div>
      <img src={urlToImage} alt={`image ${title}`} className='object-cover object-center w-full md:w-[200px] h-full' />
    </article>
  )
}

const Article = ({ urlToImage, category, title, url, publishedAt, author, content, detailUrl }) => {
  return (
    <article className='h-full w-full space-y-4 bg-gray-50 shadow-lg'>
      <img src={urlToImage} alt={`image ${title}`} className='object-cover object-center w-full h-[250px]' />
      <div className='p-6'>
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mt-4 mb-1 md:mt-0 md:mb-4">
          {category}
        </p>
        {url ? (
          <Link
            to={`/news/${detailUrl}`}
            rel="noopener noreferrer"
            className="block group"
            state={{ article: { urlToImage, category, title, url, publishedAt, author, content } }}
          >
            <h2 className="text-sm md:text-2xl font-bold group-hover:text-gray-700 leading-tight transition-colors duration-200">
              {title}
            </h2>
          </Link>
        ) : (
          <h2 className="text-sm md:text-2xl font-bold leading-tight">
            {title}
          </h2>
        )}

        <p className="mt-4 text-gray-800 text-sm">
          {publishedAt ? (
            <>
              {formatDate(publishedAt)} | By {author || "Anonymous"}
            </>
          ) : (
            `By ${author || "Unknown Author"}`
          )}
        </p>
      </div>
    </article>
  );
}

export { LargeNews, News, Article }