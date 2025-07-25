import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import Hero from '../../components/Hero';
import NewsSectionLoading from '../../components/NewsSection/loading';
import NewsSectionError from '../../components/NewsSection/error';
import NewsSectionEmpty from '../../components/NewsSection/empty';
import PaginationSection from '../../components/NewsSection/PaginationSection';
import HeaderSection from '../../components/NewsSection/HeaderSection';
import { GetEverythingNews } from '../../_services/newsApi';
import { Article } from '../../components/News';
import createSlug from '../../utils/createSlug';

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  if (!q) {
    setLoading(false);
    return <Navigate to="/" replace />;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 8;
  const totalPages = Math.ceil(news.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = news.slice(startIndex, startIndex + articlesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetEverythingNews(q, 100);
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
          setError("No articles found for this keyword.");
        }
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles. Please try again.");
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    fetchData();
  }, [q]);

  return (
    <>
      <Hero q={q} everyting={true} />
      <section className='p-4 md:px-12 lg:px-32 lg:py-12 xl:py-24 xl:px-42' id='articles'>
        <HeaderSection title={q} />

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
                articlesSection.scrollIntoView({ block: "start", behavior: 'smooth' });
              }
            }}
          />
        )}
      </section>
    </>
  )
}

export default Search;