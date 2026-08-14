const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../../middleware/auth');
const { checkPermission } = require('../../middleware/rbac');
const { logActivity } = require('../../middleware/activityLogger');
const bcrypt = require('bcrypt');
const config = require('../../config');
const { slugify } = require('../../utils/helpers');
const upload = require('../../utils/upload');
const {
  userValidation,
  serviceValidation,
  serviceCategoryValidation,
  blogPostValidation,
  productValidation,
  settingsValidation,
  roleValidation,
  pageValidation,
  navigationValidation,
  chatbotValidation,
} = require('../../utils/validators');

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) global.__prisma = new PrismaClient();
  prisma = global.__prisma;
}

router.use(requireAuth);

// ====== USERS ======
router.get('/users', checkPermission('users.view'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: { roles: { select: { role: { select: { id: true, name: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
});

router.post('/users', checkPermission('users.create'), async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, roleIds, isActive } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }
    const passwordHash = await bcrypt.hash(password, config.security.bcryptRounds);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        isActive: isActive !== undefined ? isActive : true,
        ...(roleIds && roleIds.length > 0 && {
          roles: {
            create: roleIds.map(roleId => ({ roleId })),
          },
        }),
      },
    });
    await logActivity('create', 'User', user.id, { email: user.email }, req);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

router.put('/users/:id', checkPermission('users.update'), async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, roleIds, isActive } = req.body;
    const updateData = {};
    if (email) updateData.email = email;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (password) updateData.passwordHash = await bcrypt.hash(password, config.security.bcryptRounds);

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
    });

    if (roleIds) {
      await prisma.userRole.deleteMany({ where: { userId: user.id } });
      if (roleIds.length > 0) {
        await prisma.userRole.createMany({
          data: roleIds.map(roleId => ({ userId: user.id, roleId })),
        });
      }
    }

    await logActivity('update', 'User', user.id, { email: user.email }, req);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:id', checkPermission('users.delete'), async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.id === req.user.id) return res.status(400).json({ error: 'Cannot delete your own account' });
    await prisma.user.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'User', req.params.id, { email: user.email }, req);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== ROLES ======
router.get('/roles', checkPermission('roles.view'), async (req, res, next) => {
  try {
    const roles = await prisma.role.findMany({
      include: { permissions: { select: { permission: true } } },
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, data: roles });
  } catch (error) {
    next(error);
  }
});

router.post('/roles', checkPermission('roles.create'), async (req, res, next) => {
  try {
    const { name, description, permissionIds } = req.body;
    const existing = await prisma.role.findUnique({ where: { name } });
    if (existing) return res.status(409).json({ error: 'A role with this name already exists' });

    const role = await prisma.role.create({
      data: {
        name,
        description,
        ...(permissionIds && permissionIds.length > 0 && {
          permissions: {
            create: permissionIds.map(permissionId => ({ permissionId })),
          },
        }),
      },
      include: { permissions: { select: { permission: true } } },
    });
    await logActivity('create', 'Role', role.id, { name: role.name }, req);
    res.status(201).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
});

router.put('/roles/:id', checkPermission('roles.update'), async (req, res, next) => {
  try {
    const { name, description, permissionIds } = req.body;
    const role = await prisma.role.findUnique({ where: { id: req.params.id } });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    if (role.isSystem) return res.status(400).json({ error: 'Cannot modify system roles' });

    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    const updatedRole = await prisma.role.update({ where: { id: req.params.id }, data: updateData });

    if (permissionIds) {
      await prisma.rolePermission.deleteMany({ where: { roleId: updatedRole.id } });
      if (permissionIds.length > 0) {
        await prisma.rolePermission.createMany({
          data: permissionIds.map(permissionId => ({ roleId: updatedRole.id, permissionId })),
        });
      }
    }

    await logActivity('update', 'Role', updatedRole.id, { name: updatedRole.name }, req);
    res.json({ success: true, data: updatedRole });
  } catch (error) {
    next(error);
  }
});

router.delete('/roles/:id', checkPermission('roles.delete'), async (req, res, next) => {
  try {
    const role = await prisma.role.findUnique({ where: { id: req.params.id } });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    if (role.isSystem) return res.status(400).json({ error: 'Cannot delete system roles' });
    await prisma.role.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'Role', req.params.id, { name: role.name }, req);
    res.json({ success: true, message: 'Role deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== SERVICES ======
router.get('/services', checkPermission('services.view'), async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
});

router.post('/services', checkPermission('services.create'), async (req, res, next) => {
  try {
    const { title, description, categoryId, iconUrl, imageUrl, sortOrder, isActive } = req.body;
    const service = await prisma.service.create({
      data: { title, description, categoryId, iconUrl, imageUrl, sortOrder: sortOrder || 0, isActive: isActive !== undefined ? isActive : true },
      include: { category: true },
    });
    await logActivity('create', 'Service', service.id, { title: service.title }, req);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

router.put('/services/:id', checkPermission('services.update'), async (req, res, next) => {
  try {
    const { title, description, categoryId, iconUrl, imageUrl, sortOrder, isActive } = req.body;
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: { title, description, categoryId, iconUrl, imageUrl, sortOrder, isActive },
      include: { category: true },
    });
    await logActivity('update', 'Service', service.id, { title: service.title }, req);
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

router.delete('/services/:id', checkPermission('services.delete'), async (req, res, next) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'Service', req.params.id, {}, req);
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== SERVICE CATEGORIES ======
router.get('/categories', checkPermission('services.view'), async (req, res, next) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      include: { _count: { select: { services: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

router.post('/categories', checkPermission('services.create'), async (req, res, next) => {
  try {
    const { name, slug, description, iconUrl, sortOrder, isActive } = req.body;
    const categorySlug = slug || slugify(name);
    const category = await prisma.serviceCategory.create({
      data: { name, slug: categorySlug, description, iconUrl, sortOrder: sortOrder || 0, isActive: isActive !== undefined ? isActive : true },
    });
    await logActivity('create', 'ServiceCategory', category.id, { name: category.name }, req);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

router.put('/categories/:id', checkPermission('services.update'), async (req, res, next) => {
  try {
    const { name, slug, description, iconUrl, sortOrder, isActive } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (iconUrl !== undefined) updateData.iconUrl = iconUrl;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    const category = await prisma.serviceCategory.update({ where: { id: req.params.id }, data: updateData });
    await logActivity('update', 'ServiceCategory', category.id, { name: category.name }, req);
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

router.delete('/categories/:id', checkPermission('services.delete'), async (req, res, next) => {
  try {
    const category = await prisma.serviceCategory.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { services: true } } },
    });
    if (category && category._count.services > 0) {
      return res.status(400).json({ error: 'Cannot delete category with associated services' });
    }
    await prisma.serviceCategory.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'ServiceCategory', req.params.id, {}, req);
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== BLOG POSTS ======
router.get('/blog', checkPermission('blog.view'), async (req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { author: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
});

router.post('/blog', checkPermission('blog.create'), async (req, res, next) => {
  try {
    const { title, slug, content, excerpt, featuredImageUrl, docUrl, pdfUrl, status, metaTitle, metaDescription, metaKeywords } = req.body;
    const postSlug = slug || slugify(title);
    const publishedAt = status === 'published' ? new Date() : null;

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: postSlug,
        content,
        excerpt,
        featuredImageUrl,
        docUrl,
        pdfUrl,
        authorId: req.user.id,
        status: status || 'draft',
        publishedAt,
        metaTitle,
        metaDescription,
        metaKeywords,
      },
      include: { author: { select: { firstName: true, lastName: true } } },
    });
    await logActivity('create', 'BlogPost', post.id, { title: post.title }, req);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

router.put('/blog/:id', checkPermission('blog.update'), async (req, res, next) => {
  try {
    const { title, slug, content, excerpt, featuredImageUrl, docUrl, pdfUrl, status, metaTitle, metaDescription, metaKeywords } = req.body;
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });

    const updateData = {};
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (featuredImageUrl !== undefined) updateData.featuredImageUrl = featuredImageUrl;
    if (docUrl !== undefined) updateData.docUrl = docUrl;
    if (pdfUrl !== undefined) updateData.pdfUrl = pdfUrl;
    if (status) {
      updateData.status = status;
      if (status === 'published' && existing && existing.status !== 'published') {
        updateData.publishedAt = new Date();
      }
    }
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
    if (metaKeywords !== undefined) updateData.metaKeywords = metaKeywords;

    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: updateData,
      include: { author: { select: { firstName: true, lastName: true } } },
    });
    await logActivity('update', 'BlogPost', post.id, { title: post.title }, req);
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

router.delete('/blog/:id', checkPermission('blog.delete'), async (req, res, next) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'BlogPost', req.params.id, {}, req);
    res.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== PRODUCTS ======
router.get('/products', checkPermission('products.view'), async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
});

router.post('/products', checkPermission('products.create'), async (req, res, next) => {
  try {
    const { brand, model, price, ram, ssd, hdd, gpu, imageUrl, description, sortOrder, isActive } = req.body;
    const product = await prisma.product.create({
      data: { brand, model, price: parseFloat(price), ram, ssd, hdd, gpu, imageUrl, description, sortOrder: sortOrder || 0, isActive: isActive !== undefined ? isActive : true },
    });
    await logActivity('create', 'Product', product.id, { brand: product.brand, model: product.model }, req);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.put('/products/:id', checkPermission('products.update'), async (req, res, next) => {
  try {
    const { brand, model, price, ram, ssd, hdd, gpu, imageUrl, description, sortOrder, isActive } = req.body;
    const updateData = {};
    if (brand) updateData.brand = brand;
    if (model) updateData.model = model;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (ram !== undefined) updateData.ram = ram;
    if (ssd !== undefined) updateData.ssd = ssd;
    if (hdd !== undefined) updateData.hdd = hdd;
    if (gpu !== undefined) updateData.gpu = gpu;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (description !== undefined) updateData.description = description;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    const product = await prisma.product.update({ where: { id: req.params.id }, data: updateData });
    await logActivity('update', 'Product', product.id, { brand: product.brand, model: product.model }, req);
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.post('/products/create', async (req, res) => {
  try {
    const { brand, model, price, ram, ssd, gpu, imageUrl, description } = req.body;
    if (prisma) {
      await prisma.product.create({
        data: {
          brand: brand || 'Laptop',
          model: model || 'Device',
          price: parseFloat(price) || 999,
          ram: ram || '16GB',
          ssd: ssd || '512GB',
          gpu: gpu || 'Integrated',
          imageUrl: imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
          description: description || '',
          sortOrder: 1,
          isActive: true
        }
      });
    }
  } catch (e) {
    console.warn('Product create database fallback:', e.message);
  }
  res.redirect('/admin/products');
});

router.post('/blog/create', async (req, res) => {
  try {
    const { title, docUrl, pdfUrl, excerpt, content } = req.body;
    const slug = (title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (prisma) {
      await prisma.blogPost.create({
        data: {
          title: title || 'New Article',
          slug: slug + '-' + Date.now().toString().slice(-4),
          excerpt: excerpt || '',
          content: content || '<p>Article body content.</p>',
          docUrl: docUrl || '',
          pdfUrl: pdfUrl || '',
          status: 'published',
          publishedAt: new Date()
        }
      });
    }
  } catch (e) {
    console.warn('Blog create database fallback:', e.message);
  }
  res.redirect('/admin/blog');
});

// ====== PAGES ======
router.get('/pages', checkPermission('pages.view'), async (req, res, next) => {
  try {
    const pages = await prisma.page.findMany({
      include: { _count: { select: { sections: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ success: true, data: pages });
  } catch (error) {
    next(error);
  }
});

router.post('/pages', checkPermission('pages.create'), async (req, res, next) => {
  try {
    const { title, slug, metaTitle, metaDescription, metaKeywords, ogImageUrl, isPublished, sortOrder } = req.body;
    const pageSlug = slug || slugify(title);
    const page = await prisma.page.create({
      data: { title, slug: pageSlug, metaTitle, metaDescription, metaKeywords, ogImageUrl, isPublished: isPublished !== undefined ? isPublished : true, sortOrder: sortOrder || 0 },
    });
    await logActivity('create', 'Page', page.id, { title: page.title }, req);
    res.status(201).json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
});

router.put('/pages/:id', checkPermission('pages.update'), async (req, res, next) => {
  try {
    const { title, slug, metaTitle, metaDescription, metaKeywords, ogImageUrl, isPublished, sortOrder } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
    if (metaKeywords !== undefined) updateData.metaKeywords = metaKeywords;
    if (ogImageUrl !== undefined) updateData.ogImageUrl = ogImageUrl;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    const page = await prisma.page.update({ where: { id: req.params.id }, data: updateData });
    await logActivity('update', 'Page', page.id, { title: page.title }, req);
    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
});

router.delete('/pages/:id', checkPermission('pages.delete'), async (req, res, next) => {
  try {
    await prisma.page.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'Page', req.params.id, {}, req);
    res.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== NAVIGATION ======
router.get('/navigation', checkPermission('navigation.view'), async (req, res, next) => {
  try {
    const items = await prisma.navigationItem.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
});

router.post('/navigation', checkPermission('navigation.create'), async (req, res, next) => {
  try {
    const { label, href, sortOrder, isVisible, target, cssClass } = req.body;
    const item = await prisma.navigationItem.create({
      data: { label, href, sortOrder: sortOrder || 0, isVisible: isVisible !== undefined ? isVisible : true, target: target || '_self', cssClass },
    });
    await logActivity('create', 'NavigationItem', item.id, { label: item.label }, req);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

router.put('/navigation/:id', checkPermission('navigation.update'), async (req, res, next) => {
  try {
    const { label, href, sortOrder, isVisible, target, cssClass } = req.body;
    const updateData = {};
    if (label) updateData.label = label;
    if (href) updateData.href = href;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (isVisible !== undefined) updateData.isVisible = isVisible;
    if (target) updateData.target = target;
    if (cssClass !== undefined) updateData.cssClass = cssClass;

    const item = await prisma.navigationItem.update({ where: { id: req.params.id }, data: updateData });
    await logActivity('update', 'NavigationItem', item.id, { label: item.label }, req);
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

router.delete('/navigation/:id', checkPermission('navigation.delete'), async (req, res, next) => {
  try {
    await prisma.navigationItem.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'NavigationItem', req.params.id, {}, req);
    res.json({ success: true, message: 'Navigation item deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== MEDIA ======
router.post('/media/upload', checkPermission('media.create'), upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const media = await prisma.media.create({
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: '/uploads/' + req.file.filename,
        altText: req.body.altText || null,
        uploadedBy: req.user.id,
      },
    });
    await logActivity('upload', 'Media', media.id, { filename: media.filename }, req);
    res.status(201).json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
});

router.delete('/media/:id', checkPermission('media.delete'), async (req, res, next) => {
  try {
    const media = await prisma.media.findUnique({ where: { id: req.params.id } });
    if (!media) return res.status(404).json({ error: 'Media not found' });
    const fs = require('fs');
    const filePath = require('path').join(config.paths.uploads, media.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await prisma.media.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'Media', req.params.id, { filename: media.filename }, req);
    res.json({ success: true, message: 'Media deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== CONTACTS ======
router.get('/contacts', checkPermission('contacts.view'), async (req, res, next) => {
  try {
    const contacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
});

router.put('/contacts/:id/read', checkPermission('contacts.update'), async (req, res, next) => {
  try {
    const contact = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
});

router.put('/contacts/:id/respond', checkPermission('contacts.update'), async (req, res, next) => {
  try {
    const contact = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { respondedAt: new Date(), isRead: true },
    });
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
});

router.delete('/contacts/:id', checkPermission('contacts.delete'), async (req, res, next) => {
  try {
    await prisma.contactSubmission.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'ContactSubmission', req.params.id, {}, req);
    res.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== CHATBOT ======
router.get('/chatbot', checkPermission('chatbot.view'), async (req, res, next) => {
  try {
    const responses = await prisma.chatbotResponse.findMany({ orderBy: { priority: 'desc' } });
    res.json({ success: true, data: responses });
  } catch (error) {
    next(error);
  }
});

router.post('/chatbot', checkPermission('chatbot.create'), async (req, res, next) => {
  try {
    const { triggerKeywords, responseText, priority, isActive } = req.body;
    const response = await prisma.chatbotResponse.create({
      data: { triggerKeywords, responseText, priority: priority || 0, isActive: isActive !== undefined ? isActive : true },
    });
    await logActivity('create', 'ChatbotResponse', response.id, {}, req);
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
});

router.put('/chatbot/:id', checkPermission('chatbot.update'), async (req, res, next) => {
  try {
    const { triggerKeywords, responseText, priority, isActive } = req.body;
    const updateData = {};
    if (triggerKeywords) updateData.triggerKeywords = triggerKeywords;
    if (responseText) updateData.responseText = responseText;
    if (priority !== undefined) updateData.priority = priority;
    if (isActive !== undefined) updateData.isActive = isActive;

    const response = await prisma.chatbotResponse.update({ where: { id: req.params.id }, data: updateData });
    await logActivity('update', 'ChatbotResponse', response.id, {}, req);
    res.json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
});

router.delete('/chatbot/:id', checkPermission('chatbot.delete'), async (req, res, next) => {
  try {
    await prisma.chatbotResponse.delete({ where: { id: req.params.id } });
    await logActivity('delete', 'ChatbotResponse', req.params.id, {}, req);
    res.json({ success: true, message: 'Response deleted' });
  } catch (error) {
    next(error);
  }
});

// ====== SETTINGS ======
router.get('/settings', checkPermission('settings.view'), async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findMany({ orderBy: [{ group: 'asc' }, { label: 'asc' }] });
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
});

router.put('/settings/:key', checkPermission('settings.update'), async (req, res, next) => {
  try {
    const { value } = req.body;
    const setting = await prisma.siteSetting.update({
      where: { key: req.params.key },
      data: { value },
    });
    await logActivity('update', 'SiteSetting', setting.id, { key: setting.key }, req);
    res.json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
});

router.post('/settings', checkPermission('settings.create'), async (req, res, next) => {
  try {
    const { key, value, group, type, label } = req.body;
    const setting = await prisma.siteSetting.create({
      data: { key, value, group, type, label },
    });
    await logActivity('create', 'SiteSetting', setting.id, { key: setting.key }, req);
    res.status(201).json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
});

// ====== ACTIVITY LOGS ======
router.get('/logs', checkPermission('logs.view'), async (req, res, next) => {
  try {
    const logs = await prisma.activityLog.findMany({
      include: { user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
});

// ====== PROFILE ======
router.put('/profile', async (req, res, next) => {
  try {
    const { firstName, lastName, avatarUrl, currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to set a new password' });
      }
      const valid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!valid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      const hash = await bcrypt.hash(newPassword, config.security.bcryptRounds);
      await prisma.user.update({ where: { id: req.user.id }, data: { passwordHash: hash } });
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    const updated = await prisma.user.update({ where: { id: req.user.id }, data: updateData });
    await logActivity('update', 'Profile', updated.id, { firstName: updated.firstName, lastName: updated.lastName }, req);
    res.json({ success: true, data: { id: updated.id, email: updated.email, firstName: updated.firstName, lastName: updated.lastName, avatarUrl: updated.avatarUrl } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
