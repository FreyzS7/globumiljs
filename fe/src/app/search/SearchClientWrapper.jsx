'use client';
import { Suspense } from 'react';
import SearchPageClient from '@/components/search/SearchPageClient';
import { useSearchParams } from 'next/navigation';

export default function SearchClientWrapper() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';
  const page = parseInt(searchParams.get('page')) || 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {query ? `Hasil Pencarian` : 'Pencarian'}
            </h1>
            {query && (
              <p className="text-gray-600">
                Menampilkan hasil untuk: <span className="font-semibold">"{query}"</span>
              </p>
            )}
          </div>

          {/* Client-side search component */}
          <Suspense fallback={<SearchSkeleton />}>
            <SearchPageClient 
              initialQuery={query}
              initialType={type}
              initialPage={page}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton
function SearchSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-20 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}