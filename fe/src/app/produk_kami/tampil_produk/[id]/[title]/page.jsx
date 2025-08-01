
import ProductContent from '@/components/products/ProductContent';
import { Comment } from '@/components/Comment';
import { notFound } from 'next/navigation';
import MungkinKamuSuka from '@/components/products/MungkinKamuSuka';
import { METADATA_BASE_URL, UPLOADS_URL, VIEW_PRODUCT_URL, BASE_URL } from '@/utils/constant';
import { getAllProducts, getProductById } from '@/lib/products';


import fs from 'fs';
import path from 'path';

// Generate static params for products
export async function generateStaticParams() {
  try {
    const filePath = path.resolve(process.cwd(), 'data', 'products.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(jsonData);

    if (!products || products.data.length === 0) {
      console.warn('No products found for static generation.');
      return [];
    }
     
    // Generate params for each product
    const params = products.data.map(product => ({
      id: product.id_produk.toString(),
      title: product.nama_produk.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }));
    
    return params;
  } catch (error) {
    console.error('Error generating static params for products:', error);
    return [];
  }
}


 

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id, title } = await params;

  try {
    const filePath = path.resolve(process.cwd(), 'data', 'products.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(jsonData).data;

    const product = products.find(p => p.id_produk.toString() === id);

    if (product) {
      const canonicalUrl = `/produk_kami/tampil_produk/${id}/${title}`;
      const fullUrl = `${METADATA_BASE_URL}${canonicalUrl}`;

      return {
        title: `${product.nama_produk} - Globumil Suplemen Kehamilan`,
        description: product.deskripsi || 'Produk kesehatan Globumil berkualitas untuk ibu hamil dan menyusui dengan harga terjangkau.',
        keywords: `${product.nama_produk}, Globumil, suplemen kehamilan, vitamin ibu hamil, produk menyusui, ${product.harga ? 'harga ' + product.harga : ''}`,
        authors: [{ name: 'Globumil Team' }],
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
          title: `${product.nama_produk} - Globumil Suplemen Kehamilan`,
          description: product.deskripsi || 'Produk kesehatan Globumil berkualitas untuk ibu hamil dan menyusui dengan harga terjangkau.',
          type: 'website',
          url: fullUrl,
          siteName: 'Globumil',
          locale: 'id_ID',
          images: product.gambar ? [{
            url: `${UPLOADS_URL}${product.gambar}`,
            width: 1200,
            height: 630,
            alt: product.nama_produk,
          }] : [{
            url: '/images/Products/Artboard1.png',
            width: 1200,
            height: 630,
            alt: 'Produk Globumil',
          }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${product.nama_produk} - Globumil`,
          description: product.deskripsi || 'Produk kesehatan Globumil berkualitas untuk ibu hamil dan menyusui.',
          images: product.gambar ? [`${UPLOADS_URL}${product.gambar}`] : ['/images/Products/Artboard1.png'],
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

  return {
    title: `${title.replace(/-/g, ' ')} - Globumil`,
    description: 'Produk kesehatan untuk menyembuhkan luka pasca melahirkan.',
    openGraph: {
      title: `${title.replace(/-/g, ' ')} - Globumil`,
      description: 'Produk kesehatan berkualitas untuk menyembuhkan luka pasca melahirkan.',
      type: 'website',
      url: `/${VIEW_PRODUCT_URL}${id}/${title}`,
      siteName: 'Globumil',
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title.replace(/-/g, ' ')} - Globumil`,
      description: 'Produk kesehatan berkualitas untuk menyembuhkan luka pasca melahirkan.',
    },
  };
}

// Main page component - Server Component that fetches data
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Fetch product data at build time
  const product = await getProductById(id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-10">
      {/* Product content */}
      <ProductContent product={product} />
      
      {/* Comments section (client component) */}
      <Comment Id={product.id_produk} type="product" />

      <MungkinKamuSuka />
    </div>
  );
}