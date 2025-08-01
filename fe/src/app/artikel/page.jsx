import fs from 'fs';
import path from 'path';
import ArticlesServer from '@/components/articles/ArticlesServer';
import { METADATA_BASE_URL } from '@/utils/constant';
import Script from 'next/script';

async function readLocalJson(filename) {
  const filePath = path.resolve(process.cwd(), 'data', filename);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function ArticlesPage() {
  const articles = await readLocalJson('articles.json');
  const mostViewedList = await readLocalJson('articles_most_viewed.json').catch(() => []);
  const mostViewed = mostViewedList.length > 0 ? mostViewedList[0] : null;
  const total = articles.data.length || 0;

  // Get only first 9 articles
  const paginatedArticles = articles.data.slice(0, 9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Artikel Kesehatan - Globumil",
    "description": "Kumpulan artikel kesehatan, tips kehamilan, dan informasi penting untuk ibu hamil dan menyusui.",
    "url": `${METADATA_BASE_URL}/artikel`,
    "hasPart": paginatedArticles.map(article => ({
      "@type": "Article",
      "headline": article.judul,
      "url": `${METADATA_BASE_URL}/artikel/${article.id_artikel}/${article.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`,
      "datePublished": article.tanggal_input,
      "dateModified": article.tanggal_update || article.tanggal_input,
      "author": {
        "@type": "Person",
        "name": article.admin || "Globumil Team"
      },
      "image": article.gambar ? [`${METADATA_BASE_URL}/uploads/${article.gambar}`] : ['/images/About/bidannovi.jpg'],
      "description": article.kata_awal || article.deskripsi || "Baca artikel kesehatan dan tips untuk ibu hamil dan menyusui dari Globumil."
    }))
  };

  return (
    <>
      <ArticlesServer
        articles={paginatedArticles}
        mostViewed={mostViewed}
        total={total}
        currentPage={1}
      />
      <Script type="application/ld+json" id="jsonld-articles" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export const metadata = {
  title: 'Artikel Kesehatan - Globumil | Tips dan Informasi untuk Ibu Hamil',
  description: 'Kumpulan artikel kesehatan, tips kehamilan, dan informasi penting untuk ibu hamil dan menyusui. Dapatkan panduan lengkap dari para ahli kesehatan.',
  keywords: 'artikel kesehatan ibu hamil, tips kehamilan, informasi menyusui, panduan ibu hamil, blog kesehatan, artikel Globumil, tips nutrisi kehamilan, kesehatan janin',
  authors: [{ name: 'Globumil Team' }],
  creator: 'Globumil',
  publisher: 'Globumil',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
//metadataBase: new URL(METADATA_BASE_URL),
  alternates: {
    canonical: METADATA_BASE_URL + '/artikel',
  },
  openGraph: {
    title: 'Artikel Kesehatan - Globumil | Tips dan Informasi untuk Ibu Hamil',
    description: 'Kumpulan artikel kesehatan, tips kehamilan, dan informasi penting untuk ibu hamil dan menyusui. Dapatkan panduan lengkap dari para ahli kesehatan.',
    url: `${METADATA_BASE_URL}/artikel`,
    siteName: 'Globumil',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/images/About/bidannovi.jpg',
        width: 1200,
        height: 630,
        alt: 'Artikel Kesehatan Globumil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel Kesehatan - Globumil | Tips dan Informasi untuk Ibu Hamil',
    description: 'Kumpulan artikel kesehatan, tips kehamilan, dan informasi penting untuk ibu hamil dan menyusui.',
    images: ['/images/About/bidannovi.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
