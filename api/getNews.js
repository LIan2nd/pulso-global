import axios from 'axios';

// ❗ API key is fetched from server environment variables, not exposed to client
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

export default async function handler(request, response) {
  // Extract parameters (category, q, etc.) from frontend request
  const { endpoint, ...params } = request.query;

  // Validate the requested endpoint
  if (endpoint !== 'top-headlines' && endpoint !== 'everything') {
    return response.status(400).json({ error: 'Invalid endpoint' });
  }

  try {
    // Make request to NewsAPI with proper error handling
    const apiResponse = await axios.get(`${NEWS_API_URL}/${endpoint}`, {
      params: {
        ...params, // Forward all frontend parameters
        apiKey: API_KEY, // ✅ Securely add API key on backend
      },
      timeout: 5000, // Set timeout to prevent hanging requests
    });

    // Return filtered data to frontend
    const filteredArticles = apiResponse.data.articles.filter(article => (
      article?.title &&
      article.title !== '[Removed]' &&
      article.url &&
      article.urlToImage &&
      article.content
    ));

    response.status(200).json({
      ...apiResponse.data,
      articles: filteredArticles,
    });

  } catch (error) {
    console.error('NewsAPI proxy error:', error.response?.data || error.message);

    // Return appropriate error response
    const statusCode = error.response?.status || 500;
    response.status(statusCode).json({
      error: 'Failed to fetch news data',
      details: statusCode === 426
        ? 'Upgrade required: Browser requests not allowed on current plan'
        : error.response?.data || error.message,
    });
  }
}