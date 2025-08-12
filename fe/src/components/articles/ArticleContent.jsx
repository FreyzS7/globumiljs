// Server component for displaying article content
import Image from 'next/image';
import { UPLOADS_URL } from '../../utils/constant';
import '../../styles/lists.css';

export default function ArticleContent({ article }) {
  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel tidak ditemukan</h1>
        <p className="text-gray-600">Maaf, artikel yang Anda cari tidak dapat ditemukan.</p>
      </div>
    );
  }
 // console.log('Rendering ArticleContent for article:', article);
  return (
    <article className="w-full flex flex-col items-center justify-center p-5 lg:p-6">
      <div className="w-full lg:w-[90%] flex flex-col items-center">
        {/* Article Title */}
        <h1 className="text-2xl lg:text-4xl font-bold text-center mb-6 text-gray-900">
          {article.judul}
        </h1>

        {/* View Count */}
        <div className="text-sm text-gray-600 mb-8">
          <span>Dilihat {article.views || 0} kali</span>
        </div>

        {/* Article Image */}
        <div className="relative w-[80%] h-[300px] lg:h-[500px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src={`${UPLOADS_URL}${article.gambar}`}
            alt={article.judul}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            priority
          />
        </div>

        {/* Article Content */}
        <div 
          className="w-full prose prose-lg max-w-none article-content"
        dangerouslySetInnerHTML={{ __html: article.isi_artikel || '' }}
        />
      </div>
    </article>
  );
}