const fs = require('fs');
const path = require('path');
const https = require('https');
const bcrypt = require('bcrypt');

const STORE_FILE_PATH = process.env.VERCEL
  ? path.join('/tmp', 'uvo-persistent-store.json')
  : path.join(__dirname, '..', '..', 'uvo-persistent-store.json');

// Default Master State
const defaultState = {
  adminState: {
    username: 'admin',
    passwordHash: '$2b$10$w095V10XFp2T2xXwF9kO7u7/Q4N.E9hW6gJ4hK4uX5y6z7a8b9c0d', // Default admin123 hash
    customPassword: null,
    mustChangePassword: true,
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
  },
  products: [
    { id: 'p1', brand: 'HP', model: 'EliteBook 840 G8', price: 185000, ram: '16GB', ssd: '512GB', hdd: 'N/A', gpu: 'Integrated Intel Iris Xe', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop', description: 'Enterprise security laptop with 11th Gen i7 Processor.', sortOrder: 1, isActive: true },
    { id: 'p2', brand: 'Dell', model: 'XPS 15 9510', price: 295000, ram: '32GB', ssd: '1TB', hdd: 'N/A', gpu: 'NVIDIA RTX 3050 Ti', imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop', description: 'Stunning 4K OLED display laptop for high performance engineering.', sortOrder: 2, isActive: true },
    { id: 'p3', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 9', price: 240000, ram: '16GB', ssd: '512GB', hdd: 'N/A', gpu: 'Integrated Intel Iris Xe', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop', description: 'Ultra-durable carbon fiber business ultrabook.', sortOrder: 3, isActive: true }
  ],
  users: [
    { id: '1', username: 'admin', email: 'admin@uvosofttech.com', firstName: 'Admin', lastName: 'User', role: 'superadmin', isActive: true, createdAt: new Date().toISOString() }
  ]
};

// Global Memory Store (Persists across function executions in same process)
global.__uvoMasterStore = global.__uvoMasterStore || null;

function initDefaultHash() {
  if (!defaultState.adminState.passwordHash || defaultState.adminState.passwordHash.length < 10) {
    defaultState.adminState.passwordHash = bcrypt.hashSync('admin123', 10);
  }
}

function loadStore() {
  initDefaultHash();
  if (global.__uvoMasterStore) return global.__uvoMasterStore;

  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const data = fs.readFileSync(STORE_FILE_PATH, 'utf8');
      global.__uvoMasterStore = JSON.parse(data);
      console.log('Loaded store from file:', STORE_FILE_PATH);
      return global.__uvoMasterStore;
    }
  } catch (err) {
    console.warn('File store load fallback:', err.message);
  }

  global.__uvoMasterStore = JSON.parse(JSON.stringify(defaultState));
  saveStore(global.__uvoMasterStore);
  return global.__uvoMasterStore;
}

function saveStore(store) {
  global.__uvoMasterStore = store;
  try {
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.warn('File store save fallback:', err.message);
  }
}

// Getters and Setters
function getAdminState() {
  const store = loadStore();
  return store.adminState;
}

function updateAdminState(updates) {
  const store = loadStore();
  store.adminState = { ...store.adminState, ...updates };
  saveStore(store);
  return store.adminState;
}

function getProducts() {
  const store = loadStore();
  return store.products || [];
}

function saveProduct(productData) {
  const store = loadStore();
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

  saveStore(store);
  return store.products;
}

function deleteProduct(productId) {
  const store = loadStore();
  if (store.products) {
    store.products = store.products.filter(p => p.id !== productId);
    saveStore(store);
  }
  return store.products;
}

function getUsers() {
  const store = loadStore();
  return store.users || [];
}

function saveUser(userData) {
  const store = loadStore();
  if (!store.users) store.users = [];
  userData.id = 'u' + Date.now();
  store.users.push(userData);
  saveStore(store);
  return store.users;
}

module.exports = {
  getAdminState,
  updateAdminState,
  getProducts,
  saveProduct,
  deleteProduct,
  getUsers,
  saveUser,
};
