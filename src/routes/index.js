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
    const products = await safeDbQuery(() =>
      prisma.product.findMany({
        where: { isActive: true },
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
    const products = await safeDbQuery(() =>
      prisma.product.findMany({
        where: { isActive: true },
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
