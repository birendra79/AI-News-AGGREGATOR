const axios = require('axios');
const cache = require('../utils/cache');

const BASE_URL = 'https://newsapi.org/v2';

const getHeadlines = async (category = 'general', q = '', country = 'us', language = 'en') => {
  const cacheKey = `headlines-${category}-${q}-${country}-${language}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log(`Cache hit for ${cacheKey}`);
    return cachedData;
  }

  console.log(`Cache miss for ${cacheKey}. Fetching from API...`);

  if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY is not set in environment variables.");
  }

  // Use top-headlines endpoint
  const params = {
    apiKey: process.env.NEWS_API_KEY,
    pageSize: 30
  };

  if (q) {
    params.q = q;
    if (language) params.language = language;
  } else {
    // Top-headlines requires at least one of country, category, sources, or q
    if (category) params.category = category;
    if (country) params.country = country;
  }

  const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
  
  // Filter out articles that have "[Removed]" title
  const articles = response.data.articles.filter(article => article.title && !article.title.includes('[Removed]'));

  // Cache for 5 minutes
  cache.set(cacheKey, articles);

  return articles;
};

module.exports = {
  getHeadlines
};
