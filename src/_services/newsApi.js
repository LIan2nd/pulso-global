// File: services/newsApi.js
import axios from 'axios';

// Configure axios instance with default settings
const API = axios.create({
  baseURL: '/api', // Points to your Vercel serverless function
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const GetTopHeadlines = async (category, q = '') => {
  try {
    const response = await API.get('/getNews', {
      params: {
        endpoint: 'top-headlines',
        category: category || 'general', // Default to general news
        q,
        pageSize: 20 // Limit number of results
      }
    });

    // Validate response structure
    if (!response.data?.articles) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch headlines:', error);

    // Throw user-friendly error
    const errorMessage = error.response?.data?.message ||
      error.message ||
      'Failed to load news headlines';
    throw new Error(errorMessage);
  }
};

const GetEverythingNews = async (query = 'latest', size = 4) => {
  try {
    const response = await API.get('/getNews', {
      params: {
        endpoint: 'everything',
        q: query,
        sortBy: 'publishedAt',
        pageSize: size,
        language: 'en' // Filter by English articles
      }
    });

    // Validate response structure
    if (!response.data?.articles) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch news:', error);

    // Throw user-friendly error
    const errorMessage = error.response?.data?.message ||
      error.message ||
      'Failed to load news articles';
    throw new Error(errorMessage);
  }
};

export { GetTopHeadlines, GetEverythingNews };