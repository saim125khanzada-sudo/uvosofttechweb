const express = require('express');
const https = require('https');
const router = express.Router();

const INDEXNOW_KEY = '4d89fa7291a24d8b9e6f123456789abc';

// 1. IndexNow Key Verification Endpoint
router.get(`/${INDEXNOW_KEY}.txt`, (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(INDEXNOW_KEY);
});

// 2. Automated IndexNow Instant Search Engine Indexing Trigger
router.get('/api/v1/seo/ping-indexnow', async (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://uvosofttech.com';
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/services`,
    `${baseUrl}/store`,
    `${baseUrl}/blog`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`
  ];

  const payload = JSON.stringify({
    host: 'uvosofttech.com',
    key: INDEXNOW_KEY,
    keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  });

  const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const pingReq = https.request(options, (pingRes) => {
    res.json({
      success: true,
      message: 'Instant IndexNow notification sent to Bing & search engines',
      statusCode: pingRes.statusCode
    });
  });

  pingReq.on('error', (err) => {
    res.status(500).json({ success: false, error: err.message });
  });

  pingReq.write(payload);
  pingReq.end();
});

// 3. Dynamic XML Sitemap for Google & Bing (#1 Search Ranking Optimization)
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
    xml += `    <priority>${page === '' ? '1.0' : '0.9'}</priority>\n`;

    // Multi-region hreflang annotations targeting Uvosoft & Uvosoft Tech queries
    languages.forEach((lang) => {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${page}?region=${lang.slice(-2).toLowerCase()}" />\n`;
    });
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// 4. Dynamic RSS Feed for Google News & Search Indexer Discovery
router.get('/rss.xml', (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://uvosofttech.com';
  let rss = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
  rss += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  rss += `<channel>\n`;
  rss += `  <title>Uvosoft Tech - Enterprise IT & ERP Solutions</title>\n`;
  rss += `  <link>${baseUrl}</link>\n`;
  rss += `  <description>Latest technology insights, Odoo & Dynamics 365 ERP deployment guides, cloud security architecture from Uvosoft Tech.</description>\n`;
  rss += `  <language>en-us</language>\n`;
  rss += `  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`;
  
  rss += `  <item>\n`;
  rss += `    <title>Uvosoft Tech - Enterprise Cloud & ERP Consultation</title>\n`;
  rss += `    <link>${baseUrl}/services</link>\n`;
  rss += `    <guid>${baseUrl}/services</guid>\n`;
  rss += `    <pubDate>${new Date().toUTCString()}</pubDate>\n`;
  rss += `    <description>Odoo and Microsoft Dynamics 365 ERP implementations, AWS/Azure migration, and cybersecurity hardening.</description>\n`;
  rss += `  </item>\n`;

  rss += `</channel>\n`;
  rss += `</rss>`;

  res.header('Content-Type', 'application/xml');
  res.send(rss);
});

// 5. Dynamic robots.txt with Sitemap & IndexNow references
router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://uvosofttech.com';
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/rss.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;
