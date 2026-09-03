const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const config = require('../config');

// Initialize Prisma Client if databaseUrl is available
let prisma = null;
if (config.databaseUrl || process.env.DATABASE_URL) {
  try {
    prisma = new PrismaClient();
  } catch (e) {
    console.warn('PrismaClient init error:', e.message);
  }
}

const STORE_FILE_PATH = process.env.VERCEL
  ? path.join('/tmp', 'uvo-persistent-store.json')
  : path.join(__dirname, '..', '..', 'uvo-persistent-store.json');

// Default initial state
const defaultState = {
  adminState: {
    username: 'admin',
    passwordHash: null,
    customPassword: null,
    mustChangePassword: true,
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
  },
  products: [
    { id: 'p1', brand: 'Lenovo', model: 'ThinkPad T14 Gen 2 (Core i7 11th Gen)', category: 'Laptops', price: 135000, ram: '16GB DDR4', ssd: '512GB NVMe', hdd: 'N/A', gpu: 'Intel Iris Xe', imageUrl: '/images/products/laptop-thinkpad.jpg', description: 'Refurbished Grade A+ enterprise laptop.', sortOrder: 1, isActive: true },
    { id: 'p2', brand: 'Corsair', model: 'Vengeance LPX 16GB DDR4 3200MHz RAM', category: 'RAM', price: 9500, ram: '16GB', ssd: 'N/A', hdd: 'N/A', gpu: 'N/A', imageUrl: '/images/products/ram-ddr4.jpg', description: 'High speed Desktop Memory.', sortOrder: 2, isActive: true },
    { id: 'p3', brand: 'Crucial', model: '32GB DDR5 5600MHz Desktop Memory', category: 'RAM', price: 28500, ram: '32GB DDR5', ssd: 'N/A', hdd: 'N/A', gpu: 'N/A', imageUrl: '/images/products/ram-ddr5.jpg', description: 'Next-Gen DDR5 RAM.', sortOrder: 3, isActive: true },
    { id: 'p4', brand: 'Samsung', model: '980 PRO 1TB M.2 PCIe Gen4 NVMe SSD', category: 'Storage', price: 24500, ram: 'N/A', ssd: '1TB NVMe', hdd: 'N/A', gpu: 'N/A', imageUrl: '/images/products/storage-nvme.jpg', description: '7000MB/s Read NVMe SSD.', sortOrder: 4, isActive: true },
    { id: 'p5', brand: 'Dell', model: '24" IPS Full HD Monitor (P2419H)', category: 'LCD Monitors', price: 26500, ram: 'N/A', ssd: 'N/A', hdd: 'N/A', gpu: 'N/A', imageUrl: '/images/products/monitor-dell-24.jpg', description: 'Full HD IPS Pivot Monitor.', sortOrder: 5, isActive: true },
    { id: 'p6', brand: 'HyperX', model: 'Cloud II Gaming Headset (7.1 Surround)', category: 'Accessories', price: 14800, ram: 'N/A', ssd: 'N/A', hdd: 'N/A', gpu: 'N/A', imageUrl: '/images/products/headset-hyperx.jpg', description: '7.1 Surround Noise-Canceling Headset.', sortOrder: 6, isActive: true }
  ],
  users: [
    { id: '1', username: 'admin', email: 'admin@uvosofttech.com', firstName: 'Admin', lastName: 'User', role: 'superadmin', isActive: true, createdAt: new Date().toISOString() }
  ]
};

global.__uvoMasterStore = global.__uvoMasterStore || null;

function loadStoreSync() {
  if (global.__uvoMasterStore) return global.__uvoMasterStore;

  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const data = fs.readFileSync(STORE_FILE_PATH, 'utf8');
      global.__uvoMasterStore = JSON.parse(data);
      return global.__uvoMasterStore;
    }
  } catch (err) {
    console.warn('Error reading store file:', err.message);
  }

  if (!defaultState.adminState.passwordHash) {
    defaultState.adminState.passwordHash = bcrypt.hashSync('admin123', 10);
  }

  global.__uvoMasterStore = JSON.parse(JSON.stringify(defaultState));
  saveStoreSync(global.__uvoMasterStore);
  return global.__uvoMasterStore;
}

function saveStoreSync(store) {
  global.__uvoMasterStore = store;
  try {
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.warn('Error saving store file:', err.message);
  }
}

function saveLocalFileStoreState(partial) {
  const store = loadStoreSync();
  if (partial.adminState) store.adminState = { ...store.adminState, ...partial.adminState };
  if (partial.products) store.products = partial.products;
  if (partial.users) store.users = partial.users;
  saveStoreSync(store);
}

// -------------------------------------------------------------
// ASYNC POSTGRESQL / PRISMA PERSISTENCE METHODS (PRIMARY TRUTH)
// -------------------------------------------------------------

async function getAdminStateAsync() {
  if (prisma) {
    try {
      const settings = await prisma.siteSetting.findMany({
        where: { key: { in: ['admin_custom_password', 'admin_password_hash', 'admin_must_change_pass', 'admin_2fa_enabled', 'admin_2fa_secret'] } }
      });
      const settingMap = {};
      settings.forEach(s => { settingMap[s.key] = s.value; });

      const dbUser = await prisma.user.findFirst({ where: { email: 'admin@uvosofttech.com' } });

      let customPass = settingMap['admin_custom_password'] || null;
      let passHash = (dbUser ? dbUser.passwordHash : null) || settingMap['admin_password_hash'] || null;
      let mustChange = settingMap['admin_must_change_pass'] !== undefined ? Boolean(settingMap['admin_must_change_pass']) : (customPass ? false : true);
      let is2fa = dbUser ? dbUser.isTwoFactorEnabled : Boolean(settingMap['admin_2fa_enabled']);
      let secret2fa = (dbUser ? dbUser.twoFactorSecret : null) || settingMap['admin_2fa_secret'] || null;

      if (customPass || passHash || secret2fa) {
        const state = {
          username: 'admin',
          passwordHash: passHash,
          customPassword: customPass,
          mustChangePassword: mustChange,
          isTwoFactorEnabled: is2fa,
          twoFactorSecret: secret2fa,
        };
        saveLocalFileStoreState({ adminState: state });
        return state;
      }
    } catch (e) {
      console.warn('Prisma getAdminStateAsync error:', e.message);
    }
  }

  return getAdminStateSync();
}

async function updateAdminStateAsync(updates) {
  const currentState = await getAdminStateAsync();
  const newState = { ...currentState, ...updates };

  updateAdminStateSync(updates);

  if (prisma) {
    try {
      if (updates.customPassword) {
        await prisma.siteSetting.upsert({
          where: { key: 'admin_custom_password' },
          update: { value: updates.customPassword },
          create: { key: 'admin_custom_password', value: updates.customPassword, group: 'security', type: 'string', label: 'Admin Custom Password' }
        });
        await prisma.siteSetting.upsert({
          where: { key: 'admin_must_change_pass' },
          update: { value: false },
          create: { key: 'admin_must_change_pass', value: false, group: 'security', type: 'boolean', label: 'Must Change Password Flag' }
        });
      }

      if (updates.passwordHash) {
        await prisma.siteSetting.upsert({
          where: { key: 'admin_password_hash' },
          update: { value: updates.passwordHash },
          create: { key: 'admin_password_hash', value: updates.passwordHash, group: 'security', type: 'string', label: 'Admin Password Hash' }
        });
        await prisma.user.upsert({
          where: { email: 'admin@uvosofttech.com' },
          update: { passwordHash: updates.passwordHash },
          create: { email: 'admin@uvosofttech.com', passwordHash: updates.passwordHash, firstName: 'Admin', lastName: 'User', isActive: true }
        });
      }

      if (updates.twoFactorSecret) {
        await prisma.siteSetting.upsert({
          where: { key: 'admin_2fa_secret' },
          update: { value: updates.twoFactorSecret },
          create: { key: 'admin_2fa_secret', value: updates.twoFactorSecret, group: 'security', type: 'string', label: 'Admin 2FA Secret' }
        });
      }

      if (updates.isTwoFactorEnabled !== undefined) {
        await prisma.siteSetting.upsert({
          where: { key: 'admin_2fa_enabled' },
          update: { value: Boolean(updates.isTwoFactorEnabled) },
          create: { key: 'admin_2fa_enabled', value: Boolean(updates.isTwoFactorEnabled), group: 'security', type: 'boolean', label: 'Admin 2FA Enabled Flag' }
        });
        await prisma.user.updateMany({
          where: { email: 'admin@uvosofttech.com' },
          data: { isTwoFactorEnabled: Boolean(updates.isTwoFactorEnabled), twoFactorSecret: newState.twoFactorSecret }
        });
      }
    } catch (e) {
      console.warn('Prisma updateAdminStateAsync error:', e.message);
    }
  }

  return newState;
}

async function getProductsAsync() {
  if (prisma) {
    try {
      const dbProducts = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
      if (dbProducts && dbProducts.length > 0) {
        const products = dbProducts.map(p => ({
          id: p.id,
          brand: p.brand,
          model: p.model,
          price: Number(p.price),
          ram: p.ram || '16GB',
          ssd: p.ssd || '512GB',
          hdd: p.hdd || 'N/A',
          gpu: p.gpu || 'Integrated',
          imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
          description: p.description || '',
          sortOrder: p.sortOrder || 1,
          isActive: p.isActive !== false,
        }));
        saveLocalFileStoreState({ products });
        return products;
      }
    } catch (e) {
      console.warn('Prisma getProductsAsync error:', e.message);
    }
  }

  return getProductsSync();
}

async function saveProductAsync(productData) {
  saveProductSync(productData);

  if (prisma) {
    try {
      const pPrice = parseFloat(productData.price) || 0;
      if (productData.id && !productData.id.startsWith('p')) {
        await prisma.product.update({
          where: { id: productData.id },
          data: {
            brand: productData.brand || 'Laptop',
            model: productData.model || 'Device',
            price: pPrice,
            ram: productData.ram,
            ssd: productData.ssd,
            gpu: productData.gpu,
            imageUrl: productData.imageUrl,
            description: productData.description,
            isActive: productData.isActive !== false,
          }
        });
      } else {
        const created = await prisma.product.create({
          data: {
            brand: productData.brand || 'Laptop',
            model: productData.model || 'Device',
            price: pPrice,
            ram: productData.ram,
            ssd: productData.ssd,
            gpu: productData.gpu,
            imageUrl: productData.imageUrl,
            description: productData.description,
            isActive: productData.isActive !== false,
            sortOrder: 1,
          }
        });
        if (productData.id && productData.id.startsWith('p')) {
          productData.id = created.id;
        }
      }
    } catch (e) {
      console.warn('Prisma saveProductAsync error:', e.message);
    }
  }

  return getProductsAsync();
}

async function deleteProductAsync(productId) {
  deleteProductSync(productId);

  if (prisma) {
    try {
      if (!productId.startsWith('p')) {
        await prisma.product.delete({ where: { id: productId } });
      }
    } catch (e) {
      console.warn('Prisma deleteProductAsync error:', e.message);
    }
  }

  return getProductsAsync();
}

// Synchronous Fallback Methods
function getAdminStateSync() {
  const store = loadStoreSync();
  return store.adminState;
}

function updateAdminStateSync(updates) {
  const store = loadStoreSync();
  store.adminState = { ...store.adminState, ...updates };
  saveStoreSync(store);
  return store.adminState;
}

function getProductsSync() {
  const store = loadStoreSync();
  return store.products || [];
}

function saveProductSync(productData) {
  const store = loadStoreSync();
  if (!store.products) store.products = [];

  if (productData.id) {
    const idx = store.products.findIndex(p => p.id === productData.id);
    if (idx !== -1) {
      store.products[idx] = { ...store.products[idx], ...productData };
    } else {
      store.products.unshift(productData);
    }
  } else {
    productData.id = 'p' + Date.now();
    store.products.unshift(productData);
  }

  saveStoreSync(store);
  return store.products;
}

function deleteProductSync(productId) {
  const store = loadStoreSync();
  if (store.products) {
    store.products = store.products.filter(p => p.id !== productId);
    saveStoreSync(store);
  }
  return store.products;
}

function getUsers() {
  const store = loadStoreSync();
  return store.users || [];
}

function saveUser(userData) {
  const store = loadStoreSync();
  if (!store.users) store.users = [];
  userData.id = 'u' + Date.now();
  store.users.push(userData);
  saveStoreSync(store);
  return store.users;
}

module.exports = {
  getAdminState: getAdminStateSync,
  updateAdminState: updateAdminStateSync,
  getProducts: getProductsSync,
  saveProduct: saveProductSync,
  deleteProduct: deleteProductSync,
  getUsers,
  saveUser,

  // Async PostgreSQL Methods (Primary Source of Truth)
  getAdminStateAsync,
  updateAdminStateAsync,
  getProductsAsync,
  saveProductAsync,
  deleteProductAsync,
};
