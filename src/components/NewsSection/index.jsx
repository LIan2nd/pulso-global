import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import { GetTopHeadlines } from '../../_services/newsApi';
import { Article } from '../News';
import NewsSectionLoading from './loading';
import NewsSectionError from './error';
import NewsSectionEmpty from './empty';
import createSlug from '../../utils/createSlug';
import PaginationSection from './PaginationSection';

const NewsSection = ({ category }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 8;

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
          const filteredArticles = response.articles.filter(article =>
            article &&
            article.title &&
            article.title !== '[Removed]' &&
            article.url &&
            article.urlToImage !== null &&
            article.content !== null
          );
          setNews(filteredArticles);
        } else {
          setNews([]);
          setError("No articles found for this category.");
        }
      } catch (err) {
        console.error("Failed to fetch headline:", err);
        setError("Failed to load headlines. Please try again.");
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    fetchData();
  }, [category]);

  const totalPages = Math.ceil(news.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = news.slice(startIndex, startIndex + articlesPerPage);

  return (
    <section className='p-4 md:px-12 lg:px-32 lg:py-12 xl:py-24 xl:px-42' id='articles'>
      <HeaderSection title={category} />

      {/* Loading State */}
      {loading && <NewsSectionLoading />}

      {/* Error State */}
      {!loading && error && <NewsSectionError error={error} />}

      {/* Empty State */}
      {!loading && !error && news.length === 0 && <NewsSectionEmpty />}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {!loading && !error && currentArticles.length > 0 && currentArticles.map((n, i) => (
          <Article
            key={i}
            urlToImage={n.urlToImage}
            title={n.title}
            category={category}
            detailUrl={createSlug(n.title)}
            url={n.url}
            publishedAt={n.publishedAt}
            author={n.author}
            content={n.content}
          />
        ))}
      </div>

      {/* Pagination */}
      {!loading && !error && news.length > 0 && (
        <PaginationSection
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) {
              const articlesSection = document.querySelector('#articles');
              setCurrentPage(page);
              articlesSection.scrollIntoView({ block: "start", behavior: 'smooth' }); // scroll ke atas saat ganti halaman
            }
          }}
        />
      )}
    </section>
  );
};

export default NewsSection;
