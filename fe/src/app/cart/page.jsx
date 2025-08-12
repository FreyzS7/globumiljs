import Cart from '@/custompages/Cart/Index';
import { METADATA_BASE_URL } from '@/utils/constant';
export const metadata = {
  title: 'Keranjang Belanja - Globumil | Checkout Suplemen Kehamilan',
  description: 'Lihat dan kelola produk Globumil yang telah Anda pilih. Proses pemesanan mudah dan aman untuk suplemen kehamilan berkualitas tinggi. Tersedia berbagai metode pembayaran yang nyaman.',
  keywords: 'keranjang belanja Globumil, checkout Globumil, beli suplemen hamil, order Globumil, pembayaran Globumil, proses pemesanan, cart Globumil',
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
    canonical: METADATA_BASE_URL + '/cart',
  },
  openGraph: {
    title: 'Keranjang Belanja - Globumil | Checkout Suplemen Kehamilan',
    description: 'Lihat dan kelola produk Globumil yang telah Anda pilih. Proses pemesanan mudah dan aman untuk suplemen kehamilan berkualitas tinggi. Tersedia berbagai metode pembayaran yang nyaman.',
    url: `${METADATA_BASE_URL}/cart`,
    siteName: 'Globumil',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/images/Products/Artboard1.png',
        width: 1200,
        height: 630,
        alt: 'Keranjang Belanja Globumil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keranjang Belanja - Globumil | Checkout Suplemen Kehamilan',
    description: 'Lihat dan kelola produk Globumil yang telah Anda pilih. Proses pemesanan mudah dan aman untuk suplemen kehamilan berkualitas tinggi.',
    images: ['/images/Products/Artboard1.png'],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function CartPage() {
  return <Cart />;
}