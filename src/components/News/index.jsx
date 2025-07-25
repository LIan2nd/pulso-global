import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

// Shared Article Content Component to reduce duplication
const ArticleContent = ({
  title,
  url,
  detailUrl,
  publishedAt,
  author,
  urlToImage,
  category,
  content,
  titleSize = "text-xl"
}) => {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-2">
        {category || 'General'}
      </p>

      {url ? (
        <Link
          to={`/news/${detailUrl}`}
          rel="noopener noreferrer"
          className="block group"
          state={{ article: { urlToImage, category, title, url, publishedAt, author, content } }}
        >
          <h2 className={`${titleSize} font-bold group-hover:text-gray-700 leading-tight transition-colors duration-200 mb-3`}>
            {title}
          </h2>
        </Link>
      ) : (
        <h2 className={`${titleSize} font-bold leading-tight mb-3`}>
          {title}
        </h2>
      )}

      <p className="text-gray-600 text-sm">
        {publishedAt ? (
          <>
            {formatDate(publishedAt)} • By {author || "Anonymous"}
          </>
        ) : (
          `By ${author || "Anonymous"}`
        )}
      </p>
    </>
  );
};

// Large Featured News Article
export const LargeNews = ({
  urlToImage,
  category,
  title,
  url,
  publishedAt,
  author,
  content,
  detailUrl
}) => (
  <article className='w-full space-y-4 p-8 bg-gray-50 shadow-lg rounded-lg overflow-hidden'>
    {urlToImage && (
      <img
        src={urlToImage}
        alt={title}
        className='w-full h-64 object-cover rounded-lg mb-4'
        loading='lazy'
      />
    )}
    <ArticleContent
      title={title}
      url={url}
      detailUrl={detailUrl}
      publishedAt={publishedAt}
      author={author}
      urlToImage={urlToImage}
      category={category}
      content={content}
      titleSize="text-xl md:text-2xl"
    />
  </article>
);

// Horizontal News Article
export const News = ({
  urlToImage,
  category,
  title,
  url,
  publishedAt,
  author,
  content,
  detailUrl
}) => (
  <article className='h-full w-full flex flex-col md:flex-row bg-gray-50 shadow-lg rounded-lg overflow-hidden'>
    <div className='p-6 flex-1'>
      <ArticleContent
        title={title}
        url={url}
        detailUrl={detailUrl}
        publishedAt={publishedAt}
        author={author}
        urlToImage={urlToImage}
        category={category}
        content={content}
        titleSize="text-xl md:text-2xl"
      />
    </div>

    {urlToImage && (
      <div className='md:w-64 flex-shrink-0'>
        <img
          src={urlToImage}
          alt={title}
          className='w-full h-full object-cover'
          loading='lazy'
        />
      </div>
    )}
  </article>
);

// Standard Article Card
export const Article = ({
  urlToImage,
  category,
  title,
  url,
  publishedAt,
  author,
  content,
  detailUrl
}) => (
  <article className='h-full w-full bg-gray-50 shadow-lg rounded-lg overflow-hidden'>
    {urlToImage && (
      <img
        src={urlToImage}
        alt={title}
        className='w-full h-48 object-cover'
        loading='lazy'
      />
    )}

    <div className='p-6'>
      <ArticleContent
        title={title}
        url={url}
        detailUrl={detailUrl}
        publishedAt={publishedAt}
        author={author}
        urlToImage={urlToImage}
        category={category}
        content={content}
        titleSize="text-lg md:text-xl"
      />
    </div>
  </article>
);