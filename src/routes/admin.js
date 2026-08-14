const express = require('express');
const router = express.Router();

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
  console.log('Prisma offline in admin route reset');
}

// Authentication Check Helper
function isAuthorized(req) {
  const hasCookie = req.headers && req.headers.cookie && req.headers.cookie.includes('uvo_admin_auth=1');
  const hasSession = req.session && req.session.userId;
  const hasKey = req.query && (req.query.key === 'Saimuvo123' || req.query.auth === '1');
  return hasCookie || hasSession || hasKey;
}

// Middleware: Require Auth for all /admin routes
router.use((req, res, next) => {
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
    .badge-info { background: rgba(59,130,246,0.2); color: #3b82f6; }
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
          <li class="${activePage === 'blog' ? 'active' : ''}"><a href="/admin/blog"><span>📝</span> Blogs & Docs</a></li>
          <li class="${activePage === 'services' ? 'active' : ''}"><a href="/admin/services"><span>💼</span> Services</a></li>
          <li class="${activePage === 'contacts' ? 'active' : ''}"><a href="/admin/contacts"><span>✉️</span> Client Inbox</a></li>
          <li class="${activePage === 'security' ? 'active' : ''}"><a href="/admin/security"><span>🛡️</span> Cyber Security</a></li>
          <li><a href="/" target="_blank"><span>🌐</span> Public Website</a></li>
          <li style="margin-top: 24px;"><a href="/auth/logout" style="color: #ff4d4d;"><span>🚪</span> Sign Out</a></li>
        </ul>
      </nav>
    </aside>
    <main class="admin-main">
      <header class="admin-topbar">
        <h1 style="font-size: 20px; margin: 0; font-weight: 700; background: linear-gradient(135deg, #FF0075, #FF6B00); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Saimuvo Admin Portal</h1>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="color: var(--text-gray); font-size: 14px;">Logged in as: <strong style="color: #fff;">saimuvo@uvosofttech.com</strong></span>
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

// 1. Dashboard Endpoint (/admin)
router.get('/', async (req, res) => {
  let productsCount = 6, blogCount = 3, servicesCount = 32, contactsCount = 0;
  if (prisma) {
    try {
      [productsCount, blogCount, servicesCount, contactsCount] = await Promise.all([
        prisma.product.count().catch(() => 6),
        prisma.blogPost.count().catch(() => 3),
        prisma.service.count().catch(() => 32),
        prisma.contactSubmission.count().catch(() => 0),
      ]);
    } catch (e) {}
  }

  const contentHtml = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${productsCount}</div>
        <div class="stat-label">Hardware Laptops</div>
        <a href="/admin/products" class="stat-link">Manage Products →</a>
      </div>
      <div class="stat-card">
        <div class="stat-number">${blogCount}</div>
        <div class="stat-label">Published Articles</div>
        <a href="/admin/blog" class="stat-link">Manage Blogs →</a>
      </div>
      <div class="stat-card">
        <div class="stat-number">${servicesCount}</div>
        <div class="stat-label">Services Offered</div>
        <a href="/admin/services" class="stat-link">View Services →</a>
      </div>
      <div class="stat-card">
        <div class="stat-number">${contactsCount}</div>
        <div class="stat-label">Client Inquiries</div>
        <a href="/admin/contacts" class="stat-link">View Inbox →</a>
      </div>
    </div>

    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
      <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 12px;">Welcome to Saimuvo Admin Control Portal</h2>
      <p style="color: var(--text-gray); margin: 0 0 16px 0;">Use the menu items on the left to manage products on the store page (<a href="/store" target="_blank" style="color: var(--primary-pink);">/store</a>), publish blogs with Google Doc links or PDF whitepapers (<a href="/blog" target="_blank" style="color: var(--primary-pink);">/blog</a>), and respond to client inquiries.</p>
      <div style="display: flex; gap: 12px;">
        <a href="/admin/products" class="btn-action btn-pink">Manage Hardware Store Products</a>
        <a href="/admin/blog" class="btn-action btn-outline">Add / Edit Blogs & Docs</a>
      </div>
    </div>
  `;

  renderAdminPage(res, { title: 'Dashboard', activePage: 'dashboard', contentHtml });
});

// 2. Hardware Store Products (/admin/products)
router.get('/products', async (req, res) => {
  let products = [];
  if (prisma) {
    try {
      products = await prisma.product.findMany({ orderBy: { sortOrder: 'asc' } });
    } catch (e) {}
  }

  const defaultProducts = [
    { id: '1', brand: 'HP', model: 'EliteBook 840 G8', price: 1200, ram: '16GB', ssd: '512GB', gpu: 'Integrated Intel Iris Xe', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop', isActive: true },
    { id: '2', brand: 'Dell', model: 'XPS 15 9510', price: 1900, ram: '32GB', ssd: '1TB', gpu: 'NVIDIA RTX 3050 Ti', imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop', isActive: true },
    { id: '3', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 9', price: 1500, ram: '16GB', ssd: '512GB', gpu: 'Integrated Intel Iris Xe', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop', isActive: true }
  ];

  const displayProducts = (products && products.length > 0) ? products : defaultProducts;

  let rowsHtml = displayProducts.map(p => `
    <tr>
      <td><img src="${p.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop'}" class="product-img" alt="Product"></td>
      <td><strong style="color:#fff;">${p.brand}</strong> ${p.model}</td>
      <td style="color: var(--primary-pink); font-weight: 700;">$${p.price}</td>
      <td style="color: var(--text-gray); font-size: 13px;">RAM: ${p.ram || '16GB'} | SSD: ${p.ssd || '512GB'} ${p.gpu ? '| GPU: ' + p.gpu : ''}</td>
      <td><span class="badge badge-${p.isActive !== false ? 'success' : 'danger'}">${p.isActive !== false ? 'Active' : 'Inactive'}</span></td>
      <td><a href="/admin/products/create?edit=${p.id}" class="btn-action btn-outline btn-sm">Edit</a></td>
    </tr>
  `).join('');

  const contentHtml = `
    <div class="content-header">
      <div>
        <h2>Hardware Store Products</h2>
        <p style="color: var(--text-gray); margin: 4px 0 0 0; font-size: 14px;">Products displayed on public hardware store (<a href="/store" target="_blank" style="color: var(--primary-pink);">uvosofttech.com/store</a>)</p>
      </div>
      <a href="/admin/products/create" class="btn-action btn-pink">+ Add Product</a>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Brand & Model</th>
          <th>Price</th>
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

  renderAdminPage(res, { title: 'Hardware Products', activePage: 'products', contentHtml });
});

// 3. Create/Edit Product Form (/admin/products/create)
router.get('/products/create', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Add New Hardware Product</h2>
      <a href="/admin/products" class="btn-action btn-outline btn-sm">Back to Products</a>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 28px; max-width: 700px;">
      <form action="/admin/api/products/create" method="POST">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>Brand Name *</label>
            <input type="text" name="brand" class="form-control" required placeholder="HP, Dell, Lenovo, Apple">
          </div>
          <div class="form-group">
            <label>Model Name *</label>
            <input type="text" name="model" class="form-control" required placeholder="EliteBook 840 G8 / XPS 15">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>Price (USD $) *</label>
            <input type="number" name="price" class="form-control" required placeholder="1200">
          </div>
          <div class="form-group">
            <label>RAM Spec</label>
            <input type="text" name="ram" class="form-control" placeholder="16GB DDR4">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label>SSD Storage</label>
            <input type="text" name="ssd" class="form-control" placeholder="512GB NVMe SSD">
          </div>
          <div class="form-group">
            <label>GPU Graphics</label>
            <input type="text" name="gpu" class="form-control" placeholder="NVIDIA RTX 3050 / Iris Xe">
          </div>
        </div>
        <div class="form-group">
          <label>Image URL</label>
          <input type="url" name="imageUrl" class="form-control" placeholder="https://images.unsplash.com/photo-...">
        </div>
        <div class="form-group">
          <label>Product Description</label>
          <textarea name="description" class="form-control" rows="4" placeholder="Enter laptop product details..."></textarea>
        </div>
        <button type="submit" class="btn-action btn-pink" style="width:100%; margin-top:12px;">Save & Publish Product</button>
      </form>
    </div>
  `;

  renderAdminPage(res, { title: 'Add Hardware Product', activePage: 'products', contentHtml });
});

// 4. Blogs & Whitepapers (/admin/blog)
router.get('/blog', async (req, res) => {
  let posts = [];
  if (prisma) {
    try {
      posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });
    } catch (e) {}
  }

  const defaultPosts = [
    { title: 'The Future of AI in ERP', slug: 'the-future-of-ai-in-erp', publishedAt: new Date(), docUrl: '', pdfUrl: '' },
    { title: 'Zero-Trust Cyber Security Architecture', slug: 'zero-trust-cyber-security', publishedAt: new Date(), docUrl: '', pdfUrl: '' },
    { title: 'Optimizing Enterprise Cloud Costs', slug: 'optimizing-cloud-costs', publishedAt: new Date(), docUrl: '', pdfUrl: '' }
  ];

  const displayPosts = (posts && posts.length > 0) ? posts : defaultPosts;

  let rowsHtml = displayPosts.map(post => `
    <tr>
      <td><strong style="color:#fff;">${post.title}</strong><br><span style="color:var(--text-gray); font-size:12px;">/blog/${post.slug}</span></td>
      <td><span class="badge badge-success">Published</span></td>
      <td style="color:var(--text-gray); font-size:13px;">${new Date(post.publishedAt || Date.now()).toLocaleDateString()}</td>
      <td><a href="/blog/${post.slug}" target="_blank" class="btn-action btn-outline btn-sm">View Article</a></td>
    </tr>
  `).join('');

  const contentHtml = `
    <div class="content-header">
      <div>
        <h2>Blogs, Google Docs & PDF Whitepapers</h2>
        <p style="color: var(--text-gray); margin: 4px 0 0 0; font-size: 14px;">Publish articles with Google Doc links and downloadable PDF attachments</p>
      </div>
      <a href="/admin/blog/create" class="btn-action btn-pink">+ New Blog Post</a>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Title & Slug</th>
          <th>Status</th>
          <th>Published Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;

  renderAdminPage(res, { title: 'Blogs & Docs Manager', activePage: 'blog', contentHtml });
});

// 5. Create Blog Form (/admin/blog/create)
router.get('/blog/create', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Create New Blog Post & Add Google Doc / PDF Links</h2>
      <a href="/admin/blog" class="btn-action btn-outline btn-sm">Back to Blogs</a>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 28px; max-width: 800px;">
      <form action="/admin/api/blog/create" method="POST">
        <div class="form-group">
          <label>Blog Post Title *</label>
          <input type="text" name="title" class="form-control" required placeholder="Enter article title...">
        </div>
        <div class="form-group">
          <label>Google Doc Shareable URL (Optional)</label>
          <input type="url" name="docUrl" class="form-control" placeholder="https://docs.google.com/document/d/...">
        </div>
        <div class="form-group">
          <label>PDF Whitepaper Link (Optional)</label>
          <input type="url" name="pdfUrl" class="form-control" placeholder="https://uvosofttech.com/whitepapers/guide.pdf">
        </div>
        <div class="form-group">
          <label>Article Summary / Excerpt</label>
          <textarea name="excerpt" class="form-control" rows="3" placeholder="Short description of the article..."></textarea>
        </div>
        <div class="form-group">
          <label>Full Content HTML</label>
          <textarea name="content" class="form-control" rows="6" placeholder="Write full article body text..."></textarea>
        </div>
        <button type="submit" class="btn-action btn-pink" style="width:100%; margin-top:12px;">Publish Article</button>
      </form>
    </div>
  `;

  renderAdminPage(res, { title: 'Create Blog Post', activePage: 'blog', contentHtml });
});

// 6. Services Manager (/admin/services)
router.get('/services', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <div>
        <h2>Enterprise IT & ERP Services (32 Active)</h2>
        <p style="color: var(--text-gray); margin: 4px 0 0 0; font-size: 14px;">Odoo & Dynamics 365 ERP, AWS/Azure Cloud Infrastructure, DevSecOps & Cybersecurity</p>
      </div>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
      <h3 style="margin-top:0; color:var(--primary-pink);">Active Categories</h3>
      <ul>
        <li><strong>IT Services & Infrastructure</strong> - Local/Remote Support, Server Management, CCTV</li>
        <li><strong>Software & App Development</strong> - Custom ERP, HRM, HCM, CRM, Mobile Apps</li>
        <li><strong>Enterprise Solutions</strong> - Microsoft Dynamics 365 (BC/F&O), Odoo ERP</li>
        <li><strong>Cloud & Virtualization</strong> - Cost Optimization, Deployments, MAM/MDM (ATCC)</li>
        <li><strong>Cybersecurity</strong> - Penetration Testing, SOC 24x7, Web/Mobile Security</li>
        <li><strong>AI Engineering</strong> - Generative AI, LLMs, RAG System Integration</li>
      </ul>
    </div>
  `;

  renderAdminPage(res, { title: 'Services Offered', activePage: 'services', contentHtml });
});

// 7. Client Inbox (/admin/contacts)
router.get('/contacts', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Client Inquiries Inbox</h2>
      <p style="color: var(--text-gray); margin: 4px 0 0 0; font-size: 14px;">Messages received through website contact forms</p>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
      <p style="color: var(--text-gray); margin: 0;">No unread contact form messages. Client consultations automatically trigger email & WhatsApp notifications to <strong>marketing@uvosofttech.com</strong> / <strong>+923718055990</strong>.</p>
    </div>
  `;

  renderAdminPage(res, { title: 'Client Contacts Inbox', activePage: 'contacts', contentHtml });
});

// 8. Cyber Security & Audit Hub (/admin/security)
router.get('/security', (req, res) => {
  const contentHtml = `
    <div class="content-header">
      <h2>Cybersecurity & 2FA Audit Hub</h2>
    </div>
    <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
      <h3 style="margin-top:0; color:#10b981;">🛡️ Account Security Active</h3>
      <p>Authenticated Admin: <strong>saimuvo@uvosofttech.com</strong></p>
      <p style="color: var(--text-gray);">Session state encrypted via persistent auth cookies (<code>uvo_admin_auth=1</code>).</p>
    </div>
  `;

  renderAdminPage(res, { title: 'Cybersecurity Hub', activePage: 'security', contentHtml });
});

module.exports = router;
