const fs = require('fs');
const path = require('path');
process.env.NODE_ENV = 'production'; 

const DATA_DIR = path.join(__dirname, 'data');

const API_BASE_URL = 'http://api.globumil.com/api';

async function fetchJson(endpoint) {
  const url = `${API_BASE_URL}/${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/&/g, ' dan ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    console.log('Fetching all articles...');
    const articlesResponse = await fetchJson('articles?limit=all');
    const articles = articlesResponse.data.data || [];
    const formattedArticles = articles.map(article => ({
      id: article.id_artikel,
      title: article.judul,
      slug: slugify(article.judul),
    }));
    fs.writeFileSync(path.join(DATA_DIR, 'articles_id_title_slug.json'), JSON.stringify(formattedArticles, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'articles.json'), JSON.stringify(articles, null, 2));
    console.log(`Saved ${articles.length} articles.`);

    console.log('Fetching all products...');
    const productsResponse = await fetchJson('products?limit=all');
    const products = productsResponse.data || [];
    fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(products, null, 2));
    console.log(`Saved ${products.length} products.`);

    console.log('Fetching all categories...');
    const categories = await fetchJson('articles/categories');
    fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categories, null, 2));
    console.log(`Saved ${categories.length} categories.`);

    console.log('Fetching most viewed articles...');
    const mostViewedResponse = await fetchJson('articles/most_viewed?limit=1');
    const mostViewed = mostViewedResponse.data || [];
    fs.writeFileSync(path.join(DATA_DIR, 'articles_most_viewed.json'), JSON.stringify(mostViewed, null, 2));
    console.log(`Saved ${mostViewed.length} most viewed articles.`);

    console.log('Batch data fetch completed successfully.');
  } catch (error) {
    console.error('Error during batch data fetch:', error);
    process.exit(1);
  }
}

main();
