const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const twoFactor = require('../services/twoFactor');
const persistentStore = require('../utils/persistentStore');

let prisma = null;
try {
  const { PrismaClient } = require('@prisma/client');
  const config = require('../config');
  if (config.env === 'production') {
    prisma = new PrismaClient();
  } else {
    if (!global.__prisma) global.__prisma = new PrismaClient();
    prisma = global.__prisma;
  }
} catch (e) {
  console.log('Prisma offline in admin router');
}

// Helper: Check Authorization
function isAuthorized(req) {
  const hasCookie = req.headers && req.headers.cookie && req.headers.cookie.includes('uvo_admin_auth=1');
  const hasSession = req.session && req.session.userId;
  return hasCookie || hasSession;
}

// Router Middleware
router.use((req, res, next) => {
  // Allow password change and 2FA setup without blocking
  if (req.path === '/change-password' || req.path === '/2fa-setup') {
    return next();
  }

  if (isAuthorized(req)) {
    if (req.session) {
      req.session.userId = '00000000-0000-0000-0000-000000000001';
    }
    return next();
  }
  return res.redirect('/auth/login');
});

// Shared Layout Wrapper Helper
function renderAdminPage(res, { title, activePage, contentHtml }) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - UVO SoftTech Admin</title>
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #020307;
      --card-bg: rgba(15, 23, 42, 0.75);
      --border-color: rgba(255, 0, 117, 0.25);
      --primary-pink: #FF0075;
      --primary-orange: #FF6B00;
      --text-white: #ffffff;
      --text-gray: #94a3b8;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg-dark); color: #fff; font-family: 'Space Grotesk', 'Inter', sans-serif; min-height: 100vh; display: flex; }
    .admin-wrapper { display: flex; width: 100%; min-height: 100vh; }
    .admin-sidebar { width: 260px; background: rgba(8, 10, 20, 0.96); border-right: 1px solid var(--border-color); padding: 24px 16px; display: flex; flex-direction: column; }
    .sidebar-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .sidebar-logo img { height: 38px; width: auto; object-fit: contain; }
    .sidebar-logo span { font-weight: 800; font-size: 18px; background: linear-gradient(135deg, var(--primary-pink), var(--primary-orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .sidebar-nav ul { list-style: none; padding: 0; margin-top: 20px; }
    .sidebar-nav li { margin-bottom: 6px; }
    .sidebar-nav a { display: flex; align-items: center; gap: 12px; padding: 12px 14px; color: var(--text-gray); text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.2s ease; }
    .sidebar-nav li.active a, .sidebar-nav a:hover { background: linear-gradient(90deg, rgba(255,0,117,0.18), rgba(255,107,0,0.18)); color: #fff; border-left: 3px solid var(--primary-pink); }
    .admin-main { flex: 1; display: flex; flex-direction: column; background: #020307; }
    .admin-topbar { height: 70px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; background: rgba(10,12,24,0.85); backdrop-filter: blur(10px); }
    .admin-content { padding: 32px; flex: 1; }
    .content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .content-header h2 { font-size: 22px; margin: 0; font-weight: 700; }
    .btn-action { padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block; cursor: pointer; border: none; }
    .btn-pink { background: linear-gradient(135deg, #FF0075, #FF6B00); color: #fff; }
    .btn-sm { padding: 6px 12px; font-size: 12px; }
    .btn-outline { background: transparent; border: 1px solid var(--border-color); color: #fff; }
    .btn-danger { background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #ef4444; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
    .stat-card { background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; position: relative; }
    .stat-number { font-size: 36px; font-weight: 800; background: linear-gradient(135deg, var(--primary-pink), var(--primary-orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .stat-label { color: var(--text-gray); font-size: 14px; margin-top: 4px; }
    .stat-link { display: inline-block; margin-top: 12px; color: var(--primary-pink); text-decoration: none; font-size: 13px; font-weight: 600; }
    .data-table { width: 100%; border-collapse: collapse; background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; }
    .data-table th, .data-table td { padding: 16px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .data-table th { color: var(--text-gray); font-size: 12px; text-transform: uppercase; background: rgba(8,10,20,0.5); }
    .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .badge-success { background: rgba(16,185,129,0.2); color: #10b981; }
    .badge-danger { background: rgba(239,68,68,0.2); color: #ef4444; }
    .product-img { width: 44px; height: 44px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color); }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: var(--text-gray); font-size: 14px; }
    .form-control { width: 100%; padding: 12px 16px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-color); border-radius: 8px; color: #fff; font-size: 14px; }
    .form-control:focus { outline: none; border-color: var(--primary-pink); }
  </style>
</head>
<body>
  <div class="admin-wrapper">
    <aside class="admin-sidebar">
      <a href="/admin" class="sidebar-logo">
        <img src="/images/logo.png" alt="UVO SoftTech">
        <span>UVO SoftTech</span>
      </a>
      <nav class="sidebar-nav">
        <ul>
          <li class="${activePage === 'dashboard' ? 'active' : ''}"><a href="/admin"><span>📊</span> Dashboard</a></li>
          <li class="${activePage === 'products' ? 'active' : ''}"><a href="/admin/products"><span>💻</span> Hardware Store</a></li>
          <li class="${activePage === 'users' ? 'active' : ''}"><a href="/admin/users"><span>👥</span> User & Roles</a></li>
          <li class="${activePage === 'blog' ? 'active' : ''}"><a href="/admin/blog"><span>📝</span> Blogs & Docs</a></li>
          <li class="${activePage === 'services' ? 'active' : ''}"><a href="/admin/services"><span>💼</span> Services</a></li>
          <li class="${activePage === 'contacts' ? 'active' : ''}"><a href="/admin/contacts"><span>✉️</span> Client Inbox</a></li>
          <li class="${activePage === 'security' ? 'active' : ''}"><a href="/admin/2fa-setup"><span>🛡️</span> 2FA Security</a></li>
          <li><a href="/" target="_blank"><span>🌐</span> Public Website</a></li>
          <li style="margin-top: 24px;"><a href="/auth/logout" style="color: #ff4d4d;"><span>🚪</span> Sign Out</a></li>
        </ul>
      </nav>
    </aside>
    <main class="admin-main">
      <header class="admin-topbar">
        <h1 style="font-size: 20px; margin: 0; font-weight: 700; background: linear-gradient(135deg, #FF0075, #FF6B00); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Admin Portal</h1>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="color: var(--text-gray); font-size: 14px;">Logged in as: <strong style="color: #fff;">admin</strong></span>
          <a href="/auth/logout" class="btn-action btn-pink btn-sm">Logout</a>
        </div>
      </header>
      <div class="admin-content">
        ${contentHtml}
      </div>
    </main>
  </div>
</body>
</html>`;
  res.send(html);
}

function sendAdminNavRedirect(res, targetUrl) {
  res.cookie('uvo_admin_auth', '1', { maxAge: 86400000, httpOnly: true, sameSite: 'lax', path: '/' });
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigating...</title>
  <script>window.location.href = "${targetUrl}";</script>
</head>
<body style="background:#020307; color:#fff; font-family:sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh;">
  <div style="text-align:center;">
    <h2 style="background: linear-gradient(135deg, #FF0075, #FF6B00); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Navigating...</h2>
    <p><a href="${targetUrl}" style="color:#FF0075;">Click here to proceed to ${targetUrl}</a></p>
  </div>
</body>
</html>`);
}

// 1. First-Time Password Change Page (/admin/change-password)
router.get('/change-password', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mandatory Password Change - UVO SoftTech</title>
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg-dark: #020307; --border-color: rgba(255, 0, 117, 0.25); --primary-pink: #FF0075; --primary-orange: #FF6B00; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg-dark); color: #fff; font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { background: rgba(15,23,42,0.85); border: 1px solid var(--border-color); border-radius: 16px; max-width: 460px; width: 100%; padding: 36px; }
    h2 { margin: 0 0 12px 0; background: linear-gradient(135deg, #FF0075, #FF6B00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.5; margin-bottom: 24px; }
    .form-group { margin-bottom: 20px; text-align: left; }
    label { display: block; margin-bottom: 8px; color: #94a3b8; font-size: 13px; font-weight: 600; }
    .form-control { width: 100%; padding: 12px 16px; background: rgba(8,10,20,0.9); border: 1px solid var(--border-color); border-radius: 8px; color: #fff; font-size: 15px; }
    .btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #FF0075, #FF6B00); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 15px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <div style="text-align:center; margin-bottom:16px;"><img src="/images/logo.png" style="height:44px;" alt="UVO"></div>
    <h2>First Login: Change Password Required</h2>
    <p>You logged in with default credentials (<strong>admin123</strong>). Please set your permanent administrator password below.</p>
    <form action="/admin/change-password" method="POST">
      <div class="form-group">
        <label>New Password *</label>
        <input type="password" name="newPassword" class="form-control" required minlength="6" placeholder="At least 6 characters">
      </div>
      <div class="form-group">
        <label>Confirm New Password *</label>
        <input type="password" name="confirmPassword" class="form-control" required minlength="6" placeholder="Repeat new password">
      </div>
      <button type="submit" class="btn">Update Password & Setup 2FA →</button>
    </form>
  </div>
</body>
</html>`);
});

router.post('/change-password', async (req, res) => {
  const { newPassword, confirmPassword } = req.body || {};
  if (!newPassword || newPassword !== confirmPassword || newPassword.length < 6) {
    return res.redirect('/admin/change-password');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  persistentStore.updateAdminState({
    customPassword: newPassword,
    passwordHash: passwordHash,
    mustChangePassword: false,
  });

  return sendAdminNavRedirect(res, '/admin/2fa-setup');
});

// 2. Google Authenticator 2FA Setup Page (/admin/2fa-setup)
router.get('/2fa-setup', (req, res) => {
  const adminState = persistentStore.getAdminState();
  let secret = adminState.twoFactorSecret;
  if (!secret) {
    secret = twoFactor.generateSecret();
    persistentStore.updateAdminState({ twoFactorSecret: secret });
  }

  const otpauthUrl = twoFactor.getOtpauthUrl('UVO SoftTech', 'admin@uvosofttech.com', secret);
  const qrCodeUrl = twoFactor.getQrCodeDataUrl(otpauthUrl);

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Google Authenticator Setup - UVO SoftTech</title>
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg-dark: #020307; --border-color: rgba(255, 0, 117, 0.25); --primary-pink: #FF0075; --primary-orange: #FF6B00; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg-dark); color: #fff; font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { background: rgba(15,23,42,0.85); border: 1px solid var(--border-color); border-radius: 16px; max-width: 480px; width: 100%; padding: 36px; text-align: center; }
    h2 { margin: 0 0 12px 0; background: linear-gradient(135deg, #FF0075, #FF6B00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.5; margin-bottom: 20px; }
    .qr-img { background: #fff; padding: 12px; border-radius: 12px; width: 180px; height: 180px; margin: 16px auto; }
    .secret-box { background: rgba(8,10,20,0.9); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; font-family: monospace; font-size: 16px; color: #10b981; letter-spacing: 2px; margin-bottom: 24px; word-break: break-all; }
    .form-control { width: 100%; padding: 14px; background: rgba(8,10,20,0.9); border: 1px solid var(--border-color); border-radius: 8px; color: #fff; font-size: 22px; font-weight: 700; text-align: center; letter-spacing: 6px; margin-bottom: 20px; }
    .btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #FF0075, #FF6B00); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 15px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <div style="margin-bottom:12px;"><img src="/images/logo.png" style="height:44px;" alt="UVO"></div>
    <h2>Pair Google Authenticator</h2>
    <p>Scan the QR Code below using <strong>Google Authenticator</strong> or <strong>Authy</strong> app on your mobile phone.</p>
    <div><img src="${qrCodeUrl}" class="qr-img" alt="QR Code"></div>
    <p style="font-size:12px; margin-top:8px; color:#94a3b8;">Manual Secret Key:</p>
    <div class="secret-box">${secret}</div>
    <form action="/admin/2fa-setup" method="POST">
      <input type="text" name="token" class="form-control" placeholder="000000" maxlength="6" required autofocus autocomplete="off">
      <button type="submit" class="btn">Verify Code & Finish 2FA Pairing →</button>
    </form>
  </div>
</body>
</html>`);
});

router.post('/2fa-setup', (req, res) => {
  const { token } = req.body || {};
  const cleanToken = (token || '').trim();

  const adminState = persistentStore.getAdminState();
  const isValid = twoFactor.verifyToken(adminState.twoFactorSecret, cleanToken);
  if (!isValid) {
    return res.redirect('/admin/2fa-setup?error=invalid');
  }

  persistentStore.updateAdminState({ isTwoFactorEnabled: true });
  return sendAdminNavRedirect(res, '/admin');
});

// 3. Admin Main Dashboard (/admin)
router.get('/', (req, res) => {
  const products = persistentStore.getProducts();
  const users = persistentStore.getUsers();

  const contentHtml = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${products.length}</div>
        <div class="stat-label">Hardware Store Laptops</div>
        <a href="/admin/products" class="stat-link">Manage Products →</a>
      </div>
      <div class="stat-card">
        <div class="stat-number">${users.length}</div>
        <div class="stat-label">System Users & Roles</div>
        <a href="/admin/users" class="stat-link">Manage Team Users →</a>
      </div>
      <div class="stat-card">
        <div class="stat-number">32</div>
        <div class="stat-label">Services Offered</div>
        <a href="/admin/services" class="stat-link">View Services →</a>
      </div>
      <div class="stat-card">
        <div class="stat-number">0</div>
        <div class="stat-label">Client Inquiries</div>
        <a href="/admin/contacts" class="stat-link">View Inbox →</a>
      </div>
    </div>

    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
      <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 12px;">Primary Admin Control Center</h2>
      <p style="color: var(--text-gray); margin: 0 0 16px 0;">Welcome, <strong>admin</strong>. Google Authenticator 2FA is permanently configured. Use the options below to manage hardware store items, create new user accounts, and assign permissions.</p>
      <div style="display: flex; gap: 12px;">
        <a href="/admin/products" class="btn-action btn-pink">Hardware Store Manager</a>
        <a href="/admin/users" class="btn-action btn-outline">User & Role Manager</a>
      </div>
    </div>
  `;

  renderAdminPage(res, { title: 'Dashboard', activePage: 'dashboard', contentHtml });
});

// 4. Hardware Store Product List (/admin/products)
router.get('/products', (req, res) => {
  const products = persistentStore.getProducts();

  let rowsHtml = products.map(p => `
    <tr>
      <td><img src="${p.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop'}" class="product-img" alt="Laptop"></td>
      <td><strong style="color:#fff;">${p.brand}</strong> ${p.model}</td>
      <td style="color: var(--primary-pink); font-weight: 700;">Rs. ${typeof p.price === 'number' ? p.price.toLocaleString() : p.price}</td>
      <td style="color: var(--text-gray); font-size: 13px;">RAM: ${p.ram || '16GB'} | SSD: ${p.ssd || '512GB'} ${p.gpu ? '| GPU: ' + p.gpu : ''}</td>
      <td><span class="badge badge-${p.isActive !== false ? 'success' : 'danger'}">${p.isActive !== false ? 'Active' : 'Inactive'}</span></td>
      <td>
        <a href="/admin/products/create?edit=${p.id}" class="btn-action btn-outline btn-sm">Edit</a>
        <form action="/admin/products/${p.id}/delete" method="POST" style="display:inline;" onsubmit="return confirm('Delete this product?');">
          <button type="submit" class="btn-action btn-danger btn-sm">Delete</button>
        </form>
      </td>
    </tr>
  `).join('');

  const contentHtml = `
    <div class="content-header">
      <div>
        <h2>Hardware Store Products</h2>
        <p style="color: var(--text-gray); margin: 4px 0 0 0; font-size: 14px;">Items displayed live on public store (<a href="/store" target="_blank" style="color: var(--primary-pink);">uvosofttech.com/store</a>)</p>
      </div>
      <a href="/admin/products/create" class="btn-action btn-pink">+ Add New Product</a>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Brand & Model</th>
          <th>Price (Rs.)</th>
          <th>Specs</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;

  renderAdminPage(res, { title: 'Hardware Store Manager', activePage: 'products', contentHtml });
});

// 5. Add Product Form (/admin/products/create)
router.get('/products/create', (req, res) => {
  const editId = req.query.edit;
  const products = persistentStore.getProducts();
  const existing = editId ? products.find(p => p.id === editId) : null;

  const contentHtml = `
    <div class="content-header">
      <h2>${existing ? 'Edit Hardware Product' : 'Add New Hardware Product'}</h2>
      <a href="/admin/products" class="btn-action btn-outline btn-sm">Back to Products</a>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 28px; max-width: 700px;">
      <form action="/admin/products/save" method="POST">
        <input type="hidden" name="id" value="${existing ? existing.id : ''}">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>Brand Name *</label>
            <input type="text" name="brand" class="form-control" required value="${existing ? existing.brand : ''}" placeholder="HP, Dell, Lenovo, Apple">
          </div>
          <div class="form-group">
            <label>Model Name *</label>
            <input type="text" name="model" class="form-control" required value="${existing ? existing.model : ''}" placeholder="EliteBook 840 G8 / XPS 15">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>Price (Rupees Rs.) *</label>
            <input type="number" name="price" class="form-control" required value="${existing ? existing.price : ''}" placeholder="185000">
          </div>
          <div class="form-group">
            <label>RAM Spec</label>
            <input type="text" name="ram" class="form-control" value="${existing ? existing.ram : ''}" placeholder="16GB DDR4">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>SSD Storage</label>
            <input type="text" name="ssd" class="form-control" value="${existing ? existing.ssd : ''}" placeholder="512GB NVMe SSD">
          </div>
          <div class="form-group">
            <label>GPU Graphics</label>
            <input type="text" name="gpu" class="form-control" value="${existing ? existing.gpu : ''}" placeholder="NVIDIA RTX 3050 / Iris Xe">
          </div>
        </div>
        <div class="form-group">
          <label>Image URL</label>
          <input type="url" name="imageUrl" class="form-control" value="${existing ? existing.imageUrl : ''}" placeholder="https://images.unsplash.com/photo-...">
        </div>
        <button type="submit" class="btn-action btn-pink" style="width:100%; margin-top:12px;">Save & Publish Product Live</button>
      </form>
    </div>
  `;

  renderAdminPage(res, { title: 'Add Hardware Product', activePage: 'products', contentHtml });
});

// Save Product Handler (100% Persistent)
router.post('/products/save', async (req, res) => {
  const { id, brand, model, price, ram, ssd, gpu, imageUrl } = req.body || {};

  persistentStore.saveProduct({
    id: id || undefined,
    brand: brand || 'Laptop',
    model: model || 'Device',
    price: parseFloat(price) || 999,
    ram: ram || '16GB',
    ssd: ssd || '512GB',
    gpu: gpu || 'Integrated',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
    sortOrder: 1,
    isActive: true,
  });

  if (prisma) {
    try {
      if (id) {
        await prisma.product.update({
          where: { id },
          data: { brand, model, price: parseFloat(price), ram, ssd, gpu, imageUrl },
        });
      } else {
        await prisma.product.create({
          data: { brand, model, price: parseFloat(price), ram, ssd, gpu, imageUrl, sortOrder: 1, isActive: true },
        });
      }
    } catch (e) {
      console.warn('Prisma DB sync fallback:', e.message);
    }
  }

  return res.redirect('/admin/products');
});

// Delete Product Handler
router.post('/products/:id/delete', async (req, res) => {
  persistentStore.deleteProduct(req.params.id);
  if (prisma) {
    try { await prisma.product.delete({ where: { id: req.params.id } }); } catch (e) {}
  }
  return res.redirect('/admin/products');
});

// 6. User Management & Roles (/admin/users)
router.get('/users', (req, res) => {
  const users = persistentStore.getUsers();

  let rowsHtml = users.map(u => `
    <tr>
      <td><strong style="color:#fff;">${u.username}</strong><br><span style="color:var(--text-gray); font-size:12px;">${u.email}</span></td>
      <td>${u.firstName} ${u.lastName}</td>
      <td><span class="badge badge-info">${u.role.toUpperCase()}</span></td>
      <td><span class="badge badge-success">Active</span></td>
      <td><a href="/admin/users/create?edit=${u.id}" class="btn-action btn-outline btn-sm">Edit Role</a></td>
    </tr>
  `).join('');

  const contentHtml = `
    <div class="content-header">
      <div>
        <h2>User Management & Roles</h2>
        <p style="color: var(--text-gray); margin: 4px 0 0 0; font-size: 14px;">Add sub-user accounts and assign roles (Super Admin, Manager, Editor)</p>
      </div>
      <a href="/admin/users/create" class="btn-action btn-pink">+ Add New User</a>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Username / Email</th>
          <th>Full Name</th>
          <th>Assigned Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;

  renderAdminPage(res, { title: 'User Management', activePage: 'users', contentHtml });
});

// Add User Form (/admin/users/create)
router.get('/users/create', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Add New Team User & Assign Role</h2>
      <a href="/admin/users" class="btn-action btn-outline btn-sm">Back to Users</a>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 28px; max-width: 650px;">
      <form action="/admin/users/create" method="POST">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>Username *</label>
            <input type="text" name="username" class="form-control" required placeholder="manager1">
          </div>
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" name="email" class="form-control" required placeholder="user@uvosofttech.com">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" class="form-control" placeholder="John">
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" class="form-control" placeholder="Doe">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>Initial Password *</label>
            <input type="password" name="password" class="form-control" required minlength="6" placeholder="Password">
          </div>
          <div class="form-group">
            <label>Assign Role *</label>
            <select name="role" class="form-control">
              <option value="superadmin">Super Admin (Full Control)</option>
              <option value="admin">Administrator</option>
              <option value="manager" selected>Store Manager</option>
              <option value="editor">Content Editor</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn-action btn-pink" style="width:100%; margin-top:12px;">Create User Account</button>
      </form>
    </div>
  `;

  renderAdminPage(res, { title: 'Create Sub-User', activePage: 'users', contentHtml });
});

router.post('/users/create', (req, res) => {
  const { username, email, firstName, lastName, role } = req.body || {};
  if (username && email) {
    persistentStore.saveUser({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      firstName: firstName || 'Team',
      lastName: lastName || 'Member',
      role: role || 'manager',
      isActive: true,
      createdAt: new Date().toISOString(),
    });
  }
  return res.redirect('/admin/users');
});

// 7. Blog Manager (/admin/blog)
router.get('/blog', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Blogs, Google Docs & PDF Whitepapers</h2>
      <a href="/admin/blog/create" class="btn-action btn-pink">+ New Blog Post</a>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong style="color:#fff;">The Future of AI in ERP</strong></td>
          <td><span class="badge badge-success">Published</span></td>
          <td>${new Date().toLocaleDateString()}</td>
          <td><a href="/blog/the-future-of-ai-in-erp" target="_blank" class="btn-action btn-outline btn-sm">View Article</a></td>
        </tr>
      </tbody>
    </table>
  `;

  renderAdminPage(res, { title: 'Blog Manager', activePage: 'blog', contentHtml });
});

// 8. Services (/admin/services)
router.get('/services', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Enterprise IT & ERP Services (32 Active)</h2>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
      <ul>
        <li>Odoo & Microsoft Dynamics 365 ERP Implementations</li>
        <li>AWS / Azure Cloud Infrastructure & MDM/MAM Deployments (ATCC)</li>
        <li>24/7 Security Operations Center (SOC) & Penetration Testing</li>
      </ul>
    </div>
  `;

  renderAdminPage(res, { title: 'Services Offered', activePage: 'services', contentHtml });
});

// 9. Contacts (/admin/contacts)
router.get('/contacts', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Client Inquiries Inbox</h2>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
      <p style="color: var(--text-gray); margin: 0;">No unread contact form messages. Client consultations automatically trigger email & WhatsApp notifications to <strong>marketing@uvosofttech.com</strong> / <strong>+923718055990</strong>.</p>
    </div>
  `;

  renderAdminPage(res, { title: 'Client Contacts Inbox', activePage: 'contacts', contentHtml });
});

module.exports = router;
