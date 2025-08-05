
import React from "react";
import Image from "next/image";


const komitmenItems = [
  {
    icon: "/images/About/Icons/Janin.png",
    alt: "Membantu Tumbuh Kembang Janin",
    title: "Membantu Tumbuh\nKembang Janin"
  },
  {
    icon: "/images/About/Icons/Kimia.png",
    alt: "Bebas Zat Kimia Berbahaya",
    title: "Bebas\nZat Kimia Berbahaya"
  },
  {
    icon: "/images/About/Icons/Teruji.png",
    alt: "Teruji di Laboratorium",
    title: "Teruji\ndi Laboratorium"
  },
  {
    icon: "/images/About/Icons/Halal.png",
    alt: "Halal dan Terdaftar BPOM",
    title: "Halal dan\nTerdaftar BPOM"
  },
  {
    icon: "/images/About/Icons/Formulasi.png",
    alt: "Formulasi Bahan Alami Terpilih",
    title: "Formulasi Bahan\nAlami Terpilih"
  }
];
export default function About() {
  return (
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
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '120px' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,200 1440,0 L1440,200 L0,200 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
       
      <div className="relative w-full min-h-[110vh] sm:min-h-[95vh] md:h-[100vh] bg-white overflow-hidden flex flex-col justify-start items-center">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-0 md:flex-row items-center justify-between w-full min-h-[80vh] sm:min-h-[70vh] md:h-[70vh] px-4 sm:px-8 md:px-24 py-6 sm:py-8 md:pt-0 pb-20 sm:pb-16 md:pb-0">
          {/* Left: Text */}
          <div className="md:w-[50%] text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E94F9A] mb-3 sm:mb-4 text-center w-full">Bahan - Bahan Kami</h2>
            <p className="text-xs sm:text-sm md:text-lg text-black leading-relaxed text-center md:text-left w-full">
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
                src="/images/About/2.png"
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
          fill="none"
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
      <div className="relative w-full min-h-screen md:h-[100vh] bg-[#FEF4EA] overflow-hidden flex flex-col justify-start items-center">
        {/* Komitmen Kami Section */}
        <div className="w-full flex flex-col items-center justify-center bg-[#FEF4EA] py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E94F9A] mb-6 sm:mb-10 text-center px-4">Komitmen Kami</h2>
          <div className="flex flex-col items-center w-full max-w-4xl px-4">
            {/* Top row: 2 cards */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-4 sm:mb-8 w-full">
              {komitmenItems.slice(0, 2).map((item, idx) => (
                <div key={idx} className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-full max-w-64 mx-auto sm:w-64 h-56 hover:scale-105 transition-all duration-300">
                  <img src={item.icon} alt={item.alt} className="w-16 h-16 mb-4" />
                  <p className="text-center font-semibold text-black whitespace-pre-line text-sm sm:text-base">{item.title}</p>
                </div>
              ))}
            </div>
            {/* Second row: 3 cards on md+, 2 cards on mobile */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full mb-4 sm:mb-8 md:mb-0">
              {komitmenItems.slice(2, 4).map((item, idx) => (
                <div key={idx} className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-full max-w-64 mx-auto sm:w-64 h-56 hover:scale-105 transition-all duration-300">
                  <img src={item.icon} alt={item.alt} className="w-16 h-16 mb-4" />
                  <p className="text-center font-semibold text-black whitespace-pre-line text-sm sm:text-base">{item.title}</p>
                </div>
              ))}
              {/* Only show this card on md+ in this row */}
              <div className="hidden md:flex bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex-col items-center justify-center p-3 shadow-md w-64 h-56 hover:scale-105 transition-all duration-300">
                <img src={komitmenItems[4].icon} alt={komitmenItems[4].alt} className="w-16 h-16 mb-4" />
                <p className="text-center font-semibold text-black whitespace-pre-line">{komitmenItems[4].title}</p>
              </div>
            </div>
            {/* Last row: only show on mobile/tablet, 1 card centered */}
            <div className="flex flex-row justify-center gap-4 sm:gap-8 w-full md:hidden">
              <div className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-full max-w-64 mx-auto sm:w-64 h-56 hover:scale-105 transition-all duration-300">
                <img src={komitmenItems[4].icon} alt={komitmenItems[4].alt} className="w-16 h-16 mb-4" />
                <p className="text-center font-semibold text-black whitespace-pre-line text-sm sm:text-base">{komitmenItems[4].title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
} 