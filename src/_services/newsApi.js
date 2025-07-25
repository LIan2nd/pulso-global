import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';
const API = axios.create({
  baseURL: NEWS_API_URL,
});

const GetTopHeadlines = async (category, q) => {
  try {
    const response = await API.get('/top-headlines', {
      params: {
        category,
        q,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
}

const GetEverythingNews = async (query, size) => {
  size = size || 4; // Default to 100 if size is not provided
  query = query || 'latest'; // Default to 'latest' if query is not provided
  try {
    const response = await API.get('/everything', {
      params: {
        q: query,
        sortBy: "publishedAt",
        pageSize: size,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching everything:', error);
    throw error;
  }
}

export { GetTopHeadlines, GetEverythingNews };