import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';

const items = [
  {
    icon: '/images/Home/Keunggulan/BPOM.png',
    title: 'Berizin Resmi BPOM RI',
    desc: 'Globumil telah memiliki izin edar resmi dari BPOM',
  },
  {
    icon: '/images/Home/Keunggulan/MUI.png',
    title: 'Produk Halal MUI',
    desc: 'Globumil Sudah Legal dan memiliki sertifikat izin Halal dari MUI sehingga aman untuk dikonsumsi',
  },
  {
    icon: '/images/Home/Keunggulan/Berkualitas.png',
    title: 'Bahan Berkualitas',
    desc: 'Globumil Diformulasikan oleh dokter spesialis kandungan yang telah diuji klinis berdasarkan bahan berkualitas & diproses secara higienis',
  },
];

const KeunggulanCarousel = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="w-full scale-75 md:scale-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 px-4">
              <div className="bg-[#FFD1DA] rounded-[2rem] flex flex-col items-center px-6 py-4 w-full max-w-sm min-h-[260px] shadow-2lg mx-auto">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-46 h-14 mb-4"
                />
                <h3 className="text-xl font-bold text-black text-center mb-2">{item.title}</h3>
                <p className="text-base text-black text-center">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-colors ${
            index === selectedIndex ? 'bg-[#f39aab]' : 'bg-[#ee718a] opacity-50'
            }`}
            onClick={() => scrollTo(index)}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export const KeunggulanSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center md:pb-[84px] px-2">
      <h2 className="text-2xl md:text-4xl font-bold text-center pt-8 md:pb-10 ">Keunggulan Globumil</h2>
      
      {/* Mobile Carousel */}
      <div className="w-full flex flex-col items-center justify-center md:hidden">
        <KeunggulanCarousel items={items} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row gap-6 w-full max-w-6xl justify-center items-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#FFD1DA] rounded-[2rem] flex flex-col items-center px-6 py-4 w-1/3 max-w-sm min-h-[260px] shadow-2lg"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-46 h-14 mb-4 "
            />
            <h3 className="text-xl font-bold text-black text-center mb-2">{item.title}</h3>
            <p className="text-base text-black text-center line-clamp-4">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

