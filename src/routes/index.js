const express = require('express');
const router = express.Router();
const { loadUser } = require('../middleware/auth');

const fs = require('fs');
const path = require('path');
const {
  servicesCategories,
  detailedServices,
  getAllCategories,
  getServicesByCategory,
  findDetailedService
} = require('../data/servicesDetailedData');

function trySendStaticHtml(req, res) {
  try {
    const publicDir = path.join(__dirname, '../../public');
    const reqPath = decodeURIComponent(req.path);

    if (reqPath === '/services' || reqPath === '/services/') {
      const servicesHtml = path.join(publicDir, 'services/services.html');
      if (fs.existsSync(servicesHtml) && fs.statSync(servicesHtml).isFile()) {
        return res.sendFile(servicesHtml);
      }
    }

    const directFile = path.join(publicDir, reqPath);
    if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
      return res.sendFile(directFile);
    }

    const fileHtml = path.join(publicDir, reqPath + '.html');
    if (fs.existsSync(fileHtml) && fs.statSync(fileHtml).isFile()) {
      return res.sendFile(fileHtml);
    }

    const dirIndexHtml = path.join(publicDir, reqPath, 'index.html');
    if (fs.existsSync(dirIndexHtml) && fs.statSync(dirIndexHtml).isFile()) {
      return res.sendFile(dirIndexHtml);
    }
  } catch (err) {
    // Fallthrough to dynamic route rendering
  }
  return false;
}

// 1. Direct Static File Routes for /services and all subpages
router.get(['/services', '/services/', '/services/services.html', '/public/services/services.html'], (req, res) => {
  const p1 = path.join(__dirname, '../../public/services/services.html');
  if (fs.existsSync(p1)) return res.sendFile(p1);
  const p2 = path.join(process.cwd(), 'public/services/services.html');
  if (fs.existsSync(p2)) return res.sendFile(p2);
  res.status(404).send('Services directory file not found');
});

const SERVICE_CATS = ['development', 'cloud-devops', 'cybersecurity', 'ai-automation'];

// Category landing page routes (/development, /services/development, etc.)
router.get(['/:cat', '/services/:cat', '/public/services/:cat'], (req, res, next) => {
  const { cat } = req.params;
  if (!SERVICE_CATS.includes(cat)) return next();
  const fileName = `${cat}.html`;
  const p1 = path.join(__dirname, '../../public/services', cat, fileName);
  if (fs.existsSync(p1)) return res.sendFile(p1);
  const p2 = path.join(process.cwd(), 'public/services', cat, fileName);
  if (fs.existsSync(p2)) return res.sendFile(p2);
  const pIndex = path.join(process.cwd(), 'public/services', cat, 'index.html');
  if (fs.existsSync(pIndex)) return res.sendFile(pIndex);
  next();
});

// Category & Service exact file routes (supports both /development/web-app and /services/development/web-app)
router.get(['/:cat/:file', '/services/:cat/:file', '/public/services/:cat/:file'], (req, res, next) => {
  const { cat, file } = req.params;
  if (!SERVICE_CATS.includes(cat)) return next();
  const cleanFile = file.endsWith('.html') ? file : `${file}.html`;
  const p1 = path.join(__dirname, '../../public/services', cat, cleanFile);
  if (fs.existsSync(p1)) return res.sendFile(p1);
  const p2 = path.join(process.cwd(), 'public/services', cat, cleanFile);
  if (fs.existsSync(p2)) return res.sendFile(p2);
  const pFolderIndex = path.join(process.cwd(), 'public/services', cat, file, 'index.html');
  if (fs.existsSync(pFolderIndex)) return res.sendFile(pFolderIndex);
  next();
});

let prisma = null;
try {
  const { PrismaClient } = require('@prisma/client');
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    if (!global.__prisma) global.__prisma = new PrismaClient();
    prisma = global.__prisma;
  }
} catch (e) {
  console.log('Prisma client initialization deferred / offline');
}

async function safeDbQuery(queryFn, fallback = []) {
  if (!prisma) return fallback;
  try {
    return await queryFn();
  } catch (error) {
    console.warn('Database query fallback (DB offline or initializing):', error.message);
    return fallback;
  }
}

router.get('/', loadUser, async (req, res, next) => {
  try {
    const services = await safeDbQuery(() =>
      prisma.serviceCategory.findMany({
        where: { isActive: true },
        include: { services: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } } },
        orderBy: { sortOrder: 'asc' },
      })
    );

    const products = await safeDbQuery(() =>
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        take: 8,
      })
    );

    const blogPosts = await safeDbQuery(() =>
      prisma.blogPost.findMany({
        where: { status: 'published' },
        include: { author: { select: { firstName: true, lastName: true } } },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      })
    );

    const settingsList = await safeDbQuery(() => prisma.siteSetting.findMany());
    const settingsMap = {};
    if (Array.isArray(settingsList)) {
      settingsList.forEach(s => { settingsMap[s.key] = s.value; });
    }

    const navigationItems = await safeDbQuery(() =>
      prisma.navigationItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      })
    );

    const socialLinks = await safeDbQuery(() =>
      prisma.socialLink.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      })
    );

    res.render('public/index', {
      title: 'Home',
      services,
      products,
      blogPosts,
      settings: settingsMap,
      navigationItems,
      socialLinks,
      user: req.user || null,
    });
  } catch (error) {
    console.error('Home route error:', error);
    res.render('public/index', {
      title: 'Home',
      services: [],
      products: [],
      blogPosts: [],
      settings: {},
      navigationItems: [],
      socialLinks: [],
      user: req.user || null,
    });
  }
});

router.get('/about', loadUser, async (req, res, next) => {
  try {
    const navigationItems = await safeDbQuery(() =>
      prisma.navigationItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      })
    );
    const settingsList = await safeDbQuery(() => prisma.siteSetting.findMany());
    const settingsMap = {};
    if (Array.isArray(settingsList)) {
      settingsList.forEach(s => { settingsMap[s.key] = s.value; });
    }

    res.render('public/about', {
      title: 'About Us',
      navigationItems,
      settings: settingsMap,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/store', loadUser, async (req, res, next) => {
  try {
    const persistentStore = require('../utils/persistentStore');
    let products = await persistentStore.getProductsAsync();
    products = (products || []).filter(p => p.isActive !== false);

    const navigationItems = await safeDbQuery(() =>
      prisma.navigationItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      })
    );
    const settingsList = await safeDbQuery(() => prisma.siteSetting.findMany());
    const settingsMap = {};
    if (Array.isArray(settingsList)) {
      settingsList.forEach(s => { settingsMap[s.key] = s.value; });
    }

    res.render('public/products', {
      title: 'Our Hardware Store',
      products,
      navigationItems,
      settings: settingsMap,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/products', loadUser, async (req, res, next) => {
  try {
    const persistentStore = require('../utils/persistentStore');
    let products = await persistentStore.getProductsAsync();
    products = (products || []).filter(p => p.isActive !== false);

    const navigationItems = await safeDbQuery(() =>
      prisma.navigationItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      })
    );
    const settingsList = await safeDbQuery(() => prisma.siteSetting.findMany());
    const settingsMap = {};
    if (Array.isArray(settingsList)) {
      settingsList.forEach(s => { settingsMap[s.key] = s.value; });
    }

    res.render('public/products', {
      title: 'Our Products',
      products,
      navigationItems,
      settings: settingsMap,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/blog', loadUser, async (req, res, next) => {
  try {
    const posts = await safeDbQuery(() =>
      prisma.blogPost.findMany({
        where: { status: 'published' },
        include: { author: { select: { firstName: true, lastName: true } } },
        orderBy: { publishedAt: 'desc' },
      })
    );
    const navigationItems = await safeDbQuery(() =>
      prisma.navigationItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      })
    );
    const settingsList = await safeDbQuery(() => prisma.siteSetting.findMany());
    const settingsMap = {};
    if (Array.isArray(settingsList)) {
      settingsList.forEach(s => { settingsMap[s.key] = s.value; });
    }

    res.render('public/blog', {
      title: 'Blog',
      posts,
      navigationItems,
      settings: settingsMap,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/login', (req, res) => {
  res.redirect('/auth/login');
});

router.get('/portal', (req, res) => {
  res.redirect('/auth/login');
});

router.get('/blog/:slug', loadUser, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const post = await safeDbQuery(() =>
      prisma.blogPost.findUnique({
        where: { slug },
        include: { author: { select: { firstName: true, lastName: true } } },
      }), null
    );

    const navigationItems = await safeDbQuery(() =>
      prisma.navigationItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      })
    );

    if (!post) {
      // Fallback sample post for preview if slug matches known sample
      const samplePosts = {
        'the-future-of-ai-in-erp': {
          title: 'The Future of AI in ERP',
          author: { firstName: 'UVO', lastName: 'Engineering' },
          publishedAt: new Date(),
          featuredImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
          content: '<p>Artificial Intelligence is revolutionizing Enterprise Resource Planning (ERP) systems in unprecedented ways. From predictive analytics to automated workflows, AI-powered ERP solutions enable businesses to make smarter decisions faster.</p><h3>Key Transformations</h3><ul><li>Predictive demand forecasting using machine learning algorithms</li><li>Automated routine tasks freeing up human resources</li><li>Real-time anomaly detection in financial transactions</li><li>Intelligent supply chain optimization</li></ul>'
        },
        'zero-trust-cyber-security': {
          title: 'Zero-Trust Cyber Security & 2FA Hardening Report',
          author: { firstName: 'UVO', lastName: 'Cybersecurity' },
          publishedAt: new Date(),
          featuredImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
          content: '<p>The traditional perimeter-based security model is no longer sufficient in today\'s threat landscape. Zero-Trust architecture has emerged as the gold standard for enterprise security.</p><h3>Core Principles</h3><ul><li>Never trust, always verify - every access request is authenticated</li><li>Least privilege access - users get minimum necessary permissions</li><li>Micro-segmentation - networks are divided into secure zones</li></ul>'
        }
      };
      
      const fallbackPost = samplePosts[slug] || {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        author: { firstName: 'UVO', lastName: 'Team' },
        publishedAt: new Date(),
        featuredImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        content: '<p>Welcome to UVO SoftTech insights. Contact our engineering team for full technical documentation and consultation.</p>'
      };

      return res.render('public/blog-post', {
        title: fallbackPost.title,
        post: fallbackPost,
        navigationItems,
        user: req.user || null,
      });
    }

    res.render('public/blog-post', {
      title: post.title,
      post,
      navigationItems,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/contact', loadUser, async (req, res, next) => {
  try {
    const navigationItems = await safeDbQuery(() =>
      prisma.navigationItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      })
    );
    const settingsList = await safeDbQuery(() => prisma.siteSetting.findMany());
    const settingsMap = {};
    if (Array.isArray(settingsList)) {
      settingsList.forEach(s => { settingsMap[s.key] = s.value; });
    }

    res.render('public/contact', {
      title: 'Contact Us',
      navigationItems,
      settings: settingsMap,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
