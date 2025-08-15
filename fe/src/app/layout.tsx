import '@/app/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { METADATA_BASE_URL } from '@/utils/constant'

export const metadata = {
  metadataBase: new URL(METADATA_BASE_URL || 'https://hallobundapedia.id'),
}

// Preload critical resources
const preloadLinks = [
  {
    rel: 'preload',
    href: '/images/Hero1.webp',
    as: 'image',
    type: 'image/webp',
    fetchpriority: 'high'
  }
]

export default function RootLayout({children}) {
  return (
    <html lang="id">
      <head>
        {/* Preload critical LCP image */}
        <link
          rel="preload"
          href="/images/Hero1.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-MDESSVBQ2D`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date()); 
            gtag('config', 'G-MDESSVBQ2D', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <meta name="google-site-verification" content="q94tAtrdzWyu1zk5MhciIR58PiP5oT02T4sG5Jam5OM" />
      </head>
      <body className='bg-[#FFF6F6]'>
      
        
        {/* Organization Schema */}
        <Script 
          id="organization-schema" 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* Website Schema */}
        <Script 
          id="website-schema" 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        <Navbar/>
        <main className='w-full bg-[#FFF6F6]'>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}