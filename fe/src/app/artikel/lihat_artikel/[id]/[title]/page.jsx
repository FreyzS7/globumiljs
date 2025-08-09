import ArticleContent from '@/components/articles/ArticleContent';
import ArticleViewTracker from '@/components/articles/ArticleViewTracker';
import { Comment } from '@/components/Comment';
import { notFound } from 'next/navigation';
import { METADATA_BASE_URL, UPLOADS_URL } from '@/utils/constant';
import { ArtikelGlobumilSection } from '@/custompages/Home/ArtikelGlobumilSection';
import { getAllArticles, getArticleById } from '@/lib/articles';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';
import formatUrlTitle from '@/utils/String';
import Script from 'next/script';

// Clean HTML tags from text
function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Generate clean meta description from article content
function generateCleanDescription(article) {
  const cleanContent = stripHtmlTags(article.kata_awal || '');
  
  // Limit to 155-160 characters for optimal SEO
  if (cleanContent.length <= 160) {
    return cleanContent;
  }
  
  // Truncate at word boundary near 155 characters
  const truncated = cleanContent.substring(0, 155);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 120 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

// Generate dynamic keywords based on article content
function generateDynamicKeywords(article) {
  const baseKeywords = ['Globumil'];
  const categoryKeywords = article.nama_kategori ? [article.nama_kategori.toLowerCase()] : [];
  
  // Extract meaningful words from title (remove common words)
  const stopWords = ['dan', 'atau', 'untuk', 'pada', 'di', 'saat', 'yang', 'ini', 'cara', 'tips', 'dengan'];
  const titleWords = article.judul
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .slice(0, 3); // Take first 3 meaningful words
  
  // Extract keywords from content (common health terms)
  const contentKeywords = [];
  const healthTerms = [
    'kehamilan', 'ibu hamil', 'janin', 'trimester', 'anemia', 'kalsium', 'zat besi',
    'asam folat', 'vitamin', 'nutrisi', 'suplemen', 'menyusui', 'bayi', 'kesehatan',
    'gizi', 'prenatal', 'DHA', 'morning sickness', 'preeklamsia'
  ];
  
  const content = (article.kata_awal + ' ' + article.isi_artikel).toLowerCase();
  healthTerms.forEach(term => {
    if (content.includes(term) && !baseKeywords.includes(term)) {
      contentKeywords.push(term);
    }
  });
  
  // Combine and remove duplicates
  const allKeywords = [
    ...titleWords,
    ...categoryKeywords,
    ...contentKeywords.slice(0, 4),
    ...baseKeywords
  ];
  
  // Remove duplicates and limit to 8 keywords
  const uniqueKeywords = [...new Set(allKeywords)].slice(0, 8);
  
  return uniqueKeywords.join(', ');
}

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
      title: formatUrlTitle(article.judul),
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
        description: generateCleanDescription(article),
        keywords: generateDynamicKeywords(article),
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
          description: generateCleanDescription(article),
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
