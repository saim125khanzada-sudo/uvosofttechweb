const express = require('express');
const router = express.Router();
const { loadUser } = require('../middleware/auth');

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

router.get('/services', loadUser, async (req, res, next) => {
  try {
    const categories = await safeDbQuery(() =>
      prisma.serviceCategory.findMany({
        where: { isActive: true },
        include: { services: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } } },
        orderBy: { sortOrder: 'asc' },
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

    res.render('public/services', {
      title: 'Our Services',
      categories,
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
    let products = await safeDbQuery(() =>
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      })
    );
    if (!products || products.length === 0) {
      const persistentStore = require('../utils/persistentStore');
      products = persistentStore.getProducts().filter(p => p.isActive !== false);
    }
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
    let products = await safeDbQuery(() =>
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      })
    );
    if (!products || products.length === 0) {
      const persistentStore = require('../utils/persistentStore');
      products = persistentStore.getProducts().filter(p => p.isActive !== false);
    }
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
