import fs from 'fs';
import path from 'path';
import ArticlesServer from '@/components/articles/ArticlesServer';
import { METADATA_BASE_URL } from '@/utils/constant';
import formatUrlTitle from '@/utils/String';
import Script from 'next/script';

async function readLocalJson(filename) {
  const filePath = path.resolve(process.cwd(), 'data', filename);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function ArticlesPageWithPagination({ params }) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    throw new Error('Invalid page number');
  }

  const articles = await readLocalJson('articles.json');
  const mostViewedList = await readLocalJson('articles_most_viewed.json').catch(() => []);
  const mostViewed = mostViewedList.length > 0 ? mostViewedList[0] : null;

  const total = articles.data.length || 0;
  const totalPages = Math.ceil(total / 9);

  if (pageNumber > totalPages && totalPages > 0) {
    throw new Error('Page number exceeds total pages');
  }

  // Paginate articles manually
  const startIndex = (pageNumber - 1) * 9;
  const paginatedArticles = articles.data.slice(startIndex, startIndex + 9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Artikel Kesehatan - Halaman ${pageNumber} - Globumil`,
    "description": `Kumpulan artikel kesehatan, tips kehamilan, dan informasi untuk ibu hamil dan menyusui - Halaman ${pageNumber}`,
    "url": `${METADATA_BASE_URL}/artikel/${pageNumber}`,
    "hasPart": paginatedArticles.map(article => ({
      "@type": "Article",
      "headline": article.judul,
      "url": `${METADATA_BASE_URL}/artikel/${article.id_artikel}/${formatUrlTitle(article.judul)}`,
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
        currentPage={pageNumber}
      />
      <Script type="application/ld+json" id={`jsonld-articles-page-${pageNumber}`} dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const filePath = path.resolve(process.cwd(),  'data', 'articles.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(jsonData);

    const total = articles.data.length || 0;
    const totalPages = Math.ceil(total / 9);

    const pagesToGenerate = Math.min(totalPages, 10);

    return Array.from({ length: pagesToGenerate }, (_, i) => ({
      page: (i + 1).toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for article pages:', error);
    return [{ page: '1' }];
  }
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10);

  return {
    title: `Artikel Kesehatan - Halaman ${pageNumber} - Globumil`,
    description: `Kumpulan artikel kesehatan, tips kehamilan, dan informasi untuk ibu hamil dan menyusui - Halaman ${pageNumber}`,
    keywords: 'artikel kesehatan ibu hamil, tips kehamilan, informasi menyusui, panduan ibu hamil, blog kesehatan, artikel Globumil, tips nutrisi kehamilan, kesehatan janin',
    authors: [{ name: 'Globumil Team' }],
    creator: 'Globumil',
    publisher: 'Globumil',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `${METADATA_BASE_URL}/artikel/${pageNumber}`,
    },
    openGraph: {
      title: `Artikel Kesehatan - Halaman ${pageNumber} - Globumil`,
      description: `Kumpulan artikel kesehatan, tips kehamilan, dan informasi untuk ibu hamil dan menyusui - Halaman ${pageNumber}`,
      url: `${METADATA_BASE_URL}/artikel_kami/${pageNumber}`,
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
      title: `Artikel Kesehatan - Halaman ${pageNumber} - Globumil`,
      description: `Kumpulan artikel kesehatan, tips kehamilan, dan informasi untuk ibu hamil dan menyusui - Halaman ${pageNumber}`,
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
}
