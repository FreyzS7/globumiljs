'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UPLOADS_URL } from '@/utils/constant';
import SearchPagination from './SearchPagination';

export default function SearchResults({ results, error, query, type, page }) {
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  // Handle different search result structures
  const renderResults = () => {
    if (type === 'all') {
      const totalProducts = results.total_count?.products || 0;
      const totalArticles = results.total_count?.articles || 0;
      const totalResults = totalProducts + totalArticles;

      if (totalResults === 0) {
        return <NoResultsFound query={query} />;
      }

      return (
        <div className="space-y-8">
          {/* Results Summary */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-600">
              Ditemukan <span className="font-semibold">{totalResults}</span> hasil untuk "{query}"
              {totalProducts > 0 && (
                <span className="ml-2">
                  (<span className="text-blue-600">{totalProducts} produk</span>
                  {totalArticles > 0 && <span>, </span>}
                </span>
              )}
              {totalArticles > 0 && (
                <span className={totalProducts === 0 ? 'ml-2' : ''}>
                  {totalProducts === 0 && '('}
                  <span className="text-green-600">{totalArticles} artikel</span>)
                </span>
              )}
            </p>
          </div>

          {/* Products Section */}
          {results.results?.products?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-blue-500 mr-3 rounded"></span>
                Produk
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.results.products.map((product) => (
                  <ProductCard key={product.id_produk} product={product} query={query} />
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {results.results?.articles?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-500 mr-3 rounded"></span>
                Artikel
              </h2>
              <div className="space-y-4">
                {results.results.articles.map((article) => (
                  <ArticleCard key={article.id_artikel} article={article} query={query} />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // Single type results
      const items = results.results || [];
      const totalCount = results.total_count || 0;

      if (totalCount === 0) {
        return <NoResultsFound query={query} />;
      }

      return (
        <div className="space-y-6">
          {/* Results Summary */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-600">
              Ditemukan <span className="font-semibold">{totalCount}</span> hasil untuk "{query}"
            </p>
          </div>

          {/* Results Grid/List */}
          {type === 'products' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id_produk} product={product} query={query} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((article) => (
                <ArticleCard key={article.id_artikel} article={article} query={query} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <SearchPagination 
            currentPage={page}
            totalCount={totalCount}
            itemsPerPage={results.limit || 12}
            query={query}
            type={type}
          />
        </div>
      );
    }
  };

  return (
    <div className="mt-6">
      {renderResults()}
    </div>
  );
}

// Product Card Component
function ProductCard({ product, query }) {
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : part
    );
  };

  return (
    <Link href={product.url} className="group">
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
            {highlightText(product.nama_produk, query)}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {highlightText(product.deskripsi_produk, query)}
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
function ArticleCard({ article, query }) {
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : part
    );
  };

  return (
    <Link href={article.url} className="group">
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
              {highlightText(article.judul, query)}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {highlightText(article.excerpt, query)}
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

// No Results Component
function NoResultsFound({ query }) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Tidak Ada Hasil Ditemukan
        </h3>
        <p className="text-gray-500 mb-6">
          Maaf, tidak ada hasil yang ditemukan untuk "{query}". Coba gunakan kata kunci yang berbeda.
        </p>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Saran:</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Periksa ejaan kata kunci</li>
            <li>• Gunakan kata kunci yang lebih umum</li>
            <li>• Coba kata kunci yang berbeda</li>
            <li>• Gunakan sinonim atau kata yang terkait</li>
          </ul>
        </div>
      </div>
    </div>
  );
}