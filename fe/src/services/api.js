import axios from 'axios';

// Environment variables - Next.js compatible
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/globumil2/api';
const SERVER_API_URL = process.env.SERVER_API_BASE_URL || process.env.API_BASE_URL || API_URL;
const UPLOADS_URL = process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost/globumil2/uploads/';

// Create axios instance for client-side requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server-side fetch function for SSR/SSG
const serverFetch = async (endpoint, options = {}) => {
  // Use production API URL for server-side requests
  const url = `${SERVER_API_URL}${endpoint}`;
  
  try {
     
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
      signal: AbortSignal.timeout(5000), // 5 second timeout
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(`Server fetch failed for ${url}:`, error.message);
    // Return mock data instead of throwing during build
    return { status: false, data: [], message: error.message };
  }
};

// Utility function to determine if we're on server or client
const isServer = typeof window === 'undefined';

export const articleService = {
  // Get all articles with pagination
  getAll: async (params = {}) => {
    if (isServer) {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/articles${queryString ? `?${queryString}` : ''}`;
      return await serverFetch(endpoint);
    }
    return api.get('/articles', { params });
  },

  // Get article by ID
  getById: async (id) => {
    if (isServer) {
      return await serverFetch(`/articles/get/${id}`);
    }
    return api.get(`/articles/get/${id}`);
  },

  // Get article categories
  getCategories: async () => {
    if (isServer) {
      return await serverFetch('/articles/categories');
    }
    return api.get('/articles/categories');
  },

  // Get articles by category
  getByCategory: async (categoryId) => {
    if (isServer) {
      return await serverFetch(`/articles/by_category/${categoryId}`);
    }
    return api.get(`/articles/by_category/${categoryId}`);
  },

  // Increment article views (client-side only)
  incrementViews: (id) => {
    if (isServer) {
      console.warn('incrementViews should not be called on server-side');
      return Promise.resolve();
    }
    return api.post(`/articles/increment_views/${id}`);
  },

  // Get most viewed articles
  getMostViewed: async (limit = 5) => {
    if (isServer) {
      return await serverFetch(`/articles/most_viewed?limit=${limit}`);
    }
    return api.get(`/articles/most_viewed?limit=${limit}`);
  },
};

export const productService = {
  // Get all products with pagination
  getAll: async (params = {}) => {
    if (isServer) {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
      return await serverFetch(endpoint);
    }
    return api.get('/products', { params });
  },

  // Get product by ID
  getById: async (id) => {
    if (isServer) {
      return await serverFetch(`/products/get/${id}`);
    }
    return api.get(`/products/get/${id}`);
  },
};

export const commentService = {
  // Get comments for an item
  getComments: async (type, itemId) => {
    const params = { type, item_id: itemId };
    
    if (isServer) {
      const queryString = new URLSearchParams(params).toString();
      return await serverFetch(`/comments/get_comments?${queryString}`);
    }
    return api.get('/comments/get_comments', { params });
  },

  // Add new comment (client-side only)
  addComment: (formData) => {
    if (isServer) {
      console.warn('addComment should not be called on server-side');
      return Promise.reject(new Error('addComment is client-side only'));
    }

    const data = new FormData();
    
    // Add all form fields
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('type', formData.type);
    data.append('item_id', formData.item_id);
    
    // Add image if it exists
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    // Add attachment if it exists
    if (formData.attachment instanceof File) {
      data.append('attachment', formData.attachment);
    }
    
    return api.post('/comments/add_comment', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get pending comments (admin only)
  getPendingComments: async () => {
    if (isServer) {
      return await serverFetch('/comments/get_pending_comments');
    }
    return api.get('/comments/get_pending_comments');
  },

  // Approve comment (admin only, client-side)
  approveComment: (commentId) => {
    if (isServer) {
      console.warn('approveComment should not be called on server-side');
      return Promise.reject(new Error('approveComment is client-side only'));
    }
    return api.post(`/comments/approve_comment/${commentId}`);
  },

  // Reject comment (admin only, client-side)
  rejectComment: (commentId) => {
    if (isServer) {
      console.warn('rejectComment should not be called on server-side');
      return Promise.reject(new Error('rejectComment is client-side only'));
    }
    return api.post(`/comments/reject_comment/${commentId}`);
  },
};

export const searchService = {
  // Search products and articles
  search: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    
    if (isServer) {
      return await serverFetch(`/search?${queryString}`);
    }
    return api.get('/search', { params });
  },

  // Get search suggestions
  getSuggestions: async (query, limit = 5) => {
    const params = { q: query, limit };
    
    if (isServer) {
      const queryString = new URLSearchParams(params).toString();
      return await serverFetch(`/search/suggestions?${queryString}`);
    }
    return api.get('/search/suggestions', { params });
  },
};

// Export URLs for use in components
export const API_BASE_URL = API_URL;
export const UPLOADS_BASE_URL = UPLOADS_URL;

// Export default axios instance for direct use if needed
export default api;