import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';

export const KataParaAhliSection = () => {
 const experts = [
    {
      name: 'dr. Adhitya Ardhianto, Sp. OG, M. Kes',
      quote: 'Semasa kehamilan, memenuhi kebutuhan nutrisi menjadi pemegang peranan yang sangat penting ya bun. Khususnya kebutuhan gizi dan juga penyerapan mineral karena selama kehamilan tubuh bunda harus menyesuaikan dengan tumbuh kembang janin. Nutrisi yang paling dibutuhkan selama kehamilan ada asam folat, zat besi, kalsium dan mineral.',
      // Add image source here if available
      image: '/images/Home/KataAhli/DrAdhitya.png', // Replace with actual image path
    },
    {
      name: 'dr. Dewi Kartika DJ Anwar, Sp. OG',
      quote: 'Ibu hamil wajib mengonsumsi vitamin atau suplemen tambahan untuk menunjang kebutuhan vitamin untuk ibu dan calon bayi agar pertumbuhan janin terpenuhi. Salah satunya adalah Asam Folat karena dapat membantu mencegah cacat lahir, membantu tubuh dalam membuat DNA, membantu pertumbuhan sel, serta meningkatkan fungsi otak janin. Jika bumil rutin konsumsi asam folat, maka resiko cacat lahir dapat berkurang hingga 70%.',
      // Add image source here if available
      image: '/images/Home/KataAhli/DrDewi.png', // Replace with actual image path
    },
    {
      name: 'dr. M Firdinan Dekawan, Sp. OG',
      quote: 'Mengonsumsi makanan bergizi dan kaya vitamin, jelas menjadi langkah utama untuk memenuhi nutrisi selama kehamilan. Namun, ibu hamil juga disarankan mengonsumsi vitamin prenatal, untuk mencukupi kebutuhan nutrisi. Vitamin prenatal kaya akan mineral, asam folat, zat besi, yodium, serta kalsium yang sangat penting bagi perkembangan janin.',
      // Add image source here if available
      image: '/images/Home/KataAhli/DrFirdinan.png', // Replace with actual image path
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
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
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 ">
      <h2 className="text-2xl md:text-4xl font-semibold pb-5">Kata Para Ahli</h2>
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {experts.map((expert, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2">
                <div className="relative flex flex-col items-center">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gray-300 mb-4 z-10 overflow-hidden">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex flex-col items-center p-1 rounded-lg w-[95%] md:w-[90%] pt-16">
                    <div className='w-full bg-white flex flex-col items-center justify-start pt-10 rounded-[1rem] p-4 min-h-[300px]'>
                      <h3 className="text-lg font-semibold text-[#B91C7C] text-center mb-2">{expert.name}</h3>
                      <p className="text-[#4A5568] text-left text-sm line-clamp-10">{expert.quote}</p>
                    </div>
                  </div>
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
              index === selectedIndex ? 'bg-[#B91C7C]' : 'bg-[#9CA3AF] opacity-70'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : 'false'}
          >
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
