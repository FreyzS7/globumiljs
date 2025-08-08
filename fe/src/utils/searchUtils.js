// Utility functions for search functionality
import formatUrlTitle from './String';

export const highlightSearchTerm = (text, searchTerm) => {
  if (!searchTerm || !text) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, _index) => 
    regex.test(part) ? `<mark class="bg-yellow-200 px-1 rounded">${part}</mark>` : part
  ).join('');
};

export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

export const formatSearchQuery = (query) => {
  if (!query) return '';
  return query.trim().toLowerCase();
};

export const getSearchResultUrl = (item, type) => {
  if (type === 'product' || item.type === 'product') {
    return `/produk_kami/tampil_produk/${item.id_produk || item.id}`;
  } else if (type === 'article' || item.type === 'article') {
    const title = formatUrlTitle(item.judul || item.title);
    return `/artikel_kami/lihat_artikel/${item.id_artikel || item.id}/${title}`;
  }
  return '#';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateSearchMetadata = (query, type, results) => {
  const typeText = type === 'products' ? 'Produk' : type === 'articles' ? 'Artikel' : 'Produk dan Artikel';
  const resultCount = typeof results === 'number' ? results : 
    (results?.total_count || 0);
  
  return {
    title: `Pencarian: "${query}" - ${typeText} | Globumil`,
    description: `Hasil pencarian untuk "${query}" di kategori ${typeText.toLowerCase()}. Ditemukan ${resultCount} hasil. Temukan produk kesehatan dan artikel untuk ibu hamil dan menyusui.`,
    keywords: `${query}, ${typeText.toLowerCase()}, Globumil, kesehatan ibu hamil, produk kehamilan, artikel kesehatan`,
  };
};