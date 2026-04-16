import React, { useState } from 'react';

const NewsCard = ({ article, onSummarize }) => {
  const { title, description, urlToImage, source, publishedAt, url } = article;
  
  // Format the date
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 group">
      {urlToImage ? (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={urlToImage} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur text-white px-3 py-1 text-xs font-bold rounded-lg shadow">
            {source.name}
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center relative">
          <span className="text-gray-400 dark:text-gray-300 font-medium">{source.name}</span>
           <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur text-white px-3 py-1 text-xs font-bold rounded-lg shadow">
            {source.name}
          </div>
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {date}
        </p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            {title}
          </a>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description || "No description available for this article."}
        </p>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => onSummarize(article)}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:text-blue-800 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            AI Summary
          </button>
          
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            Read Real
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
