import ArticleContent from '@/components/articles/ArticleContent';
import ArticleViewTracker from '@/components/articles/ArticleViewTracker';
import { Comment } from '@/components/Comment';
import { notFound } from 'next/navigation';
import { METADATA_BASE_URL, UPLOADS_URL } from '@/utils/constant';
import { ArtikelGlobumilSection } from '@/custompages/Home/ArtikelGlobumilSection';
import { getAllArticles, getArticleById } from '@/lib/articles';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';
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

    // Generate comprehensive article schema
    const articleSchema = generateArticleSchema({
      ...article,
      slug: title
    });

    // Generate breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      {
        name: "Beranda",
        url: METADATA_BASE_URL
      },
      {
        name: "Artikel",
        url: `${METADATA_BASE_URL}/artikel`
      },
      {
        name: article.judul,
        url: `${METADATA_BASE_URL}/artikel/lihat_artikel/${id}/${title}`
      }
    ]);

    // Combine schemas
    const jsonLd = [
      articleSchema,
      breadcrumbSchema
    ];

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
        {jsonLd.map((schema, index) => (
          <Script 
            key={`schema-${index}`}
            type="application/ld+json" 
            id={`jsonld-article-${index}`} 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
          />
        ))}
      </>
    );
  } catch (error) {
    console.error('Error reading article from local JSON:', error);
    notFound();
  }
}
