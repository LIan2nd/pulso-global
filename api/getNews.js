import axios from 'axios';

const API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

export default async function handler(req, res) {
  const { endpoint = 'top-headlines', ...params } = req.query;

  if (!['top-headlines', 'everything'].includes(endpoint)) {
    return res.status(400).json({
      error: 'Invalid endpoint. Use either "top-headlines" or "everything"'
    });
  }

  try {
    const response = await axios.get(`${NEWS_API_URL}/${endpoint}`, {
      params: {
        ...params,
        apiKey: API_KEY,
        pageSize: params.pageSize || 20
      },
      timeout: 8000
    });

    const validArticles = response.data.articles?.filter(article =>
      article?.title &&
      article?.url &&
      article?.content
    ) || [];

    return res.status(200).json({
      ...response.data,
      articles: validArticles
    });

  } catch (error) {
    console.error('NewsAPI Error:', error.response?.data || error.message);

    // Error handling for specific cases
    let errorMessage = 'Failed to fetch news';
    if (error.response?.status === 426) {
      errorMessage = 'NewsAPI plan does not allow browser requests';
    }

    return res.status(error.response?.status || 500).json({
      error: errorMessage,
      details: error.response?.data || null
    });
  }
}