#!/bin/bash

# Build script for static site generation with proper environment

echo "Building static site..."

# Load production environment
export NODE_ENV=production

# Copy production env if not exists
if [ ! -f .env.production.local ]; then
  cp .env.production .env.production.local
fi

# Clean previous builds
rm -rf .next out

# Install dependencies
npm install

# Test API endpoints first
echo "Testing API endpoints..."
node test-api-endpoints.js

# Build the static site
echo "Running Next.js build..."
npm run build

# Check if build succeeded
if [ -d "out" ]; then
  echo "Build successful! Static files generated in 'out' directory."
  echo "Files can be deployed to your static hosting."
else
  echo "Build failed! Check the error messages above."
  exit 1
fi