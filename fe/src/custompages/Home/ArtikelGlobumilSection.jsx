"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { articleService } from '../../services/api';
import { UPLOADS_URL, VIEW_ARTICLE_URL } from '../../utils/constant';
import useEmblaCarousel from 'embla-carousel-react';
import formatUrlTitle from '../../utils/String';
import Link from 'next/link';
import Image from 'next/image';

const shortenAltText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
const EmblaCarousel = ({ articles }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
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
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {articles.map((article) => (
            <div key={article.id_artikel} className="flex-[0_0_100%] min-w-0 px-4">
              <Link
                href={`${VIEW_ARTICLE_URL}/${article.id_artikel}/${formatUrlTitle(article.judul)}`}
                className="flex flex-col items-center"
              >

                <img
                  src={`${UPLOADS_URL}${article.gambar}`}
                   alt={shortenAltText(article.judul,30) }
                  className="h-[200px] w-[350px] object-cover rounded-[2rem] mb-4"
                />
                <p className="text-center text-base font-medium text-black px-2">
                  {article.judul}
                </p>
              </Link>
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

export const ArtikelGlobumilSection = ({title, description} ) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
    articleService.getAll()
      .then(res => {
        const articlesData = Array.isArray(res.data.data.data) ? res.data.data.data : [];
        setArticles(articlesData.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setArticles([]);
        setLoading(false);
      });
  }, []);


  return (
    <section className="w-full flex flex-col items-center justify-center py-12 px-2">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-2">{title ? title : 'Artikel Globumil'}</h2>
      <p className="text-xl text-center mb-10">{description ? description : 'Berita & Edukasi Kehamilan'}</p>
       
      {/* Mobile Carousel */}
      <div className="w-full max-w-6xl md:hidden">
        {loading ? (
          <div className="w-full flex justify-center items-center min-h-[200px]">Loading...</div>
        ) : (
          <EmblaCarousel articles={articles} />
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row gap-8 w-full max-w-6xl justify-center items-center">
        {loading ? (
          <div className="w-full flex justify-center items-center min-h-[200px]">Loading...</div>
        ) : (
          articles.map((article) => (
            <Link
              key={article.id_artikel}
              href={`/${VIEW_ARTICLE_URL}/${article.id_artikel}/${formatUrlTitle(article.judul)}`}
              className="flex flex-col items-center w-full md:w-1/3 max-w-sm hover:scale-105 transition-transform duration-200"
            >

              <Image 
                alt={shortenAltText(article.judul,30) }
                width={500}
                height={300}
                src={`${UPLOADS_URL}${article.gambar}`}
                className='h-[200px] w-[350px] object-cover rounded-[2rem] mb-4'
              />
              <p className="text-center text-base font-medium text-black">
                {article.judul}
              </p>
            </Link>
          ))
        )}
      </div>

  
    </section>
  );
} 