"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const PartnerCarousel = () => {
  // Partner hospitals data
  const partners = [
    { image: 'INSANI.avif', name: 'RSIA CITRA INSANI' },
    { image: 'ASSALAM.avif', name: 'RSIA ASSALAM' },
    { image: 'LIRAMEDIKA.avif', name: 'RS LIRA MEDIKA' },
    { image: 'AYSHA.avif', name: 'RSI AYSHA' },
    { image: 'PENA.avif', name: 'RS PENA 98' },
    { image: 'BUNDASURYATNI.avif', name: 'RSIA BUNDA SURYANTI' },
    { image: 'SENTOSA.avif', name: 'RS SENTOSA' },
    { image: 'RSCITAMA.avif', name: 'RS CITAMA' }
  ];

  // Doctors data
  const dokters = [
    { image: 'Ieke.avif', name: 'Dr. Ieke Harsya Barliana, Sp. OG' },
    { image: 'Adit.avif', name: 'Dr. Adhitya Ardhianto, Sp. OG' },
    { image: 'Jeffry.avif', name: 'Dr. Jeffry Kristiawan' },
    { image: 'Novi.avif', name: 'Bidan Novia, Amd, Keb' },
    { image: 'Dinda.avif', name: 'Bidan Adinda, Amd, Keb' },
    { image: 'Dewi.avif', name: 'Dr. Dewi Kartika, Sp. OG' }
  ];

  // Split partners into slides of 3
  const partnerSlides = [];
  for (let i = 0; i < partners.length; i += 3) {
    partnerSlides.push(partners.slice(i, i + 3));
  }

  // Carousel setup for hospital partners
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 }
    }
  });

  // Carousel setup for doctors (mobile only)
  const [emblaRefDoctors, emblaApiDoctors] = useEmblaCarousel({
    align: 'start',
    loop: false,
    breakpoints: {
      '(min-width: 768px)': { active: false } // Disable carousel on desktop
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  
  const [selectedIndexDoctors, setSelectedIndexDoctors] = useState(0);
  const [scrollSnapsDoctors, setScrollSnapsDoctors] = useState([]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollToDoctors = useCallback((index) => emblaApiDoctors && emblaApiDoctors.scrollTo(index), [emblaApiDoctors]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onInitDoctors = useCallback((emblaApi) => {
    setScrollSnapsDoctors(emblaApi.scrollSnapList());
  }, []);

  const onSelectDoctors = useCallback((emblaApi) => {
    setSelectedIndexDoctors(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    if (!emblaApiDoctors) return;

    onInitDoctors(emblaApiDoctors);
    onSelectDoctors(emblaApiDoctors);
    emblaApiDoctors.on('reInit', onInitDoctors);
    emblaApiDoctors.on('select', onSelectDoctors);
  }, [emblaApiDoctors, onInitDoctors, onSelectDoctors]);

  // Modal state for images
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      {/* Hospital Partners Section */}
      <section className="flex flex-col items-center justify-center mx-auto w-[85%] md:w-[90%] md:mb-0 mb-8 md:scale-105 ">
        <div className="col-md-12 heading-section text-center mb-6">
          <h2 className="text-3xl font-bold text-[#E94F9A] pb-1">Partner Kami</h2>
        </div>
       
        <div className="w-full md:w-[80%] h-[90%] md:mt-0 md:h-[80%] flex flex-col items-center justify-center md:gap-4">
          <div className="w-full md:w-[70%] h-auto overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {partnerSlides.map((slide, slideIndex) => (
                <div key={slideIndex} className="flex-[0_0_100%] min-w-0 flex justify-center">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {slide.map((partner, partnerIndex) => (
                      <div key={partnerIndex} className="flex flex-col items-center justify-center">
                        <div className="relative flex flex-col items-center justify-center">
                          <Image
                            src={`/images/About/PartnerKami/RumahSakit/${partner.image}`}
                            alt={partner.name}
                            width={300}
                            height={100}
                            className="w-[200px] md:h-[100px] object-contain rounded-lg mb-4"
                          />
                           
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center items-center space-x-2 md:scale-100 scale-75">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-1 h-1 md:w-3 md:h-3 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-[#E94F9A]' : 'bg-[#9CA3AF] opacity-30'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex ? 'true' : 'false'}
              >
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="flex flex-col items-center justify-center w-full mx-auto mb-16 overflow-x-hidden md:scale-80">
        <div className="flex flex-col items-center justify-center w-full h-full md:h-[80%] rounded-[1.5rem] md:rounded-[3rem] mt-2 md:mt-1 pb-8">
           

          {/* Mobile Carousel View */}
          <div className="md:hidden w-full flex flex-col items-center">
            <div className="w-[85%] md:w-[70%] h-auto overflow-hidden" ref={emblaRefDoctors}>
              <div className="flex">
                {Array.from({ length: Math.ceil(dokters.length / 3) }, (_, slideIndex) => (
                  <div key={slideIndex} className="flex-[0_0_100%] min-w-0 flex justify-center">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      {dokters.slice(slideIndex * 3, slideIndex * 3 + 3).map((dokter, dokterIndex) => (
                        <div key={dokterIndex} className="flex flex-col items-center justify-center">
                          <div className="relative flex flex-col items-center justify-center">
                            <Image
                              src={`/images/About/PartnerKami/Dokter/${dokter.image}`}
                              alt={dokter.name}
                              width={300}
                              height={100}
                              className="w-[200px] md:h-[100px] object-contain rounded-lg mb-4 cursor-pointer bg-white"
                              onClick={() => openModal(`/images/About/PartnerKami/Dokter/${dokter.image}`)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Carousel Dots */}
            <div className="flex justify-center items-center mt-4 space-x-2 md:scale-100 scale-75">
              {Array.from({ length: Math.ceil(dokters.length / 3) }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === selectedIndexDoctors ? 'bg-[#E94F9A]' : 'bg-[#9CA3AF] opacity-70'
                  }`}
                  onClick={() => scrollToDoctors(index)}
                  aria-label={`Go to doctor slide ${index + 1}`}
                  aria-current={index === selectedIndexDoctors ? 'true' : 'false'}
                >
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:block w-full md:w-[70%]">
            <div className="grid grid-cols-3 justify-items-center mb-6">
              {dokters.map((dokter, index) => (
                <div key={index} className="relative flex flex-col items-center justify-center md:h-[300px] p-1">
                  <div className="flex flex-col items-center justify-center w-full h-full rounded-xl cursor-pointer bg-white">
                    <Image
                      src={`/images/About/PartnerKami/Dokter/${dokter.image}`}
                      alt={dokter.name}
                      width={200}
                      height={300}
                      className="w-full h-full object-contain"
                      onClick={() => openModal(`/images/About/PartnerKami/Dokter/${dokter.image}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for image preview */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-3xl max-h-3xl p-4">
            <Image
              src={modalImage}
              alt="Preview"
              width={600}
              height={600}
              className="w-auto h-auto max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PartnerCarousel;