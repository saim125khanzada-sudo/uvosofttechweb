// Complete 24 Detailed Service Pages Database with Exact URL Structures and Target SEO Keywords
const servicesCategories = [
  {
    id: 'development',
    slug: 'development',
    name: 'Custom Software & Web Development',
    icon: '💻',
    description: 'Custom website development, web applications, enterprise ERP, POS, school & health management systems, e-commerce, and mobile apps (iOS & Android).'
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    name: 'Cloud Engineering & DevOps',
    icon: '☁️',
    description: 'Cloud data migration, suite setups (M365 & Google Workspace), Azure/AWS tenant infrastructure, MDM solutions, and cloud cost optimization.'
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    name: 'Enterprise Cybersecurity & Pentesting',
    icon: '🛡️',
    description: 'Application security, offensive penetration testing, web/mobile/API pentesting, Active Directory security, database hardening, 24x7 SOC, and incident response.'
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    name: 'AI Engineering & Automation',
    icon: '🤖',
    description: 'Generative AI, Large Language Models (LLMs), RAG document search systems, autonomous AI agents, machine learning, and workflow automation.'
  }
];

const detailedServices = [
  // -------------------------------------------------------------
  // CATEGORY 1: DEVELOPMENT (/services/development/...)
  // -------------------------------------------------------------
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'website-development',
    urlPath: '/services/development/website-development',
    title: 'Website Development Company in Karachi | Web Design Services Pakistan',
    h1: 'Website Development Services',
    icon: '🌐',
    keywords: 'website development company in Karachi, web design services Pakistan, custom website developer Karachi, responsive web development company',
    heroSubtitle: 'High-performing, visually stunning, and conversion-driven digital platforms for startups and enterprises across Pakistan.',
    content: `At Uvosoft Tech, we believe your digital footprint is the face of your business. As a leading website development company in Karachi, we build high-performing, visually stunning, and conversion-driven digital platforms. Whether you are a growing startup in Shahrah-e-Faisal or an established enterprise in Pakistan, our custom web design and development services ensure your brand stands out. We don’t just write code; we engineer responsive, lightning-fast websites optimized for local and international audiences. From corporate portfolios to high-end digital experiences, Uvosoft Tech bridges the gap between creative vision and technical reality, helping businesses across Pakistan dominate search engines and capture target markets.`,
    features: [
      'Responsive Mobile-First Web Design',
      'Search Engine Optimization (SEO) Built-in',
      'Ultra-Fast Loading & Core Web Vitals Optimization',
      'Custom Content Management & Security Hardening',
      'Local & International Payment Gateway Integration'
    ],
    techStack: ['Node.js & React', 'HTML5 / CSS3 / JavaScript', 'WordPress & Custom CMS', 'PostgreSQL / MySQL', 'Nginx & SSL Hardening']
  },
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'web-application-development',
    urlPath: '/services/development/web-application-development',
    title: 'Web Application Development Karachi | Custom Web App Developers Pakistan',
    h1: 'Web Application Development Services',
    icon: '⚡',
    keywords: 'web application development Karachi, custom web app developers Pakistan, SaaS development company Pakistan, enterprise web software solutions',
    heroSubtitle: 'Scale your digital operations with robust, scalable, and secure web applications built for the Pakistani and global tech ecosystem.',
    content: `Scale your digital operations with robust, scalable, and secure web applications built by Uvosoft Tech. Recognized as a premier web application development company in Karachi, we specialize in transforming complex business workflows into seamless digital solutions. Our expert developers build progressive web apps, customer portals, and enterprise-grade SaaS platforms tailored for the Pakistani tech ecosystem. By leveraging modern frameworks and cloud environments, we ensure your applications deliver unmatched performance, security, and user engagement. Partner with Uvosoft Tech to turn your complex business logic into high-performing web apps that drive real growth.`,
    features: [
      'Custom SaaS & Multi-Tenant Architecture',
      'Progressive Web Apps (PWA) with Offline Sync',
      'Enterprise Role-Based Access Control (RBAC)',
      'REST & GraphQL API Microservices',
      'Cloud Serverless Scalability (AWS / Azure)'
    ],
    techStack: ['React / Vue.js', 'Node.js & Express', 'Python & FastAPI', 'Docker & Kubernetes', 'PostgreSQL & Redis']
  },
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'erp-development',
    urlPath: '/services/development/erp-development',
    title: 'ERP Development Company in Karachi | Odoo ERP & Dynamics 365 Pakistan',
    h1: 'ERP Development (CRM, HRM, Payroll, Inventory) & Custom/Odoo/Dynamics 365 Solutions',
    icon: '📊',
    keywords: 'ERP development company in Karachi, Odoo ERP implementation Pakistan, Microsoft Dynamics 365 consultants Karachi, custom inventory and payroll software Pakistan',
    heroSubtitle: 'Streamline your entire business infrastructure with enterprise-grade ERP, CRM, HRM, Payroll, and Inventory automation solutions.',
    content: `Streamline your entire business infrastructure with enterprise-grade ERP solutions by Uvosoft Tech. Operating from Karachi, we are a trusted ERP development company in Pakistan specializing in end-to-end business automation. Whether you need a custom ERP system built from scratch or expert deployment for Odoo ERP and Microsoft Dynamics 365, we integrate your core operations under one roof. Our modular solutions cover CRM (Customer Relationship Management), HRM (Human Resource Management), automated Payroll systems, and real-time Inventory Management systems. Empower your enterprise with data-driven decision-making, reduced operational overhead, and flawless workflow automation tailored to the local Pakistani regulatory and business environment.`,
    features: [
      'Odoo Community & Enterprise Setup & Custom Python Modules',
      'Microsoft Dynamics 365 Business Central Deployments',
      'Automated Pakistani FBR Tax & Payroll Computation',
      'Multi-Warehouse Inventory & Supply Chain Tracking',
      'CRM Sales Pipeline & Customer Management'
    ],
    techStack: ['Odoo ERP (Python/QWeb)', 'Microsoft Dynamics 365', 'PostgreSQL', 'Power BI Dashboards', 'REST APIs']
  },
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'restaurant-management-pos-systems',
    urlPath: '/services/development/restaurant-management-pos-systems',
    title: 'Restaurant POS Software Karachi | Restaurant Management System Pakistan',
    h1: 'Restaurant Management & POS Systems',
    icon: '🍽️',
    keywords: 'restaurant POS software Karachi, restaurant management system Pakistan, cloud POS for cafes Karachi, point of sale software for food chains',
    heroSubtitle: 'Revolutionize your food & beverage business with lightning-fast cloud POS, KOT sync, inventory, and multi-branch management.',
    content: `Revolutionize your food and beverage business with smart, lightning-fast restaurant management and POS systems developed by Uvosoft Tech. The restaurant industry in Karachi and across Pakistan demands speed, precision, and real-time tracking. Our custom Point of Sale (POS) software integrates table booking, kitchen order ticketing (KOT), multi-branch inventory tracking, delivery management, and detailed financial reporting into a single intuitive dashboard. Whether you run a fine-dining restaurant, a fast-food chain, or a cozy café, Uvosoft Tech delivers reliable POS solutions that cut down wait times, eliminate inventory shrinkage, and elevate customer satisfaction.`,
    features: [
      'Kitchen Order Ticketing (KOT) Instant Screen Sync',
      'Multi-Branch Inventory & Recipe Recipe Costing',
      'Delivery Aggregator & WhatsApp Order Booking Integration',
      'Offline-First POS Terminal Protection',
      'Daily Sales, Cash Register & Profit Analytics'
    ],
    techStack: ['Electron / Node.js', 'React POS Interface', 'SQLite & PostgreSQL Sync', 'Thermal Printer SDKs', 'REST Cloud APIs']
  },
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'school-management-fee-status-system',
    urlPath: '/services/development/school-management-fee-status-system',
    title: 'School Management System Software Pakistan | Campus Management Karachi',
    h1: 'School Management & Fee Status Systems',
    icon: '🏫',
    keywords: 'school management system software Pakistan, campus management software Karachi, school fee collection software, educational institution ERP',
    heroSubtitle: 'Modernize educational institutions with automated fee status tracking, WhatsApp parent portals, digital attendance, and grading.',
    content: `Modernize educational institutions with advanced School Management and Fee Status Systems by Uvosoft Tech. Designed for schools, colleges, and coaching centers across Karachi and Pakistan, our software digitizes administrative burdens so educators can focus on teaching. Features include automated fee tracking and status updates, SMS/WhatsApp parent portals, digital attendance, examination grading, and comprehensive student lifecycle management. Enhance transparency, secure financial collections, and bridge the communication gap between parents and administration with Uvosoft Tech’s scalable school automation platforms.`,
    features: [
      'Automated Fee Challan Generation & Payment Verification',
      'SMS & WhatsApp Parent Notification Alerts',
      'Student Attendance & Biometric Integration',
      'Exam Marksheets & Report Card Generation',
      'Teacher & Payroll Management'
    ],
    techStack: ['Node.js & React', 'PostgreSQL', 'Twilio / WhatsApp Business API', 'Biometric SDKs', 'AWS Cloud']
  },
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'health-management-system',
    urlPath: '/services/development/health-management-system',
    title: 'Hospital Management System Software Pakistan | Healthcare Software Karachi',
    h1: 'Health Management Systems (HMS)',
    icon: '🏥',
    keywords: 'hospital management system software Pakistan, healthcare software development Karachi, clinic management system, EHR software Pakistan',
    heroSubtitle: 'Elevate patient care, Electronic Health Records (EHR), OPD queues, pharmacy inventory, and lab billing with secure HMS software.',
    content: `Elevate patient care and clinical efficiency with secure Health Management Systems (HMS) engineered by Uvosoft Tech. Tailored for hospitals, clinics, and diagnostic labs in Karachi and nationwide, our healthcare software solutions streamline daily medical workflows. From electronic health records (EHR) and digital prescription management to OPD queue handling, pharmacy inventory, and billing automation, our systems ensure complete compliance and data security. Trust Uvosoft Tech to build modern healthcare infrastructure that enhances patient experiences and optimizes hospital operations.`,
    features: [
      'Electronic Health Records (EHR) & E-Prescriptions',
      'OPD Appointment Scheduling & Queue Management',
      'Pharmacy Inventory & Batch Expiry Tracking',
      'Diagnostic Lab Test Billing & Report Delivery',
      'HIPAA & Data Privacy Security Hardening'
    ],
    techStack: ['Node.js & Vue.js', 'PostgreSQL', 'HL7 / FHIR Standards', 'Docker', 'AWS Encrypted Storage']
  },
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'ecommerce-sites-and-stores',
    urlPath: '/services/development/ecommerce-sites-and-stores',
    title: 'Ecommerce Development Company Karachi | Shopify & Custom Online Store Pakistan',
    h1: 'E-Commerce Sites & Stores',
    icon: '🛍️',
    keywords: 'ecommerce development company Karachi, Shopify development Pakistan, custom online store builder, WooCommerce development Karachi',
    heroSubtitle: 'High-converting online stores built on Shopify, WooCommerce, or Custom Stacks with local Pakistani payment gateway integrations.',
    content: `Turn browsers into loyal buyers with high-converting e-commerce websites and online stores built by Uvosoft Tech. The retail landscape in Pakistan is shifting rapidly online, and you need a storefront that is fast, secure, and optimized for sales. Whether you are launching on Shopify, WooCommerce, or building a custom multi-vendor e-commerce platform, our Karachi-based development team ensures seamless local payment gateway integration (like JazzCash, EasyPaisa, and bank portals), mobile responsiveness, and lightning-fast loading speeds. Partner with Uvosoft Tech to launch a feature-rich e-commerce store designed to scale your revenue.`,
    features: [
      'Pakistani Payment Gateway Integration (JazzCash, EasyPaisa, PayFast, Bank Checkout)',
      'Custom Shopify & WooCommerce Theme Customization',
      'Multi-Vendor Marketplace Infrastructure',
      'Real-time Inventory & Courier Tracking Integration (TCS, Leopards, Trax)',
      'Mobile-Optimized Checkout Flow'
    ],
    techStack: ['Shopify Liquid', 'WooCommerce / WordPress', 'React & Node.js Custom Commerce', 'JazzCash / EasyPaisa APIs']
  },
  {
    categorySlug: 'development',
    categoryName: 'Custom Software & Web Development',
    slug: 'mobile-app-development',
    urlPath: '/services/development/mobile-app-development',
    title: 'Mobile App Development Company Karachi | Android & iOS Developers Pakistan',
    h1: 'Mobile Android and iOS Applications',
    icon: '📱',
    keywords: 'mobile app development company Karachi, Android and iOS app developers Pakistan, custom mobile application development, flutter app developers Pakistan',
    heroSubtitle: 'Native & cross-platform Flutter & React Native mobile applications engineered for exceptional user experience and security.',
    content: `Put your business right into the pockets of your customers with cutting-edge Android and iOS mobile applications by Uvosoft Tech. As a leading mobile app development company in Karachi, we build native and cross-platform apps that combine stunning UI/UX design with robust backend performance. Utilizing advanced frameworks like Flutter and React Native, we deliver cost-effective, high-speed apps tailored for the Pakistani market and global app stores. From enterprise mobility solutions to consumer-facing marketplaces, Uvosoft Tech turns your app concept into a market-ready reality.`,
    features: [
      'Cross-Platform Flutter & React Native Development',
      'Native iOS (Swift) & Android (Kotlin) High-Performance Apps',
      'Biometric Fingerprint & FaceID Security Login',
      'Real-Time GPS Location Tracking & Push Notifications',
      'Google Play Store & Apple App Store Publishing'
    ],
    techStack: ['Flutter / Dart', 'React Native', 'Swift & Kotlin', 'Firebase & REST APIs', 'App Store Connect']
  },

  // -------------------------------------------------------------
  // CATEGORY 2: CLOUD DEVOPS (/services/cloud-devops/...)
  // -------------------------------------------------------------
  {
    categorySlug: 'cloud-devops',
    categoryName: 'Cloud Engineering & DevOps',
    slug: 'cloud-data-migration',
    urlPath: '/services/cloud-devops/cloud-data-migration',
    title: 'Cloud Data Migration Services Karachi | AWS Azure Cloud Migration Pakistan',
    h1: 'Cloud Data Migration Services',
    icon: '📦',
    keywords: 'cloud migration services Karachi, data migration company Pakistan, AWS cloud migration consultants, Azure data migration services',
    heroSubtitle: 'Zero-downtime migration of databases, applications, and corporate data from legacy servers to AWS, Azure, or GCP.',
    content: `Accelerate your digital transformation and eliminate legacy infrastructure limitations with secure Cloud Data Migration services by Uvosoft Tech. Operating from Karachi, our certified cloud engineers ensure seamless, zero-downtime migration of your critical business databases, applications, and files to leading cloud environments. Whether you are transitioning from on-premise servers to Azure, AWS, or multi-cloud ecosystems, we guarantee complete data integrity, strict security protocols, and minimal business disruption. Partner with Uvosoft Tech to future-proof your data infrastructure with scalable, high-performance cloud storage solutions designed for modern Pakistani enterprises.`,
    features: [
      'Zero-Downtime Live Database Replication',
      'On-Premise Server to AWS / Azure / GCP Migration',
      'Data Integrity & Encryption Verification',
      'Legacy System Modernization & Containerization',
      'Post-Migration Performance & SLA Monitoring'
    ],
    techStack: ['AWS Database Migration Service (DMS)', 'Azure Migrate', 'PostgreSQL / SQL Server', 'Docker & Kubernetes']
  },
  {
    categorySlug: 'cloud-devops',
    categoryName: 'Cloud Engineering & DevOps',
    slug: 'cloud-suite-setup',
    urlPath: '/services/cloud-devops/cloud-suite-setup',
    title: 'Cloud Suite Implementation Pakistan | Microsoft 365 Setup Karachi',
    h1: 'Cloud Suite Setup (Microsoft 365 & Google Workspace)',
    icon: '✉️',
    keywords: 'cloud suite implementation Pakistan, Microsoft 365 setup Karachi, Google Workspace configuration services, enterprise cloud productivity setup',
    heroSubtitle: 'Professional email, domain configuration, user access security, and collaborative workspace setup for enterprise teams.',
    content: `Empower your workforce with seamless collaboration and productivity suites configured by Uvosoft Tech. As a modern technology solutions provider, we specialize in comprehensive Cloud Suite setup, including Microsoft 365 and Google Workspace deployments for businesses in Karachi and across Pakistan. From custom email domain configuration and secure user access controls to collaborative workspace optimization and team communication tools, we get your infrastructure up and running smoothly. Trust Uvosoft Tech to deliver secure, enterprise-grade cloud suite setups that enhance team efficiency and remote work capabilities.`,
    features: [
      'Microsoft 365 & Exchange Online Enterprise Deployment',
      'Google Workspace Professional Migration',
      'DNS MX, SPF, DKIM, & DMARC Email Protection',
      'Single Sign-On (SSO) & Multi-Factor Authentication',
      'Cloud File Storage Policy & SharePoint Configuration'
    ],
    techStack: ['Microsoft 365 Admin Center', 'Google Admin Console', 'Azure Active Directory (Entra ID)', 'DNS Security']
  },
  {
    categorySlug: 'cloud-devops',
    categoryName: 'Cloud Engineering & DevOps',
    slug: 'cloud-infrastructure-setup',
    urlPath: '/services/cloud-devops/cloud-infrastructure-setup',
    title: 'Azure Tenant Setup Karachi | AWS Infrastructure Configuration Pakistan',
    h1: 'Cloud Infrastructure / Tenant / Admin Center Setup (Azure, AWS, Oracle)',
    icon: '🏗️',
    keywords: 'Azure tenant setup Karachi, AWS infrastructure configuration Pakistan, Oracle cloud admin setup, cloud administration services Pakistan',
    heroSubtitle: 'Architect, configure, and secure enterprise cloud tenants on Microsoft Azure, AWS, and Oracle Cloud with IAM security.',
    content: `Build a rock-solid operational foundation with professional Cloud Infrastructure, Tenant, and Admin Center setup by Uvosoft Tech. Leveraging extensive expertise in Microsoft Azure, Amazon Web Services (AWS), and Oracle Cloud, our certified cloud administrators architect, configure, and manage enterprise environments from the ground up. From tenant provisioning and security policy enforcement to Identity and Access Management (IAM) and resource grouping, we optimize your cloud backbone for maximum uptime and security. Partner with Uvosoft Tech to streamline your IT infrastructure with expert cloud administration tailored to your business needs.`,
    features: [
      'Azure Tenant & Entra ID Security Configuration',
      'AWS IAM, VPC, EC2, Security Group & S3 Architecture',
      'Oracle Cloud Infrastructure (OCI) Admin Setup',
      'Automated Network Security Policies & Firewalls',
      'Billing Management & Infrastructure Health Alerts'
    ],
    techStack: ['Microsoft Azure / Entra ID', 'AWS CloudFormation / Console', 'Oracle Cloud (OCI)', 'Terraform', 'Kubernetes']
  },
  {
    categorySlug: 'cloud-devops',
    categoryName: 'Cloud Engineering & DevOps',
    slug: 'mobile-device-management-mdm',
    urlPath: '/services/cloud-devops/mobile-device-management-mdm',
    title: 'MDM Solution Pakistan | Mobile Device Management Karachi',
    h1: 'MDM (Mobile Device Management) Solutions',
    icon: '🔒',
    keywords: 'MDM solution Pakistan, Mobile Device Management Karachi, enterprise mobility management software, corporate device security solutions',
    heroSubtitle: 'Remotely secure corporate laptops, smartphones, and tablets with Microsoft Intune, BitLocker encryption, and remote wipe.',
    content: `Secure your corporate data across smartphones, tablets, and remote endpoints with advanced Mobile Device Management (MDM) solutions from Uvosoft Tech. In today’s hybrid work era, businesses in Karachi and Pakistan need strict control over corporate and BYOD (Bring Your Own Device) ecosystems. Our MDM deployment services allow you to remotely monitor, manage, and secure mobile devices, enforce compliance policies, push application updates, and wipe data in case of loss or theft. Protect your organizational assets with Uvosoft Tech’s reliable, centralized mobile security infrastructure.`,
    features: [
      'Microsoft Intune & Jamf MDM Enrollment',
      'Remote Laptop Data Wiping & Locking',
      'BitLocker & FileVault Encryption Policy Enforcement',
      'Corporate Application Store & Automatic Patching',
      'Conditional Access Security & Compliance Verification'
    ],
    techStack: ['Microsoft Intune', 'Jamf Pro', 'Azure AD Conditional Access', 'Apple Business Manager', 'Windows AutoPilot']
  },
  {
    categorySlug: 'cloud-devops',
    categoryName: 'Cloud Engineering & DevOps',
    slug: 'cloud-cost-optimization',
    urlPath: '/services/cloud-devops/cloud-cost-optimization',
    title: 'Cloud Cost Optimization Pakistan | Reduce AWS Azure Cloud Bills Karachi',
    h1: 'Cloud Cost Optimization & FinOps',
    icon: '📉',
    keywords: 'cloud cost optimization Pakistan, reduce AWS Azure cloud bills Karachi, cloud resource auditing, FinOps services Pakistan',
    heroSubtitle: 'Cut unmonitored AWS & Azure cloud expenses by up to 50% through resource auditing, rightsizing, and auto-scaling.',
    content: `Stop overpaying for underutilized cloud resources with strategic Cloud Cost Optimization services by Uvosoft Tech. Many Pakistani businesses migrate to the cloud only to face ballooning monthly bills due to unmonitored infrastructure. Our cloud experts perform comprehensive resource audits across your Azure, AWS, or multi-cloud environments, identifying idle workloads, rightsizing instances, and implementing automated scaling policies. Maximize your Return on Investment (ROI) and cut unnecessary IT expenditures with Uvosoft Tech’s data-driven FinOps and cloud cost-reduction strategies.`,
    features: [
      'Comprehensive AWS / Azure Resource Audit',
      'Unattached Storage & Idle VM Elimination',
      'Reserved Instances & Savings Plan Optimization',
      'Auto-Scaling & Scheduled Workload Shut-Off',
      'Monthly FinOps ROI & Spending Reports'
    ],
    techStack: ['AWS Cost Explorer', 'Azure Cost Management', 'Datadog / CloudWatch', 'Terraform', 'Kubernetes KEDA']
  },

  // -------------------------------------------------------------
  // CATEGORY 3: CYBERSECURITY (/services/cybersecurity/...)
  // -------------------------------------------------------------
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'application-security',
    urlPath: '/services/cybersecurity/application-security',
    title: 'Application Security Services Pakistan | Secure Code Review & DevSecOps Karachi',
    h1: 'Application Security',
    icon: '🛡️',
    keywords: 'application security services Pakistan, secure code review Karachi, DevSecOps integration, software security assessment',
    heroSubtitle: 'Build resilient applications with secure code reviews, DevSecOps integration, and vulnerability remediation across the SDLC.',
    content: `Build secure applications from the ground up with our comprehensive Application Security services. We help organizations identify, assess, and remediate security vulnerabilities across the Software Development Life Cycle (SDLC). Our experts perform secure code reviews, architecture assessments, vulnerability assessments, DevSecOps integration, and security testing to ensure your web, mobile, desktop, and cloud-native applications remain resilient against evolving cyber threats while meeting industry compliance requirements.`,
    features: [
      'Static (SAST) & Dynamic (DAST) Security Testing',
      'Manual Secure Code Review & Architecture Audit',
      'DevSecOps Automated CI/CD Pipeline Integration',
      'Software Bill of Materials (SBOM) Vulnerability Scanning',
      'OWASP Security Standard Compliance'
    ],
    techStack: ['SonarQube', 'Snyk', 'OWASP ZAP', 'GitLab CI Security', 'Burp Suite']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'penetration-testing',
    urlPath: '/services/cybersecurity/penetration-testing',
    title: 'Penetration Testing Company Karachi | Cyber Security Audits Pakistan',
    h1: 'Penetration Testing',
    icon: '🎯',
    keywords: 'penetration testing company Karachi, cyber security audit Pakistan, ethical hacking services, vulnerability penetration test',
    heroSubtitle: 'Simulate real-world cyberattacks to identify and eliminate exploitable security vulnerabilities before hackers strike.',
    content: `Gain a clear understanding of your organization's security posture through expert-led penetration testing. We simulate real-world cyberattacks to identify exploitable vulnerabilities before malicious actors can. Our assessments combine automated tools with in-depth manual testing, delivering actionable findings, risk prioritization, proof of exploitation, and remediation guidance.`,
    features: [
      'Offensive Penetration Testing & Exploitation',
      'Manual & Automated Security Scans',
      'Prioritized Vulnerability Risk Scoring (CVSS)',
      'Executive Summary & Technical Remediation Reports',
      'Free Re-Testing & Verification Review'
    ],
    techStack: ['Metasploit Pro', 'Cobalt Strike', 'Nmap', 'Kali Linux', 'Burp Suite Pro']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'web-application-penetration-testing',
    urlPath: '/services/cybersecurity/web-application-penetration-testing',
    title: 'Web Application Penetration Testing Karachi | OWASP Security Audit Pakistan',
    h1: 'Web Application Penetration Testing',
    icon: '🌐',
    keywords: 'web application penetration testing Karachi, OWASP vulnerability scan Pakistan, web security audit, SQLi XSS vulnerability testing',
    heroSubtitle: 'Assess web portals against OWASP Top 10, authentication bypass, SQL injection, XSS, and business logic flaws.',
    content: `Identify security weaknesses in web applications using industry-recognized methodologies such as the OWASP Web Security Testing Guide. We assess authentication, authorization, business logic, session management, input validation, API integrations, and common web vulnerabilities to strengthen your application's security.`,
    features: [
      'OWASP Top 10 Vulnerability Assessment',
      'SQL Injection, XSS, & CSRF Exploitation Proof',
      'Authentication & Broken Access Control Testing',
      'Session Management & Parameter Tampering Audits',
      'Step-by-step Developer Remediation Guidance'
    ],
    techStack: ['Burp Suite Pro', 'OWASP ZAP', 'Sqlmap', 'Nessus', 'Postman Security']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'mobile-application-penetration-testing',
    urlPath: '/services/cybersecurity/mobile-application-penetration-testing',
    title: 'Mobile App Penetration Testing Pakistan | Android iOS Security Audit Karachi',
    h1: 'Mobile Application Penetration Testing',
    icon: '📲',
    keywords: 'mobile application penetration testing Pakistan, Android app security testing, iOS pentest Karachi, mobile API encryption audit',
    heroSubtitle: 'Evaluate Android and iOS mobile applications against reverse engineering, insecure storage, and API vulnerabilities.',
    content: `Evaluate Android and iOS applications against modern mobile threats. Our testing covers insecure data storage, reverse engineering, authentication, encryption, API communication, certificate pinning, and runtime security to protect sensitive user information.`,
    features: [
      'Static & Dynamic Android (APK) & iOS (IPA) Analysis',
      'Insecure Local Data Storage & Cache Audits',
      'SSL/TLS Certificate Pinning & Traffic Inspection',
      'Reverse Engineering & Decompilation Protection Testing',
      'OWASP Mobile Top 10 Compliance'
    ],
    techStack: ['Frida', 'Objection', 'MobSF', 'Burp Suite', 'Ghidra']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'api-penetration-testing',
    urlPath: '/services/cybersecurity/api-penetration-testing',
    title: 'API Penetration Testing Services Karachi | REST GraphQL Security Audit',
    h1: 'API Penetration Testing',
    icon: '🔑',
    keywords: 'API penetration testing Karachi, REST API security audit, GraphQL penetration test Pakistan, BOLA broken authorization audit',
    heroSubtitle: 'Secure REST, SOAP, and GraphQL APIs against BOLA, authorization bypass, rate limiting, and unauthorized data leaks.',
    content: `Secure REST, SOAP, and GraphQL APIs by identifying vulnerabilities in authentication, authorization, input validation, rate limiting, business logic, and data exposure. We ensure your APIs remain resilient against unauthorized access and abuse.`,
    features: [
      'OWASP API Security Top 10 Testing',
      'Broken Object Level Authorization (BOLA / IDOR) Audits',
      'JWT Token Manipulation & Authentication Bypass',
      'Rate Limiting & Denial of Service Vulnerability Scans',
      'Sensitive Data Exposure & Payload Validation'
    ],
    techStack: ['Postman', 'Burp Suite', 'Kiterunner', 'OWASP ZAP', 'RESTler']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'cloud-penetration-testing',
    urlPath: '/services/cybersecurity/cloud-penetration-testing',
    title: 'Cloud Penetration Testing Pakistan | AWS Azure GCP Security Audit Karachi',
    h1: 'Cloud Penetration Testing',
    icon: '☁️',
    keywords: 'cloud penetration testing Pakistan, AWS security audit Karachi, Azure pentest services, IAM misconfiguration testing',
    heroSubtitle: 'Assess cloud security across AWS, Azure, and GCP to uncover misconfigurations, IAM privilege escalation, and exposed data.',
    content: `Assess the security of cloud environments across AWS, Microsoft Azure, and Google Cloud Platform. Our cloud penetration testing identifies misconfigurations, privilege escalation paths, exposed services, identity and access management weaknesses, storage security issues, and infrastructure vulnerabilities.`,
    features: [
      'AWS / Azure / GCP Cloud Misconfiguration Audit',
      'IAM Privilege Escalation & Access Control Scans',
      'Exposed S3 Buckets & Cloud Storage Inspection',
      'Serverless & Container Security Review',
      'Compliance Policy & Benchmark Audits'
    ],
    techStack: ['Scout Suite', 'Prowler', 'Pacu', 'Checkov', 'Terrascan']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'active-directory-penetration-testing',
    urlPath: '/services/cybersecurity/active-directory-penetration-testing',
    title: 'Active Directory Penetration Testing Karachi | AD Security Hardening Pakistan',
    h1: 'Active Directory (AD) Penetration Testing',
    icon: '🏰',
    keywords: 'Active Directory penetration testing Karachi, AD security assessment Pakistan, domain controller pentest, kerberoasting security',
    heroSubtitle: 'Simulate domain compromise, Kerberoasting, privilege escalation, and lateral movement against Active Directory infrastructure.',
    content: `Protect your enterprise identity infrastructure through comprehensive Active Directory security assessments. We simulate advanced attacker techniques to identify privilege escalation opportunities, insecure configurations, credential exposure, lateral movement paths, and domain compromise risks before they can be exploited.`,
    features: [
      'Kerberoasting & AS-REP Roasting Vulnerability Exploitation',
      'Domain Admin Privilege Escalation Vector Analysis',
      'Lateral Movement & Credential Dumping Scans',
      'Group Policy Object (GPO) Misconfiguration Review',
      'AD Security Hardening Roadmap Report'
    ],
    techStack: ['BloodHound', 'Mimikatz', 'Impacket', 'Rubeus', 'PowerView']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'database-hardening-and-security',
    urlPath: '/services/cybersecurity/database-hardening-and-security',
    title: 'Database Hardening Services Pakistan | SQL Server PostgreSQL Security Karachi',
    h1: 'Database Hardening & Security',
    icon: '💾',
    keywords: 'database hardening services Pakistan, SQL database security Karachi, Oracle PostgreSQL security audit, database encryption services',
    heroSubtitle: 'Strengthen database security across SQL Server, PostgreSQL, MySQL, Oracle, and MongoDB against data breaches and unauthorized access.',
    content: `Protect your organization's most valuable asset—its data. Our Database Hardening and Security services strengthen database environments by implementing secure configurations, least-privilege access controls, encryption, auditing, vulnerability assessments, patch management, and continuous monitoring. We secure Microsoft SQL Server, Oracle, MySQL, PostgreSQL, MongoDB, and other database platforms against unauthorized access, data breaches, and compliance risks.`,
    features: [
      'Least-Privilege User Access & Role Hardening',
      'Data at Rest & Data in Transit Encryption Configuration',
      'Database Auditing & SQL Injection Defense',
      'Default Password & Configuration Vulnerability Scrubbing',
      'Compliance Standard Alignment (PCI-DSS / ISO 27001)'
    ],
    techStack: ['Microsoft SQL Server Security', 'PostgreSQL Hardening', 'Oracle Data Guard', 'MySQL Enterprise Security', 'MongoDB Atlas Guard']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'security-operations-center-24x7',
    urlPath: '/services/cybersecurity/security-operations-center-24x7',
    title: '24x7 SOC Managed Services Pakistan | SIEM Monitoring Security Operations Karachi',
    h1: 'Security Operations Center (SOC) – 24×7',
    icon: '👁️',
    keywords: '24x7 SOC managed services Pakistan, SIEM monitoring Karachi, security operations center Pakistan, threat detection EDR monitoring',
    heroSubtitle: 'Continuous 24/7 SIEM monitoring, threat detection, log analysis, EDR, and rapid incident triage by certified security analysts.',
    content: `Monitor, detect, and respond to cyber threats around the clock with our 24×7 Security Operations Center (SOC). Our security analysts provide continuous threat monitoring, log analysis, SIEM management, threat intelligence, endpoint detection and response (EDR), incident triage, and proactive threat hunting. By combining advanced security technologies with expert analysts, we help organizations minimize risk, reduce response times, and maintain uninterrupted business operations.`,
    features: [
      '24/7 Real-Time SIEM Log Collection & Analysis',
      'Endpoint Detection & Response (EDR) Agent Management',
      'Automated Cyber Threat Intelligence & Anomaly Detection',
      'Rapid Incident Triage & Immediate Escalation',
      'Monthly Threat & Vulnerability Reports'
    ],
    techStack: ['Wazuh SIEM', 'Elastic Security', 'Wazuh EDR', 'Snort / Suricata', 'TheHive / MISP']
  },
  {
    categorySlug: 'cybersecurity',
    categoryName: 'Enterprise Cybersecurity & Pentesting',
    slug: 'incident-response',
    urlPath: '/services/cybersecurity/incident-response',
    title: 'Cyber Incident Response Services Pakistan | Ransomware Recovery Karachi',
    h1: 'Incident Response & Digital Forensics',
    icon: '🚨',
    keywords: 'cyber incident response services Pakistan, ransomware recovery Karachi, digital forensics investigation, cyber breach containment',
    heroSubtitle: 'Rapidly contain cyber breaches, investigate ransomware attacks, eradicate threats, and restore business operations safely.',
    content: `Respond quickly and effectively to cybersecurity incidents with our Incident Response services. Our experts help organizations contain threats, investigate security breaches, eradicate malicious activity, recover critical systems, and restore business operations with minimal disruption. We conduct forensic investigations, root cause analysis, malware analysis, evidence preservation, and post-incident reporting while providing strategic recommendations to prevent future attacks.`,
    features: [
      'Emergency Cyber Breach Containment & Threat Isolation',
      'Digital Forensics & Root Cause Investigation',
      'Ransomware Eradication & System Recovery',
      'Malware Analysis & Evidence Preservation',
      'Post-Incident Security Hardening Report'
    ],
    techStack: ['Autopsy Digital Forensics', 'Volatity Memory Forensics', 'Wireshark', 'FTK Imager', 'YARA Rules']
  },

  // -------------------------------------------------------------
  // CATEGORY 4: AI & AUTOMATION (/services/ai-automation/...)
  // -------------------------------------------------------------
  {
    categorySlug: 'ai-automation',
    categoryName: 'AI Engineering & Automation',
    slug: 'ai-engineering-and-automation',
    urlPath: '/services/ai-automation/ai-engineering-and-automation',
    title: 'AI Engineering & Automation Services Pakistan | LLM & RAG Integration Karachi',
    h1: 'AI Engineering and Automation',
    icon: '🤖',
    keywords: 'AI engineering services Pakistan, LLM RAG integration Karachi, AI automation company Pakistan, machine learning developers Karachi',
    heroSubtitle: 'Generative AI, Large Language Models (LLMs), RAG over company data, autonomous AI agents, and intelligent process automation.',
    content: `Leverage the power of Artificial Intelligence to drive innovation, automation, and business growth. Our AI Engineering services help organizations design, develop, deploy, and secure AI-powered solutions tailored to their business objectives. We specialize in Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI agents, machine learning, intelligent automation, MLOps, and AI integration with enterprise systems. From concept to production, we build scalable, secure, and responsible AI solutions that deliver measurable business value.`,
    features: [
      'Generative AI & Enterprise LLM Integration (OpenAI, Claude, Llama 3)',
      'Retrieval-Augmented Generation (RAG) over Private Company PDFs & Databases',
      'Autonomous AI Agent Workflows & Intelligent Chatbots',
      'Machine Learning Model Training & MLOps Infrastructure',
      'Document Data Extraction & Automated Invoice Processing'
    ],
    techStack: ['OpenAI GPT-4o / Claude 3.5', 'Llama 3 / Ollama', 'LangChain / LlamaIndex', 'Pinecone / ChromaDB', 'Python & FastAPI', 'Node.js']
  }
];

// Helper functions for routes
function getAllCategories() {
  return servicesCategories;
}

function getServicesByCategory(catSlug) {
  if (!catSlug) return [];
  const cleanCat = catSlug.trim().toLowerCase();
  return detailedServices.filter(s => s.categorySlug === cleanCat);
}

function findDetailedService(catSlug, serviceSlug) {
  if (!serviceSlug) return null;
  const cleanService = decodeURIComponent(serviceSlug).trim().toLowerCase();
  const cleanCat = catSlug ? decodeURIComponent(catSlug).trim().toLowerCase() : null;

  // 1. Exact Category + Service Match
  if (cleanCat) {
    const foundExact = detailedServices.find(s => s.categorySlug === cleanCat && (s.slug === cleanService || s.slug.replace(/-/g, '') === cleanService.replace(/-/g, '')));
    if (foundExact) return foundExact;
  }

  // 2. Direct Service Slug Match across all categories
  const foundBySlug = detailedServices.find(s => s.slug === cleanService || s.slug.replace(/-/g, '') === cleanService.replace(/-/g, ''));
  if (foundBySlug) return foundBySlug;

  // 3. Match by original user request title or loose keywords
  for (const s of detailedServices) {
    const sTitle = s.h1.toLowerCase();
    if (sTitle.includes(cleanService) || cleanService.includes(s.slug)) {
      return s;
    }
  }

  return null;
}

module.exports = {
  servicesCategories,
  detailedServices,
  getAllCategories,
  getServicesByCategory,
  findDetailedService
};
