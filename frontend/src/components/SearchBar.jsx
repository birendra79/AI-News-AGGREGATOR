import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search global news..."
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 shadow shadow-gray-200 dark:shadow-none border border-transparent dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <svg
          className="w-5 h-5 absolute left-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <button
          type="submit"
          className="absolute right-2 px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition duration-200 shadow-md"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
