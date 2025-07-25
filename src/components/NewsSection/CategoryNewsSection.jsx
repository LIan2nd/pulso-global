import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import { Article } from '../News';
import { GetTopHeadlines } from '../../_services/newsApi';
import NewsSectionLoading from './loading';
import NewsSectionError from './error';
import NewsSectionEmpty from './empty';
import createSlug from '../../utils/createSlug';

const CategoryNewsSection = ({ category = "general", link }) => {
  // State management for news data, loading, and errors
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data when component mounts or category changes
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch top headlines for the specified category
        const response = await GetTopHeadlines(category);

        // Filter out invalid or incomplete articles
        const validArticles = response?.articles?.filter(article => (
          article?.title &&
          article.title !== '[Removed]' &&
          article.url &&
          article.urlToImage &&
          article.content
        )) || [];

        setNews(validArticles);
      } catch (err) {
        console.error('News fetch error:', err);
        setError('Failed to load news. Please try again later.');
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <section className="p-4 md:px-12 lg:px-32 lg:py-12 xl:py-24 xl:px-42">
      {/* Section Header with title and "View All" link */}
      <HeaderSection title={category} link={link} />

      {/* Loading State */}
      {loading && <NewsSectionLoading />}

      {/* Error State */}
      {!loading && error && <NewsSectionError error={error} />}

      {/* Empty State */}
      {!loading && !error && news.length === 0 && <NewsSectionEmpty />}

      {/* Articles Grid - Only shows when data is loaded */}
      {!loading && !error && news.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {news.slice(1, 5).map((article, index) => (
            <Article
              key={`${article.url}-${index}`}  // Unique key for React reconciliation
              urlToImage={article.urlToImage}
              title={article.title}
              category={category}
              detailUrl={createSlug(article.title)}
              url={article.url}
              publishedAt={article.publishedAt}
              author={article.author}
              content={article.content}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryNewsSection;