/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');
const articlesPath = path.join(__dirname, 'data/articles_id_title_slug.json');
let articles = [];
if (fs.existsSync(articlesPath)) {
  try {
    articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  } catch (e) {
    console.warn('Warning: Cannot parse articles_id_title_slug.json. SEO redirect will be skipped!');
    articles = [];
  }
} else {
  console.warn('Warning: articles_id_title_slug.json not found. SEO redirect will be skipped!');
}
const nextConfig = {
  // Image configuration for static export
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.globumil.com',
        port: '',
        pathname: '/uploads/**',
      }
    ],
  },
  
  // Optimize production builds
  compiler: {
    // Remove console.log in production
    removeConsole: false, // Temporarily disabled for debugging
  },
  
  // External packages for server components
  serverExternalPackages: ['axios'],
  
  // Enable strict mode for better error catching
  reactStrictMode: true,
  
  // Enable static export for production
  //output: 'export',
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://globumil.com/api',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://globumil.com',
    NEXT_PUBLIC_UPLOADS_URL: process.env.NEXT_PUBLIC_UPLOADS_URL || 'https://globumil.com/uploads/',
    API_URL_SERVER: process.env.API_URL_SERVER || process.env.API_BASE_URL || process.env.SERVER_API_BASE_URL || 'https://globumil.com/api',
    NEXT_PUBLIC_METADATA_BASE_URL: process.env.NEXT_PUBLIC_METADATA_BASE_URL || 'https://globumil.com',
  },
  
  // Trailing slash consistency
  trailingSlash: false,
 async redirects() {
    const manualRedirects = [
      {
        source: '/index.php',  // Match any URL starting with /index.php
        destination: '/',     // Redirect to the root
        permanent: true,           // Permanent redirect
      },
      {
        source: '/artikel_kami',
        destination: '/artikel',
        permanent: true,
      },{
        source: '/produk_kami/produk_kami2',
        destination: '/produk_kami',
        permanent: true,
      },{
        source: '/artikel/lihat_artikel/329/5-manfaat-vitamin-d-untuk-kesuburan-dan-kehamilan-dengan-globumil-globumil',
        destination: '/artikel/lihat_artikel/329/5-manfaat-vitamin-d-untuk-kesuburan-kehamilan-dengan-globumil-globumil',
        permanent: true,
      },
      
    ];

     const articleRedirects = articles.flatMap(article => [
      {
        source: `/Artikel_kami/lihat_artikel/${article.id}`,
        destination: `/artikel/lihat_artikel/${article.id}/${article.slug}`,
        permanent: true,
      }, {
        source: `/artikel/lihat_artikel/${article.id}`,
        destination: `/artikel/lihat_artikel/${article.id}/${article.slug}`,
        permanent: true,
      }, {
        source: `/Artikel_kami/lihat_artikel/${article.id}`,
        destination: `/artikel/lihat_artikel/${article.id}/${article.slug}`,
        permanent: true,
      },
      {
       source: `/index.php/Artikel_kami/lihat_artikel/${article.id}`,
        destination: `/artikel/lihat_artikel/${article.id}/${article.slug}`,
        permanent: true,
      },
      {
       source: `/index.php/artikel/lihat_artikel/${article.id}`,
        destination: `/artikel/lihat_artikel/${article.id}/${article.slug}`,
        permanent: true,
      },
    
    ]);
    return [
      ...manualRedirects,
      ...articleRedirects
    ];
  },

};
module.exports = nextConfig;

