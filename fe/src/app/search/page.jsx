import { Suspense } from 'react';
import SearchClientWrapper from './SearchClientWrapper';
import { METADATA_BASE_URL, BASE_URL } from '@/utils/constant';

// Static metadata for search page
export const metadata = {
  title: 'Pencarian - Globumil | Cari Produk dan Artikel Kesehatan',
  description: 'Cari produk kesehatan Globumil dan artikel untuk ibu hamil dan menyusui. Temukan suplemen kehamilan, tips kesehatan, dan informasi terpercaya.',
  keywords: 'pencarian Globumil, cari produk, artikel kesehatan, suplemen kehamilan, search Globumil',
  authors: [{ name: 'Globumil Team' }],
  creator: 'Globumil',
  publisher: 'Globumil',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // metadataBase: new URL(METADATA_BASE_URL),
  alternates: {
    canonical: METADATA_BASE_URL + '/search',
  },
  openGraph: {
    title: 'Pencarian - Globumil | Cari Produk dan Artikel Kesehatan',
    description: 'Cari produk kesehatan Globumil dan artikel untuk ibu hamil dan menyusui. Temukan suplemen kehamilan, tips kesehatan, dan informasi terpercaya.',
    url: `${METADATA_BASE_URL}/search`,
    siteName: 'Globumil',
    type: 'website',
    locale: 'id_ID',
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

// Main search page component (Server Component wrapper)
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoadingFallback />}>
      <SearchClientWrapper />
    </Suspense>
  );
}

// Loading fallback component
function SearchLoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pencarian</h1>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="flex gap-3">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                <div className="w-20 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

