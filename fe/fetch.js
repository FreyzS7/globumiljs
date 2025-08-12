const fs = require('fs');
const path = require('path');
process.env.NODE_ENV = 'production'; 
const API_BASE_URL = 'http://api.globumil.com/api';

async function fetchJson(endpoint) {
  const url = `${API_BASE_URL}/${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

async function main() {
  try {
    console.log('Fetching all articles...');
    const articlesResponse = await fetchJson('articles?limit=all');
    const articles = articlesResponse.data || [];
    fs.writeFileSync(path.resolve(__dirname, '../fe/data/articles.json'), JSON.stringify(articles, null, 2));
    console.log(`Saved ${articles.length} articles.`);

     console.log('Fetching all categories...');
    const mostview = await fetchJson('articles/categories');
    fs.writeFileSync(path.resolve(__dirname, '../fe/data/categories.json'), JSON.stringify(mostview, null, 2));
    console.log(`Saved ${mostview.length} categories.`);


    console.log('Fetching all products...');
    const mostviewResponse = await fetchJson('/articles/most_viewed?limit=1');
    const products = mostviewResponse.data || [];
    fs.writeFileSync(path.resolve(__dirname, '../fe/data/articles_most_viewed.json'), JSON.stringify(products, null, 2));
    console.log(`Saved ${products.length} .`);

    console.log('Fetching all categories...');
    const categories = await fetchJson('articles/categories');
    fs.writeFileSync(path.resolve(__dirname, '../fe/data/categories.json'), JSON.stringify(categories, null, 2));
    console.log(`Saved ${categories.length} categories.`);

    console.log('Batch data fetch completed successfully.');
  } catch (error) {
    console.error('Error during batch data fetch:', error);
    process.exit(1);
  }
}

main();
