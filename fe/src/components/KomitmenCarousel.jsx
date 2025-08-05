"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const KomitmenCarousel = ({ komitmenItems }) => {
  // Carousel setup for mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    breakpoints: {
      '(min-width: 640px)': { active: false } // Disable carousel on sm+ screens
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
    <>
      {/* Mobile Carousel View */}
      <div className="sm:hidden w-full flex flex-col items-center">
        <div className="w-full max-w-sm overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {komitmenItems.map((item, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 flex justify-center px-4">
                <div className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-full max-w-64 h-56 hover:scale-105 transition-all duration-300">
                  <img src={item.icon} alt={item.alt} className="w-16 h-16 mb-4" />
                  <p className="text-center font-semibold text-black whitespace-pre-line text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Carousel Dots */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full transition-colors ${
                index === selectedIndex ? 'bg-[#E94F9A]' : 'bg-[#9CA3AF] opacity-70'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            >
            </button>
          ))}
        </div>
      </div>

      {/* Desktop/Tablet Grid View - Static for SEO */}
      <div className="hidden sm:flex flex-col items-center w-full max-w-4xl px-4">
        {/* Top row: 2 cards */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-4 sm:mb-8 w-full">
          {komitmenItems.slice(0, 2).map((item, idx) => (
            <div key={idx} className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-full max-w-64 mx-auto sm:w-64 h-56 hover:scale-105 transition-all duration-300">
              <img src={item.icon} alt={item.alt} className="w-16 h-16 mb-4" />
              <p className="text-center font-semibold text-black whitespace-pre-line text-sm sm:text-base">{item.title}</p>
            </div>
          ))}
        </div>
        {/* Second row: Show remaining 3 cards */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full">
          {komitmenItems.slice(2, 5).map((item, idx) => (
            <div key={idx + 2} className="bg-white rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-[2rem] flex flex-col items-center justify-center p-3 shadow-md w-full max-w-64 mx-auto sm:w-64 h-56 hover:scale-105 transition-all duration-300">
              <img src={item.icon} alt={item.alt} className="w-16 h-16 mb-4" />
              <p className="text-center font-semibold text-black whitespace-pre-line text-sm sm:text-base">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default KomitmenCarousel;