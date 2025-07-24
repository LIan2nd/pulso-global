import React from 'react';
import { Link, useLocation } from 'react-router';
import formatDate from '../../utils/formatDate';
import { FaArrowLeft, FaUser, FaCalendar, FaArrowUpRightFromSquare } from "react-icons/fa6";

const Detail = () => {
  const location = useLocation();
  // Gunakan hook useLocation untuk mengakses state yang dikirim 
  const { article } = location.state || {}; // Ambil objek artikel dari state 

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Artikel tidak ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Data artikel tidak tersedia. Mungkin Anda mengakses URL ini secara langsung.
            </p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    category = 'News',
    url,
    urlToImage,
    publishedAt,
    content,
    author = 'Unknown Author',
    description
  } = article;

  return (
    <>
      {/* Hero Section - Similar to Hero component */}
      <section
        className='h-screen bg-cover bg-center text-white relative'
        style={{
          backgroundImage: `url(${urlToImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 w-full h-full bg-black/50' aria-hidden="true"></div>

        {/* Back Button */}

        <div className='relative w-full h-full flex flex-col justify-center p-8 md:p-16 lg:p-24'>
          <div className="max-w-4xl space-y-6">
            <article>

              {/* Category badge */}
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-500 rounded-md mb-4">
                {category}
              </p>

              {/* Article title */}
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                {title}
              </h1>

              {/* Article description */}
              {description && (
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 font-light">
                  {description}
                </p>
              )}

              {/* Article metadata */}
              <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm">
                {publishedAt && (
                  <span className="flex items-center gap-2">
                    <FaCalendar />
                    {formatDate(publishedAt)}
                  </span>
                )}
                <span className="text-gray-400">|</span>
                <span className="flex items-center gap-2">
                  <FaUser />
                  By {author || "Unknown Author"}
                </span>
                {url && (
                  <>
                    <span className="text-gray-400">|</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                    >
                      <FaArrowUpRightFromSquare />
                      Read Original
                    </a>
                  </>
                )}
              </div>
              <button
                onClick={() => window.history.back()}
                className="bg-black/30 mt-4 cursor-pointer backdrop-blur-sm hover:bg-black/50 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 inline-flex items-center gap-2 border border-white/20"
              >
                <FaArrowLeft />
                Back
              </button>
            </article>
          </div>
        </div>
      </section >

      {/* Article Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="prose prose-lg max-w-none">
            {content ? (
              <div className="space-y-6">
                <div className="text-gray-800 leading-relaxed">
                  {content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4 text-lg leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-6">
                  <p className="text-gray-600 text-lg mb-4">
                    Full article content is not available in this preview.
                  </p>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Read Full Article
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Article Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
              <Link
                to="/"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Detail;