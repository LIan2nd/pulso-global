import React, { useEffect, useState } from 'react'
import HeaderSection from './HeaderSection';
import { Article } from '../News';
import { GetTopHeadlines } from '../../_services/newsApi';
import NewsSectionLoading from './loading';
import NewsSectionError from './error';
import NewsSectionEmpty from './empty';
import createSlug from '../../utils/createSlug';

const CategoryNewsSection = ({ category, link }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GetTopHeadlines(category);

        if (response && response.articles) {
          // Filter out articles with missing essential data
          const validArticles = response.articles.filter(article =>
            article &&
            article.title &&
            article.title !== '[Removed]' &&
            article.url &&
            article.urlToImage !== null &&
            article.content !== null,
          );

          setNews(validArticles);
        } else {
          setNews([]);
        }
      } catch (err) {
        console.error('Failed to fetch latest news:', err);
        setError('Failed to load latest news. Please try again later.');
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className='p-4 md:px-12 lg:px-32 lg:py-12 xl:py-24 xl:px-42'>
      <HeaderSection title={category} link={link} />

      {/* Loading State */}
      {loading && <NewsSectionLoading />}

      {/* Error State */}
      {!loading && error && <NewsSectionError error={error} />}

      {/* Empty State */}
      {!loading && !error && news.length === 0 && <NewsSectionEmpty />}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {!loading && !error && news.length && (
          news.slice(1, 5).map((n, i) => {
            return (
              <Article key={i} urlToImage={n.urlToImage} title={n.title}
                category={category} detailUrl={createSlug(n.title)} url={n.url}
                publishedAt={n.publishedAt} author={n.author} content={n.content} />
            )
          })
        )}
      </div>
    </section>
  )
}

export default CategoryNewsSection;