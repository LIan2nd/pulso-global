import React, { useEffect, useState } from 'react';
import { GetLatestNews } from '../../_services/newsApi';
import { LargeNews, News } from '../News';
import HeaderSection from './HeaderSection';
import { FaExclamationTriangle } from 'react-icons/fa';
import NewsSectionError from './error';
import NewsSectionLoading from './loading';
import NewsSectionEmpty from './empty';

const LatestNewsSection = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GetLatestNews();

        if (response && response.articles) {
          // Filter out articles with missing essential data
          const validArticles = response.articles.filter(article =>
            article &&
            article.title &&
            article.title !== '[Removed]' &&
            article.url
          );

          setLatestNews(validArticles);
        } else {
          setLatestNews([]);
        }
      } catch (err) {
        console.error('Failed to fetch latest news:', err);
        setError('Failed to load latest news. Please try again later.');
        setLatestNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='p-12 lg:p-32 xl:p-42'>
      <HeaderSection title={"Latest News"} />

      {/* Loading State */}
      {loading && <NewsSectionLoading />}

      {/* Error State */}
      {!loading && error && <NewsSectionError error={error} />}

      {/* Empty State */}
      {!loading && !error && latestNews.length === 0 && <NewsSectionEmpty />}

      {/* Success State - News Content */}
      {!loading && !error && latestNews.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 py-12">
          {/* Large News Article */}
          <div className="h-full w-full row-span-3">
            <LargeNews
              img={latestNews[0].urlToImage}
              title={latestNews[0].title}
              category={"Latest"}
              publishedAt={latestNews[0].publishedAt}
              url={latestNews[0].url}
              author={latestNews[0].author}
            />
          </div>

          {/* Smaller News Articles */}
          <div className='grid gap-4'>
            {latestNews.slice(1).map((news, i) => (
              <div key={`${news.url}-${i}`}>
                <News
                  img={news.urlToImage}
                  title={news.title}
                  category={"Latest"}
                  publishedAt={news.publishedAt}
                  url={news.url}
                  author={news.author}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestNewsSection;