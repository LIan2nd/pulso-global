import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000
});

/**
 * Format parameters to remove undefined or empty values.
 * This helps in avoiding unnecessary API calls with invalid parameters.
 */
const formatParams = (params) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
  );
};

export const GetTopHeadlines = async (category, q) => {
  try {
    const response = await API.get('/getNews', {
      params: formatParams({
        endpoint: 'top-headlines',
        category: category || 'general',
        q,
        pageSize: 20
      })
    });

    if (!response.data?.articles) {
      throw new Error('Invalid response structure');
    }

    return response.data;
  } catch (error) {
    console.error('News fetch error:', error);
    throw new Error(error.response?.data?.error || 'Failed to load headlines');
  }
};