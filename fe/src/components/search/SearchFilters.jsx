'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchFilters({ currentQuery, currentType, currentPage }) {
  const [query, setQuery] = useState(currentQuery || '');
  const [type, setType] = useState(currentType || 'all');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setQuery(currentQuery || '');
    setType(currentType || 'all');
  }, [currentQuery, currentType]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams();
    params.set('q', query.trim());
    if (type !== 'all') {
      params.set('type', type);
    }
    // Reset to first page on new search
    params.delete('page');

    router.push(`/search?${params.toString()}`);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    
    if (currentQuery) {
      const params = new URLSearchParams();
      params.set('q', currentQuery);
      if (newType !== 'all') {
        params.set('type', newType);
      }
      // Reset to first page when changing type
      params.delete('page');

      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk, artikel, atau informasi..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Cari
          </button>
        </div>
      </form>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 mr-3 py-2">Filter:</span>
        
        <button
          onClick={() => handleTypeChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            type === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Semua
        </button>
        
        <button
          onClick={() => handleTypeChange('products')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            type === 'products'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Produk
        </button>
        
        <button
          onClick={() => handleTypeChange('articles')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            type === 'articles'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Artikel
        </button>
      </div>

      {/* Quick Search Suggestions */}
      {!currentQuery && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pencarian populer:</p>
          <div className="flex flex-wrap gap-2">
            {['vitamin', 'kehamilan', 'asi', 'nutrisi', 'globumil', 'suplemen'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  const params = new URLSearchParams();
                  params.set('q', suggestion);
                  if (type !== 'all') {
                    params.set('type', type);
                  }
                  router.push(`/search?${params.toString()}`);
                }}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}