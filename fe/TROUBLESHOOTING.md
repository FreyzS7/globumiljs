# Troubleshooting Guide for Next.js Deployment

## Problem: Articles/Products not loading in production

### Issue Description
- Home page shows articles correctly
- Dedicated article and product pages show empty lists
- Works fine in development
- Production server-side API calls failing

### Root Cause
Server-side rendering (SSR) can't connect to the API from the production server.

### Solutions

#### Solution 1: Check API Connectivity (Quick Fix)

1. **Upload the debug script to your server:**
   Upload `debug-api.js` to your server and run:
   ```bash
   node debug-api.js
   ```

2. **Check the console output** to see which API endpoints are accessible

#### Solution 2: Update Environment Variables

1. **Ensure your `.env.production` has both client and server URLs:**
   ```
   NEXT_PUBLIC_API_BASE_URL=https://hallobundapedia.id/api
   SERVER_API_BASE_URL=https://hallobundapedia.id/api
   API_BASE_URL=http://localhost/channamix2/api
   ```

2. **Restart your Node.js application** after updating environment variables

#### Solution 3: Use Relative API URLs (Recommended)

If the server can't reach external URLs, modify your API service to use relative paths:

```javascript
// In api.js, change SERVER_API_URL to:
const SERVER_API_URL = '/channamix2/api';
```

#### Solution 4: Disable SSR for Problematic Pages

Convert pages to client-side rendering:

1. **For articles page**, add at the top:
   ```javascript
   'use client';
   ```

2. **Use useEffect to fetch data** instead of server-side fetching

#### Solution 5: Configure Proxy in Next.js

Add to `next.config.js`:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://hallobundapedia.id/api/:path*'
    }
  ]
}
```

### Debugging Steps

1. **Check server logs:**
   ```bash
   tail -f /var/log/nodejs/your-app.log
   ```

2. **Test API manually:**
   ```bash
   curl -X GET "https://hallobundapedia.id/api/products"
   curl -X GET "http://localhost/channamix2/api/products"
   ```

3. **Verify CORS headers** on your backend

4. **Check SSL certificate** if using HTTPS

### Quick Fix for Immediate Resolution

Replace your current pages with client-side rendering versions:

```javascript
// src/app/produk_kami/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { productService } from '@/services/api';
import ProductsServer from '@/components/products/ProductsServer';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll()
      .then(response => {
        setProducts(response.data?.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return <ProductsServer products={products} />;
}
```

### Long-term Solutions

1. **Use a reverse proxy** (Nginx/Apache) to handle API routing
2. **Set up internal network routing** for server-to-server communication
3. **Use a CDN** with proper API caching
4. **Implement static generation** with build-time data fetching

### Testing After Changes

1. **Rebuild and restart:**
   ```bash
   npm run build
   npm start
   ```

2. **Check browser network tab** for failed requests
3. **Monitor server logs** for error messages
4. **Test both client and server-side rendering**