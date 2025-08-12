// Server-side data fetching functions for products
import { productService } from '../services/api';

export async function getProducts(page = 1, limit = 12) {
  try {
    console.log(`Fetching products... page: ${page}, limit: ${limit}`);
    const response = await productService.getAll({ page, limit });
   // console.log('Products response:', response);
    
    // Handle both server and client response formats
    if (response.data) {
      return response;
    } else {
      return { data: response };
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: { data: [], total: 0 } };
  }
}

export async function getAllProducts() {
  try {
    // Fetch all products in a single request for the build process
    const response = await productService.getAll({ limit: 'all' });
    
    // The response might be nested, so handle it safely
    const products = Array.isArray(response.data) 
      ? response.data 
      : (response.data?.data || []);

    if (products.length === 0) {
      console.warn('getAllProducts returned an empty array.');
    }
    
    return products;
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const response = await productService.getById(id);
    return response.data || null;
  } catch (error) {
    console.error(`Error in getProductById for id ${id}:`, error);
    return null;
  }
}
