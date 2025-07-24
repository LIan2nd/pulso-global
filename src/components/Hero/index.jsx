import React, { useEffect, useState } from 'react';
import { GetTopHeadlines } from '../../_services/newsApi';
import formatDate from '../../utils/formatDate';
import 'react-loading-skeleton/dist/skeleton.css';
import HeroLoading from './loading';
import Error from './error';
import Empty from './empty';

const Hero = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetTopHeadlines(category);
        if (response.articles && response.articles.length > 0) {
          setArticles(response.articles);
        } else {
          setArticles([]);
          setError("No articles found for this category.");
        }
      } catch (err) {
        console.error("Failed to fetch headline:", err);
        setError("Failed to load headlines. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const firstArticle = articles.length > 0 ? articles[0] : null;

  // Handle loading state
  if (loading) {
    return (
      <HeroLoading />
    );
  }

  // Handle error state
  if (error) {
    return (
      <Error err={error} />
    );
  }

  // Handle no article state
  if (!firstArticle) {
    return (
      <Empty />
    );
  }

  // Destructure
  const {
    author = 'Unknown Author',
    title = 'Untitled Article',
    urlToImage,
    publishedAt,
    url
  } = firstArticle;

  const backgroundImage = urlToImage
    ? `url(${urlToImage})`
    : `linear-gradient(to right, #111, #333)`;

  return (
    <section
      id='hero'
      className='h-screen bg-cover bg-center text-white relative'
      style={{
        backgroundImage: backgroundImage,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className='absolute inset-0 w-full h-full bg-black/40' aria-hidden="true"></div>

      <div className='relative w-full h-full flex flex-col justify-center p-8 md:p-16 lg:p-24'>
        <div className="max-w-4xl space-y-6">
          <article>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
              {category}
            </p>

            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <h1 className="text-3xl md:text-5xl font-bold group-hover:text-gray-200 leading-tight transition-colors duration-200">
                  {title}
                </h1>
              </a>
            ) : (
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {title}
              </h1>
            )}

            <p className="mt-4 text-gray-200 text-sm">
              {publishedAt ? (
                <>
                  {formatDate(publishedAt)} | By {author}
                </>
              ) : (
                `By ${author}`
              )}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Hero;