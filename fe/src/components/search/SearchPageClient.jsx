'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchService } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import { UPLOADS_URL } from '@/utils/constant';
import formatUrlTitle from '@/utils/String';

export default function SearchPageClient({ initialQuery, initialType, initialPage }) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialType, initialPage);
    }
  }, [initialQuery, initialType, initialPage]);

  const performSearch = async (searchQuery, searchType = 'all', page = 1) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchService.search({
        q: searchQuery.trim(),
        type: searchType,
        page,
        limit: 12
      });
      setResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Terjadi kesalahan saat mencari. Silakan coba lagi.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams();
    params.set('q', query.trim());
    if (type !== 'all') {
      params.set('type', type);
    }

    router.push(`/search?${params.toString()}`);
    performSearch(query, type, 1);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    
    if (initialQuery) {
      const params = new URLSearchParams();
      params.set('q', initialQuery);
      if (newType !== 'all') {
        params.set('type', newType);
      }

      router.push(`/search?${params.toString()}`);
      performSearch(initialQuery, newType, 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk, artikel, atau informasi..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Mencari...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-6">
          {/* Results Summary */}
          {type === 'all' ? (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-600">
                Ditemukan{' '}
                <span className="font-semibold">
                  {(results.total_count?.products || 0) + (results.total_count?.articles || 0)}
                </span>{' '}
                hasil untuk "{initialQuery}"
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-600">
                Ditemukan <span className="font-semibold">{results.total_count || 0}</span> hasil untuk "{initialQuery}"
              </p>
            </div>
          )}

          {/* Render Results */}
          {type === 'all' ? (
            <div className="space-y-8">
              {/* Products */}
              {results.results?.products?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-blue-500 mr-3 rounded"></span>
                    Produk
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.results.products.map((product) => (
                      <ProductCard key={product.id_produk} product={product} />
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {results.results?.articles?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-green-500 mr-3 rounded"></span>
                    Artikel
                  </h2>
                  <div className="space-y-4">
                    {results.results.articles.map((article) => (
                      <ArticleCard key={article.id_artikel} article={article} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'products' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.results?.map((product) => (
                    <ProductCard key={product.id_produk} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {results.results?.map((article) => (
                    <ArticleCard key={article.id_artikel} article={article} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {((type === 'all' && (results.total_count?.products || 0) + (results.total_count?.articles || 0) === 0) ||
            (type !== 'all' && (results.total_count || 0) === 0)) && (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak Ada Hasil Ditemukan
              </h3>
              <p className="text-gray-500">
                Maaf, tidak ada hasil yang ditemukan untuk "{initialQuery}". Coba gunakan kata kunci yang berbeda.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!initialQuery && !loading && (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Mulai Pencarian Anda
          </h3>
          <p className="text-gray-500 mb-6">
            Cari produk kesehatan, artikel, dan informasi untuk ibu hamil dan menyusui.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['vitamin', 'kehamilan', 'asi', 'nutrisi'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  const params = new URLSearchParams();
                  params.set('q', term);
                  router.push(`/search?${params.toString()}`);
                  performSearch(term, 'all', 1);
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  return (
    <Link href={`/produk_kami/tampil_produk/${product.id_produk}/${formatUrlTitle(product.nama_produk)}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={`${UPLOADS_URL}${product.gambar}`}
            alt={product.nama_produk}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.nama_produk}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {product.deskripsi_produk}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              Rp {parseInt(product.harga_produk).toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
              Produk
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Article Card Component
function ArticleCard({ article }) {
  return (
    <Link href={`/artikel/lihat_artikel/${article.id_artikel}/${encodeURIComponent(article.judul.toLowerCase().replace(/\s+/g, '-'))}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
        <div className="flex gap-4">
          <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={`${UPLOADS_URL}${article.gambar}`}
              alt={article.judul}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
                Artikel
              </span>
              {article.nama_kategori && (
                <span className="text-xs text-gray-500">
                  {article.nama_kategori}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
              {article.judul}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {article.admin} • {new Date(article.tanggal_input).toLocaleDateString('id-ID')}
              </span>
              {article.views && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {article.views}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}