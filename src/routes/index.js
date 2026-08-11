const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { loadUser } = require('../middleware/auth');

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) global.__prisma = new PrismaClient();
  prisma = global.__prisma;
}

router.get('/', loadUser, async (req, res, next) => {
  try {
    const services = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      include: { services: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });

    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      take: 8,
    });

    const blogPosts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      include: { author: { select: { firstName: true, lastName: true } } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });

    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });

    const socialLinks = await prisma.socialLink.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

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
    next(error);
  }
});

router.get('/about', loadUser, async (req, res, next) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: 'about' },
      include: { sections: { where: { isVisible: true }, orderBy: { sortOrder: 'asc' } } },
    });
    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

    res.render('public/page', {
      title: page ? page.title : 'About Us',
      page,
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
    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      include: { services: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });
    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

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
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

    res.render('public/products', {
      title: 'Our Store',
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
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

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
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      include: { author: { select: { firstName: true, lastName: true } } },
      orderBy: { publishedAt: 'desc' },
    });
    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

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

router.get('/blog/:slug', loadUser, async (req, res, next) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug, status: 'published' },
      include: { author: { select: { firstName: true, lastName: true, avatarUrl: true } } },
    });
    if (!post) {
      return res.status(404).render('public/404', { title: 'Post Not Found', user: req.user || null });
    }
    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

    res.render('public/blog-post', {
      title: post.metaTitle || post.title,
      post,
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
    const navigationItems = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });

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
