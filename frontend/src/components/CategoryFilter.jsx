import React from 'react';

const categories = [
  'General', 'Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science'
];

const CategoryFilter = ({ activeCategory, setCategory }) => {
  return (
    <div className="flex overflow-x-auto pb-4 gap-3 mb-4 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat.toLowerCase())}
          className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-200 ${
            activeCategory === cat.toLowerCase()
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 shadow shrink-0'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
