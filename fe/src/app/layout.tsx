import '@/app/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className='bg-[#FFF6F6]'>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-TPE6Q7S5HX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date()); 
            gtag('config', 'G-TPE6Q7S5HX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Navbar/>
        <main className='w-full bg-[#FFF6F6]'>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}