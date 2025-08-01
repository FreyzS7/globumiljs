import React from 'react'
import Home from '@/custompages/Home/Index'
import { BASE_URL, METADATA_BASE_URL } from '@/utils/constant'

export const metadata = {
  title: 'Globumil Multivitamin dan Mineral Ibu Hamil',
  description: 'Globumil Multivitamin dan Mineral Ibu Hamil mendukung kesehatan ibu dan janin dengan kandungan vitamin dan mineral penting.',
  keywords: 'Globumil, Multivitamin Ibu Hamil, Suplemen Kehamilan, Vitamin untuk Ibu Hamil, Folic Acid, DHA, Mineral Ibu Hamil, Kesehatan Ibu Hamil, Nutrisi Kehamilan, Suplemen Kehamilan Sehat',
  authors: [{ name: 'Globumil Team' }],
  creator: 'Globumil',
  publisher: 'Globumil',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // metadataBase: new URL('https://globumil.com'),
  alternates: {
    canonical: METADATA_BASE_URL,
  },
  openGraph: {
    title: 'Globumil Multivitamin dan Mineral Ibu Hamil',
    description: 'Globumil Multivitamin dan Mineral Ibu Hamil mendukung kesehatan ibu dan janin dengan kandungan vitamin dan mineral penting.',
    url: METADATA_BASE_URL,
    siteName: 'Globumil',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/images/About/bidannovi.jpg',
        width: 1200,
        height: 630,
        alt: 'Globumil - Tim Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Globumil | Komitmen Kesehatan Ibu dan Janin',
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

const HomePage = () => {
  return (
    <Home/>
  )
}

export default HomePage
