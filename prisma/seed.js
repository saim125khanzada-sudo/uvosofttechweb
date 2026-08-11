const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

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
    { name: 'blog.view', category: 'Blog', description: 'View blog posts' },
    { name: 'blog.create', category: 'Blog', description: 'Create blog posts' },
    { name: 'blog.update', category: 'Blog', description: 'Edit blog posts' },
    { name: 'blog.delete', category: 'Blog', description: 'Delete blog posts' },
    { name: 'blog.publish', category: 'Blog', description: 'Publish blog posts' },
    { name: 'products.view', category: 'Products', description: 'View products' },
    { name: 'products.create', category: 'Products', description: 'Create products' },
    { name: 'products.update', category: 'Products', description: 'Edit products' },
    { name: 'products.delete', category: 'Products', description: 'Delete products' },
    { name: 'pages.view', category: 'Pages', description: 'View pages' },
    { name: 'pages.create', category: 'Pages', description: 'Create pages' },
    { name: 'pages.update', category: 'Pages', description: 'Edit pages' },
    { name: 'pages.delete', category: 'Pages', description: 'Delete pages' },
    { name: 'pages.publish', category: 'Pages', description: 'Publish pages' },
    { name: 'navigation.view', category: 'Navigation', description: 'View navigation items' },
    { name: 'navigation.create', category: 'Navigation', description: 'Create navigation items' },
    { name: 'navigation.update', category: 'Navigation', description: 'Edit navigation items' },
    { name: 'navigation.delete', category: 'Navigation', description: 'Delete navigation items' },
    { name: 'media.view', category: 'Media', description: 'View media library' },
    { name: 'media.create', category: 'Media', description: 'Upload media files' },
    { name: 'media.delete', category: 'Media', description: 'Delete media files' },
    { name: 'chatbot.view', category: 'Chatbot', description: 'View chatbot responses' },
    { name: 'chatbot.create', category: 'Chatbot', description: 'Create chatbot responses' },
    { name: 'chatbot.update', category: 'Chatbot', description: 'Edit chatbot responses' },
    { name: 'chatbot.delete', category: 'Chatbot', description: 'Delete chatbot responses' },
    { name: 'contacts.view', category: 'Contacts', description: 'View contact submissions' },
    { name: 'contacts.update', category: 'Contacts', description: 'Update contact submissions' },
    { name: 'contacts.delete', category: 'Contacts', description: 'Delete contact submissions' },
    { name: 'settings.view', category: 'Settings', description: 'View site settings' },
    { name: 'settings.update', category: 'Settings', description: 'Update site settings' },
    { name: 'logs.view', category: 'Logs', description: 'View activity logs' },
  ];

  const permissions = [];
  for (const p of permissionData) {
    permissions.push(await prisma.permission.create({ data: p }));
  }
  console.log(`Created ${permissions.length} permissions`);

  // ─── Roles ───
  const superadminRole = await prisma.role.create({
    data: {
      name: 'super_admin',
      description: 'Full system access. Cannot be deleted or modified.',
      isSystem: true,
      permissions: { create: permissions.map(p => ({ permissionId: p.id })) },
    },
  });
  console.log('Created super_admin role');

  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
      description: 'Administrator with broad content and user management access.',
      isSystem: true,
      permissions: {
        create: permissions.filter(p => !p.name.startsWith('logs.')).map(p => ({ permissionId: p.id })),
      },
    },
  });
  console.log('Created admin role');

  const editorRole = await prisma.role.create({
    data: {
      name: 'editor',
      description: 'Content editor for blog posts and pages.',
      permissions: {
        create: permissions.filter(p =>
          p.name.startsWith('blog') || p.name.startsWith('pages') || p.name.startsWith('media') ||
          p.name === 'services.view' || p.name === 'products.view' || p.name === 'categories.view'
        ).map(p => ({ permissionId: p.id })),
      },
    },
  });
  console.log('Created editor role');

  const contentManagerRole = await prisma.role.create({
    data: {
      name: 'content_manager',
      description: 'Manages services, products, categories, and media.',
      permissions: {
        create: permissions.filter(p =>
          p.name.startsWith('services') || p.name.startsWith('categories') || p.name.startsWith('products') ||
          p.name.startsWith('media') || p.name.startsWith('chatbot') || p.name === 'blog.view'
        ).map(p => ({ permissionId: p.id })),
      },
    },
  });
  console.log('Created content_manager role');

  // ─── Users ───
  const passwordHash = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@uvosofttech.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
      roles: { create: [{ roleId: superadminRole.id }] },
    },
  });
  console.log('Created admin: admin@uvosofttech.com / admin123');

  const editorHash = await bcrypt.hash('editor123', 12);
  const editor = await prisma.user.create({
    data: {
      email: 'editor@uvosofttech.com',
      passwordHash: editorHash,
      firstName: 'Content',
      lastName: 'Editor',
      isActive: true,
      roles: { create: [{ roleId: editorRole.id }] },
    },
  });
  console.log('Created editor: editor@uvosofttech.com / editor123');

  // ─── Service Categories (matching original site) ───
  const catIT = await prisma.serviceCategory.create({
    data: { name: 'IT Services', slug: 'it', description: 'Comprehensive IT support and infrastructure management services.', sortOrder: 1 },
  });
  const catDev = await prisma.serviceCategory.create({
    data: { name: 'App/Web Dev', slug: 'dev', description: 'Custom application and website development.', sortOrder: 2 },
  });
  const catERP = await prisma.serviceCategory.create({
    data: { name: 'ERP', slug: 'erp', description: 'Enterprise resource planning solutions.', sortOrder: 3 },
  });
  const catCloud = await prisma.serviceCategory.create({
    data: { name: 'Cloud', slug: 'cloud', description: 'Cloud infrastructure and management services.', sortOrder: 4 },
  });
  const catCyber = await prisma.serviceCategory.create({
    data: { name: 'Cybersecurity', slug: 'cyber', description: 'Elite cybersecurity and threat protection services.', sortOrder: 5 },
  });
  const catAI = await prisma.serviceCategory.create({
    data: { name: 'AI Engineering', slug: 'ai', description: 'AI-powered solutions and machine learning services.', sortOrder: 6 },
  });
  console.log('Created 6 service categories');

  // ─── Services (32 services from original site) ───
  const itServices = [
    { title: 'Local & Remote IT Backoffice Support', description: 'We provide reliable local and remote IT backoffice support to ensure your daily operations run smoothly without interruptions. Our team handles troubleshooting, system maintenance, user support, and technical issue resolution in real time. Whether onsite or remote, we ensure quick response times, minimal downtime, and continuous system performance so your team can focus on core business activities.' },
    { title: 'Windows / Linux Server Management', description: 'We offer comprehensive Windows and Linux server management services to ensure your IT infrastructure is secure, stable, and efficient. Our expertise includes server setup, virtualization, backup solutions, Active Directory management, file server configuration, and DHCP services. We monitor and maintain your servers to ensure high availability, data security, and optimal performance for your business operations.' },
    { title: 'Network Support (LAN, WAN, VLANs)', description: 'We provide end-to-end network support services, including LAN and WAN setup, bandwidth management, structured cabling, and advanced configurations for switches, routers, and VLANs. Our solutions are designed to deliver secure, high-speed, and reliable connectivity across your organization.' },
    { title: 'Firewall Installation & Configuration', description: 'We implement and manage firewall solutions to protect your business from cyber threats and unauthorized access. Our services include firewall installation, configuration, and continuous monitoring to ensure a secure network environment. We design security policies tailored to your business needs, safeguarding your data, systems, and digital assets.' },
    { title: 'Inventory Management (IT Assets)', description: 'We help businesses efficiently manage their IT assets through organized inventory management systems. Our services include tracking hardware and software assets, maintaining records, and ensuring proper allocation and lifecycle management. This enables better control, cost tracking, and planning for upgrades or replacements.' },
    { title: 'Onboarding & Software Installation', description: 'We streamline the onboarding process for new employees by setting up devices, user accounts, and required software quickly and efficiently. Our services include system configuration, application installation, and access setup, ensuring every new team member is ready to work from day one with secure and optimized systems.' },
    { title: 'CCTV & Surveillance Systems', description: 'We provide complete CCTV and surveillance solutions, including installation of NVR/DVR systems, remote monitoring setup, and network camera configuration. Our solutions are designed to enhance security, provide real-time monitoring, and ensure reliable recording and access to footage from anywhere, giving you full control over your premises.' },
    { title: 'IT Infrastructure Assessment', description: 'We conduct detailed IT infrastructure assessments to evaluate your current systems, identify gaps, and recommend improvements. Our analysis focuses on performance, security, scalability, and cost efficiency, helping you make informed decisions to upgrade and optimize your IT environment.' },
    { title: 'Cost Optimization', description: 'We help businesses reduce IT expenses by analyzing current resources, identifying inefficiencies, and implementing cost-effective solutions. Our approach ensures optimal utilization of infrastructure, elimination of unnecessary expenses, and improved return on investment without compromising performance or security.' },
    { title: 'Database Management', description: 'We provide professional database management services to ensure your data is secure, organized, and easily accessible. Our services include database setup, optimization, backup, performance tuning, and maintenance. We ensure high availability, data integrity, and efficient handling of critical business information to support smooth operations and decision-making.' },
  ];
  for (let i = 0; i < itServices.length; i++) {
    await prisma.service.create({ data: { categoryId: catIT.id, ...itServices[i], sortOrder: i + 1 } });
  }

  const devServices = [
    { title: 'Business Apps (HRM, HCM, CRM, etc.)', description: 'We develop customized business applications designed to simplify and automate your core operations. Our solutions include HRM, HCM, payroll systems, CRM, asset management, warehouse management, order management, van sales systems, real estate management, and gatekeeper security applications. Each application is built to match your business requirements, improving productivity, accuracy, and control while providing real-time data to support smarter business decisions.' },
    { title: 'Mobile Applications', description: 'We design and develop high-performance mobile applications that provide seamless user experiences across Android and iOS platforms. Whether you need a customer-facing app or an internal business solution, we create secure, scalable, and user-friendly applications tailored to your needs. Our focus is on performance, usability, and integration, ensuring your mobile app enhances engagement, accessibility, and overall business efficiency.' },
    { title: 'Website Development', description: 'We create modern, responsive, and visually engaging websites that represent your brand and drive business growth. Our website development services focus on user experience, performance, and SEO optimization to ensure your online presence stands out. Whether it is a corporate website or a service platform, we build solutions that are fast, secure, and designed to convert visitors into customers.' },
    { title: 'Webapp Development & Deployment', description: 'We develop powerful web applications that help businesses automate processes, manage data, and deliver services efficiently. From custom dashboards to full-scale enterprise systems, our web apps are built with scalability, security, and performance in mind. We also handle complete deployment, ensuring your application runs smoothly on cloud or on-premises environments, with ongoing support to maintain reliability and growth.' },
  ];
  for (let i = 0; i < devServices.length; i++) {
    await prisma.service.create({ data: { categoryId: catDev.id, ...devServices[i], sortOrder: i + 1 } });
  }

  await prisma.service.create({
    data: { categoryId: catERP.id, title: 'Enterprise Solutions (Microsoft Dynamics 365, Odoo)', description: 'We provide robust enterprise solutions using platforms like Microsoft Dynamics 365 and Odoo to help businesses streamline operations, integrate departments, and gain real-time insights. Our services include implementation, customization, and ongoing support tailored to your business processes. We ensure seamless integration across finance, sales, operations, and customer management, enabling better decision-making, improved efficiency, and scalable growth for your organization.', sortOrder: 1 },
  });

  const cloudServices = [
    { title: 'Cost Optimization', description: 'We help businesses take full control of their cloud spending by analyzing usage, identifying inefficiencies, and implementing smart cost-saving strategies without compromising performance. Our cloud cost optimization services include right-sizing resources, eliminating unused or underutilized services, optimizing storage and compute usage, and applying best practices such as reserved instances and auto-scaling.' },
    { title: 'Deployments', description: 'We provide end-to-end cloud deployment services to help businesses build secure, scalable, and high-performance environments tailored to their needs. From planning and architecture design to implementation and configuration, we deploy cloud solutions that support your applications, data, and workflows efficiently.' },
    { title: 'Virtualization', description: 'We deliver advanced cloud virtualization solutions that enable businesses to run multiple systems and applications efficiently on shared cloud infrastructure. By creating virtual machines, networks, and storage environments, we help you maximize resource utilization, reduce hardware dependency, and improve scalability.' },
    { title: 'Suite and Email Setup', description: 'We provide complete suite and email setup services to help your business communicate and collaborate efficiently using professional, secure, and reliable platforms. From configuring custom domain emails to setting up tools like business email, calendars, cloud storage, and collaboration apps.' },
    { title: 'License and Pricing', description: 'We help businesses choose the right software licenses and pricing models to match their needs while avoiding unnecessary costs. Our service includes analyzing your requirements, recommending the most suitable licensing options, and ensuring compliance with vendor policies.' },
    { title: 'Backup', description: 'We provide secure and reliable cloud backup solutions to protect your business data from loss, corruption, or cyber threats. Our services include setting up automated backups, ensuring data is regularly and safely stored in the cloud, and implementing recovery strategies for quick restoration.' },
    { title: 'Automation', description: 'We deliver cloud automation solutions that streamline your operations by reducing manual tasks and improving efficiency across your infrastructure. Our services include automating deployments, scaling, backups, monitoring, and routine maintenance using modern tools and scripts.' },
    { title: 'MDM & MAM', description: 'We provide comprehensive Mobile Device Management (MDM) and Mobile Application Management (MAM) solutions to help businesses securely manage and control their mobile workforce. Our services include device enrollment, policy enforcement, remote monitoring, and data protection.' },
  ];
  for (let i = 0; i < cloudServices.length; i++) {
    await prisma.service.create({ data: { categoryId: catCloud.id, ...cloudServices[i], sortOrder: i + 1 } });
  }

  const cyberServices = [
    { title: 'Application Security', description: 'Build secure applications from the ground up with our comprehensive Application Security services. We help organizations identify, assess, and remediate security vulnerabilities across the Software Development Life Cycle (SDLC). Our experts perform secure code reviews, architecture assessments, vulnerability assessments, DevSecOps integration, and security testing.' },
    { title: 'Penetration Testing', description: 'Gain a clear understanding of your organization\'s security posture through expert-led penetration testing. We simulate real-world cyberattacks to identify exploitable vulnerabilities before malicious actors can. Our assessments combine automated tools with in-depth manual testing, delivering actionable findings, risk prioritization, proof of exploitation, and remediation guidance.' },
    { title: 'Web & Mobile App Pentesting', description: 'Identify security weaknesses in web and mobile applications using industry-recognized methodologies such as the OWASP Web Security Testing Guide. We assess authentication, authorization, business logic, session management, input validation, API integrations, and common web vulnerabilities.' },
    { title: 'API & Cloud Pentesting', description: 'Secure REST, SOAP, and GraphQL APIs by identifying vulnerabilities in authentication, authorization, input validation, rate limiting, business logic, and data exposure. For cloud, we assess the security of environments across AWS, Microsoft Azure, and Google Cloud Platform.' },
    { title: 'Active Directory (AD) Pentesting', description: 'Protect your enterprise identity infrastructure through comprehensive Active Directory security assessments. We simulate advanced attacker techniques to identify privilege escalation opportunities, insecure configurations, credential exposure, lateral movement paths, and domain compromise risks.' },
    { title: 'Database Hardening & Security', description: 'Protect your organization\'s most valuable asset - its data. Our Database Hardening and Security services strengthen database environments by implementing secure configurations, least-privilege access controls, encryption, auditing, vulnerability assessments, patch management, and continuous monitoring.' },
    { title: 'Security Operations Center (SOC) - 24x7', description: 'Monitor, detect, and respond to cyber threats around the clock with our 24x7 Security Operations Center (SOC). Our security analysts provide continuous threat monitoring, log analysis, SIEM management, threat intelligence, endpoint detection and response (EDR), incident triage, and proactive threat hunting.' },
    { title: 'Incident Response', description: 'Respond quickly and effectively to cybersecurity incidents with our Incident Response services. Our experts help organizations contain threats, investigate security breaches, eradicate malicious activity, recover critical systems, and restore business operations with minimal disruption.' },
  ];
  for (let i = 0; i < cyberServices.length; i++) {
    await prisma.service.create({ data: { categoryId: catCyber.id, ...cyberServices[i], sortOrder: i + 1 } });
  }

  await prisma.service.create({
    data: { categoryId: catAI.id, title: 'AI Engineering & LLMs', description: 'Leverage the power of Artificial Intelligence to drive innovation, automation, and business growth. Our AI Engineering services help organizations design, develop, deploy, and secure AI-powered solutions tailored to their business objectives. We specialize in Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI agents, machine learning, intelligent automation, MLOps, and AI integration with enterprise systems.', sortOrder: 1 },
  });
  console.log('Created 32 services across 6 categories');

  // ─── Products (matching original site) ───
  await prisma.product.createMany({
    data: [
      { brand: 'HP', model: 'EliteBook 840', price: 1200, ram: '16GB', ssd: '512GB', hdd: 'N/A', gpu: 'Integrated', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop', description: 'Reliable business laptop with enterprise-grade security features.', sortOrder: 1 },
      { brand: 'Dell', model: 'XPS 15', price: 1900, ram: '32GB', ssd: '1TB', hdd: 'N/A', gpu: '4GB NVIDIA', imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop', description: 'Premium laptop with stunning display and powerful performance.', sortOrder: 2 },
      { brand: 'Lenovo', model: 'ThinkPad X1', price: 1500, ram: '16GB', ssd: '512GB', hdd: 'N/A', gpu: 'Integrated', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop', description: 'Iconic business ultrabook with legendary keyboard and durability.', sortOrder: 3 },
    ],
  });
  console.log('Created 3 products');

  // ─── Pages ───
  const aboutPage = await prisma.page.create({
    data: {
      title: 'About Uvosoft Tech',
      slug: 'about',
      metaTitle: 'About Us | Uvosoft Tech',
      metaDescription: 'Learn about Uvosoft Tech - 4 years of experience in ERP development, cybersecurity, cloud infrastructure, and Microsoft services.',
      isPublished: true,
      sortOrder: 1,
      sections: {
        create: [
          {
            slug: 'intro',
            title: 'About Uvosoft Tech',
            content: {
              paragraphs: [
                'With 4 years of successful experience in ERP development, cybersecurity, cloud infrastructure, and Microsoft services support, Uvosoft Tech is dedicated to driving innovation.',
                'Our mission is to enhance AI empowerment in ERP systems, make them secure from attackers, and build innovative, reliable applications for enterprise systems.',
                'We boast vast, specialized teams: Cybersecurity experts, .NET & AI Web Developers, Dynamics 365 (BC & F&O X++) experts, Cloud Infrastructure & IT support, and Functional Consultants to identify exact client needs.',
              ],
            },
            sortOrder: 1,
          },
          {
            slug: 'stats',
            title: 'Company Statistics',
            content: {
              stats: [
                { value: '4+', label: 'Years Experience' },
                { value: '5', label: 'Expert Teams' },
                { value: '100%', label: 'Secure Solutions' },
              ],
            },
            sortOrder: 2,
          },
        ],
      },
    },
  });
  console.log('Created About page with sections');

  // ─── Site Settings ───
  await prisma.siteSetting.createMany({
    data: [
      { key: 'site_name', value: 'Uvosoft Tech', group: 'general', type: 'text', label: 'Site Name' },
      { key: 'site_tagline', value: 'Enterprise Software, Cloud, AI & Cyber Security', group: 'general', type: 'text', label: 'Site Tagline' },
      { key: 'contact_email', value: 'marketing@uvosofttech.com', group: 'contact', type: 'text', label: 'Contact Email' },
      { key: 'contact_phone', value: '+92 371 8055990', group: 'contact', type: 'text', label: 'WhatsApp Phone' },
      { key: 'contact_whatsapp', value: '923718055990', group: 'contact', type: 'text', label: 'WhatsApp Number (no + or spaces)' },
      { key: 'contact_address', value: '', group: 'contact', type: 'textarea', label: 'Physical Address' },
      { key: 'meta_title', value: 'Uvosoft Tech | Enterprise Software, Cloud, AI & Cyber Security', group: 'seo', type: 'text', label: 'Default Meta Title' },
      { key: 'meta_description', value: 'At Uvosoft Tech, we deliver scalable software, custom ERP solutions, cloud infrastructure, and AI-driven ecosystems fortified by elite Cyber Security.', group: 'seo', type: 'textarea', label: 'Default Meta Description' },
      { key: 'meta_keywords', value: 'ERP, cybersecurity, cloud, AI, software development, Uvosoft Tech', group: 'seo', type: 'textarea', label: 'Default Meta Keywords' },
      { key: 'hero_tag', value: 'Enterprise Software, Cloud, AI & Cyber Security', group: 'home', type: 'text', label: 'Hero Tag Text' },
      { key: 'hero_heading_line1', value: 'Empowering Your Business', group: 'home', type: 'text', label: 'Hero Heading Line 1' },
      { key: 'hero_heading_line2', value: 'with Intelligent Technology', group: 'home', type: 'text', label: 'Hero Heading Line 2 (gradient text)' },
      { key: 'hero_description', value: 'At Uvosoft Tech, we deliver scalable software, custom ERP solutions, cloud infrastructure, and AI-driven ecosystems—fortified by elite Cyber Security to make your brand unstoppable.', group: 'home', type: 'textarea', label: 'Hero Description' },
      { key: 'hero_cta_primary_text', value: 'Book a Consultation', group: 'home', type: 'text', label: 'Hero Primary CTA Text' },
      { key: 'hero_cta_primary_link', value: '/contact', group: 'home', type: 'text', label: 'Hero Primary CTA Link' },
      { key: 'hero_cta_secondary_text', value: 'Explore Services', group: 'home', type: 'text', label: 'Hero Secondary CTA Text' },
      { key: 'hero_cta_secondary_link', value: '/services', group: 'home', type: 'text', label: 'Hero Secondary CTA Link' },
      { key: 'services_title', value: 'Our Services', group: 'services', type: 'text', label: 'Services Section Title' },
      { key: 'services_subtitle', value: 'Comprehensive IT, Development, Cloud, and Cybersecurity solutions tailored to your enterprise needs.', group: 'services', type: 'textarea', label: 'Services Section Subtitle' },
      { key: 'store_title', value: 'Our Store', group: 'store', type: 'text', label: 'Store Section Title' },
      { key: 'store_subtitle', value: 'Quality computer hardware and laptops. Inquire instantly via WhatsApp.', group: 'store', type: 'textarea', label: 'Store Section Subtitle' },
      { key: 'blog_title', value: 'Latest Blogs', group: 'blog', type: 'text', label: 'Blog Section Title' },
      { key: 'blog_subtitle', value: 'Insights, news, and updates from the world of technology and security.', group: 'blog', type: 'textarea', label: 'Blog Section Subtitle' },
      { key: 'contact_title', value: 'Get In Touch', group: 'contact', type: 'text', label: 'Contact Section Title' },
      { key: 'contact_subtitle', value: 'Ready to elevate your business? Reach out to us through any of these channels.', group: 'contact', type: 'textarea', label: 'Contact Section Subtitle' },
      { key: 'footer_text', value: 'All rights reserved.', group: 'general', type: 'text', label: 'Footer Copyright Text' },
      { key: 'chatbot_title', value: 'Uvosoft AI Assistant', group: 'general', type: 'text', label: 'Chatbot Window Title' },
      { key: 'chatbot_greeting', value: 'Hello! I am the Uvosoft AI. How can I help you today?', group: 'general', type: 'textarea', label: 'Chatbot Initial Message' },
    ],
  });
  console.log('Created site settings');

  // ─── Navigation Items ───
  await prisma.navigationItem.createMany({
    data: [
      { label: 'Home', href: '/', sortOrder: 1, isVisible: true, target: '_self' },
      { label: 'Services', href: '/services', sortOrder: 2, isVisible: true, target: '_self' },
      { label: 'About Us', href: '/about', sortOrder: 3, isVisible: true, target: '_self' },
      { label: 'Store', href: '/store', sortOrder: 4, isVisible: true, target: '_self' },
      { label: 'Blogs', href: '/blog', sortOrder: 5, isVisible: true, target: '_self' },
      { label: 'Contact', href: '/contact', sortOrder: 6, isVisible: true, target: '_self' },
    ],
  });
  console.log('Created navigation items');

  // ─── Social Links ───
  await prisma.socialLink.createMany({
    data: [
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/uvosoft/posts/?feedView=all', iconName: 'linkedin', sortOrder: 1, isActive: true },
      { platform: 'WhatsApp', url: 'https://wa.me/923718055990', iconName: 'whatsapp', sortOrder: 2, isActive: true },
    ],
  });
  console.log('Created social links');

  // ─── Chatbot Responses ───
  await prisma.chatbotResponse.createMany({
    data: [
      { triggerKeywords: ['erp'], responseText: 'Our Custom ERP solutions integrate finance, HR, supply chain, and operations seamlessly. Book a consultation to discuss your needs!', priority: 10, isActive: true },
      { triggerKeywords: ['cyber', 'security'], responseText: 'We provide elite Cyber Security: threat assessment, zero-trust architecture, penetration testing, and 24/7 monitoring.', priority: 10, isActive: true },
      { triggerKeywords: ['cloud'], responseText: 'Our Cloud services ensure scalable, secure infrastructure. We specialize in AWS, Azure, and GCP migrations.', priority: 10, isActive: true },
      { triggerKeywords: ['software', 'develop'], responseText: 'We build scalable custom software, web, and mobile apps tailored to your business requirements.', priority: 8, isActive: true },
      { triggerKeywords: ['hello', 'hi', 'hey'], responseText: 'Hello there! Welcome to Uvosoft Tech. How can I assist you today?', priority: 5, isActive: true },
      { triggerKeywords: ['store', 'laptop', 'hardware'], responseText: 'Check out our Store section for HP, Dell, and Lenovo laptops. You can inquire directly via WhatsApp!', priority: 5, isActive: true },
      { triggerKeywords: ['contact', 'email', 'phone', 'reach'], responseText: 'You can reach us at marketing@uvosofttech.com or WhatsApp +92 371 8055990. We respond promptly!', priority: 3, isActive: true },
      { triggerKeywords: ['ai', 'artificial intelligence', 'machine learning', 'llm'], responseText: 'Our AI Engineering services cover Generative AI, LLMs, RAG, AI agents, and intelligent automation. We build scalable, secure AI solutions for enterprise systems.', priority: 8, isActive: true },
    ],
  });
  console.log('Created chatbot responses');

  // ─── Blog Posts ───
  const publishedDate1 = new Date();
  publishedDate1.setDate(publishedDate1.getDate() - 5);
  const publishedDate2 = new Date();
  publishedDate2.setDate(publishedDate2.getDate() - 12);
  const publishedDate3 = new Date();
  publishedDate3.setDate(publishedDate3.getDate() - 20);

  await prisma.blogPost.createMany({
    data: [
      {
        title: 'The Future of AI in ERP',
        slug: 'the-future-of-ai-in-erp',
        excerpt: 'How AI is transforming enterprise resource planning and what it means for your business.',
        content: '<p>Artificial Intelligence is revolutionizing Enterprise Resource Planning (ERP) systems in unprecedented ways. From predictive analytics to automated workflows, AI-powered ERP solutions are enabling businesses to make smarter decisions faster.</p><h3>Key Transformations</h3><ul><li>Predictive demand forecasting using machine learning algorithms</li><li>Automated routine tasks freeing up human resources for strategic work</li><li>Real-time anomaly detection in financial transactions</li><li>Intelligent supply chain optimization</li><li>Natural language interfaces for data querying</li></ul><p>Organizations that embrace AI-driven ERP systems are seeing significant improvements in efficiency, accuracy, and competitive advantage. The future belongs to businesses that can harness the power of intelligent automation while maintaining robust security.</p>',
        authorId: admin.id,
        status: 'published',
        publishedAt: publishedDate1,
        metaTitle: 'The Future of AI in ERP | Uvosoft Tech',
        metaDescription: 'Discover how AI is transforming enterprise resource planning and what it means for your business operations.',
      },
      {
        title: 'Zero-Trust Cyber Security',
        slug: 'zero-trust-cyber-security',
        excerpt: 'Why modern enterprises are shifting to zero-trust architectures to protect critical data.',
        content: '<p>The traditional perimeter-based security model is no longer sufficient in today\'s threat landscape. Zero-Trust architecture has emerged as the gold standard for enterprise security.</p><h3>Core Principles of Zero-Trust</h3><ul><li>Never trust, always verify - every access request is fully authenticated</li><li>Least privilege access - users get minimum necessary permissions</li><li>Micro-segmentation - networks are divided into secure zones</li><li>Continuous monitoring - real-time threat detection and response</li></ul><p>Implementing Zero-Trust requires a comprehensive approach that includes identity verification, device health checks, network segmentation, and continuous monitoring. Our cybersecurity team specializes in designing and deploying Zero-Trust architectures tailored to your organization\'s specific needs.</p>',
        authorId: admin.id,
        status: 'published',
        publishedAt: publishedDate2,
        metaTitle: 'Zero-Trust Cyber Security | Uvosoft Tech',
        metaDescription: 'Learn why modern enterprises are adopting zero-trust architectures to protect their critical data and systems.',
      },
      {
        title: 'Optimizing Cloud Costs',
        slug: 'optimizing-cloud-costs',
        excerpt: 'Practical strategies to reduce your cloud spending without sacrificing performance.',
        content: '<p>Cloud spending is one of the fastest-growing expenses for modern businesses. Without proper optimization, organizations often find themselves paying for resources they don\'t use.</p><h3>Practical Cost Optimization Strategies</h3><ul><li>Right-sizing instances based on actual usage patterns</li><li>Implementing auto-scaling to match demand</li><li>Using reserved instances for predictable workloads</li><li>Eliminating idle and orphaned resources</li><li>Optimizing storage tiers and lifecycle policies</li></ul><p>Our cloud cost optimization service has helped businesses reduce their cloud spending by an average of 30-40% while maintaining or even improving performance. Contact us to learn how we can optimize your cloud infrastructure.</p>',
        authorId: admin.id,
        status: 'published',
        publishedAt: publishedDate3,
        metaTitle: 'Optimizing Cloud Costs | Uvosoft Tech',
        metaDescription: 'Practical strategies to reduce your cloud spending without sacrificing performance or reliability.',
      },
    ],
  });
  console.log('Created 3 blog posts');

  console.log('\n✓ Database seeded successfully!\n');
  console.log('Admin credentials:');
  console.log('  Email: admin@uvosofttech.com');
  console.log('  Password: admin123');
  console.log('\nEditor credentials:');
  console.log('  Email: editor@uvosofttech.com');
  console.log('  Password: editor123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
