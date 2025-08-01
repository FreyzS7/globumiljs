/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.globumil.com', // ganti dengan domain production kamu
  generateRobotsTxt: true, // otomatis buat robots.txt juga
  sitemapSize: 7000,
  outDir: 'public', // hasil sitemap ke public/
};
