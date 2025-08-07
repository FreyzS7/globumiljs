import { METADATA_BASE_URL, UPLOADS_URL } from '@/utils/constant';

// Organization Schema - Main company information
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Globumil",
  "alternateName": "PT Globumil Indonesia",
  "url": METADATA_BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${METADATA_BASE_URL}/images/LogoGlobumil.png`,
    "width": 200,
    "height": 100
  },
  "description": "Globumil adalah perusahaan farmasi yang mengkhususkan diri dalam produksi multivitamin dan mineral untuk ibu hamil dan menyusui. Berkomitmen memberikan nutrisi terbaik untuk kesehatan ibu dan janin.",
  "foundingDate": "2020",
  "industry": "Healthcare & Pharmaceuticals",
  "areaServed": {
    "@type": "Country",
    "name": "Indonesia"
  },
  "brand": {
    "@type": "Brand",
    "name": "Globumil",
    "slogan": "Komitmen Kesehatan Ibu dan Janin"
  },
  "sameAs": [
    "https://instagram.com/globumil_official",
    "https://tiktok.com/@globumil_official"
  ]
};

// Website Schema with search functionality
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Globumil",
  "alternateName": "Globumil - Multivitamin dan Mineral Ibu Hamil",
  "url": METADATA_BASE_URL,
  "description": "Platform resmi Globumil menyediakan informasi lengkap tentang multivitamin untuk ibu hamil, artikel kesehatan kehamilan, dan produk berkualitas untuk mendukung kesehatan ibu dan janin.",
  "publisher": {
    "@id": `${METADATA_BASE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${METADATA_BASE_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "id-ID"
};

// Article Schema generator
export const generateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${METADATA_BASE_URL}/artikel/lihat_artikel/${article.id_artikel}/${article.slug || article.judul.replace(/\s+/g, '-').toLowerCase()}`,
    "headline": article.judul,
    "description": article.kata_awal ? article.kata_awal.replace(/<[^>]*>/g, '').substring(0, 160) : article.judul,
    "image": {
      "@type": "ImageObject",
      "url": `${UPLOADS_URL}${article.gambar}`,
      "width": 800,
      "height": 600
    },
    "author": {
      "@type": "Person",
      "name": article.admin || "Tim Globumil"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Globumil",
      "logo": {
        "@type": "ImageObject",
        "url": `${METADATA_BASE_URL}/images/LogoGlobumil.png`,
        "width": 200,
        "height": 100
      }
    },
    "datePublished": article.tanggal_input,
    "dateModified": article.tanggal_update || article.tanggal_input,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${METADATA_BASE_URL}/artikel/lihat_artikel/${article.id_artikel}/${article.slug || article.judul.replace(/\s+/g, '-').toLowerCase()}`
    },
    "articleSection": article.nama_kategori || "Kesehatan",
    "wordCount": article.isi_artikel ? article.isi_artikel.replace(/<[^>]*>/g, '').split(' ').length : null,
    "inLanguage": "id-ID",
    "about": {
      "@type": "Thing",
      "name": "Kesehatan Ibu Hamil"
    },
    "keywords": ["kesehatan ibu hamil", "multivitamin", "kehamilan", "nutrisi ibu hamil", "globumil"]
  };
};

// Product Schema generator
export const generateProductSchema = (product) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${METADATA_BASE_URL}/produk_kami/tampil_produk/${product.id_produk}/${product.slug || product.nama_produk.replace(/\s+/g, '-').toLowerCase()}`,
    "name": product.nama_produk,
    "description": product.deskripsi ? product.deskripsi.replace(/<[^>]*>/g, '').substring(0, 500) : product.nama_produk,
    "image": {
      "@type": "ImageObject",
      "url": `${UPLOADS_URL}${product.gambar_produk}`,
      "width": 800,
      "height": 600
    },
    "brand": {
      "@type": "Brand",
      "name": "Globumil"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Globumil"
    },
    "category": "Health & Beauty > Health Care > Vitamins & Supplements",
    "productID": product.id_produk,
    "sku": product.sku || product.id_produk,
    "offers": {
      "@type": "Offer",
      "url": `${METADATA_BASE_URL}/produk_kami/tampil_produk/${product.id_produk}/${product.slug || product.nama_produk.replace(/\s+/g, '-').toLowerCase()}`,
      "priceCurrency": "IDR",
      "price": product.harga || "85000",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Globumil"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "15000",
          "currency": "IDR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "ID"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 7,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "ID",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || "4.5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": product.review_count || "50"
    },
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": 18,
      "suggestedGender": "female"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Target Audience",
        "value": "Ibu Hamil dan Menyusui"
      },
      {
        "@type": "PropertyValue", 
        "name": "Country of Origin",
        "value": "Indonesia"
      }
    ]
  };
};

// FAQ Schema generator
export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Breadcrumb Schema generator
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// LocalBusiness Schema (if applicable)
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Globumil",
  "image": `${METADATA_BASE_URL}/images/LogoGlobumil.png`,
  "url": METADATA_BASE_URL,
  "telephone": "+62-xxx-xxx-xxxx", // Update with actual phone
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ID",
    "addressRegion": "Jakarta" // Update with actual location
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.2088, // Update with actual coordinates
    "longitude": 106.8456
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://instagram.com/globumil_official",
    "https://tiktok.com/@globumil_official"
  ]
};

// Medical Organization Schema (for health-related content)
export const medicalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Globumil",
  "url": METADATA_BASE_URL,
  "logo": `${METADATA_BASE_URL}/images/LogoGlobumil.png`,
  "description": "Organizasi kesehatan yang menyediakan informasi dan produk berkualitas untuk kesehatan ibu hamil dan menyusui",
  "medicalSpecialty": "Obstetrics and Gynecology",
  "areaServed": "Indonesia"
};

// Collection Page Schema (for article and product listings)
export const generateCollectionPageSchema = (type, items, page = 1) => {
  const baseUrl = type === 'articles' ? '/artikel' : '/produk_kami';
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": type === 'articles' ? "Artikel Kesehatan" : "Produk Globumil",
    "description": type === 'articles' 
      ? "Kumpulan artikel kesehatan kehamilan dan tips untuk ibu hamil"
      : "Koleksi produk multivitamin dan suplemen untuk ibu hamil",
    "url": `${METADATA_BASE_URL}${baseUrl}${page > 1 ? `/${page}` : ''}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": items.length,
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": type === 'articles' 
          ? generateArticleSchema(item)
          : generateProductSchema(item)
      }))
    }
  };
};