# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack e-commerce application for Channamix health products with:
- **Backend**: CodeIgniter 3 PHP framework with RESTful API endpoints
- **Frontend**: Next.js 15 React application with TypeScript support and Tailwind CSS v4
- **Database**: MySQL/MySQLi (database name: `glow5324_globumiladmin`)
- **Development Environment**: XAMPP on Windows WSL2
- **Production Domain**: hallobundapedia.id

## Common Development Commands

### Frontend (Next.js) - Located in `/fe` directory
```bash
cd fe
npm install                      # Install dependencies
npm run dev                      # Start development server (http://localhost:3000)
npm run build                    # Build for production
npm run build:static             # Build static site for deployment
npm run build:clean              # Clean build (removes .next and node_modules cache first)
npm start                        # Start production server (standard)
node --max-old-space-size=256 server-simple.js  # Start with memory limit for shared hosting
npm run lint                     # Run ESLint
./build-static.sh                # Alternative build script for static deployment
```

### Backend (CodeIgniter)
- Served via XAMPP at `http://localhost/globumil2/`
- No build process required (PHP interpreted)
- API endpoints accessible at `http://localhost/globumil2/api/`

### Testing
```bash
# Backend tests (from root)
composer test:coverage    # Run PHPUnit tests with coverage

# Frontend - No automated tests configured
# Manual testing via browser at http://localhost:3000
# API endpoint testing via: node test-api-endpoints.js (from fe/ directory)
```

### Deployment
```bash
./deploy.sh frontend     # Build and prepare frontend for deployment
./deploy.sh backend      # Prepare backend files for deployment
./deploy.sh both         # Deploy both frontend and backend
```

## Architecture Overview

### Backend Structure (CodeIgniter MVC)
- **Controllers**: `/application/controllers/`
  - `api/` - RESTful API controllers (Articles, Products, Comments, Search)
  - Admin controllers in `Adminmm/`
  - Public controllers for web views
  - `Robots.php` - Dynamic robots.txt generation
- **Models**: `/application/models/` - Database interaction layer
  - Main models: `Artikel_model`, `Produk_model`, `Comment_model`, `Kategori_artikel_model`
- **Views**: `/application/views/` - PHP templates (mostly unused, API-focused)
- **Core**: `/application/core/MY_Controller.php` - Base controller with CORS and JSON response helpers
- **Helpers**: `/application/helpers/` - Global and theme helpers

### Frontend Structure (Next.js App Router)
- **Pages**: `/fe/src/app/` - App Router pages with server components
  - `artikel/` - Articles section with pagination and dynamic routing
  - `produk_kami/` - Products catalog with detail pages
  - `cart/` - Shopping cart functionality
  - `search/` - Search functionality
- **Components**: `/fe/src/components/` - Reusable UI components
  - Server components for data fetching (`ArticlesServer`, `ProductsServer`)
  - Client components for interactivity
  - UI library based on shadcn/ui with Radix UI primitives
  - Animation components using Framer Motion
- **Custom Pages**: `/fe/src/custompages/` - Page-specific components organized by feature
- **Services**: `/fe/src/services/api.js` - API client configuration with axios
- **Hooks**: `/fe/src/hooks/` - Custom React hooks
- **Libraries**: `/fe/src/lib/` - Utility functions for articles and products

### Frontend Component Organization Pattern
Following Cursor rules (`.cursor/rules/react.mdc`):
- Main page component: `custompages/[Feature]/Index.jsx`
- Section components: `custompages/[Feature]/[Section]Section.jsx`
- Example: `Home/Index.jsx` imports `Home/HeroSection.jsx`, `Home/InfoSection.jsx`, etc.
- Server components for data fetching: `components/[feature]/[Feature]Server.jsx`
- Client components in separate files with clear naming conventions

### API Communication
- Frontend communicates with backend via REST API
- Base API URL configured in environment variables (separate for client/server in production)
- CORS enabled in backend for cross-origin requests
- Standard JSON response format: `{status: boolean, message: string, data: any}`
- API debugging script available: `fe/debug-api.js`

### Key Technologies & Libraries

#### Frontend Dependencies
- **Framework**: React 19.1.0, Next.js 15.3.4 with App Router
- **UI**: MUI, Radix UI, shadcn/ui components
- **Animation**: Framer Motion, AOS (Animate On Scroll)
- **Styling**: Tailwind CSS v4, Emotion, styled-components
- **Images**: Next.js Image optimization, react-lazy-load-image-component
- **Icons**: Lucide React, React Icons
- **Carousel**: Embla Carousel React, Swiper
- **HTTP Client**: Axios (via api.js service)
- **Routing**: React Router DOM (client-side), Next.js App Router (SSR)

#### Production Configuration
- **Memory Optimization**: Custom server configurations for shared hosting
- **Node.js Versions**: Use 18.x or 20.x (avoid 22.x due to memory issues)
- **Static Export**: Supported for environments with Node.js limitations
- **Security Headers**: Configured in production .htaccess
- **Caching**: Static assets cached (images: 1 year, CSS/JS: 1 month)
- **HTTPS**: Forced in production with automatic redirection

### Database Configuration
- Configure in `/application/config/database.php`
- Main tables: `artikel`, `comments`, products, categories
- UTF-8 character set for multilingual support (Indonesian market focus)
- Article system includes view tracking and category relationships

### Environment Configuration
- Backend: `/application/config/config.php` - Set `$config['base_url']`
- Frontend: `/fe/.env` and `/fe/.env.production` - API URLs and environment settings
  - Separate `NEXT_PUBLIC_API_URL` (client) and `API_URL_SERVER` (SSR) in production
  - Configurable routes and site metadata

### Deployment Strategies

#### cPanel Deployment (Shared Hosting)
1. **Node.js Application Method**: Configure via cPanel's Node.js setup
2. **Static Export Method**: Build locally and upload `out/` directory
3. **Memory Management**: Use `server-simple.js` for constrained environments
4. **Troubleshooting Guide**: Available in `fe/TROUBLESHOOTING.md`

#### Production Checklist
- Update production configs (database.php, config.php, .env.production)
- Set proper file permissions for `uploads/` directory
- Import database to production server
- Configure CORS headers for API endpoints
- Test API connectivity from frontend domain

### Important Notes
- Image uploads stored in `/uploads/` directory (must be writable)
- Frontend uses Next.js Image component with remote pattern for production domain
- Both frontend and backend support responsive design
- Application designed for Indonesian market (Bahasa Indonesia content)
- Production deployment optimized for shared hosting limitations
- Console logs automatically removed in production builds
- Server-side rendering with fallback strategies for API connectivity issues

### Development Workflow
- Use XAMPP for local backend development (PHP/MySQL)
- Run frontend separately on port 3000 during development
- API endpoints tested via `fe/debug-api.js` script
- Follow component organization patterns from Cursor rules
- Ensure proper CORS configuration for API communication