// Debug script to test API connectivity

async function testAPI() {
  const endpoints = [
    'http://localhost/globumil2/api/products',
    'http://localhost/globumil2/api/articles',
    'https://globumil.com/api/products',
    'https://globumil.com/api/articles'
  ];

  for (const url of endpoints) {
    try {
      console.log(`\nTesting: ${url}`);
      const response = await fetch(url, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success: ${response.status}`);
        console.log(`Data: ${JSON.stringify(data).substring(0, 200)}...`);
      } else {
        console.log(`❌ Failed: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

testAPI();