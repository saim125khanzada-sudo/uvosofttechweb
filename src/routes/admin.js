const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { logActivity } = require('../middleware/activityLogger');
const bcrypt = require('bcrypt');
const config = require('../config');

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) global.__prisma = new PrismaClient();
  prisma = global.__prisma;
}

router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const [
      usersCount,
      servicesCount,
      blogPostsCount,
      productsCount,
      contactsCount,
      unreadContacts,
      recentLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
      prisma.product.count(),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.activityLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { user: { select: { firstName: true, lastName: true } } },
      }),
    ]);

    res.render('admin/dashboard', {
      layout: 'layouts/admin',
      title: 'Admin Dashboard',
      stats: {
        users: usersCount,
        services: servicesCount,
        blogPosts: blogPostsCount,
        products: productsCount,
        contacts: contactsCount,
        unreadContacts,
      },
      recentLogs,
      activePage: 'dashboard',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users', requirePermission('users.view'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: { select: { role: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.render('admin/users/index', {
      layout: 'layouts/admin',
      title: 'Manage Users',
      users,
      activePage: 'users',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users/create', requirePermission('users.create'), async (req, res, next) => {
  try {
    const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
    res.render('admin/users/form', {
      layout: 'layouts/admin',
      title: 'Create User',
      user: null,
      roles,
      activePage: 'users',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users/:id/edit', requirePermission('users.update'), async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { roles: { select: { roleId: true } } },
    });
    if (!user) {
      req.session.flash = { error: ['User not found'] };
      return res.redirect('/admin/users');
    }
    const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
    const userRoleIds = user.roles.map(r => r.roleId);
    res.render('admin/users/form', {
      layout: 'layouts/admin',
      title: 'Edit User',
      user: { ...user, roleIds: userRoleIds },
      roles,
      activePage: 'users',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/roles', requirePermission('roles.view'), async (req, res, next) => {
  try {
    const roles = await prisma.role.findMany({
      include: { permissions: { select: { permission: true } } },
      orderBy: { name: 'asc' },
    });
    res.render('admin/roles/index', {
      layout: 'layouts/admin',
      title: 'Manage Roles',
      roles,
      activePage: 'roles',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/roles/create', requirePermission('roles.create'), async (req, res, next) => {
  try {
    const permissions = await prisma.permission.findMany({ orderBy: [{ category: 'asc' }, { name: 'asc' }] });
    res.render('admin/roles/form', {
      layout: 'layouts/admin',
      title: 'Create Role',
      role: null,
      permissions,
      activePage: 'roles',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/roles/:id/edit', requirePermission('roles.update'), async (req, res, next) => {
  try {
    const role = await prisma.role.findUnique({
      where: { id: req.params.id },
      include: { permissions: { select: { permissionId: true } } },
    });
    if (!role) {
      req.session.flash = { error: ['Role not found'] };
      return res.redirect('/admin/roles');
    }
    const permissions = await prisma.permission.findMany({ orderBy: [{ category: 'asc' }, { name: 'asc' }] });
    const rolePermissionIds = role.permissions.map(p => p.permissionId);
    res.render('admin/roles/form', {
      layout: 'layouts/admin',
      title: 'Edit Role',
      role: { ...role, permissionIds: rolePermissionIds },
      permissions,
      activePage: 'roles',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/services', requirePermission('services.view'), async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.render('admin/services/index', {
      layout: 'layouts/admin',
      title: 'Manage Services',
      services,
      activePage: 'services',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/services/create', requirePermission('services.create'), async (req, res, next) => {
  try {
    const categories = await prisma.serviceCategory.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
    res.render('admin/services/form', {
      layout: 'layouts/admin',
      title: 'Create Service',
      service: null,
      categories,
      activePage: 'services',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/services/:id/edit', requirePermission('services.update'), async (req, res, next) => {
  try {
    const service = await prisma.service.findUnique({ where: { id: req.params.id } });
    if (!service) {
      req.session.flash = { error: ['Service not found'] };
      return res.redirect('/admin/services');
    }
    const categories = await prisma.serviceCategory.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
    res.render('admin/services/form', {
      layout: 'layouts/admin',
      title: 'Edit Service',
      service,
      categories,
      activePage: 'services',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/categories', requirePermission('services.view'), async (req, res, next) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      include: { _count: { select: { services: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.render('admin/categories/index', {
      layout: 'layouts/admin',
      title: 'Service Categories',
      categories,
      activePage: 'categories',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/categories/create', requirePermission('services.create'), (req, res) => {
  res.render('admin/categories/form', {
    layout: 'layouts/admin',
    title: 'Create Category',
    category: null,
    activePage: 'categories',
  });
});

router.get('/categories/:id/edit', requirePermission('services.update'), async (req, res, next) => {
  try {
    const category = await prisma.serviceCategory.findUnique({ where: { id: req.params.id } });
    if (!category) {
      req.session.flash = { error: ['Category not found'] };
      return res.redirect('/admin/categories');
    }
    res.render('admin/categories/form', {
      layout: 'layouts/admin',
      title: 'Edit Category',
      category,
      activePage: 'categories',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/blog', requirePermission('blog.view'), async (req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { author: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.render('admin/blog/index', {
      layout: 'layouts/admin',
      title: 'Manage Blog Posts',
      posts,
      activePage: 'blog',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/blog/create', requirePermission('blog.create'), (req, res) => {
  res.render('admin/blog/form', {
    layout: 'layouts/admin',
    title: 'Create Blog Post',
    post: null,
    activePage: 'blog',
  });
});

router.get('/blog/:id/edit', requirePermission('blog.update'), async (req, res, next) => {
  try {
    const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!post) {
      req.session.flash = { error: ['Blog post not found'] };
      return res.redirect('/admin/blog');
    }
    res.render('admin/blog/form', {
      layout: 'layouts/admin',
      title: 'Edit Blog Post',
      post,
      activePage: 'blog',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/products', requirePermission('products.view'), async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { sortOrder: 'asc' } });
    res.render('admin/products/index', {
      layout: 'layouts/admin',
      title: 'Manage Products',
      products,
      activePage: 'products',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/products/create', requirePermission('products.create'), (req, res) => {
  res.render('admin/products/form', {
    layout: 'layouts/admin',
    title: 'Create Product',
    product: null,
    activePage: 'products',
  });
});

router.get('/products/:id/edit', requirePermission('products.update'), async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) {
      req.session.flash = { error: ['Product not found'] };
      return res.redirect('/admin/products');
    }
    res.render('admin/products/form', {
      layout: 'layouts/admin',
      title: 'Edit Product',
      product,
      activePage: 'products',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/pages', requirePermission('pages.view'), async (req, res, next) => {
  try {
    const pages = await prisma.page.findMany({
      include: { _count: { select: { sections: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.render('admin/pages/index', {
      layout: 'layouts/admin',
      title: 'Manage Pages',
      pages,
      activePage: 'pages',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/pages/create', requirePermission('pages.create'), (req, res) => {
  res.render('admin/pages/form', {
    layout: 'layouts/admin',
    title: 'Create Page',
    page: null,
    activePage: 'pages',
  });
});

router.get('/pages/:id/edit', requirePermission('pages.update'), async (req, res, next) => {
  try {
    const page = await prisma.page.findUnique({
      where: { id: req.params.id },
      include: { sections: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!page) {
      req.session.flash = { error: ['Page not found'] };
      return res.redirect('/admin/pages');
    }
    res.render('admin/pages/form', {
      layout: 'layouts/admin',
      title: 'Edit Page',
      page,
      activePage: 'pages',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/navigation', requirePermission('navigation.view'), async (req, res, next) => {
  try {
    const items = await prisma.navigationItem.findMany({ orderBy: { sortOrder: 'asc' } });
    res.render('admin/navigation/index', {
      layout: 'layouts/admin',
      title: 'Manage Navigation',
      items,
      activePage: 'navigation',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/navigation/create', requirePermission('navigation.create'), (req, res) => {
  res.render('admin/navigation/form', {
    layout: 'layouts/admin',
    title: 'Create Navigation Item',
    item: null,
    activePage: 'navigation',
  });
});

router.get('/navigation/:id/edit', requirePermission('navigation.update'), async (req, res, next) => {
  try {
    const item = await prisma.navigationItem.findUnique({ where: { id: req.params.id } });
    if (!item) {
      req.session.flash = { error: ['Navigation item not found'] };
      return res.redirect('/admin/navigation');
    }
    res.render('admin/navigation/form', {
      layout: 'layouts/admin',
      title: 'Edit Navigation Item',
      item,
      activePage: 'navigation',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/media', requirePermission('media.view'), async (req, res, next) => {
  try {
    const media = await prisma.media.findMany({
      include: { uploader: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.render('admin/media/index', {
      layout: 'layouts/admin',
      title: 'Media Library',
      media,
      activePage: 'media',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/chatbot', requirePermission('chatbot.view'), async (req, res, next) => {
  try {
    const responses = await prisma.chatbotResponse.findMany({ orderBy: { priority: 'desc' } });
    res.render('admin/chatbot/index', {
      layout: 'layouts/admin',
      title: 'Chatbot Responses',
      responses,
      activePage: 'chatbot',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/chatbot/create', requirePermission('chatbot.create'), (req, res) => {
  res.render('admin/chatbot/form', {
    layout: 'layouts/admin',
    title: 'Create Chatbot Response',
    response: null,
    activePage: 'chatbot',
  });
});

router.get('/chatbot/:id/edit', requirePermission('chatbot.update'), async (req, res, next) => {
  try {
    const response = await prisma.chatbotResponse.findUnique({ where: { id: req.params.id } });
    if (!response) {
      req.session.flash = { error: ['Response not found'] };
      return res.redirect('/admin/chatbot');
    }
    res.render('admin/chatbot/form', {
      layout: 'layouts/admin',
      title: 'Edit Chatbot Response',
      response,
      activePage: 'chatbot',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/contacts', requirePermission('contacts.view'), async (req, res, next) => {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.render('admin/contacts/index', {
      layout: 'layouts/admin',
      title: 'Contact Submissions',
      contacts,
      activePage: 'contacts',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/contacts/:id', requirePermission('contacts.view'), async (req, res, next) => {
  try {
    const contact = await prisma.contactSubmission.findUnique({ where: { id: req.params.id } });
    if (!contact) {
      req.session.flash = { error: ['Submission not found'] };
      return res.redirect('/admin/contacts');
    }
    if (!contact.isRead) {
      await prisma.contactSubmission.update({ where: { id: contact.id }, data: { isRead: true } });
    }
    res.render('admin/contacts/show', {
      layout: 'layouts/admin',
      title: 'View Submission',
      contact,
      activePage: 'contacts',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/settings', requirePermission('settings.view'), async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findMany({ orderBy: [{ group: 'asc' }, { label: 'asc' }] });
    const grouped = {};
    settings.forEach(s => {
      if (!grouped[s.group]) grouped[s.group] = [];
      grouped[s.group].push(s);
    });
    res.render('admin/settings/index', {
      layout: 'layouts/admin',
      title: 'Site Settings',
      settings: grouped,
      activePage: 'settings',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/logs', requirePermission('logs.view'), async (req, res, next) => {
  try {
    const logs = await prisma.activityLog.findMany({
      include: { user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    res.render('admin/logs/index', {
      layout: 'layouts/admin',
      title: 'Activity Logs',
      logs,
      activePage: 'logs',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/security', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    });
    res.render('admin/security', {
      layout: 'layouts/admin',
      title: 'Cybersecurity & 2FA Audit Hub',
      user,
      logs,
      activePage: 'security',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
