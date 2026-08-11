const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { apiLimiter, contactLimiter } = require('../../middleware/rateLimiter');
const { contactValidation } = require('../../utils/validators');
const { logActivity } = require('../../middleware/activityLogger');

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) global.__prisma = new PrismaClient();
  prisma = global.__prisma;
}

router.use(apiLimiter);

router.get('/services', async (req, res, next) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      include: { services: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
});

router.get('/blog', async (req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      include: { author: { select: { firstName: true, lastName: true } } },
      orderBy: { publishedAt: 'desc' },
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
});

router.get('/blog/:slug', async (req, res, next) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug, status: 'published' },
      include: { author: { select: { firstName: true, lastName: true } } },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

router.get('/settings', async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });
    res.json({ success: true, data: settingsMap });
  } catch (error) {
    next(error);
  }
});

router.get('/navigation', async (req, res, next) => {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
});

router.post('/contact', contactLimiter, contactValidation, async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const submission = await prisma.contactSubmission.create({
      data: { name, email, message },
    });
    await logActivity('create', 'ContactSubmission', submission.id, { name, email }, req);
    res.status(201).json({ success: true, message: 'Thank you for your message. We will get back to you soon.' });
  } catch (error) {
    next(error);
  }
});

router.post('/chatbot', async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const responses = await prisma.chatbotResponse.findMany({
      where: { isActive: true },
      orderBy: { priority: 'desc' },
    });

    const lowerMessage = message.toLowerCase();
    let matchedResponse = null;

    for (const response of responses) {
      const keywords = response.triggerKeywords.map(k => k.toLowerCase());
      const hasMatch = keywords.some(keyword => lowerMessage.includes(keyword));
      if (hasMatch) {
        matchedResponse = response;
        break;
      }
    }

    if (matchedResponse) {
      return res.json({ success: true, data: { response: matchedResponse.responseText, matched: true } });
    }

    res.json({ success: true, data: { response: "I'm sorry, I didn't understand that. Could you please rephrase? You can also contact us directly at our office.", matched: false } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
