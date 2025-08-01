import Link from 'next/link';
import { UPLOADS_URL, VIEW_ARTICLE_URL } from '../../utils/constant';
import formatUrlTitle from '../../utils/String';
import ArticlesPagination from './ArticlesPagination';

export default function ArticlesServer({ articles, mostViewed, total, currentPage }) {
 // console.log(articles);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Most Viewed Article Hero Section */}
      <div className="flex justify-center items-center w-full mb-10">
        <div className="relative w-full max-w-[90%] md:max-w-[50%] mx-auto rounded-[2rem] overflow-hidden bg-[#FFF6F8]">
          {mostViewed ? (
            <>
              <img
                src={`${UPLOADS_URL}${mostViewed.gambar}`}
                alt={mostViewed.judul}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div>
                  <p className="text-white text-sm md:text-lg font-medium mb-4 drop-shadow md:w-[70%]">
                    {mostViewed.judul}
                  </p>
                  <Link 
                    href={`/${VIEW_ARTICLE_URL}${mostViewed.id_artikel}/${formatUrlTitle(mostViewed.judul)}`}
                    className="inline-block px-6 py-2 rounded-lg bg-[#FFD1DA] text-black font-bold text-base shadow hover:bg-[#ffb6c1] transition"
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

      {/* Articles Title */}
      <h1 className="text-3xl font-semibold text-gray-900 text-center pb-10">Artikel</h1>

      {/* Articles Grid */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id_artikel} className="h-[300px] w-[350px] flex flex-col items-center bg-transparent">
              <Link href={`/${VIEW_ARTICLE_URL}${article.id_artikel}/${formatUrlTitle(article.judul)}`}>
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

      {/* Pagination */}
      <ArticlesPagination total={total} currentPage={currentPage} />
    </div>
  );
}