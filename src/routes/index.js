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

// 1. Services Directory Hub (/services)
router.get('/services', loadUser, async (req, res, next) => {
  try {
    if (trySendStaticHtml(req, res)) return;

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

    res.render('public/services', {
      title: 'Our Technology Services Directory | UVO SoftTech',
      categories: servicesCategories,
      services: detailedServices,
      navigationItems,
      settings: settingsMap,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

// 2. Exact 2-Tier Category + Service Handler (/services/development/website-development etc.)
router.get('/services/:categorySlug/:serviceSlug', loadUser, async (req, res, next) => {
  try {
    if (trySendStaticHtml(req, res)) return;

    const { categorySlug, serviceSlug } = req.params;
    const matchedService = findDetailedService(categorySlug, serviceSlug);

    if (!matchedService) {
      return res.status(404).render('public/error', {
        title: 'Service Page Not Found',
        message: 'The requested technology service page does not exist or has been relocated.',
        user: req.user || null,
      });
    }

    const categoryServices = getServicesByCategory(matchedService.categorySlug);
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

    res.render('public/service-detail', {
      title: `${matchedService.title} | UVO SoftTech`,
      service: matchedService,
      categoryServices,
      allServices: detailedServices,
      navigationItems,
      settings: settingsMap,
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
});

// 3. Category Landing Page or Single-Slug Fallback (/services/development or /services/website-development)
router.get('/services/:slug', loadUser, async (req, res, next) => {
  try {
    if (trySendStaticHtml(req, res)) return;

    const rawSlug = req.params.slug;
    const matchedCategory = servicesCategories.find(c => c.slug === rawSlug || c.id === rawSlug);

    if (matchedCategory) {
      const categoryServices = getServicesByCategory(matchedCategory.slug);
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

      return res.render('public/services', {
        title: `${matchedCategory.name} Services | UVO SoftTech`,
        currentCategory: matchedCategory,
        categories: servicesCategories,
        services: categoryServices,
        navigationItems,
        settings: settingsMap,
        user: req.user || null,
      });
    }

    const matchedService = findDetailedService(null, rawSlug);
    if (matchedService) {
      const categoryServices = getServicesByCategory(matchedService.categorySlug);
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

      return res.render('public/service-detail', {
        title: `${matchedService.title} | UVO SoftTech`,
        service: matchedService,
        categoryServices,
        allServices: detailedServices,
        navigationItems,
        settings: settingsMap,
        user: req.user || null,
      });
    }

    return res.status(404).render('public/error', {
      title: 'Service Page Not Found',
      message: 'The requested technology service page does not exist or has been relocated.',
      user: req.user || null,
    });
  } catch (error) {
    next(error);
  }
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
