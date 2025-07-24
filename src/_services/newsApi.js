import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';
const API = axios.create({
  baseURL: NEWS_API_URL,
});

const GetTopHeadlines = async (category) => {
  try {
    const response = await API.get('/top-headlines', {
      params: {
        category: category || 'general',
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
}

const GetLatestNews = async (query) => {
  try {
    const response = await API.get('/everything', {
      params: {
        q: query || 'latest',
        sortBy: "publishedAt",
        pageSize: 4,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching everything:', error);
    throw error;
  }
}

export { GetTopHeadlines, GetLatestNews };