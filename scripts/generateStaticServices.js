const fs = require('fs');
const path = require('path');
const { servicesCategories, detailedServices, getServicesByCategory } = require('../src/data/servicesDetailedData');

const publicServicesDir = path.join(__dirname, '../public/services');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function renderHeaderNav() {
  return `
  <header>
    <a href="/" class="nav-logo"><div class="logo-dot"></div> UVOSOFT TECH</a>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li style="position: relative;" class="nav-dropdown-wrapper">
          <a href="/services" class="active">Services ▾</a>
          <div class="sub-nav-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: rgba(10,15,30,0.95); border: 1px solid rgba(0,240,255,0.3); padding: 14px; border-radius: 8px; min-width: 280px; flex-direction: column; gap: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 1000;">
            <a href="/services/development" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">💻 Custom Software & Web Dev</a>
            <a href="/services/development/ERP-Development" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">📊 ERP Development (Odoo & Dynamics)</a>
            <a href="/services/development/website-development" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">🌐 Website Development</a>
            <a href="/services/cloud-devops" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">☁️ Cloud Engineering & DevOps</a>
            <a href="/services/cybersecurity" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">🛡️ Enterprise Cybersecurity</a>
            <a href="/services/ai-automation" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">🤖 AI Engineering & Automation</a>
            <a href="/services" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; border-top: 1px solid rgba(255,255,255,0.1); color: var(--neon-blue); font-weight: bold;">⚡ All 24+ Services Directory →</a>
          </div>
        </li>
        <li><a href="/store">Store</a></li>
        <li><a href="/blog">Blogs</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <a href="/contact" class="btn-login" style="text-decoration:none;">Book Consultation</a>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="footer-container" style="background: rgba(5,8,18,0.95); border-top: 1px solid rgba(255,255,255,0.1); padding: 40px 20px 20px; margin-top: 60px;">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
      <div>
        <h4 style="color: #FFF; font-family: 'Space Grotesk', sans-serif; margin-bottom: 12px;">Uvosoft Tech</h4>
        <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6;">Global leader in enterprise IT services, custom web development, Odoo/Dynamics 365 ERP, cybersecurity, and AI automation.</p>
      </div>
      <div>
        <h4 style="color: #FFF; font-family: 'Space Grotesk', sans-serif; margin-bottom: 12px;">Core Service Domains</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem;">
          <li><a href="/services/development" style="color: var(--text-gray); text-decoration: none;">Custom Software & Web Dev</a></li>
          <li><a href="/services/development/ERP-Development" style="color: var(--text-gray); text-decoration: none;">ERP Development (Odoo / Dynamics 365)</a></li>
          <li><a href="/services/cloud-devops" style="color: var(--text-gray); text-decoration: none;">Cloud Engineering & DevOps</a></li>
          <li><a href="/services/cybersecurity" style="color: var(--text-gray); text-decoration: none;">Enterprise Cybersecurity & Pentesting</a></li>
          <li><a href="/services/ai-automation" style="color: var(--text-gray); text-decoration: none;">AI Engineering & Automation</a></li>
        </ul>
      </div>
      <div>
        <h4 style="color: #FFF; font-family: 'Space Grotesk', sans-serif; margin-bottom: 12px;">Contact & Operations</h4>
        <p style="color: var(--text-gray); font-size: 0.85rem; margin-bottom: 6px;">📧 Email: marketing@uvosofttech.com</p>
        <p style="color: var(--text-gray); font-size: 0.85rem; margin-bottom: 6px;">📞 Phone / WhatsApp: +92 371 8055990</p>
        <p style="color: var(--text-gray); font-size: 0.85rem;">📍 Shahrah-e-Faisal & Surjani Town, Karachi, Pakistan</p>
      </div>
    </div>
    <div style="max-width: 1200px; margin: 30px auto 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; font-size: 0.8rem; color: var(--text-gray);">
      &copy; ${new Date().getFullYear()} Uvosoft Tech (UVO SoftTech). All rights reserved.
    </div>
  </footer>`;
}

function renderHtmlLayout(title, metaDescription, bodyContent, keywords = []) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Uvosoft Tech</title>
  <meta name="description" content="${metaDescription}">
  ${keywords.length > 0 ? `<meta name="keywords" content="${keywords.join(', ')}">` : ''}
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700;800&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/css/public.css">
  <style>
    .sub-nav-dropdown a:hover { color: var(--neon-blue) !important; background: rgba(255,255,255,0.05); }
    .nav-dropdown-wrapper:hover .sub-nav-dropdown { display: flex !important; }
    .hero-service-card { background: rgba(15,22,42,0.7); border: 1px solid rgba(0,240,255,0.2); border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); backdrop-filter: blur(10px); }
    .tech-badge { display: inline-block; background: rgba(0,240,255,0.1); border: 1px solid rgba(0,240,255,0.3); color: var(--neon-blue); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; margin-right: 6px; margin-bottom: 6px; font-weight: 500; }
  </style>
</head>
<body>
  ${renderHeaderNav()}
  <main style="min-height: 80vh; padding-top: 20px;">
    ${bodyContent}
  </main>
  ${renderFooter()}
</body>
</html>`;
}

// 1. Generate Directory Hub (public/services/index.html & services.html)
function generateServicesHub() {
  const categoriesHtml = servicesCategories.map(cat => {
    const servicesInCat = getServicesByCategory(cat.slug);
    const serviceItemsHtml = servicesInCat.map(s => `
      <a href="/services/${s.categorySlug}/${s.serviceSlug}" class="hero-service-card" style="text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <h4 style="color: #FFF; font-size: 1.15rem; margin-bottom: 8px;">${s.title}</h4>
        <p style="color: var(--text-gray); font-size: 0.85rem; line-height: 1.5; margin-bottom: 12px;">${s.heroSubtitle}</p>
        <span style="color: var(--neon-pink); font-size: 0.8rem; font-weight: bold;">View Service & Target Keywords →</span>
      </a>
    `).join('');

    return `
    <div style="margin-bottom: 50px;">
      <h2 style="font-family: 'Space Grotesk', sans-serif; color: var(--neon-blue); font-size: 1.8rem; margin-bottom: 10px;">${cat.icon} ${cat.name}</h2>
      <p style="color: var(--text-gray); margin-bottom: 20px; max-width: 800px;">${cat.description}</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        ${serviceItemsHtml}
      </div>
    </div>`;
  }).join('');

  const bodyContent = `
  <div style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
    <div style="text-align: center; margin-bottom: 50px;">
      <span style="background: rgba(255,0,117,0.15); border: 1px solid var(--neon-pink); color: var(--neon-pink); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">
        24+ Dedicated Technology Service Pages
      </span>
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 2.8rem; color: #FFF; margin-top: 16px; margin-bottom: 12px;">
        Enterprise Technology <span style="background: linear-gradient(135deg, var(--neon-blue), var(--neon-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Services Directory</span>
      </h1>
      <p style="color: var(--text-gray); font-size: 1.1rem; max-width: 750px; margin: 0 auto; line-height: 1.6;">
        Explore Uvosoft Tech’s specialized technology solutions. Click any service page to view targeted SEO content, capabilities, tech stack details, and localized solutions for Karachi, Pakistan, and global markets.
      </p>
    </div>
    ${categoriesHtml}
  </div>`;

  const fullHtml = renderHtmlLayout(
    'Technology Services Directory',
    'Explore Uvosoft Tech 24+ specialized technology services in Website Development, Odoo & Dynamics 365 ERP, Cloud DevOps, Cybersecurity Pentesting, and AI Automation in Karachi, Pakistan.',
    bodyContent,
    ['website development company Karachi', 'ERP development Karachi', 'cloud migration Pakistan', 'cybersecurity pentesting Karachi', 'AI automation Pakistan']
  );

  ensureDir(publicServicesDir);
  fs.writeFileSync(path.join(publicServicesDir, 'index.html'), fullHtml, 'utf8');
  fs.writeFileSync(path.join(publicServicesDir, 'services.html'), fullHtml, 'utf8');
  console.log('✓ Generated public/services/index.html & services.html');
}

// 2. Generate Category Landing Pages (public/services/development/index.html etc.)
function generateCategoryPages() {
  servicesCategories.forEach(cat => {
    const catDir = path.join(publicServicesDir, cat.slug);
    ensureDir(catDir);

    const servicesInCat = getServicesByCategory(cat.slug);
    const serviceCardsHtml = servicesInCat.map(s => `
      <a href="/services/${s.categorySlug}/${s.serviceSlug}" class="hero-service-card" style="text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <h3 style="color: #FFF; font-size: 1.3rem; margin-bottom: 10px;">${s.title}</h3>
          <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.5; margin-bottom: 16px;">${s.heroSubtitle}</p>
          <div style="margin-bottom: 16px;">
            ${s.techBadges.map(b => `<span class="tech-badge">${b}</span>`).join('')}
          </div>
        </div>
        <span style="color: var(--neon-blue); font-size: 0.85rem; font-weight: 700;">Explore ${s.title} Page →</span>
      </a>
    `).join('');

    const bodyContent = `
    <div style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
      <div style="margin-bottom: 30px; font-size: 0.9rem; color: var(--text-gray);">
        <a href="/" style="color: var(--neon-blue); text-decoration: none;">Home</a> &nbsp;/&nbsp;
        <a href="/services" style="color: var(--neon-blue); text-decoration: none;">Services</a> &nbsp;/&nbsp;
        <span style="color: #FFF;">${cat.name}</span>
      </div>
      <div style="margin-bottom: 40px;">
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; color: #FFF; margin-bottom: 12px;">${cat.icon} ${cat.name}</h1>
        <p style="color: var(--text-gray); font-size: 1.1rem; max-width: 800px; line-height: 1.6;">${cat.description}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
        ${serviceCardsHtml}
      </div>
    </div>`;

    const fullHtml = renderHtmlLayout(
      `${cat.name} Services`,
      cat.description,
      bodyContent,
      [cat.name, `${cat.slug} Karachi`, `${cat.slug} Pakistan`]
    );

    fs.writeFileSync(path.join(catDir, 'index.html'), fullHtml, 'utf8');
    fs.writeFileSync(path.join(catDir, `${cat.slug}.html`), fullHtml, 'utf8');
    console.log(`✓ Generated public/services/${cat.slug}/index.html`);
  });
}

// 3. Generate All 24 Individual Service Pages (public/services/development/website-development.html etc.)
function generateIndividualServicePages() {
  detailedServices.forEach(s => {
    const catDir = path.join(publicServicesDir, s.categorySlug);
    ensureDir(catDir);

    const featureItemsHtml = s.features.map(f => `
      <li style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px; color: #FFF; font-size: 0.95rem;">
        <span style="color: var(--neon-blue); font-weight: bold;">✓</span> ${f}
      </li>
    `).join('');

    const techBadgesHtml = s.techBadges.map(b => `<span class="tech-badge">${b}</span>`).join('');
    const targetKeywordsHtml = s.targetKeywords.map(k => `<span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text-gray); padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; margin-right: 6px; margin-bottom: 6px; display: inline-block;"># ${k}</span>`).join('');

    const relatedServices = getServicesByCategory(s.categorySlug).filter(rel => rel.serviceSlug !== s.serviceSlug);
    const relatedServicesHtml = relatedServices.map(rel => `
      <a href="/services/${rel.categorySlug}/${rel.serviceSlug}" class="hero-service-card" style="text-decoration: none; padding: 16px;">
        <h4 style="color: #FFF; font-size: 1rem; margin-bottom: 6px;">${rel.title}</h4>
        <p style="color: var(--text-gray); font-size: 0.8rem; line-height: 1.4; margin: 0;">${rel.heroSubtitle.slice(0, 90)}...</p>
      </a>
    `).join('');

    const bodyContent = `
    <div style="max-width: 1100px; margin: 30px auto; padding: 0 20px;">
      <!-- Breadcrumb -->
      <div style="margin-bottom: 24px; font-size: 0.85rem; color: var(--text-gray);">
        <a href="/" style="color: var(--neon-blue); text-decoration: none;">Home</a> &nbsp;/&nbsp;
        <a href="/services" style="color: var(--neon-blue); text-decoration: none;">Services</a> &nbsp;/&nbsp;
        <a href="/services/${s.categorySlug}" style="color: var(--neon-blue); text-decoration: none;">${s.categorySlug}</a> &nbsp;/&nbsp;
        <span style="color: #FFF;">${s.title}</span>
      </div>

      <!-- Hero Header -->
      <div class="hero-service-card" style="margin-bottom: 35px; border-left: 4px solid var(--neon-blue);">
        <span style="color: var(--neon-pink); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Targeted Solution Page</span>
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; color: #FFF; margin-top: 8px; margin-bottom: 12px; line-height: 1.3;">${s.h1Heading}</h1>
        <p style="color: var(--text-gray); font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px;">${s.heroSubtitle}</p>
        <div style="margin-bottom: 16px;">
          ${techBadgesHtml}
        </div>
        <div>
          <a href="/contact" class="btn-primary" style="text-decoration:none; display:inline-block; margin-right:12px;">Get Custom Quote</a>
          <a href="https://wa.me/923718055990" target="_blank" class="btn-secondary" style="text-decoration:none; display:inline-block;">Consult on WhatsApp</a>
        </div>
      </div>

      <!-- Main Content & Features Grid -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
        <div>
          <div class="hero-service-card" style="margin-bottom: 30px;">
            <h2 style="font-family: 'Space Grotesk', sans-serif; color: #FFF; font-size: 1.5rem; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Overview & Business Value</h2>
            <p style="color: var(--text-gray); font-size: 0.98rem; line-height: 1.7; white-space: pre-line;">${s.pageContent}</p>
          </div>

          <div class="hero-service-card" style="margin-bottom: 30px;">
            <h2 style="font-family: 'Space Grotesk', sans-serif; color: #FFF; font-size: 1.4rem; margin-bottom: 16px;">Key Service Deliverables</h2>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${featureItemsHtml}
            </ul>
          </div>

          <div class="hero-service-card">
            <h3 style="color: #FFF; font-size: 1.1rem; margin-bottom: 10px;">SEO Keyword Focus</h3>
            <div>
              ${targetKeywordsHtml}
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <div class="hero-service-card" style="margin-bottom: 24px; text-align: center; border-color: rgba(255,0,117,0.3);">
            <h3 style="color: #FFF; font-size: 1.2rem; margin-bottom: 10px;">Need this Solution?</h3>
            <p style="color: var(--text-gray); font-size: 0.85rem; line-height: 1.5; margin-bottom: 16px;">Schedule a direct technical consultation with our engineering leads in Karachi.</p>
            <a href="/contact" class="btn-primary" style="width: 100%; text-decoration: none; display: block; box-sizing: border-box;">Book Consultation</a>
          </div>

          ${relatedServices.length > 0 ? `
          <div class="hero-service-card">
            <h3 style="color: #FFF; font-size: 1.1rem; margin-bottom: 14px;">Related Services</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${relatedServicesHtml}
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    </div>`;

    const fullHtml = renderHtmlLayout(s.seoTitle, s.pageContent.slice(0, 160), bodyContent, s.targetKeywords);

    // 1. Direct file e.g. public/services/development/website-development.html
    const serviceFilePath = path.join(catDir, `${s.serviceSlug}.html`);
    fs.writeFileSync(serviceFilePath, fullHtml, 'utf8');

    // 2. Folder index file e.g. public/services/development/website-development/index.html
    const serviceFolderDir = path.join(catDir, s.serviceSlug);
    ensureDir(serviceFolderDir);
    fs.writeFileSync(path.join(serviceFolderDir, 'index.html'), fullHtml, 'utf8');

    // 3. Special case for lowercase ERP slug e.g. public/services/development/erp-development.html
    if (s.serviceSlug === 'ERP-Development') {
      const lowerFilePath = path.join(catDir, 'erp-development.html');
      fs.writeFileSync(lowerFilePath, fullHtml, 'utf8');
      const lowerFolderDir = path.join(catDir, 'erp-development');
      ensureDir(lowerFolderDir);
      fs.writeFileSync(path.join(lowerFolderDir, 'index.html'), fullHtml, 'utf8');
    }

    console.log(`✓ Generated ${s.categorySlug}/${s.serviceSlug}.html & folder index.html`);
  });
}

console.log('--- Generating All 24 Static Service HTML Pages ---');
generateServicesHub();
generateCategoryPages();
generateIndividualServicePages();
console.log('--- Successfully Generated All Static Service Files ---');
