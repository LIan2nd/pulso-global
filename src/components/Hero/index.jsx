import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TopHeadlines } from '../../_services/newsApi';
import formatDate from '../../utils/formatDate';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
        const response = await TopHeadlines(category);
        if (response.articles && response.articles.length > 0) {
          setArticles(response.articles);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Failed to fetch headline:", err);
        setError("Gagal memuat berita utama. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const firstArticle = articles[0] || {};

  const { author, urlToImage, title, publishedAt, url } = firstArticle;

  return (
    <section
      id='hero'
      className='h-[80vh] bg-cover bg-center text-white relative'
      style={{ backgroundImage: `url(${urlToImage})` }}>
      <div className='absolute inset-0 w-full h-full backdrop-brightness-[0.3]' aria-hidden="true"></div>
      <div className='relative w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24'>
        <div className="max-w-4xl space-y-6">
          <article>
            <p className="text-sm font-semibold uppercase tracking-wider bg-red-600 px-3 py-1 inline-block rounded-md mb-4">
              {loading ? <Skeleton /> : category}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight transition-colors duration-200">
              {title || <Skeleton count={2} />}
            </h1>
            <p className="mt-4 text-gray-200 text-sm">
              {publishedAt ? `${formatDate(publishedAt)} | By ${author}` : <Skeleton />}
            </p>
          </article>
          <a href={url} className='hover:text-gray-300'>{loading ? <Skeleton /> : 'Read More'}</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;