
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
      <div className="relative w-full h-[140vh] md:h-[100vh] bg-[#FEF4EA] overflow-hidden flex flex-col justify-start items-center">
        <div className="flex flex-col gap-10 md:flex-row items-center justify-between md:justify-center md:gap-6 w-full h-[70vh] px-8 md:px-34 md:pt-0">
          {/* Left: Text */}
          <div className="flex-1 h-[60%] max-w-xl text-center flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-[#E94F9A] mb-4 text-center w-full">Globumil</h2>
            <p className="text-base md:text-lg text-black leading-relaxed text-center md:text-left w-full line-clamp-[8]">
              Multivitamin dan mineral untuk ibu hamil selama masa kehamilan yang di formulasikan oleh dokter kandungan sub spesialis fetomaternal. Kami ingin memberikan suplemen yang terbaik untuk ibu hamil supaya janin didalam kandungan bisa tumbuh secara optimal dan ibu tetap sehat selama masa kehamilan karena kualitas manusia ditentukan dari tumbuh kembang mulai dari saat pembuahan dan perkembangan janin didalam kandungan. Untuk itu kita harus memastikan multivitamin dan mineral yang dibutuhkan ibu hamil selama kehamilan akan tercukupi dengan maksimal.
            </p>
          </div>
          {/* Right: Image */}
          <div className="flex-1 order-first md:order-last flex justify-center items-center mt-10 md:mt-0">
            <div className="shadow-xl relative bg-[#FFF6F8] rounded-tr-[3rem] rounded-tl-[9rem] rounded-br-[9rem] w-[320px] h-[400px] flex items-center justify-center overflow-hidden">
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
       
      <div className="relative w-full h-[150vh] md:h-[100vh] bg-white overflow-hidden flex flex-col justify-start items-center">
        <div className="flex flex-col gap-10 md:gap-0 md:flex-row items-center justify-between w-full h-[70vh] px-8 md:px-24 md:pt-0">
          {/* Left: Text */}
          <div className="h-[60%] md:w-[50%] text-center flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-[#E94F9A] mb-4 text-center w-full">Bahan - Bahan Kami</h2>
            <p className="text-base md:text-lg text-black leading-relaxed text-center md:text-left w-full line-clamp-[8]">
            1. Globumil mengandung asam folat untuk mencegah kecacatan pada janin <br></br>
            2. DHA untuk membantu perkembangan otak janin sehingga lebih optimal <br></br>
            3. FE/Zat besi berfungsi untuk mencegah anemia selama kehamilan dan mencegah terjadinya pendarahan setelah melahirkan <br></br>
            4. Kalsium untuk mencegah terjadinya osteoporosis dan mengurangi terjadinya hipertensi/preeklamsia selama kehamilan <br></br>
            5. Zinc untuk membantu menjaga imunitas tubuh ibu dan bayi <br></br>
            6. Mineral dan multivitamin untuk menjaga kualitas Asi dan Kesehatan ibu selama kehamilan
            </p>
          </div>
          {/* Right: Image */}
          <div className="relative order-first md:w-[50%] flex justify-center items-center mt-10 md:mt-0">
            <div className="shadow-xl relative bg-[#FEF4EA] rounded-tr-[3rem] rounded-tl-[9rem] rounded-br-[9rem] w-[320px] h-[400px] flex items-center justify-center overflow-hidden">
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
      <div className="relative w-full h-[130vh] md:h-[100vh] bg-[#FEF4EA] overflow-hidden flex flex-col justify-start items-center">
        <div className="flex flex-col gap-10 md:gap-0 md:flex-row items-center justify-between w-full h-[70vh] px-8 md:px-24 md:pt-0">
         
        </div>
        {/* Komitmen Kami Section */}
        <div className="w-full flex flex-col items-center justify-center bg-[#FEF4EA] py-12">
          <h2 className="text-3xl font-bold text-[#E94F9A] mb-10 text-center">Komitmen Kami</h2>
          <div className=" flex flex-col items-center w-full max-w-4xl px-4">
            {/* Top row: 2 cards */}
            <div className=" flex flex-row justify-center gap-8 mb-8 w-full">
              {komitmenItems.slice(0, 2).map((item, idx) => (
                <div key={idx} className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-64 h-56 hover:scale-105 transition-all duration-300">
                  <img src={item.icon} alt={item.alt} className="w-16 h-16 mb-4" />
                  <p className="text-center font-semibold text-black whitespace-pre-line">{item.title}</p>
                </div>
              ))}
            </div>
            {/* Second row: 3 cards on md+, 2 cards on mobile */}
            <div className="flex flex-row justify-center gap-8 w-full mb-8 md:mb-0">
              {komitmenItems.slice(2, 4).map((item, idx) => (
                <div key={idx} className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-64 h-56 hover:scale-105 transition-all duration-300">
                  <img src={item.icon} alt={item.alt} className="w-16 h-16 mb-4" />
                  <p className="text-center font-semibold text-black whitespace-pre-line">{item.title}</p>
                </div>
              ))}
              {/* Only show this card on md+ in this row */}
              <div className="hidden md:flex bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex-col items-center justify-center p-3 shadow-md w-64 h-56 hover:scale-105 transition-all duration-300">
                <img src={komitmenItems[4].icon} alt={komitmenItems[4].alt} className="w-16 h-16 mb-4" />
                <p className="text-center font-semibold text-black whitespace-pre-line">{komitmenItems[4].title}</p>
              </div>
            </div>
            {/* Last row: only show on mobile, 1 card centered */}
            <div className="flex flex-row justify-center gap-8 w-full md:hidden">
              <div className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-64 h-56 hover:scale-105 transition-all duration-300">
                <img src={komitmenItems[4].icon} alt={komitmenItems[4].alt} className="w-16 h-16 mb-4" />
                <p className="text-center font-semibold text-black whitespace-pre-line">{komitmenItems[4].title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
} 