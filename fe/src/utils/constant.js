// Global constants for API and asset URLs
// Values are loaded from .env via Next.js with fallbacks to prevent build issues

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://globumil.com';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://globumil.com/api';
export const UPLOADS_URL = process.env.NEXT_PUBLIC_UPLOADS_URL || 'https://globumil.com/uploads/';
export const ARTICLE_URL = process.env.NEXT_PUBLIC_ARTICLE_URL || 'https://globumil.com/artikel';
export const VIEW_ARTICLE_URL = process.env.NEXT_PUBLIC_VIEW_ARTICLE_URL || 'https://globumil.com/artikel/lihat_artikel';
export const PRODUCT_URL = process.env.NEXT_PUBLIC_PRODUCT_URL || 'https://globumil.com/produk_kami';
export const VIEW_PRODUCT_URL = process.env.NEXT_PUBLIC_VIEW_PRODUCT_URL || 'https://globumil.com/produk_kami/tampil_produk';
export const METADATA_BASE_URL = process.env.NEXT_PUBLIC_METADATA_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://globumil.com';