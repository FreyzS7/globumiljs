import About from '@/custompages/About/Index';
import { BASE_URL, METADATA_BASE_URL } from '@/utils/constant'


export const metadata = {
  title: 'Tentang Kami - Globumil | Komitmen Kesehatan Ibu dan Janin',
  description: 'Pelajari lebih lanjut tentang Globumil, perusahaan yang berkomitmen menghadirkan suplemen kehamilan berkualitas tinggi. Dipercaya oleh ribuan ibu hamil di Indonesia dengan produk yang aman dan teruji klinis.',
  keywords: 'tentang Globumil, sejarah Globumil, visi misi Globumil, perusahaan suplemen kehamilan, tim Globumil, profil perusahaan, brand Globumil, kepercayaan ibu hamil',
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
    canonical: BASE_URL + 'tentang_kami',
  },
  openGraph: {
    title: 'Tentang Kami - Globumil | Komitmen Kesehatan Ibu dan Janin',
    description: 'Pelajari lebih lanjut tentang Globumil, perusahaan yang berkomitmen menghadirkan suplemen kehamilan berkualitas tinggi. Dipercaya oleh ribuan ibu hamil di Indonesia dengan produk yang aman dan teruji klinis.',
    url: `${METADATA_BASE_URL}/tentang_kami`,
    siteName: 'Globumil',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/images/About/bidannovi.jpg',
        width: 1200,
        height: 630,
        alt: 'Tentang Globumil - Tim Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami - Globumil | Komitmen Kesehatan Ibu dan Janin',
    description: 'Pelajari lebih lanjut tentang Globumil, perusahaan yang berkomitmen menghadirkan suplemen kehamilan berkualitas tinggi. Dipercaya oleh ribuan ibu hamil di Indonesia.',
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
}

export default function AboutPage() {
  return <About/>;
}