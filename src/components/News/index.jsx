import React from 'react'
import formatDate from '../../utils/formatDate'

const LargeNews = ({ img, category, title, url, publishedAt, author }) => {
  return (
    <article className='h-full w-full space-y-4'>
      <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
        {category}
      </p>
      <img src={img} alt={`image ${title}`} />
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <h2 className="text-sm md:text-2xl font-bold group-hover:text-gray-700 leading-tight transition-colors duration-200">
            {title}
          </h2>
        </a>
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
          `By ${author || "Anonymous"}`
        )}
      </p>
    </article>
  )
}

const News = ({ img, category, title, url, publishedAt, author }) => {
  return (
    <article className='h-full w-full space-y-4 flex flex-col-reverse md:flex-row md:items-center md:space-x-12'>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mt-4 mb-1 md:mt-0 md:mb-4">
          {category}
        </p>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <h2 className="text-sm md:text-2xl font-bold group-hover:text-gray-700 leading-tight transition-colors duration-200">
              {title}
            </h2>
          </a>
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
            `By ${author || "Anonymous"}`
          )}
        </p>
      </div>
      <img src={img} alt={`image ${title}`} className='object-cover object-center w-full md:w-[200px] h-[150px]' />
    </article>
  )
}

export { LargeNews, News }