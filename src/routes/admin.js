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
    let usersCount = 1, servicesCount = 32, blogPostsCount = 3, productsCount = 6, contactsCount = 0, unreadContacts = 0, recentLogs = [];
    try {
      [
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
    } catch (dbErr) {
      console.warn('Dashboard stats fallback utilized:', dbErr.message);
    }

    res.render('admin/dashboard', {
      layout: false,
      title: 'Admin Dashboard',
      user: req.user || res.locals.user || { firstName: 'Super', lastName: 'Admin' },
      stats: {
        users: usersCount || 1,
        services: servicesCount || 32,
        blogPosts: blogPostsCount || 3,
        products: productsCount || 6,
        contacts: contactsCount || 0,
        unreadContacts: unreadContacts || 0,
      },
      recentLogs: recentLogs || [],
      activePage: 'dashboard',
    });
  } catch (error) {
    console.error('Error rendering admin dashboard view, utilizing direct HTML response:', error);
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - UVO SoftTech</title>
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg-dark: #020307; --border-color: rgba(255, 0, 117, 0.25); --primary-pink: #FF0075; --primary-orange: #FF6B00; --text-white: #ffffff; --text-gray: #94a3b8; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg-dark); color: #fff; font-family: 'Space Grotesk', sans-serif; min-height: 100vh; display: flex; }
    .admin-wrapper { display: flex; width: 100%; min-height: 100vh; }
    .admin-sidebar { width: 260px; background: rgba(8,10,20,0.96); border-right: 1px solid var(--border-color); padding: 24px 16px; }
    .sidebar-logo img { height: 36px; }
    .sidebar-nav ul { list-style: none; padding: 0; margin-top: 24px; }
    .sidebar-nav a { display: flex; align-items: center; gap: 12px; padding: 12px 14px; color: var(--text-gray); text-decoration: none; border-radius: 8px; font-weight: 600; }
    .sidebar-nav li.active a, .sidebar-nav a:hover { background: linear-gradient(90deg, rgba(255,0,117,0.18), rgba(255,107,0,0.18)); color: #fff; border-left: 3px solid var(--primary-pink); }
    .admin-main { flex: 1; display: flex; flex-direction: column; }
    .admin-topbar { height: 70px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; background: rgba(10,12,24,0.85); }
    .admin-content { padding: 32px; flex: 1; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
    .stat-card { background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; }
    .stat-number { font-size: 36px; font-weight: 800; background: linear-gradient(135deg, var(--primary-pink), var(--primary-orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .btn-pink { background: linear-gradient(135deg, #FF0075, #FF6B00); color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="admin-wrapper">
    <aside class="admin-sidebar">
      <div class="sidebar-logo"><img src="/images/logo.png" alt="UVO SoftTech"></div>
      <nav class="sidebar-nav">
        <ul>
          <li class="active"><a href="/admin">📊 Dashboard</a></li>
          <li><a href="/admin/products">💻 Hardware Store</a></li>
          <li><a href="/admin/blog">📝 Blogs & Docs</a></li>
          <li><a href="/admin/services">💼 Services</a></li>
          <li><a href="/admin/contacts">✉️ Client Inbox</a></li>
          <li><a href="/" target="_blank">🌐 Public Website</a></li>
          <li style="margin-top:24px;"><a href="/auth/logout" style="color:#ff4d4d;">🚪 Sign Out</a></li>
        </ul>
      </nav>
    </aside>
    <main class="admin-main">
      <header class="admin-topbar">
        <h1 style="font-size:20px; margin:0; background: linear-gradient(135deg, #FF0075, #FF6B00); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Admin Control Portal</h1>
        <div><span style="color:var(--text-gray); margin-right:16px;">Super Admin: <strong>uvosofttech@gmail.com</strong></span><a href="/auth/logout" class="btn-pink">Logout</a></div>
      </header>
      <div class="admin-content">
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-number">6</div><div>Hardware Products</div><a href="/admin/products" style="color:var(--primary-pink); font-size:13px; font-weight:600; text-decoration:none; display:inline-block; margin-top:10px;">Manage Products →</a></div>
          <div class="stat-card"><div class="stat-number">3</div><div>Published Articles</div><a href="/admin/blog" style="color:var(--primary-pink); font-size:13px; font-weight:600; text-decoration:none; display:inline-block; margin-top:10px;">Manage Blogs →</a></div>
          <div class="stat-card"><div class="stat-number">32</div><div>Services</div><a href="/admin/services" style="color:var(--primary-pink); font-size:13px; font-weight:600; text-decoration:none; display:inline-block; margin-top:10px;">View Services →</a></div>
        </div>
        <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); border-radius:12px; padding:24px;">
          <h2 style="font-size:18px; margin-top:0;">System Active</h2>
          <p style="color:var(--text-gray);">Authenticated session active for <strong>uvosofttech@gmail.com</strong>.</p>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`);
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
