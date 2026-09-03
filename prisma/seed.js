const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();
const { servicesCategories, detailedServices } = require('../src/data/servicesDetailedData');

async function main() {
  console.log('Seeding database with 24 New Technology Services...');

  // ─── Clean Old Data ───
  try {
    await prisma.service.deleteMany({});
    await prisma.serviceCategory.deleteMany({});
    console.log('Cleared old services and categories from database.');
  } catch (e) {
    console.log('Notice during cleanup:', e.message);
  }

  // ─── Permissions ───
  const permissionData = [
    { name: 'users.view', category: 'Users', description: 'View users list' },
    { name: 'users.create', category: 'Users', description: 'Create new users' },
    { name: 'users.update', category: 'Users', description: 'Edit existing users' },
    { name: 'users.delete', category: 'Users', description: 'Delete users' },
    { name: 'roles.view', category: 'Roles', description: 'View roles' },
    { name: 'roles.create', category: 'Roles', description: 'Create new roles' },
    { name: 'roles.update', category: 'Roles', description: 'Edit roles' },
    { name: 'roles.delete', category: 'Roles', description: 'Delete roles' },
    { name: 'services.view', category: 'Services', description: 'View services' },
    { name: 'services.create', category: 'Services', description: 'Create services' },
    { name: 'services.update', category: 'Services', description: 'Edit services' },
    { name: 'services.delete', category: 'Services', description: 'Delete services' },
    { name: 'categories.view', category: 'Categories', description: 'View service categories' },
    { name: 'categories.create', category: 'Categories', description: 'Create service categories' },
    { name: 'categories.update', category: 'Categories', description: 'Edit service categories' },
    { name: 'categories.delete', category: 'Categories', description: 'Delete service categories' },
  ];

  for (const p of permissionData) {
    await prisma.permission.upsert({
      where: { name: p.name },
      update: p,
      create: p,
    });
  }

  // ─── Superadmin Role ───
  const permissions = await prisma.permission.findMany();
  const superadminRole = await prisma.role.upsert({
    where: { name: 'superadmin' },
    update: {},
    create: {
      name: 'superadmin',
      description: 'Super Administrator with full system control.',
      isSystem: true,
      permissions: {
        create: permissions.map(p => ({ permissionId: p.id })),
      },
    },
  });

  // ─── Admin User ───
  const passwordHash = crypto.createHash('sha256').update('admin123').digest('hex');
  await prisma.user.upsert({
    where: { email: 'admin@uvosofttech.com' },
    update: { passwordHash },
    create: {
      email: 'admin@uvosofttech.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
      roles: { create: [{ roleId: superadminRole.id }] },
    },
  });

  // ─── Create 4 Main Categories ───
  const categoryMap = {};
  for (let i = 0; i < servicesCategories.length; i++) {
    const cat = servicesCategories[i];
    const createdCat = await prisma.serviceCategory.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        sortOrder: i + 1,
      },
    });
    categoryMap[cat.slug] = createdCat.id;
  }
  console.log('Created 4 new service categories');

  // ─── Create 24 Detailed Services ───
  for (let i = 0; i < detailedServices.length; i++) {
    const s = detailedServices[i];
    const categoryId = categoryMap[s.categorySlug];

    await prisma.service.create({
      data: {
        title: s.title,
        slug: s.serviceSlug,
        shortDesc: s.heroSubtitle,
        fullDesc: s.pageContent,
        icon: s.icon || 'code',
        categoryId: categoryId || null,
        isFeatured: true,
        sortOrder: i + 1,
        metaTitle: s.seoTitle,
        metaDescription: s.heroSubtitle,
        features: JSON.stringify(s.features),
      },
    });
  }
  console.log('Seeded 24 new detailed services into database');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
