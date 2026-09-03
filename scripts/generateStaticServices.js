const fs = require('fs');
const path = require('path');
const { servicesCategories, detailedServices, getServicesByCategory } = require('../src/data/servicesDetailedData');

const publicServicesDir = path.join(__dirname, '../public/services');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Render navigation header with relative paths depending on depth
function renderHeaderNav(relDepth = 0) {
  let homeLink = 'index.html';
  let servicesLink = 'public/services/services.html';
  let devCatLink = 'public/services/development/development.html';
  let erpLink = 'public/services/development/ERP-Development.html';
  let webDevLink = 'public/services/development/website-development.html';
  let cloudCatLink = 'public/services/cloud-devops/cloud-devops.html';
  let cyberCatLink = 'public/services/cybersecurity/cybersecurity.html';
  let aiCatLink = 'public/services/ai-automation/ai-automation.html';
  let storeLink = 'store.html';
  let blogLink = 'blog.html';
  let aboutLink = 'about.html';
  let contactLink = 'contact.html';

  if (relDepth === 1) {
    // Inside public/services/
    homeLink = '../../index.html';
    servicesLink = 'services.html';
    devCatLink = 'development/development.html';
    erpLink = 'development/ERP-Development.html';
    webDevLink = 'development/website-development.html';
    cloudCatLink = 'cloud-devops/cloud-devops.html';
    cyberCatLink = 'cybersecurity/cybersecurity.html';
    aiCatLink = 'ai-automation/ai-automation.html';
    storeLink = '../../store.html';
    blogLink = '../../blog.html';
    aboutLink = '../../about.html';
    contactLink = '../../contact.html';
  } else if (relDepth === 2) {
    // Inside public/services/category/ (e.g. public/services/development/)
    homeLink = '../../../index.html';
    servicesLink = '../services.html';
    devCatLink = '../development/development.html';
    erpLink = '../development/ERP-Development.html';
    webDevLink = '../development/website-development.html';
    cloudCatLink = '../cloud-devops/cloud-devops.html';
    cyberCatLink = '../cybersecurity/cybersecurity.html';
    aiCatLink = '../ai-automation/ai-automation.html';
    storeLink = '../../../store.html';
    blogLink = '../../../blog.html';
    aboutLink = '../../../about.html';
    contactLink = '../../../contact.html';
  }

  return `
  <header>
    <a href="${homeLink}" class="nav-logo"><div class="logo-dot"></div> UVOSOFT TECH</a>
    <nav>
      <ul>
        <li><a href="${homeLink}">Home</a></li>
        <li style="position: relative;" class="nav-dropdown-wrapper">
          <a href="${servicesLink}" class="active">Services ▾</a>
          <div class="sub-nav-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: rgba(10,15,30,0.95); border: 1px solid rgba(0,240,255,0.3); padding: 14px; border-radius: 8px; min-width: 280px; flex-direction: column; gap: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 1000;">
            <a href="${devCatLink}" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">💻 Custom Software & Web Dev</a>
            <a href="${erpLink}" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">📊 ERP Development (Odoo & Dynamics)</a>
            <a href="${webDevLink}" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">🌐 Website Development</a>
            <a href="${cloudCatLink}" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">☁️ Cloud Engineering & DevOps</a>
            <a href="${cyberCatLink}" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">🛡️ Enterprise Cybersecurity</a>
            <a href="${aiCatLink}" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; color: #fff;">🤖 AI Engineering & Automation</a>
            <a href="${servicesLink}" style="text-transform: none; font-size: 0.85rem; padding: 6px 10px; border-top: 1px solid rgba(255,255,255,0.1); color: var(--neon-blue); font-weight: bold;">⚡ All 24+ Services Directory →</a>
          </div>
        </li>
        <li><a href="${storeLink}">Store</a></li>
        <li><a href="${blogLink}">Blogs</a></li>
        <li><a href="${aboutLink}">About Us</a></li>
        <li><a href="${contactLink}">Contact</a></li>
      </ul>
    </nav>
    <a href="${contactLink}" class="btn-login" style="text-decoration:none;">Book Consultation</a>
  </header>`;
}

function renderFooter(relDepth = 0) {
  let devCatLink = 'public/services/development/development.html';
  let erpLink = 'public/services/development/ERP-Development.html';
  let cloudCatLink = 'public/services/cloud-devops/cloud-devops.html';
  let cyberCatLink = 'public/services/cybersecurity/cybersecurity.html';
  let aiCatLink = 'public/services/ai-automation/ai-automation.html';

  if (relDepth === 1) {
    devCatLink = 'development/development.html';
    erpLink = 'development/ERP-Development.html';
    cloudCatLink = 'cloud-devops/cloud-devops.html';
    cyberCatLink = 'cybersecurity/cybersecurity.html';
    aiCatLink = 'ai-automation/ai-automation.html';
  } else if (relDepth === 2) {
    devCatLink = '../development/development.html';
    erpLink = '../development/ERP-Development.html';
    cloudCatLink = '../cloud-devops/cloud-devops.html';
    cyberCatLink = '../cybersecurity/cybersecurity.html';
    aiCatLink = '../ai-automation/ai-automation.html';
  }

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
          <li><a href="${devCatLink}" style="color: var(--text-gray); text-decoration: none;">Custom Software & Web Dev</a></li>
          <li><a href="${erpLink}" style="color: var(--text-gray); text-decoration: none;">ERP Development (Odoo / Dynamics 365)</a></li>
          <li><a href="${cloudCatLink}" style="color: var(--text-gray); text-decoration: none;">Cloud Engineering & DevOps</a></li>
          <li><a href="${cyberCatLink}" style="color: var(--text-gray); text-decoration: none;">Enterprise Cybersecurity & Pentesting</a></li>
          <li><a href="${aiCatLink}" style="color: var(--text-gray); text-decoration: none;">AI Engineering & Automation</a></li>
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

function renderHtmlLayout(title, metaDescription, bodyContent, keywords = [], relDepth = 0) {
  const rootPrefix = relDepth === 0 ? '../../' : (relDepth === 1 ? '../../' : '../../../');
  
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
  <link rel="stylesheet" href="${rootPrefix}style.css">
  <link rel="stylesheet" href="/css/public.css">
  <link rel="stylesheet" href="${rootPrefix}css/public.css">
  <style>
    :root {
      --bg-black: #05060A;
      --neon-pink: #FF0055;
      --neon-magenta: #FF0075;
      --neon-orange: #FF7700;
      --neon-blue: #00F0FF;
      --text-white: #ffffff;
      --text-gray: #94A3B8;
    }
    body {
      background-color: #030305;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    #matrix-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -3; opacity: 0.15; pointer-events: none; }
    #ai-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none; }
    .scanline { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; background: linear-gradient(to bottom, transparent 0%, rgba(255, 0, 85, 0.03) 50%, transparent 100%); background-size: 100% 8px; animation: scanmove 8s linear infinite; }
    .sweep-line { position: fixed; top: -10%; left: 0; width: 100%; height: 200px; background: linear-gradient(to bottom, transparent, rgba(255, 119, 0, 0.05), transparent); z-index: 1; pointer-events: none; animation: sweep 6s ease-in-out infinite; }
    @keyframes scanmove { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }
    @keyframes sweep { 0% { top: -20%; opacity: 0; } 50% { opacity: 1; } 100% { top: 120%; opacity: 0; } }
    .cursor-glow { position: fixed; width: 320px; height: 320px; background: radial-gradient(circle, rgba(255, 0, 85, 0.18) 0%, rgba(255, 119, 0, 0.08) 50%, transparent 70%); border-radius: 50%; pointer-events: none; z-index: 100; transform: translate(-50%, -50%); mix-blend-mode: screen; }
    
    .sub-nav-dropdown a:hover { color: var(--neon-blue) !important; background: rgba(255,255,255,0.05); }
    .nav-dropdown-wrapper:hover .sub-nav-dropdown { display: flex !important; }
    .hero-service-card { background: rgba(15,22,42,0.85); border: 1px solid rgba(0,240,255,0.25); border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); backdrop-filter: blur(12px); }
    .tech-badge { display: inline-block; background: rgba(0,240,255,0.12); border: 1px solid rgba(0,240,255,0.35); color: var(--neon-blue); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; margin-right: 6px; margin-bottom: 6px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="cursor-glow" id="cursorGlow"></div>
  <div class="scanline"></div>
  <div class="sweep-line"></div>
  <canvas id="matrix-canvas"></canvas>
  <canvas id="ai-canvas"></canvas>

  ${renderHeaderNav(relDepth)}
  
  <main style="min-height: 80vh; padding-top: 90px; position: relative; z-index: 2;">
    ${bodyContent}
  </main>
  
  ${renderFooter(relDepth)}

  <script>
    // Cursor Glow
    const cursorGlow = document.getElementById('cursorGlow');
    window.addEventListener('mousemove', e => {
      if(cursorGlow) { cursorGlow.style.left = e.clientX + 'px'; cursorGlow.style.top = e.clientY + 'px'; }
    });

    // Matrix Rain
    const mCanvas = document.getElementById('matrix-canvas');
    if (mCanvas) {
      const mCtx = mCanvas.getContext('2d');
      mCanvas.width = window.innerWidth; mCanvas.height = window.innerHeight;
      let drops = Array(Math.floor(mCanvas.width / 14)).fill(1);
      function drawMatrix() {
        mCtx.fillStyle = 'rgba(3, 3, 5, 0.1)'; mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
        mCtx.fillStyle = '#00F0FF'; mCtx.font = '14px monospace';
        for (let i = 0; i < drops.length; i++) { const t = "0123456789</>{}"[(Math.random() * 16) | 0]; mCtx.fillText(t, i * 14, drops[i] * 14); if (drops[i] * 14 > mCanvas.height && Math.random() > 0.975) drops[i] = 0; drops[i]++; }
      }
      setInterval(drawMatrix, 40);
    }

    // 3D Morphing AI Core
    const canvas = document.getElementById('ai-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w, h, cx, cy, radius;
      function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; cx = w / 2; cy = h / 2; radius = Math.min(w, h) * 0.35; }
      resize();
      window.addEventListener('resize', resize);
      const N = 160; let currentShape = [], targetShape = [], morphProgress = 1, rotX = 0, rotY = 0;
      const palettes = [['#00F0FF', '#FF0055', '#FF7700'], ['#FF0055', '#FF7700', '#00F0FF']];
      let currentColors = palettes[0], targetColors = palettes[1], colorProgress = 1;
      function generateSphere() { let p=[]; for(let i=0;i<8;i++) for(let j=0;j<20;j++) { let t=(i/8)*Math.PI, p2=(j/20)*2*Math.PI; p.push({x:radius*Math.sin(t)*Math.cos(p2), y:radius*Math.cos(t), z:radius*Math.sin(t)*Math.sin(p2)}); } return p; }
      function generateRings() { let p=[]; for(let i=0;i<N;i++) { let t=((i%50)/50)*2*Math.PI, r=Math.floor(i/50); if(r===0)p.push({x:radius*Math.cos(t),y:radius*Math.sin(t),z:0}); else if(r===1)p.push({x:radius*Math.cos(t),y:0,z:radius*Math.sin(t)}); else p.push({x:0,y:radius*Math.cos(t),z:radius*Math.sin(t)}); } return p; }
      currentShape = generateSphere(); targetShape = generateRings();
      let connections = []; for (let i = 0; i < 8; i++) { for (let j = 0; j < 20; j++) { let p1 = i * 20 + j; connections.push([p1, i * 20 + (j + 1) % 20]); if (i < 7) connections.push([p1, (i + 1) * 20 + j]); } }
      function hexToRgb(hex) { return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]; }
      function lerp(a, b, t) { return a + (b - a) * t; }
      function lerpColor(c1, c2, t) { let r1=hexToRgb(c1), r2=hexToRgb(c2); return \`rgb(\${Math.round(lerp(r1[0],r2[0],t))},\${Math.round(lerp(r1[1],r2[1],t))},\${Math.round(lerp(r1[2],r2[2],t))})\`; }
      function drawAI() {
        ctx.clearRect(0, 0, w, h); rotX += 0.002; rotY += 0.004;
        let dp = []; for (let i = 0; i < N && i < currentShape.length && i < targetShape.length; i++) dp.push({x:lerp(currentShape[i].x,targetShape[i].x,morphProgress), y:lerp(currentShape[i].y,targetShape[i].y,morphProgress), z:lerp(currentShape[i].z,targetShape[i].z,morphProgress)});
        const projected = dp.map(p => { let cY=Math.cos(rotY),sY=Math.sin(rotY),x1=p.x*cY-p.z*sY,z1=p.x*sY+p.z*cY,cX=Math.cos(rotX),sX=Math.sin(rotX),y1=p.y*cX-z1*sX,z2=p.y*sX+z1*cX,s=400/(400+z2); return {x:cx+x1*s,y:cy+y1*s,z:z2,scale:s}; });
        let lc = lerpColor(currentColors[0], targetColors[0], colorProgress);
        connections.forEach(c => { if(projected[c[0]] && projected[c[1]]) { let p1=projected[c[0]],p2=projected[c[1]],o=Math.min(p1.scale,p2.scale)*0.4; ctx.strokeStyle=lc.replace('rgb','rgba').replace(')',\`,\${o*0.35})\`); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke(); } });
        projected.forEach((p) => { ctx.fillStyle='rgba(0,240,255,'+(p.scale*0.7)+')'; ctx.beginPath(); ctx.arc(p.x,p.y,p.scale*2,0,Math.PI*2); ctx.fill(); });
        requestAnimationFrame(drawAI);
      }
      drawAI();
    }
  </script>
</body>
</html>`;
}

// 1. Generate Directory Hub (public/services/index.html & services.html)
function generateServicesHub() {
  const categoriesHtml = servicesCategories.map(cat => {
    const servicesInCat = getServicesByCategory(cat.slug);
    const serviceItemsHtml = servicesInCat.map(s => `
      <a href="${s.categorySlug}/${s.serviceSlug}.html" class="hero-service-card" style="text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <h4 style="color: #FFF; font-size: 1.15rem; margin-bottom: 8px;">${s.title}</h4>
        <p style="color: var(--text-gray); font-size: 0.85rem; line-height: 1.5; margin-bottom: 12px;">${s.heroSubtitle}</p>
        <span style="color: var(--neon-pink); font-size: 0.8rem; font-weight: bold;">View Service Page →</span>
      </a>
    `).join('');

    return `
    <div style="margin-bottom: 50px;">
      <h2 style="font-family: 'Space Grotesk', sans-serif; color: var(--neon-blue); font-size: 1.8rem; margin-bottom: 10px;">
        <a href="${cat.slug}/${cat.slug}.html" style="color: var(--neon-blue); text-decoration: none;">${cat.icon} ${cat.name}</a>
      </h2>
      <p style="color: var(--text-gray); margin-bottom: 20px; max-width: 800px;">${cat.description}</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        ${serviceItemsHtml}
      </div>
    </div>`;
  }).join('');

  const bodyContent = `
  <div style="max-width: 1200px; margin: 20px auto; padding: 0 20px;">
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
    ['website development company Karachi', 'ERP development Karachi', 'cloud migration Pakistan', 'cybersecurity pentesting Karachi', 'AI automation Pakistan'],
    1
  );

  ensureDir(publicServicesDir);
  fs.writeFileSync(path.join(publicServicesDir, 'index.html'), fullHtml, 'utf8');
  fs.writeFileSync(path.join(publicServicesDir, 'services.html'), fullHtml, 'utf8');
  console.log('✓ Generated public/services/index.html & services.html');
}

// 2. Generate Category Landing Pages (public/services/development/development.html & index.html etc.)
function generateCategoryPages() {
  servicesCategories.forEach(cat => {
    const catDir = path.join(publicServicesDir, cat.slug);
    ensureDir(catDir);

    const servicesInCat = getServicesByCategory(cat.slug);
    const serviceCardsHtml = servicesInCat.map(s => `
      <a href="${s.serviceSlug}.html" class="hero-service-card" style="text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
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
    <div style="max-width: 1200px; margin: 20px auto; padding: 0 20px;">
      <div style="margin-bottom: 30px; font-size: 0.9rem; color: var(--text-gray);">
        <a href="../../../index.html" style="color: var(--neon-blue); text-decoration: none;">Home</a> &nbsp;/&nbsp;
        <a href="../services.html" style="color: var(--neon-blue); text-decoration: none;">Services</a> &nbsp;/&nbsp;
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
      [cat.name, `${cat.slug} Karachi`, `${cat.slug} Pakistan`],
      2
    );

    // Write both category.html (e.g. development.html) AND index.html
    fs.writeFileSync(path.join(catDir, `${cat.slug}.html`), fullHtml, 'utf8');
    fs.writeFileSync(path.join(catDir, 'index.html'), fullHtml, 'utf8');
    console.log(`✓ Generated public/services/${cat.slug}/${cat.slug}.html & index.html`);
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
      <a href="${rel.serviceSlug}.html" class="hero-service-card" style="text-decoration: none; padding: 16px;">
        <h4 style="color: #FFF; font-size: 1rem; margin-bottom: 6px;">${rel.title}</h4>
        <p style="color: var(--text-gray); font-size: 0.8rem; line-height: 1.4; margin: 0;">${rel.heroSubtitle.slice(0, 90)}...</p>
      </a>
    `).join('');

    const bodyContent = `
    <div style="max-width: 1100px; margin: 20px auto; padding: 0 20px;">
      <!-- Breadcrumb -->
      <div style="margin-bottom: 24px; font-size: 0.85rem; color: var(--text-gray);">
        <a href="../../../index.html" style="color: var(--neon-blue); text-decoration: none;">Home</a> &nbsp;/&nbsp;
        <a href="../services.html" style="color: var(--neon-blue); text-decoration: none;">Services</a> &nbsp;/&nbsp;
        <a href="${s.categorySlug}.html" style="color: var(--neon-blue); text-decoration: none;">${s.categorySlug}</a> &nbsp;/&nbsp;
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
          <a href="../../../contact.html" class="btn-primary" style="text-decoration:none; display:inline-block; margin-right:12px;">Get Custom Quote</a>
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
            <a href="../../../contact.html" class="btn-primary" style="width: 100%; text-decoration: none; display: block; box-sizing: border-box;">Book Consultation</a>
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

    const fullHtml = renderHtmlLayout(s.seoTitle, s.pageContent.slice(0, 160), bodyContent, s.targetKeywords, 2);

    const serviceFilePath = path.join(catDir, `${s.serviceSlug}.html`);
    fs.writeFileSync(serviceFilePath, fullHtml, 'utf8');

    const serviceFolderDir = path.join(catDir, s.serviceSlug);
    ensureDir(serviceFolderDir);
    fs.writeFileSync(path.join(serviceFolderDir, 'index.html'), fullHtml, 'utf8');

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

console.log('--- Generating All 24 Static Service HTML Pages with Exact File Paths ---');
generateServicesHub();
generateCategoryPages();
generateIndividualServicePages();
console.log('--- Successfully Generated All Static Service Files ---');
