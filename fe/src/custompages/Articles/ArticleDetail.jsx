import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import '../../styles/lists.css';
import { articleService } from '../../services/api';
import { UPLOADS_URL } from '../../utils/constant';
import { ArtikelChannamixSection } from '../Home/ArtikelChannamixSection';
import { Comment } from '../../components/Comment';
import { useEffect, useState } from 'react';

export default function ArticleDetail() {
  const { id, title } = useParams();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        navigate('/artikel');
        return;
      }

      setLoading(true);
      try {
        const response = await articleService.getById(id);
        setArticleData(response.data);
        setViewCount(response.data.data.views || 0);
        // Increment view count
        await articleService.incrementViews(id);
        setError(null);
      } catch (err) {
        setError(err);
        setArticleData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !articleData?.data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Article not found or an error occurred.</p>
      </div>
    );
  }

  const { judul, gambar, kata_awal, tanggal_input, nama_kategori, isi_artikel, admin } = articleData.data;
  
  return (
    <main className='w-full h-auto flex items-center justify-center flex-col pb-[60px]'>
      <article className="w-[90%] mx-auto py-5">
        <header className="space-y-1 flex flex-col items-center justify-center">
          <h1 className="w-[80%] text-3xl text-center font-bold text-gray-900">{judul}</h1>
          <div className="flex items-center gap-1 text-sm text-black font-semibold pb-7">
            <span className="text-primary-600">{nama_kategori}</span>
            <span>||</span>
            <span>{admin}</span>
            <span>||</span>
            <time dateTime={tanggal_input}>{new Date(tanggal_input).toLocaleDateString()}</time>
            <span>||</span>
            <span className="flex items-center gap-1">
              <i className="bi bi-eye" aria-hidden="true"></i>
              {viewCount} views
            </span>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center">
          <section 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: kata_awal }}
          />
          <figure className="mb-8">
            <img
              src={`${UPLOADS_URL}${gambar}`}
              alt={judul}
              className="w-129 h-96 object-cover rounded-lg"
            />
          </figure>
          <section 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: isi_artikel }}
          />
        </div>
      </article>
      <aside>
        <ArtikelChannamixSection title="Artikel Lainnya" description="" />
      </aside>
      <section>
        <Comment Id={id} type="article" />
      </section>
    </main>
  );
} 