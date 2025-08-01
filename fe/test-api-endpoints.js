// Test script to verify API endpoints during build
 
async function testEndpoints() {
  const apiUrl = process.env.API_URL_SERVER || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://globumil.com/api';
  
  console.log('Testing API endpoints...');
  console.log('API URL:', apiUrl);
  
  // Test articles list
  try {
    console.log('\n1. Testing articles list endpoint...');
    const articlesResponse = await fetch(`${apiUrl}/articles?page=1&limit=5`);
    const articlesData = await articlesResponse.json();
    console.log('Articles list status:', articlesResponse.status);
    console.log('Articles data structure:', JSON.stringify(articlesData, null, 2).substring(0, 500));
    
    if (articlesData.data?.data?.[0]) {
      const firstArticle = articlesData.data.data[0];
      console.log('\n2. Testing single article endpoint...');
      const articleId = firstArticle.id_artikel;
      console.log('Testing article ID:', articleId);
      
      const articleResponse = await fetch(`${apiUrl}/articles/get/${articleId}`);
      const articleData = await articleResponse.json();
      console.log('Single article status:', articleResponse.status);
      console.log('Single article data:', JSON.stringify(articleData, null, 2).substring(0, 500));
    }
  } catch (error) {
    console.error('Error testing articles:', error);
  }
  
  // Test products list
  try {
    console.log('\n3. Testing products list endpoint...');
    const productsResponse = await fetch(`${apiUrl}/products?page=1&limit=5`);
    const productsData = await productsResponse.json();
    console.log('Products list status:', productsResponse.status);
    console.log('Products data structure:', JSON.stringify(productsData, null, 2).substring(0, 500));
    
    if (productsData.data?.data?.[0]) {
      const firstProduct = productsData.data.data[0];
      console.log('\n4. Testing single product endpoint...');
      const productId = firstProduct.id_produk;
      console.log('Testing product ID:', productId);
      
      const productResponse = await fetch(`${apiUrl}/products/get/${productId}`);
      const productData = await productResponse.json();
      console.log('Single product status:', productResponse.status);
      console.log('Single product data:', JSON.stringify(productData, null, 2).substring(0, 500));
    }
  } catch (error) {
    console.error('Error testing products:', error);
  }
}

testEndpoints();