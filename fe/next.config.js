/** @type {import('next').NextConfig} */

// Use different configs for development vs production
const isDevelopment = process.env.NODE_ENV !== 'production';

// Import the appropriate config
const config = isDevelopment 
  ? require('./next.config.development.js')
  : require('./next.config.production.js');

module.exports = config.default || config;