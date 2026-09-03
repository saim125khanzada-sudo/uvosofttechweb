const fs = require('fs');
const path = require('path');
const { detailedServices, servicesCategories } = require('../src/data/servicesDetailedData');

const publicDir = path.join(__dirname, '..', 'public');
const servicesBaseDir = path.join(publicDir, 'services');

function generatePageHtml({ title, h1, categoryName, categorySlug, icon, keywords, heroSubtitle, content, features, techStack, urlPath, slug }) {
  const metaKeywords = keywords || '';
  const pageTitle = title || `${h1} | UVO SoftTech Enterprise Solutions`;
  const heroText = heroSubtitle || '';
  
  const featureCardsHtml = (features || []).map((f, i) => `
    <div class="glass-card" style="padding: 24px; display: flex; align-items: flex-start; gap: 14px;">
      <span style="background: var(--logo-gradient); color: #FFF; font-weight: 800; border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem;">
        0${i + 1}
      </span>
      <div style="color: #FFF; font-size: 1rem; font-weight: 600; line-height: 1.4; margin-top: 4px;">
        ${f}
      </div>
    </div>
  `).join('');

  const techBadgesHtml = (techStack || []).map(t => `
    <span style="background: rgba(8,10,20,0.8); border: 1px solid rgba(0, 240, 255, 0.3); color: #FFF; font-size: 0.9rem; font-weight: 600; padding: 8px 18px; border-radius: 20px;">
      ⚡ ${t}
    </span>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${content.substring(0, 160).replace(/"/g, '&quot;')}">
  <meta name="keywords" content="${metaKeywords.replace(/"/g, '&quot;')}">
  <link rel="stylesheet" href="/style.css">
  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Canvas Background -->
  <canvas id="ai-canvas"></canvas>

  <!-- Navigation Bar -->
  <header class="navbar">
    <a href="/" class="nav-logo" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
      <img src="/images/logo.png" alt="Uvosoft Tech Logo" class="nav-logo-img" style="height: 42px; width: auto; object-fit: contain;">
    </a>

    <nav>
      <ul class="nav-links">
        <li><a href="/" class="nav-link">Home</a></li>
        <li class="nav-item-dropdown">
          <a href="/services" class="nav-link active">Services ▾</a>
          <div class="nav-dropdown">
            <a href="/services/development">💻 Custom Software & Web Dev</a>
            <a href="/services/development/ERP-Development">📊 ERP Development (Odoo / Dynamics 365)</a>
            <a href="/services/development/website-development">🌐 Website Development</a>
            <a href="/services/cloud-devops">☁️ Cloud Engineering & DevOps</a>
            <a href="/services/cybersecurity">🛡️ Enterprise Cybersecurity</a>
            <a href="/services/ai-automation">🤖 AI Engineering & Automation</a>
            <a href="/services" style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 4px; padding-top: 10px; color: var(--primary-pink) !important; font-weight: 700;">
              ⚡ All 24+ Services Directory →
            </a>
          </div>
        </li>
        <li><a href="/store" class="nav-link">Hardware Store</a></li>
        <li><a href="/blog" class="nav-link">Blogs</a></li>
        <li><a href="/about" class="nav-link">About Us</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
      </ul>
    </nav>

    <div class="nav-actions" style="display:flex; align-items:center; gap:12px;">
      <a href="/contact#quote" class="btn-primary" style="padding:0.6rem 1.4rem; font-size:0.85rem;">Get Quote</a>
      <a href="/auth/login" class="btn-login">Client Login</a>
    </div>
  </header>

  <!-- Content Section -->
  <main style="padding-top: 140px; padding-bottom: 60px;">
    <section class="content-section">
      <!-- Breadcrumb Navigation -->
      <div style="max-width: 1100px; margin: 0 auto 20px; font-size: 0.88rem; color: var(--text-gray);">
        <a href="/" style="color: var(--text-gray); text-decoration: none;">Home</a>
        <span style="margin: 0 8px;">/</span>
        <a href="/services" style="color: var(--text-gray); text-decoration: none;">Services</a>
        <span style="margin: 0 8px;">/</span>
        <a href="/services/${categorySlug}" style="color: var(--text-gray); text-decoration: none;">${categoryName}</a>
        <span style="margin: 0 8px;">/</span>
        <span style="color: var(--primary-pink); font-weight: 600;">${h1}</span>
      </div>

      <!-- Hero Banner -->
      <div style="max-width: 1100px; margin: 0 auto 40px; text-align: center;">
        <div style="background: rgba(255,0,117,0.12); border: 1px solid rgba(255,0,117,0.35); color: var(--primary-pink); font-size: 0.85rem; font-weight: 700; padding: 6px 16px; border-radius: 20px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px;">
          <span>${icon || '⚡'}</span> ${categoryName}
        </div>
        
        <h1 class="section-title" style="font-size: clamp(2.2rem, 5vw, 3.5rem); margin-bottom: 16px; line-height: 1.2;">
          ${h1}
        </h1>
        
        <p class="section-subtitle" style="max-width: 840px; margin: 0 auto 28px; font-size: 1.1rem; line-height: 1.6; color: var(--text-gray);">
          ${heroText}
        </p>

        ${metaKeywords ? `
          <div style="background: rgba(8,10,20,0.7); border: 1px solid rgba(0,240,255,0.25); padding: 10px 18px; border-radius: 12px; max-width: 850px; margin: 0 auto 32px; font-size: 0.82rem; color: #94a3b8; line-height: 1.5;">
            <strong style="color: var(--neon-blue);">🔑 Targeted SEO Focus:</strong> ${metaKeywords}
          </div>
        ` : ''}

        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
          <a href="/contact?service=${encodeURIComponent(h1)}" class="btn-primary" style="padding: 0.85rem 2rem; font-size: 1rem;">
            Get Quote for ${h1} →
          </a>
          <a href="https://wa.me/923718055990?text=Hello%20UVO%20SoftTech%2C%20I%20am%20interested%20in%20${encodeURIComponent(h1)}" target="_blank" class="btn-primary" style="background: #25D366; color: #FFF; padding: 0.85rem 2rem; font-size: 1rem; border: none;">
            💬 WhatsApp Consultation
          </a>
        </div>
      </div>

      <!-- Primary Page Content -->
      <div class="glass-card" style="max-width: 1100px; margin: 0 auto 60px; padding: 40px; border-color: rgba(255, 0, 117, 0.3); background: rgba(15, 23, 42, 0.85);">
        <h2 style="font-size: 1.8rem; color: #FFF; margin-top: 0; margin-bottom: 20px; font-family: 'Space Grotesk', sans-serif;">
          Service Overview & Technical Scope
        </h2>
        <div style="color: #e2e8f0; font-size: 1.08rem; line-height: 1.8; margin-bottom: 0;">
          ${content}
        </div>
      </div>

      <!-- Features & Capabilities -->
      ${featureCardsHtml ? `
        <div style="max-width: 1100px; margin: 0 auto 60px;">
          <h2 class="section-title" style="text-align: center; font-size: 2rem; margin-bottom: 32px;">
            Key Capabilities & <span>Deliverables</span>
          </h2>
          <div class="grid-container" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            ${featureCardsHtml}
          </div>
        </div>
      ` : ''}

      <!-- Tech Stack Badges -->
      ${techBadgesHtml ? `
        <div style="max-width: 1100px; margin: 0 auto 60px; text-align: center;">
          <h3 style="color: var(--text-gray); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">
            ENGINEERING & TECHNOLOGY STACK
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
            ${techBadgesHtml}
          </div>
        </div>
      ` : ''}

      <!-- Call to Action Banner -->
      <div style="max-width: 1100px; margin: 0 auto 60px; background: linear-gradient(135deg, rgba(255,0,117,0.2), rgba(255,107,0,0.2)); border: 1px solid var(--primary-pink); border-radius: 16px; padding: 40px 28px; text-align: center;">
        <h2 style="color: #FFF; font-size: 2rem; margin-top: 0; margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif;">
          Ready to Start Your ${h1} Project?
        </h2>
        <p style="color: var(--text-gray); max-width: 650px; margin: 0 auto 24px; font-size: 1rem;">
          Speak with our solution architects today for a free discovery call, project estimation, and technical consultation.
        </p>
        <a href="/contact?service=${encodeURIComponent(h1)}" class="btn-primary" style="padding: 0.9rem 2.4rem; font-size: 1.05rem;">
          Request Free Project Quote →
        </a>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer style="background: rgba(4,7,15,0.95); border-top: 1px solid rgba(255,255,255,0.08); padding: 50px 24px 30px;">
    <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
      <p style="color: var(--text-gray); font-size: 0.9rem;">
        © 2026 Uvosoft Tech (UVO SoftTech Enterprise Solutions). All Rights Reserved.
      </p>
    </div>
  </footer>

  <script src="/js/public.js"></script>
</body>
</html>`;
}

function buildStaticServices() {
  console.log('Generating physical static HTML files under public/services/...');

  // Ensure public/services directory
  if (!fs.existsSync(servicesBaseDir)) {
    fs.mkdirSync(servicesBaseDir, { recursive: true });
  }

  // 1. Generate Main Services Directory index.html & services.html
  const mainServicesHtml = generateMainServicesPage();
  fs.writeFileSync(path.join(servicesBaseDir, 'index.html'), mainServicesHtml, 'utf8');
  fs.writeFileSync(path.join(servicesBaseDir, 'services.html'), mainServicesHtml, 'utf8');
  console.log('Created public/services/index.html & public/services/services.html');

  // 2. Generate Category Pages & Individual Service Pages
  servicesCategories.forEach(cat => {
    const catDir = path.join(servicesBaseDir, cat.slug);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }

    // Category Index Page (e.g. public/services/development/index.html)
    const catServices = detailedServices.filter(s => s.categorySlug === cat.slug);
    const catHtml = generateCategoryPage(cat, catServices);
    fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf8');
    fs.writeFileSync(path.join(catDir, `${cat.slug}.html`), catHtml, 'utf8');
    console.log(`Created category page public/services/${cat.slug}/index.html`);

    // Individual Service Pages
    catServices.forEach(serv => {
      const pageHtml = generatePageHtml(serv);
      
      // 1. Write as file: public/services/development/website-development.html
      fs.writeFileSync(path.join(catDir, `${serv.slug}.html`), pageHtml, 'utf8');

      // 2. Write as folder with index.html: public/services/development/website-development/index.html
      const servFolder = path.join(catDir, serv.slug);
      if (!fs.existsSync(servFolder)) {
        fs.mkdirSync(servFolder, { recursive: true });
      }
      fs.writeFileSync(path.join(servFolder, 'index.html'), pageHtml, 'utf8');

      // 3. Also write uppercase variations if applicable (e.g. ERP-Development)
      if (serv.slug === 'erp-development') {
        fs.writeFileSync(path.join(catDir, 'ERP-Development.html'), pageHtml, 'utf8');
        const erpFolder = path.join(catDir, 'ERP-Development');
        if (!fs.existsSync(erpFolder)) {
          fs.mkdirSync(erpFolder, { recursive: true });
        }
        fs.writeFileSync(path.join(erpFolder, 'index.html'), pageHtml, 'utf8');
      }

      console.log(`Created static file & directory for: ${serv.urlPath}`);
    });
  });

  console.log('All static service HTML files generated successfully!');
}

function generateMainServicesPage() {
  const serviceCards = detailedServices.map(s => `
    <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 32px; border-color: rgba(255, 0, 117, 0.25); background: rgba(15, 23, 42, 0.85);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
          <span style="font-size: 2.4rem;">${s.icon || '⚡'}</span>
          <span style="background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); color: var(--neon-blue); font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">
            ${s.categoryName}
          </span>
        </div>
        <h2 style="font-size: 1.35rem; color: #FFF; margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif; line-height: 1.3;">
          ${s.h1 || s.title}
        </h2>
        <p style="color: var(--text-gray); font-size: 0.92rem; line-height: 1.6; margin-bottom: 20px;">
          ${s.heroSubtitle || s.subtitle}
        </p>
      </div>
      <div>
        <a href="${s.urlPath}" class="btn-primary" style="display: block; text-align: center; font-size: 0.92rem; padding: 0.85rem 1rem; text-decoration: none;">
          View ${s.h1 || s.title} Page →
        </a>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Technology Services Directory | UVO SoftTech</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="navbar">
    <a href="/" class="nav-logo"><img src="/images/logo.png" alt="Uvosoft Tech" style="height: 42px;"></a>
    <nav><ul class="nav-links"><li><a href="/">Home</a></li><li><a href="/services" class="active">Services</a></li><li><a href="/store">Hardware Store</a></li><li><a href="/contact">Contact</a></li></ul></nav>
  </header>
  <main style="padding-top: 140px; padding-bottom: 80px;">
    <section class="content-section">
      <div style="text-align: center; max-width: 950px; margin: 0 auto 50px;">
        <h1 class="section-title">Technology <span>Services & Solutions Directory</span></h1>
        <p class="section-subtitle" style="color: var(--text-gray);">Explore all 24+ dedicated enterprise service pages across Custom Software & Web Development, Cloud DevOps, Cybersecurity, and AI Automation.</p>
      </div>
      <div class="grid-container" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; max-width: 1200px; margin: 0 auto;">
        ${serviceCards}
      </div>
    </section>
  </main>
</body>
</html>`;
}

function generateCategoryPage(cat, catServices) {
  const cards = catServices.map(s => `
    <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 32px; border-color: rgba(255, 0, 117, 0.25); background: rgba(15, 23, 42, 0.85);">
      <div>
        <span style="font-size: 2.4rem; display: block; margin-bottom: 12px;">${s.icon || '⚡'}</span>
        <h2 style="font-size: 1.35rem; color: #FFF; margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif;">
          ${s.h1 || s.title}
        </h2>
        <p style="color: var(--text-gray); font-size: 0.92rem; line-height: 1.6; margin-bottom: 20px;">
          ${s.heroSubtitle || s.subtitle}
        </p>
      </div>
      <div>
        <a href="${s.urlPath}" class="btn-primary" style="display: block; text-align: center; font-size: 0.92rem; padding: 0.85rem 1rem; text-decoration: none;">
          Explore ${s.h1 || s.title} Page →
        </a>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cat.name} Services | UVO SoftTech</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="navbar">
    <a href="/" class="nav-logo"><img src="/images/logo.png" alt="Uvosoft Tech" style="height: 42px;"></a>
    <nav><ul class="nav-links"><li><a href="/">Home</a></li><li><a href="/services" class="active">Services</a></li><li><a href="/store">Hardware Store</a></li><li><a href="/contact">Contact</a></li></ul></nav>
  </header>
  <main style="padding-top: 140px; padding-bottom: 80px;">
    <section class="content-section">
      <div style="text-align: center; max-width: 950px; margin: 0 auto 50px;">
        <h1 class="section-title">${cat.name} <span>Services</span></h1>
        <p class="section-subtitle" style="color: var(--text-gray);">${cat.description}</p>
      </div>
      <div class="grid-container" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; max-width: 1200px; margin: 0 auto;">
        ${cards}
      </div>
    </section>
  </main>
</body>
</html>`;
}

buildStaticServices();
