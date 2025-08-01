import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

import { articleService } from '../../services/api';
import { ARTICLE_URL, UPLOADS_URL, VIEW_ARTICLE_URL } from '../../utils/constant';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import formatUrlTitle from '../../utils/String';
import { useParams, useSearchParams } from 'next/navigation';
const PAGE_SIZE = 9;

// Function to convert spaces to hyphens and handle special characters


export default function Articles() {
  const { page: pageParam } = useParams();
  const router = useRouter();
  
  // State for articles
  const [articles, setArticles] = useState([]);
  const [articlesTotal, setArticlesTotal] = useState(0);
  const [articlesLoading, setArticlesLoading] = useState(true);

  // State for most viewed
  const [mostViewed, setMostViewed] = useState(null);
  const [mostViewedLoading, setMostViewedLoading] = useState(true);

  // Get page from route param, default to 1
  const page = parseInt(pageParam || '1', 10);

  useEffect(() => {
    setArticlesLoading(true);
    articleService.getAll({ page, PAGE_SIZE })
      .then(res => {
        const articlesData = Array.isArray(res.data.data.data) ? res.data.data.data : [];
        setArticles(articlesData);
        setArticlesTotal(res.data.data.total || 0);
      })
      .catch(() => {
        setArticles([]);
        setArticlesTotal(0);
      })
      .finally(() => setArticlesLoading(false));
  }, [page]);

  useEffect(() => {
    setMostViewedLoading(true);
    articleService.getMostViewed(1)
      .then(res => {
        const mostViewedData = Array.isArray(res.data.data) ? res.data.data[0] : null;
        setMostViewed(mostViewedData);
      })
      .catch(() => setMostViewed(null))
      .finally(() => setMostViewedLoading(false));
  }, [page]);

  // Calculate total pages
  const total = Math.ceil(articlesTotal / PAGE_SIZE);
  // Handle page change
  const handleChange = (event, value) => {
    router.push(`/${ARTICLE_URL}${value}`);
  };
   
  return (

    <div className="w-full flex flex-col items-center justify-center">
      
      <div className="flex justify-center items-center w-full mb-10">
        <div className="relative w-full max-w-[50%] mx-auto rounded-[2rem] overflow-hidden bg-[#FFF6F8]">
          {mostViewedLoading ? (
            <div className="flex items-center justify-center h-[300px] bg-gray-100">Loading...</div>
          ) : mostViewed ? (
            <>
              <img
                src={`${UPLOADS_URL}${mostViewed.gambar}`}
                alt={mostViewed.judul}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div>
                  <p className="text-white text-sm md:text-lg font-medium mb-4 drop-shadow md:w-[70%] ">
                    {mostViewed.judul}
                  </p>
                  <Link href={`${VIEW_ARTICLE_URL}${mostViewed.id_artikel}/${formatUrlTitle(mostViewed.judul)}`}
                   style={{color: 'black'}} className="inline-block px-6 py-2 rounded-lg bg-[#FFD1DA] text-black font-bold text-base shadow hover:bg-[#ffb6c1] transition"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] bg-gray-100 text-gray-500">
              No popular article found.
            </div>
          )}
        </div>
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 text-center pb-10">Artikel</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {articlesLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id_artikel} className="h-[300px] w-[350px] flex flex-col items-center bg-transparent">
              <Link href={`${VIEW_ARTICLE_URL}${article.id_artikel}/${formatUrlTitle(article.judul)}`}>
                <img
                  src={`${UPLOADS_URL}${article.gambar}`}
                  alt={article.judul}
                  className="h-[200px] w-[350px] object-cover rounded-[2rem] mb-6"
                  style={{background: '#f9f6f6'}}
                />
                <h3 className="text-center font-semibold text-sm md:text-xl text-black leading-snug line-clamp-2">
                  {article.judul}
                </h3>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found.</p>
          </div>
        )}
      </div>
      <Stack spacing={2}>
        <Pagination count={total} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
} 