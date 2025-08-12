import ProductsServer from '@/components/products/ProductsServer';
import { getProducts } from '@/lib/products';
import { METADATA_BASE_URL } from '@/utils/constant';
import { redirect } from 'next/navigation';

export default async function ProductsPage() {
    const [productsResponse] = await Promise.all([
      getProducts(1, -1) // -1 to get all products
    ]);
  
    const products = Array.isArray(productsResponse.data?.data) ? productsResponse.data.data : [];
    const total = productsResponse.data?.total || 0;
    
    return (
      <ProductsServer
        products={products}
        total={total}
        currentPage={1}
        showPagination={false}
      />
    );
}

export const metadata = {
  title: 'Produk Kami - Globumil Suplemen Kehamilan dan Menyusui',
  description: 'Jelajahi koleksi lengkap produk Globumil yang diformulasikan khusus untuk ibu hamil dan menyusui. Tersedia dalam berbagai paket dengan harga terjangkau dan kualitas terbaik.',
  keywords: 'produk Globumil, suplemen kehamilan, vitamin ibu hamil, paket Globumil, harga Globumil, beli suplemen hamil, produk ibu menyusui, vitamin prenatal indonesia',
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
    canonical: METADATA_BASE_URL + '/produk_kami',
  },
  openGraph: {
    title: 'Produk Kami - Globumil Suplemen Kehamilan dan Menyusui',
    description: 'Jelajahi koleksi lengkap produk Globumil yang diformulasikan khusus untuk ibu hamil dan menyusui. Tersedia dalam berbagai paket dengan harga terjangkau dan kualitas terbaik.',
    url: `${METADATA_BASE_URL}/produk_kami`,
    siteName: 'Globumil',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/images/Products/Artboard1.png',
        width: 1200,
        height: 630,
        alt: 'Produk Globumil - Suplemen Kehamilan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Produk Kami - Globumil Suplemen Kehamilan dan Menyusui',
    description: 'Jelajahi koleksi lengkap produk Globumil yang diformulasikan khusus untuk ibu hamil dan menyusui. Tersedia dalam berbagai paket dengan harga terjangkau.',
    images: ['/images/Products/Artboard1.png'],
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
}