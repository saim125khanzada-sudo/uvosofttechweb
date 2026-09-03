const app = require('../src/app');

module.exports = (req, res) => {
  if (req.url && (req.url === '/services' || req.url.startsWith('/services/') || req.url.startsWith('/services?'))) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return res.end(`<!DOCTYPE html><html><head><title>404 - Page Not Found</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{background:#0a0f1e;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;}h1{color:#ff0055;font-size:3rem;margin-bottom:10px;}p{color:#888;margin-bottom:20px;}a{color:#00f0ff;text-decoration:none;font-weight:bold;border:1px solid #00f0ff;padding:10px 20px;border-radius:5px;}</style></head><body><h1>404 - Page Not Found</h1><p>The services page has been permanently removed.</p><a href="/">Return to Home</a></body></html>`);
  }
  app(req, res);
};
