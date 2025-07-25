import React, { useEffect, useState } from 'react';
import { GetEverythingNews, GetTopHeadlines } from '../../_services/newsApi';
import formatDate from '../../utils/formatDate';
import 'react-loading-skeleton/dist/skeleton.css';
import HeroLoading from './loading';
import Error from './error';
import Empty from './empty';
import createSlug from '../../utils/createSlug';
import { Link } from 'react-router';

const Hero = ({ category, q, everyting }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  category = category || "general";
  q = q || "";

  useEffect(() => {
    if (!category) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response
        if (!everyting) {
          response = await GetTopHeadlines(category, q);
        } else {
          response = await GetEverythingNews(q);
        }
        if (response.articles && response.articles.length > 0) {
          const filteredArticles = response.articles.filter(article =>
            article &&
            article.title &&
            article.title !== '[Removed]' &&
            article.url &&
            article.urlToImage !== null &&
            article.content !== null
          );
          setArticles(filteredArticles);
        } else {
          setArticles([]);
          setError("No articles found.");
        }
      } catch (err) {
        console.error("Failed to fetch headline:", err);
        setError("Failed to load headlines. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, q]);

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
    url,
    urlToImage,
    publishedAt,
    content,
  } = firstArticle;

  const detailUrl = createSlug(title);
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

            <Link
              to={`/news/${detailUrl}`}
              rel="noopener noreferrer"
              className="block group"
              state={{ article: { urlToImage, category, title, url, detailUrl, publishedAt, author, content } }}
            >
              <h1 className="text-3xl md:text-5xl font-bold group-hover:text-gray-200 leading-tight transition-colors duration-200">
                {title}
              </h1>
            </Link>

            <p className="mt-4 text-gray-200 text-sm">
              {publishedAt ? (
                <>
                  {formatDate(publishedAt)} | By {author || "Unknown Author"}
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