import React, { useEffect, useState } from 'react';
import { GetEverythingNews, GetTopHeadlines } from '../../_services/newsApi';
import formatDate from '../../utils/formatDate';
import 'react-loading-skeleton/dist/skeleton.css';
import HeroLoading from './loading';
import Error from './error';
import Empty from './empty';
import createSlug from '../../utils/createSlug';
import { Link } from 'react-router';

const Hero = ({ category = "general", q = "", everyting = false }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch either top headlines or everything based on prop
        const response = everyting
          ? await GetEverythingNews(q)
          : await GetTopHeadlines(category, q);

        // Filter out invalid or incomplete articles
        const filteredArticles = (response.articles || []).filter(article =>
          article &&
          article.title &&
          article.title !== '[Removed]' &&
          article.url &&
          article.urlToImage &&
          article.content
        );

        if (filteredArticles.length > 0) {
          setArticles(filteredArticles);
        } else {
          setArticles([]);
          setError("No articles found.");
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, q, everyting]);

  // Get the first article to feature
  const firstArticle = articles[0];

  // Handle loading state
  if (loading) return <HeroLoading />;

  // Handle error state
  if (error) return <Error err={error} />;

  // Handle no articles state
  if (!firstArticle) return <Empty />;

  // Destructure article data with fallbacks
  const {
    author = 'Unknown Author',
    title = 'Untitled Article',
    url,
    urlToImage,
    publishedAt,
    content,
  } = firstArticle;

  // Generate URL slug and background style
  const detailUrl = createSlug(title);
  const backgroundImage = urlToImage
    ? `url(${urlToImage})`
    : `linear-gradient(to right, #111, #333)`;

  return (
    <section
      id="hero"
      className="h-screen bg-cover bg-center text-white relative"
      style={{
        backgroundImage: backgroundImage,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      aria-label="Featured news article"
    >
      {/* Dark overlay for better text contrast */}
      <div
        className="absolute inset-0 w-full h-full bg-black/40"
        aria-hidden="true"
      />

      <div className="relative w-full h-full flex flex-col justify-center p-8 md:p-16 lg:p-24">
        <div className="max-w-4xl space-y-6">
          <article>
            {/* Category label */}
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
              {category}
            </p>

            {/* Article title link */}
            <Link
              to={`/news/${detailUrl}`}
              rel="noopener noreferrer"
              className="block group"
              state={{
                article: {
                  urlToImage,
                  category,
                  title,
                  url,
                  detailUrl,
                  publishedAt,
                  author,
                  content
                }
              }}
            >
              <h1 className="text-3xl md:text-5xl font-bold group-hover:text-gray-200 leading-tight transition-colors duration-200">
                {title}
              </h1>
            </Link>

            {/* Article metadata */}
            <p className="mt-4 text-gray-200 text-sm">
              {publishedAt && (
                <>
                  {formatDate(publishedAt)} | By {author}
                </>
              )}
              {!publishedAt && `By ${author}`}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Hero;