// Server-side data fetching functions for articles
import { articleService } from '../services/api';

export async function getArticles(page = 1, pageSize = 9) {
  try {
    const response = await articleService.getAll({ page, limit: pageSize });
    return response.data || { data: [], total: 0 };
  } catch (error) {
    console.error('Error in getArticles:', error);
    return { data: [], total: 0 };
  }
}

export async function getArticleById(id) {
  try {
    const response = await articleService.getById(id);
    return response.data || null;
  } catch (error) {
    console.error(`Error in getArticleById for id ${id}:`, error);
    return null;
  }
}

export async function getAllArticles() {
  try {
    // Fetch all articles in a single request for the build process.
    const response = await articleService.getAll({ limit: 'all' });
    console.log('Fetched all articles:', response);
    // The response might be nested, so handle it safely
    const articles = Array.isArray(response.data) 
      ? response.data 
      : (response.data?.data || []);

    if (articles.length === 0) {
      console.warn('getAllArticles returned an empty array.');
    }
    
    return articles;
  } catch (error) {
    console.error('Error in getAllArticles:', error);
    return [];
  }
}

export async function getMostViewedArticle() {
  try {
    const response = await articleService.getMostViewed(1);
    
    if (response.data && Array.isArray(response.data)) {
      return response.data[0];
    } else if (Array.isArray(response)) {
      return response[0];
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching most viewed article:', error);
    return null;
  }
}
