# MetadataBase URL Setup Guide

## What was done:

### 1. Added new constant to utils/constant.js
- Added `METADATA_BASE_URL` constant that reads from `NEXT_PUBLIC_METADATA_BASE_URL` environment variable

### 2. Updated all 9 files with metadataBase usage:
✅ **fe/src/app/page.jsx** - Updated to use `METADATA_BASE_URL` constant
✅ **fe/src/app/tentang_kami/page.jsx** - Updated to use `METADATA_BASE_URL` constant  
✅ **fe/src/app/artikel/page.jsx** - Updated to use `METADATA_BASE_URL` constant
✅ **fe/src/app/cart/page.jsx** - Updated to use `process.env.NEXT_PUBLIC_METADATA_BASE_URL`
✅ **fe/src/app/search/page.jsx** - Updated to use `process.env.NEXT_PUBLIC_METADATA_BASE_URL`
✅ **fe/src/app/produk_kami/page.jsx** - Updated to use `process.env.NEXT_PUBLIC_METADATA_BASE_URL`
✅ **fe/src/app/produk_kami/tampil_produk/[id]/[title]/page.jsx** - Updated to use `process.env.NEXT_PUBLIC_METADATA_BASE_URL`
✅ **fe/src/app/artikel/[page]/page.jsx** - Updated to use `process.env.NEXT_PUBLIC_METADATA_BASE_URL`
✅ **fe/src/app/artikel/lihat_artikel/[id]/[title]/page.jsx** - Updated to use `process.env.NEXT_PUBLIC_METADATA_BASE_URL`

## What you need to do:

### Add to your .env file:
```env
NEXT_PUBLIC_METADATA_BASE_URL=https://hallobundapedia.id
```

### Add to your .env.production file:
```env
NEXT_PUBLIC_METADATA_BASE_URL=https://hallobundapedia.id
```

## Benefits:
- ✅ Centralized metadata base URL management
- ✅ Easy to change URL across all pages by updating one environment variable
- ✅ Consistent implementation across all pages
- ✅ No more hardcoded URLs or incorrect syntax like `{BASE_URL}`
- ✅ Better maintainability for different environments (development, staging, production)

## Usage Examples:
After adding the environment variable, you can easily change the metadata base URL for different environments:

**Development:**
```env
NEXT_PUBLIC_METADATA_BASE_URL=http://localhost:3000
```

**Staging:**
```env
NEXT_PUBLIC_METADATA_BASE_URL=https://staging.hallobundapedia.id
```

**Production:**
```env
NEXT_PUBLIC_METADATA_BASE_URL=https://hallobundapedia.id
```

## Testing:
After adding the environment variable:
1. Restart your development server
2. Check that metadata is working correctly on all pages
3. Verify that social media sharing shows correct URLs
4. Test SEO metadata in browser dev tools
