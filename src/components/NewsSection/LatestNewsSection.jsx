import React, { useEffect, useState } from 'react';
import { GetEverythingNews } from '../../_services/newsApi';
import { LargeNews, News } from '../News';
import HeaderSection from './HeaderSection';
import NewsSectionError from './error';
import NewsSectionLoading from './loading';
import NewsSectionEmpty from './empty';
import createSlug from '../../utils/createSlug';

const LatestNewsSection = () => {
  // State management
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch latest news on component mount
  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GetEverythingNews();

        // Validate and filter articles
        const validArticles = response?.articles?.filter(article => (
          article?.title &&
          article.title !== '[Removed]' &&
          article.url &&
          article.urlToImage &&
          article.content
        )) || [];

        setLatestNews(validArticles);

        if (validArticles.length === 0) {
          setError('No recent articles found');
        }
      } catch (err) {
        console.error('News fetch error:', err);
        setError('Failed to load latest news. Please try again.');
        setLatestNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <section
      className="p-4 md:px-12 lg:px-32 lg:py-12 xl:py-24 xl:px-42"
      aria-label="Latest news section"
    >
      {/* Section Header */}
      <HeaderSection title="Latest News" />

      {/* Loading State */}
      {loading && <NewsSectionLoading />}

      {/* Error State */}
      {!loading && error && <NewsSectionError error={error} />}

      {/* Empty State */}
      {!loading && !error && latestNews.length === 0 && (
        <NewsSectionEmpty message="No latest articles available" />
      )}

      {/* News Content Grid */}
      {!loading && !error && latestNews.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Featured Article (Large) */}
          {latestNews[0] && (
            <div className="h-full w-full row-span-3">
              <LargeNews
                urlToImage={latestNews[0].urlToImage}
                title={latestNews[0].title}
                category="Latest"
                publishedAt={latestNews[0].publishedAt}
                detailUrl={createSlug(latestNews[0].title)}
                url={latestNews[0].url}
                author={latestNews[0].author}
                content={latestNews[0].content}
              />
            </div>
          )}

          {/* Secondary Articles List */}
          <div className="grid gap-4">
            {latestNews.slice(1).map((article, index) => (
              <div key={`${article.url}-${index}`}>
                <News
                  urlToImage={article.urlToImage}
                  title={article.title}
                  category="Latest"
                  publishedAt={article.publishedAt}
                  detailUrl={createSlug(article.title)}
                  url={article.url}
                  author={article.author}
                  content={article.content}
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