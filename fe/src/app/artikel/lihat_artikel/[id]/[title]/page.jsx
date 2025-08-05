import ArticleContent from '@/components/articles/ArticleContent';
import ArticleViewTracker from '@/components/articles/ArticleViewTracker';
import { Comment } from '@/components/Comment';
import { notFound } from 'next/navigation';
import { METADATA_BASE_URL, UPLOADS_URL } from '@/utils/constant';
import { ArtikelGlobumilSection } from '@/custompages/Home/ArtikelGlobumilSection';
import { getAllArticles, getArticleById } from '@/lib/articles';
import Script from 'next/script';

import fs from 'fs';
import path from 'path';

// Generate static params for articles
export async function generateStaticParams() {
  try {
    const filePath = path.resolve(process.cwd(), 'data', 'articles.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(jsonData);
    
    if (!articles || articles.data.length === 0) {
      console.warn('No articles found for static generation.');
      return [];
    }

    return articles.data.map(article => ({
      id: article.id_artikel.toString(),
      title: article.judul.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    }));
  } catch (error) {
    console.error('Error generating static params for articles:', error);
    return [];
  }
}


// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id, title } = await params;

  try {
    const filePath = path.resolve(process.cwd(), 'data', 'articles.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(jsonData).data;

    const article = articles.find(a => a.id_artikel.toString() === id);

    if (article) {
      const canonicalUrl = `/artikel/${id}/${title}`;
      const fullUrl = `${METADATA_BASE_URL}${canonicalUrl}`;

      return {
        title: `${article.judul}`,
        description: article.kata_awal || 'Baca artikel kesehatan dan tips untuk ibu hamil dan menyusui dari Globumil.',
        keywords: `${article.judul}, artikel kesehatan, ibu hamil, kehamilan, menyusui, Globumil, tips kesehatan`,
        authors: [{ name: article.admin || 'Globumil Team' }],
        creator: 'Globumil',
        publisher: 'Globumil',
        formatDetection: {
          email: false,
          address: false,
          telephone: false,
        },
        alternates: {
          canonical: METADATA_BASE_URL + canonicalUrl,
        },
        openGraph: {
          title: `${article.judul} - Globumil`,
          description: article.kata_awal || 'Baca artikel kesehatan dan tips untuk ibu hamil dan menyusui dari Globumil.',
          url: fullUrl,
          siteName: 'Globumil',
          type: 'article',
          locale: 'id_ID',
          publishedTime: article.tanggal_input,
          authors: [article.admin || 'Globumil Team'],
          images: article.gambar ? [{
            url: `${UPLOADS_URL}${article.gambar}`,
            width: 1200,
            height: 630,
            alt: article.judul,
          }] : [{
            url: '/images/About/bidannovi.jpg',
            width: 1200,
            height: 630,
            alt: 'Artikel Kesehatan Globumil',
          }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${article.judul} - Globumil`,
          description: article.kata_awal || article.deskripsi || 'Baca artikel kesehatan dan tips untuk ibu hamil dan menyusui.',
          images: article.gambar ? [`${UPLOADS_URL}${article.gambar}`] : ['/images/About/bidannovi.jpg'],
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
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata
  return {
    title: `${title.replace(/-/g, ' ')} - Globumil`,
    description: 'Baca artikel kesehatan dan tips untuk ibu hamil dan menyusui.',
  };
}


export default async function ArticleDetailPage({ params }) {
  const { id , title} = await params;

  try {
    const filePath = path.resolve(process.cwd(), 'data', 'articles.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(jsonData).data;

    const article = articles.find(a => a.id_artikel.toString() === id);

    if (!article) {
      notFound();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${METADATA_BASE_URL}/artikel/${id}/${title}`
      },
      "headline": article.judul,
      "image": article.gambar ? [`${UPLOADS_URL}${article.gambar}`] : ['/images/About/bidannovi.jpg'],
      "datePublished": article.tanggal_input,
      "dateModified": article.tanggal_update || article.tanggal_input,
      "author": {
        "@type": "Person",
        "name": article.admin || "Globumil Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Globumil",
        "logo": {
          "@type": "ImageObject",
          "url": "/images/About/bidannovi.jpg"
        }
      },
      "description": article.kata_awal || article.deskripsi || "Baca artikel kesehatan dan tips untuk ibu hamil dan menyusui dari Globumil."
    };

    return (
      <>
        {/* Track article view (client component) */}
        <ArticleViewTracker articleId={article.id_artikel} />

        {/* Article content */}
        <ArticleContent article={article} />

       
        {/* Related articles section */}
        <ArtikelGlobumilSection title="Artikel Lainnya" description="Temukan artikel menarik lainnya" background={false} />
        {/* Comments section (client component) */}
        <Comment Id={article.id_artikel.toString()} type="article" />

        {/* JSON-LD structured data for SEO */}
        <Script type="application/ld+json" id="jsonld-article" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </>
    );
  } catch (error) {
    console.error('Error reading article from local JSON:', error);
    notFound();
  }
}
