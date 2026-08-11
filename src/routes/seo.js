const express = require('express');
const router = express.Router();

const REGIONS = [
  { code: 'us', name: 'United States', domain: 'uvosofttech.com/us', currency: 'USD', phone: '+1 (800) 555-UVO1', flag: '🇺🇸' },
  { code: 'ca', name: 'Canada', domain: 'uvosofttech.com/ca', currency: 'CAD', phone: '+1 (800) 555-UVO2', flag: '🇨🇦' },
  { code: 'sa', name: 'Saudi Arabia', domain: 'uvosofttech.com/sa', currency: 'SAR', phone: '+966 11 555 UVO3', flag: '🇸🇦' },
  { code: 'pk', name: 'Pakistan', domain: 'uvosofttech.com/pk', currency: 'PKR', phone: '+92 42 3555 UVO4', flag: '🇵🇰' }
];

// Dynamic XML Sitemap
router.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://uvosofttech.com';
  const pages = ['', '/services', '/store', '/blog', '/about', '/contact'];
  const languages = ['en-US', 'en-CA', 'ar-SA', 'en-PK'];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  pages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;

    // Multi-region hreflang annotations
    languages.forEach((lang) => {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${page}?region=${lang.slice(-2).toLowerCase()}" />\n`;
    });
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Dynamic robots.txt
router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://uvosofttech.com';
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;
