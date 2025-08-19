
import React from "react";
import Script from "next/script";
import Image from "next/image";
import { METADATA_BASE_URL } from '@/utils/constant';
import { generateBreadcrumbSchema } from '@/lib/schema';
import KomitmenCarousel from '@/components/KomitmenCarousel';
import PartnerCarousel from '@/components/PartnerCarousel';


const komitmenItems = [
  {
    icon: "/images/About/Icons/Janin.png",
    alt: "Membantu Tumbuh Kembang Janin",
    title: "Membantu Tumbuh\nKembang Janin",
     size:"w-16 h-16 mb-4"
  },
  {
    icon: "/images/About/Icons/Kimia.png",
    alt: "Bebas Zat Kimia Berbahaya",
    title: "Bebas\nZat Kimia Berbahaya",
     size:"w-16 h-16 mb-4"
  },
  {
    icon: "/images/About/Icons/Teruji.png",
    alt: "Teruji di Laboratorium",
    title: "Teruji\ndi Laboratorium",
     size:"w-16 h-16 mb-4"
  },
  {
    icon: "/images/About/Icons/Halal.png",
    alt: "Halal dan Terdaftar BPOM",
    title: "Halal dan\nTerdaftar BPOM",
   size:"w-28 h-25 mb-0"
  },
  {
    icon: "/images/About/Icons/Formulasi.png",
    alt: "Formulasi Bahan Alami Terpilih",
    title: "Formulasi Bahan\nAlami Terpilih",
     size:"w-16 h-16 mb-4"
  }
];
export default function About() {
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Beranda",
      url: METADATA_BASE_URL
    },
    {
      name: "Tentang Kami",
      url: `${METADATA_BASE_URL}/tentang_kami`
    }
  ]);

  // About page schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Tentang Kami - Globumil",
    "description": "Pelajari lebih lanjut tentang Globumil, perusahaan yang berkomitmen menghadirkan suplemen kehamilan berkualitas tinggi. Dipercaya oleh ribuan ibu hamil di Indonesia.",
    "url": `${METADATA_BASE_URL}/tentang_kami`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Globumil",
      "description": "Multivitamin dan mineral untuk ibu hamil yang diformulasikan oleh dokter kandungan sub spesialis fetomaternal",
      "url": METADATA_BASE_URL,
      "founder": {
        "@type": "Person",
        "name": "Tim Dokter Spesialis Kandungan"
      },
      "knowsAbout": [
        "Kesehatan Ibu Hamil",
        "Suplemen Kehamilan", 
        "Multivitamin",
        "Mineral untuk Kehamilan",
        "Perkembangan Janin"
      ],
      "areaServed": "Indonesia",
      "serviceType": "Healthcare Products"
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
       <div className="w-full h-auto mx-auto bg-white flex flex-col justify-start items-center">
      <div className="relative w-full min-h-[100vh] sm:min-h-[90vh] md:h-[100vh] bg-[#FEF4EA] overflow-hidden flex flex-col justify-start items-center">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-6 md:flex-row items-center justify-between md:justify-center w-full min-h-[75vh] sm:min-h-[65vh] md:h-[70vh] px-4 sm:px-8 md:px-34 py-6 sm:py-8 md:pt-0 pb-20 sm:pb-16 md:pb-0">
          {/* Left: Text */}
          <div className="flex-1 max-w-xl text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E94F9A] mb-3 sm:mb-4 text-center w-full">Globumil</h2>
            <p className="text-xs sm:text-sm md:text-lg text-black leading-relaxed text-center md:text-left w-full">
              Multivitamin dan mineral untuk ibu hamil selama masa kehamilan yang di formulasikan oleh dokter kandungan sub spesialis fetomaternal. Kami ingin memberikan suplemen yang terbaik untuk ibu hamil supaya janin didalam kandungan bisa tumbuh secara optimal dan ibu tetap sehat selama masa kehamilan karena kualitas manusia ditentukan dari tumbuh kembang mulai dari saat pembuahan dan perkembangan janin didalam kandungan. Untuk itu kita harus memastikan multivitamin dan mineral yang dibutuhkan ibu hamil selama kehamilan akan tercukupi dengan maksimal.
            </p>
          </div>
          {/* Right: Image */}
          <div className="flex-1 order-first md:order-last flex justify-center items-center">
            <div className="shadow-xl relative bg-[#FFF6F8] rounded-tr-[3rem] rounded-tl-[9rem] rounded-br-[9rem] w-[250px] sm:w-[280px] md:w-[320px] h-[310px] sm:h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden">
               <Image
                src="/images/About/1.png"
                alt="Globumil Woman"
                width={320}
                height={400}
                className="absolute bottom-[-1rem] left-0 object-contain w-full h-full scale-110 "
              />
            </div>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          fill="FFF6F6"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '120px' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,200 1440,0 L1440,200 L0,200 Z"
            fill="#FFF6F6"
          />
        </svg>
      </div>
       
      <div className="bg-[#FFF6F6] relative w-full min-h-[110vh] sm:min-h-[95vh] md:h-[100vh] overflow-hidden flex flex-col justify-start items-center">
        <div className="bg-[#FFF6F6] flex flex-col gap-4 sm:gap-6 md:gap-0 md:flex-row items-center justify-between w-full min-h-[80vh] sm:min-h-[70vh] md:h-[70vh] px-4 sm:px-8 md:px-24 py-6 sm:py-8 md:pt-0 pb-20 sm:pb-16 md:pb-0">
          {/* Left: Text */}
          <div className="md:w-[50%] text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E94F9A] mb-3 sm:mb-4 text-center w-full">Bahan - Bahan Kami</h2>
            <p className="text-xs text-left sm:text-sm md:text-lg text-black leading-relaxed w-full mb-10">
            1. Globumil mengandung asam folat untuk mencegah kecacatan pada janin <br></br>
            2. DHA untuk membantu perkembangan otak janin sehingga lebih optimal <br></br>
            3. FE/Zat besi berfungsi untuk mencegah anemia selama kehamilan dan mencegah terjadinya pendarahan setelah melahirkan <br></br>
            4. Kalsium untuk mencegah terjadinya osteoporosis dan mengurangi terjadinya hipertensi/preeklamsia selama kehamilan <br></br>
            5. Zinc untuk membantu menjaga imunitas tubuh ibu dan bayi <br></br>
            6. Mineral dan multivitamin untuk menjaga kualitas Asi dan Kesehatan ibu selama kehamilan
            </p>
          </div>
          {/* Right: Image */}
          <div className="relative order-first md:w-[50%] flex justify-center items-center">
            <div className="shadow-xl relative bg-[#FEF4EA] rounded-tr-[3rem] rounded-tl-[9rem] rounded-br-[9rem] w-[250px] sm:w-[280px] md:w-[320px] h-[310px] sm:h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden">
               <Image
                src="/images/About/2.avif"
                alt="Globumil Woman"
                width={320}
                height={400}
                className="absolute bottom-[-1rem] left-0 object-contain w-full h-full scale-110"
              />
            </div>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          fill="#FFF6F6"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '120px' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,200 1440,0 L1440,200 L0,200 Z"
            fill="#FEF4EA"
          />
        </svg>
      </div>
      <div className="relative w-full md:h-[100vh] overflow-hidden flex flex-col justify-start items-center">
        {/* Komitmen Kami Section */}
        <div className="w-full flex flex-col items-center justify-center bg-[#FEF4EA] pb-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E94F9A] mb-6 sm:mb-10 text-center px-4">Komitmen Kami</h2>
          <KomitmenCarousel komitmenItems={komitmenItems} />
        </div>
      </div>

      {/* Partner Section */}
      <div className="w-full pt-8">
        <PartnerCarousel />
      </div>
    </div>
    </div>

    {/* About page schemas */}
    <Script 
      type="application/ld+json" 
      id="about-page-schema" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} 
    />
    <Script 
      type="application/ld+json" 
      id="about-breadcrumb-schema" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
    />
  </>
  );
} 