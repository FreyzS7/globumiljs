"use client";
import Link from 'next/link';
import { useFetch } from '../../hooks/useFetch';
import { articleService } from '../../services/api';
import { UPLOADS_URL , ARTICLE_URL , VIEW_ARTICLE_URL} from '../../utils/constant';
import { Button } from "@/components/ui/button"
import { HeroSection } from './HeroSection.jsx';
import { ManfaatSection } from './ManfaatSection.jsx';
import { KeunggulanSection } from './KeunggulanSection.jsx';
import { KataParaAhliSection } from './KataParaAhliSection.jsx';
import { FaktaSection } from './FaktaSection.jsx';
import { InfoSection } from './InfoSection.jsx';
import { FAQSection } from './FAQSection.jsx';
import { ArtikelGlobumilSection } from './ArtikelGlobumilSection.jsx';
import Script from 'next/script';

export default function Home() {
  const { data: featuredArticles, loading } = useFetch(() => articleService.getMostViewed(5));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Globumil Multivitamin dan Mineral Ibu Hamil",
    "url": "https://globumil.com",
    "description": "Globumil Multivitamin dan Mineral Ibu Hamil mendukung kesehatan ibu dan janin dengan kandungan vitamin dan mineral penting.",
    "publisher": {
      "@type": "Organization",
      "name": "Globumil",
      "logo": {
        "@type": "ImageObject",
        "url": "/images/About/bidannovi.jpg"
      }
    }
  };

  return   (
    <>
      <div className="flex flex-col items-center justify-center">
        <HeroSection />
        <ManfaatSection />
        <KeunggulanSection />
        <FAQSection />
        <ArtikelGlobumilSection title="Artikel Globumil" description="Berita & Edukasi Kehamilan" background = {false}/>
        <KataParaAhliSection />
      </div>
      <Script type="application/ld+json" id="jsonld-homepage" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
);
}
