import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import { GetTopHeadlines } from '../../_services/newsApi';
import { Article } from '../News';
import NewsSectionLoading from './loading';
import NewsSectionError from './error';
import NewsSectionEmpty from './empty';
import createSlug from '../../utils/createSlug';
import PaginationSection from './PaginationSection';

const NewsSection = ({ category = "general" }) => {
  // State management
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Configuration
  const articlesPerPage = 8;

  // Fetch news data when category changes
  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GetTopHeadlines(category);

        // Filter out invalid articles
        const validArticles = response?.articles?.filter(article => (
          article?.title &&
          article.title !== '[Removed]' &&
          article.url &&
          article.urlToImage &&
          article.content
        )) || [];

        setNews(validArticles);

        if (validArticles.length === 0) {
          setError("No articles found for this category.");
        }
      } catch (err) {
        console.error("News fetch error:", err);
        setError("Failed to load articles. Please try again.");
      } finally {
        setLoading(false);
        setCurrentPage(1); // Reset to first page on new data
      }
    };

    fetchNewsData();
  }, [category]);

  // Calculate pagination values
  const totalPages = Math.ceil(news.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = news.slice(startIndex, startIndex + articlesPerPage);

  /**
   * Handles page changes with smooth scroll to top of section
   * @param {number} page - The page number to navigate to
   */
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const articlesSection = document.getElementById('articles');
      articlesSection?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="articles"
      className="p-4 md:px-12 lg:px-32 lg:py-12 xl:py-24 xl:px-42"
      aria-label={`${category} news section`}
    >
      {/* Section Header */}
      <HeaderSection title={category} />

      {/* Loading State */}
      {loading && <NewsSectionLoading />}

      {/* Error State */}
      {!loading && error && <NewsSectionError error={error} />}

      {/* Empty State */}
      {!loading && !error && news.length === 0 && (
        <NewsSectionEmpty message={`No ${category} articles found`} />
      )}

      {/* Articles Grid */}
      {!loading && !error && currentArticles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentArticles.map((article, index) => (
              <Article
                key={`${article.url}-${index}`}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <PaginationSection
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </section>
  );
};

export default NewsSection;