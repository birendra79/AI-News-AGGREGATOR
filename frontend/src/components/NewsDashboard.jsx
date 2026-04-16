import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import NewsCard from './NewsCard';
import SummaryModal from './SummaryModal';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/news';

const NewsDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/headlines`, {
        params: { category, q: searchQuery }
      });
      setArticles(response.data.articles || []);
    } catch (err) {
      setError('Failed to fetch news. Please ensure the backend is running and API keys are set.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSummarize = async (article) => {
    setSelectedArticle(article);
    setSummary(null);
    setSummaryError(null);
    setModalOpen(true);
    setSummaryLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/summarize`, {
        title: article.title,
        description: article.description,
        content: article.content
      });
      setSummary(response.data.summary);
    } catch (err) {
      setSummaryError(err.response?.data?.error || 'Failed to generate summary.');
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <CategoryFilter activeCategory={category} setCategory={(c) => { setCategory(c); setSearchQuery(''); }} />
        <SearchBar onSearch={handleSearch} />
      </div>

      {searchQuery && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
          Showing results for <span className="text-blue-600 dark:text-blue-400">"{searchQuery}"</span>
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl h-80 animate-pulse p-4 flex flex-col shadow-sm">
              <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded-xl mb-4"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-6 w-3/4 mb-3 rounded"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full mb-2 rounded"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded mt-auto"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl text-center shadow-sm max-w-2xl mx-auto mt-10">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-lg font-bold">{error}</p>
        </div>
      ) : articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, idx) => (
            <NewsCard 
              key={idx} 
              article={article} 
              onSummarize={handleSummarize} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No news found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your category or search query.</p>
        </div>
      )}

      <SummaryModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        article={selectedArticle}
        summary={summary}
        isLoading={summaryLoading}
        error={summaryError}
      />
    </div>
  );
};

export default NewsDashboard;
