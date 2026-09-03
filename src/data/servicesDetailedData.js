const servicesCategories = [
  {
    id: 'development',
    name: 'Custom Software & Web Development',
    slug: 'development',
    icon: '💻',
    tagline: 'High-performing, responsive websites, custom ERPs, POS systems, and mobile applications.',
    description: 'From corporate website development in Karachi to enterprise ERP solutions across Pakistan and internationally, we build conversion-driven digital platforms.'
  },
  {
    id: 'cloud-devops',
    name: 'Cloud Engineering & DevOps',
    slug: 'cloud-devops',
    icon: '☁️',
    tagline: 'AWS, Azure, Google Cloud migration, MDM implementation, and cloud cost optimization.',
    description: 'Architecting secure, cost-optimized cloud infrastructure, automated CI/CD pipelines, and Mobile Device Management (MDM).'
  },
  {
    id: 'cybersecurity',
    name: 'Enterprise Cybersecurity & Pentesting',
    slug: 'cybersecurity',
    icon: '🛡️',
    tagline: 'Penetration testing, Active Directory audits, database hardening, and 24/7 SOC monitoring.',
    description: 'Fortifying digital assets with offensive pentesting, zero-trust architectures, incident response, and SOC monitoring.'
  },
  {
    id: 'ai-automation',
    name: 'AI Engineering & Automation',
    slug: 'ai-automation',
    icon: '🤖',
    tagline: 'Custom AI agents, LLM fine-tuning, RAG systems, and business process automation.',
    description: 'Transforming enterprise operations with generative AI, machine learning models, and automated business workflows.'
  }
];

const detailedServices = [
  // --- 1. DEVELOPMENT ---
  {
    categorySlug: 'development',
    serviceSlug: 'website-development',
    title: 'Website Development',
    seoTitle: 'Website Development Company in Karachi | Web Design Services Pakistan',
    targetKeywords: ['website development company in Karachi', 'web design services Pakistan', 'custom website developer Karachi', 'responsive web development company'],
    h1Heading: 'Leading Website Development Company in Karachi & Pakistan',
    heroSubtitle: 'At Uvosoft Tech, we build high-performing, visually stunning, and conversion-driven digital platforms.',
    pageContent: `At Uvosoft Tech, we believe your digital footprint is the face of your business. As a leading website development company in Karachi, we build high-performing, visually stunning, and conversion-driven digital platforms. Whether you are a growing startup in Shahrah-e-Faisal or an established enterprise in Pakistan, our custom web design and development services ensure your brand stands out. We don’t just write code; we engineer responsive, lightning-fast websites optimized for local and international audiences. From corporate portfolios to high-end digital platforms, we use the latest technology stacks (React, Next.js, Node.js, and modern CSS) to deliver seamless user experiences.`,
    features: [
      'Custom Responsive Web Architecture',
      'Local & Global Search Engine Optimization (SEO)',
      'Speed-Optimized & Mobile-First UX/UI',
      'CMS Integration & Headless Architecture',
      'Enterprise Security & SSL Certification'
    ],
    techBadges: ['React', 'Next.js', 'Node.js', 'HTML5/CSS3', 'Tailwind', 'WordPress']
  },
  {
    categorySlug: 'development',
    serviceSlug: 'web-application-development',
    title: 'Web Application Development',
    seoTitle: 'Web Application Development Karachi | Custom Web App Developers Pakistan',
    targetKeywords: ['web application development Karachi', 'custom web app developers Pakistan', 'SaaS application development company', 'enterprise web portals Karachi'],
    h1Heading: 'Custom Web Application Development in Karachi & Beyond',
    heroSubtitle: 'Scaling modern enterprises with tailor-made SaaS portals, CRM/HRM systems, and secure web applications.',
    pageContent: `Off-the-shelf software rarely fits complex business logic. Uvosoft Tech specializes in custom web application development in Karachi, helping businesses streamline operations with tailored web portals, SaaS platforms, and enterprise management tools. Our expert web app developers in Pakistan build scalable, cloud-native applications designed to handle high concurrency, complex data structures, and multi-user workflows. Whether you need an internal portal, CRM, HRM, or custom SaaS platform, we build robust backend architectures backed by clean APIs and intuitive front-end interfaces.`,
    features: [
      'Custom SaaS & Multi-Tenant Architecture',
      'Enterprise CRM & HRM Systems',
      'RESTful & GraphQL API Integration',
      'Scalable PostgreSQL & Cloud Storage Backend',
      'Role-Based Access Control (RBAC) Security'
    ],
    techBadges: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Prisma', 'Docker']
  },
  {
    categorySlug: 'development',
    serviceSlug: 'ERP-Development',
    title: 'ERP Development (Odoo & Microsoft Dynamics 365)',
    seoTitle: 'ERP Development Company in Karachi | Odoo ERP & Dynamics 365 Pakistan',
    targetKeywords: ['ERP development company in Karachi', 'Odoo ERP implementation Pakistan', 'Microsoft Dynamics 365 Karachi', 'custom ERP software developers'],
    h1Heading: 'Enterprise ERP Development Company in Karachi',
    heroSubtitle: 'Unify finance, HR, inventory, and supply chain into one intelligent dashboard.',
    pageContent: `Managing disparate business operations degrades productivity. Uvosoft Tech is a premier ERP development company in Karachi, delivering custom ERP software implementations, Odoo customization, and Microsoft Dynamics 365 integrations across Pakistan. We help manufacturing units, distributors, and service providers automate financial accounting, HR payroll, warehouse management, and customer relations. Our custom ERP solutions give decision-makers real-time visibility into business operations, reducing operational costs and accelerating growth.`,
    features: [
      'Odoo ERP Module Development & Customization',
      'Microsoft Dynamics 365 Implementation',
      'Automated Financial & Accounting Integration',
      'Inventory, Supply Chain & Warehouse Sync',
      'Multi-Currency & Regional Tax Compliance'
    ],
    techBadges: ['Odoo', 'Python', 'MS Dynamics 365', 'PostgreSQL', 'Power BI']
  },
  {
    categorySlug: 'development',
    serviceSlug: 'restaurant-management-pos-systems',
    title: 'Restaurant Management & POS Systems',
    seoTitle: 'Restaurant POS Software Karachi | Restaurant Management System Pakistan',
    targetKeywords: ['restaurant POS software Karachi', 'restaurant management system Pakistan', 'cloud POS for restaurants Karachi', 'food court POS software'],
    h1Heading: 'Cloud Restaurant POS & Management Systems in Karachi',
    heroSubtitle: 'Streamline table orders, kitchen display systems (KDS), inventory, and online delivery integrations.',
    pageContent: `Run your restaurant operations smoothly with Uvosoft Tech’s point of sale (POS) and management systems in Karachi. Designed for cafes, fine dining establishments, fast-food chains, and dark kitchens across Pakistan, our software integrates table reservation, order management, kitchen display screens (KDS), and inventory tracking into one interface. Track raw ingredient consumption, automate recipe costing, and accept local and international payment methods effortless.`,
    features: [
      'Fast Touchscreen POS Billing',
      'Kitchen Display System (KDS) Integration',
      'Real-Time Recipe & Ingredient Inventory Tracking',
      'Online Delivery & Multi-Branch Management',
      'Customer Loyalty & Discount Engine'
    ],
    techBadges: ['Node.js', 'React POS', 'SQLite/Postgres', 'Thermal Printer API', 'WebSockets']
  },
  {
    categorySlug: 'development',
    serviceSlug: 'school-management-fee-status-system',
    title: 'School Management & Fee Status System',
    seoTitle: 'School Management System Software Pakistan | Campus Management Karachi',
    targetKeywords: ['school management system software Pakistan', 'campus management system Karachi', 'school fee status system', 'student portal software Pakistan'],
    h1Heading: 'Smart School Management & Fee Status Systems in Pakistan',
    heroSubtitle: 'Automating student admissions, fee voucher generation, attendance tracking, and parent portals.',
    pageContent: `Empower educational institutions with Uvosoft Tech’s campus management software in Karachi. Our school management system automates student enrollment, fee structure configurations, automated fee voucher printing, attendance tracking, and report card generation. Parents receive instant fee status alerts and online payment options, while administrators gain complete visibility into revenue collection and academic metrics.`,
    features: [
      'Automated Student Admissions & Roll Numbers',
      'Fee Voucher Generation & Online Payment Sync',
      'Parent & Student Mobile-Friendly Portals',
      'Biometric & RFID Attendance Integration',
      'Exam Management & Automated Grade Sheets'
    ],
    techBadges: ['PHP/Laravel', 'Node.js', 'React', 'MySQL/Postgres', 'SMS API']
  },
  {
    categorySlug: 'development',
    serviceSlug: 'health-management-system',
    title: 'Health Management System (Hospital & Clinic Software)',
    seoTitle: 'Hospital Management System Software Pakistan | Healthcare Software Karachi',
    targetKeywords: ['hospital management system software Pakistan', 'clinic management software Karachi', 'healthcare software developers', 'patient portal electronic health records'],
    h1Heading: 'Comprehensive Health & Hospital Management Systems in Karachi',
    heroSubtitle: 'Digitizing patient records, OPD/IPD billing, pharmacy inventory, and lab diagnostic reports.',
    pageContent: `Modern healthcare requires seamless, secure digital records. Uvosoft Tech develops HIPAA-compliant healthcare software and hospital management systems in Karachi. From small clinics to multi-specialty medical centers across Pakistan, our platform streamlines Electronic Health Records (EHR), OPD consultation scheduling, IPD bed management, pharmacy inventory, and diagnostic lab reporting.`,
    features: [
      'Electronic Health Records (EHR) & Prescriptions',
      'OPD/IPD Patient Registration & Bed Allocation',
      'Pharmacy Inventory & Expiry Date Alerts',
      'Diagnostic Lab Test Report Generation',
      'Medical Billing & Insurance Claim Sync'
    ],
    techBadges: ['Node.js', 'React', 'PostgreSQL', 'HL7/FHIR Standard', 'Docker']
  },
  {
    categorySlug: 'development',
    serviceSlug: 'ecommerce-sites-and-stores',
    title: 'Ecommerce Sites & Online Stores',
    seoTitle: 'Ecommerce Development Company Karachi | Shopify & Custom Online Store Pakistan',
    targetKeywords: ['ecommerce development company Karachi', 'custom ecommerce developers Pakistan', 'Shopify online store development', 'WooCommerce development Karachi'],
    h1Heading: 'High-Converting Ecommerce Store Development in Karachi',
    heroSubtitle: 'Turn visitors into loyal customers with fast, mobile-optimized custom & Shopify online stores.',
    pageContent: `Dominate online retail with Uvosoft Tech’s ecommerce web development services in Karachi. We build fast, high-converting online stores tailored to the Pakistani e-commerce landscape and international export markets. Whether you prefer custom Next.js storefronts, WooCommerce, or Shopify setup, we integrate local payment gateways (PayFast, JazzCash, EasyPaisa, Stripe), courier API shipping calculators, and inventory automation.`,
    features: [
      'Custom & Shopify/WooCommerce Store Setup',
      'Local Payment Gateway Integration (JazzCash, EasyPaisa, Stripe)',
      'Courier API Integration (TCS, Leopards, Trax)',
      'Mobile-Optimized Checkout & Cart Recovery',
      'Inventory & Order Tracking Dashboard'
    ],
    techBadges: ['Shopify', 'Next.js Commerce', 'Node.js', 'WooCommerce', 'Stripe API']
  },
  {
    categorySlug: 'development',
    serviceSlug: 'mobile-app-development',
    title: 'Mobile App Development (Android & iOS)',
    seoTitle: 'Mobile App Development Company Karachi | Android & iOS Developers Pakistan',
    targetKeywords: ['mobile app development company Karachi', 'Android iOS developers Pakistan', 'Flutter app development company', 'React Native mobile app Karachi'],
    h1Heading: 'Custom Mobile App Development Company in Karachi',
    heroSubtitle: 'Building intuitive, high-performance cross-platform apps for iOS and Android devices.',
    pageContent: `Engage your mobile audience with custom iOS and Android applications engineered by Uvosoft Tech in Karachi. As a leading mobile app development company in Pakistan, we utilize Flutter and React Native to build cross-platform mobile apps with native speed, smooth UI animations, and secure cloud API connectivity. From fintech and logistics apps to e-learning and social platforms, we deliver store-ready mobile products.`,
    features: [
      'Cross-Platform Flutter & React Native Apps',
      'Native iOS (Swift) & Android (Kotlin) Architecture',
      'Real-Time Push Notifications & In-App Chat',
      'Secure Biometric Authentication (Fingerprint/FaceID)',
      'App Store & Google Play Publishing Support'
    ],
    techBadges: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'REST API']
  },

  // --- 2. CLOUD & DEVOPS ---
  {
    categorySlug: 'cloud-devops',
    serviceSlug: 'cloud-data-migration',
    title: 'Cloud Data Migration',
    seoTitle: 'Cloud Data Migration Services Karachi | AWS Azure Migration Pakistan',
    targetKeywords: ['cloud data migration services Karachi', 'AWS migration company Pakistan', 'Azure data migration Karachi', 'on-premise to cloud migration'],
    h1Heading: 'Seamless Enterprise Cloud Data Migration Services',
    heroSubtitle: 'Zero-downtime database and server migration to AWS, Microsoft Azure, and Google Cloud.',
    pageContent: `Migrate your legacy servers and databases to the cloud with zero downtime. Uvosoft Tech provides end-to-end cloud data migration services in Karachi for businesses transitioning from local servers to AWS, Microsoft Azure, or GCP. We handle database schema conversion, data synchronization, security policy replication, and post-migration validation to ensure performance gains and operational continuity.`,
    features: [
      'Legacy Database to AWS/Azure Migration',
      'Zero-Downtime Live Data Replication',
      'Database Schema Optimization & Cleanup',
      'Cloud Backup & Disaster Recovery Architecture',
      'Post-Migration Verification & Load Testing'
    ],
    techBadges: ['AWS DMS', 'Azure Data Factory', 'PostgreSQL', 'MySQL', 'Docker']
  },
  {
    categorySlug: 'cloud-devops',
    serviceSlug: 'cloud-suite-setup',
    title: 'Cloud Suite Setup (Google Workspace & Microsoft 365)',
    seoTitle: 'Google Workspace Setup Karachi | Microsoft 365 Deployment Pakistan',
    targetKeywords: ['Google Workspace setup Karachi', 'Microsoft 365 deployment Pakistan', 'corporate email setup Karachi', 'cloud office suite migration'],
    h1Heading: 'Corporate Cloud Suite Setup (Google Workspace & MS 365)',
    heroSubtitle: 'Professional domain emails, cloud storage, security policies, and team collaboration setup.',
    pageContent: `Upgrade your business communication with official Google Workspace or Microsoft 365 deployment by Uvosoft Tech. We configure corporate domain email routing, DKIM/SPF/DMARC anti-spam security, cloud drive sharing permissions, and multi-factor authentication for companies in Karachi and across Pakistan.`,
    features: [
      'Corporate Domain Email Configuration',
      'SPF, DKIM, DMARC Anti-Phishing Setup',
      'Google Drive / OneDrive Organization Policies',
      'Legacy PST Email to Cloud Migration',
      '24/7 Managed IT Admin Support'
    ],
    techBadges: ['Google Workspace', 'Microsoft 365', 'DNS', 'DMARC', 'PowerShell']
  },
  {
    categorySlug: 'cloud-devops',
    serviceSlug: 'cloud-infrastructure-setup',
    title: 'Cloud Infrastructure Setup & DevOps Pipelines',
    seoTitle: 'Cloud Infrastructure Setup Karachi | DevOps CI/CD Automation Pakistan',
    targetKeywords: ['cloud infrastructure setup Karachi', 'DevOps automation company Pakistan', 'Kubernetes Docker setup Karachi', 'Terraform cloud engineering'],
    h1Heading: 'Cloud Infrastructure Setup & CI/CD DevOps Pipelines',
    heroSubtitle: 'Automated infrastructure provision, Docker containerization, and auto-scaling setups.',
    pageContent: `Build resilient, auto-scaling cloud environments with Uvosoft Tech’s DevOps and infrastructure engineering in Karachi. We design Infrastructure-as-Code (IaC) using Terraform, containerize applications with Docker & Kubernetes, and automate deployment workflows using GitHub Actions and GitLab CI/CD.`,
    features: [
      'Infrastructure as Code (Terraform / CloudFormation)',
      'Docker Containerization & Kubernetes Orchestration',
      'Automated CI/CD Deployment Pipelines',
      'Load Balancer & Auto-Scaling Group Configuration',
      '24/7 Cloud Monitoring & Log Aggregation'
    ],
    techBadges: ['Terraform', 'Kubernetes', 'Docker', 'AWS', 'GitHub Actions', 'Prometheus']
  },
  {
    categorySlug: 'cloud-devops',
    serviceSlug: 'mobile-device-management-mdm',
    title: 'Mobile Device Management (MDM / MAM)',
    seoTitle: 'Mobile Device Management MDM Karachi | Corporate Device Security Pakistan',
    targetKeywords: ['Mobile Device Management MDM Karachi', 'corporate device security Pakistan', 'Microsoft Intune setup Karachi', 'BYOD enterprise security'],
    h1Heading: 'Enterprise Mobile Device Management (MDM) Solutions',
    heroSubtitle: 'Secure company smartphones, laptops, and tablets with central wipe, encryption, and app policies.',
    pageContent: `Protect sensitive corporate data on mobile devices with Uvosoft Tech’s MDM solutions in Karachi. We configure Microsoft Intune, VMware Workspace ONE, and Apple Business Manager to enforce device encryption, remote wipe capabilities, network access control, and corporate app distribution across iOS, Android, Windows, and macOS devices.`,
    features: [
      'Remote Device Enrollment & Profiling',
      'Enforced Storage Encryption & Screen Locks',
      'Remote Wipe for Lost or Stolen Devices',
      'Corporate App Store & Kiosk Mode Enforcement',
      'BYOD Secure Workspace Isolation'
    ],
    techBadges: ['Microsoft Intune', 'Apple Business Manager', 'Android Enterprise', 'macOS MDM']
  },
  {
    categorySlug: 'cloud-devops',
    serviceSlug: 'cloud-cost-optimization',
    title: 'Cloud Cost Optimization',
    seoTitle: 'Cloud Cost Optimization Services Karachi | AWS Azure Bill Reduction Pakistan',
    targetKeywords: ['cloud cost optimization services Karachi', 'reduce AWS bill Pakistan', 'Azure cost management Karachi', 'cloud infrastructure auditing'],
    h1Heading: 'Cloud Cost Optimization & AWS/Azure Bill Reduction',
    heroSubtitle: 'Slash monthly cloud expenditure by 30% to 50% without sacrificing speed or availability.',
    pageContent: `Stop overpaying for cloud resources. Uvosoft Tech conducts comprehensive cloud audit and cost optimization in Karachi. We analyze your AWS, Azure, or GCP infrastructure to identify idle resources, right-size instance types, implement reserved instances, and configure auto-shutdown schedules to dramatically lower your cloud billing.`,
    features: [
      'Idle & Unattached Resource Auditing',
      'EC2/VM Instance Right-Sizing',
      'Reserved Instances & Savings Plans Analysis',
      'Automated Non-Production Shutdown Schedules',
      'Monthly Cloud Spend Monitoring Reports'
    ],
    techBadges: ['AWS Cost Explorer', 'Azure Cost Analytics', 'Terraform', 'CloudWatch']
  },

  // --- 3. CYBERSECURITY ---
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'application-security',
    title: 'Application Security (AppSec)',
    seoTitle: 'Application Security Services Karachi | Secure Code Review Pakistan',
    targetKeywords: ['application security services Karachi', 'secure code review Pakistan', 'OWASP Top 10 mitigation Karachi', 'AppSec testing company'],
    h1Heading: 'Enterprise Application Security (AppSec) & Secure Coding',
    heroSubtitle: 'Protect your web applications and APIs from OWASP Top 10 vulnerabilities before deployment.',
    pageContent: `Incorporate security into your software development lifecycle with Uvosoft Tech’s AppSec services in Karachi. We perform Static (SAST) and Dynamic (DAST) Application Security Testing, secure code reviews, and dependency vulnerability scanning to ensure your apps resist SQL injection, XSS, and authentication bypass attacks.`,
    features: [
      'OWASP Top 10 Vulnerability Remediation',
      'Static & Dynamic Code Analysis (SAST/DAST)',
      'Third-Party Dependency Vulnerability Audits',
      'DevSecOps CI/CD Pipeline Integration',
      'Security Compliance Certification Assistance'
    ],
    techBadges: ['SonarQube', 'OWASP ZAP', 'Burp Suite', 'Snyk', 'Node.js Security']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'penetration-testing',
    title: 'Penetration Testing (Vulnerability Assessment)',
    seoTitle: 'Penetration Testing Company Karachi | VAPT Services Pakistan',
    targetKeywords: ['penetration testing company Karachi', 'VAPT services Pakistan', 'cyber security audit Karachi', 'ethical hacking services Pakistan'],
    h1Heading: 'Comprehensive Penetration Testing & VAPT Services in Karachi',
    heroSubtitle: 'Simulating real-world cyber attacks to uncover and patch security weaknesses before hackers exploit them.',
    pageContent: `Test your defenses against real-world cyber threats with Uvosoft Tech’s Penetration Testing (VAPT) services in Karachi. Our certified ethical hackers simulate sophisticated cyber attacks against your servers, networks, and web applications, delivering detailed vulnerability reports with actionable step-by-step remediation guidance.`,
    features: [
      'Black-Box, Grey-Box & White-Box Pentesting',
      'Comprehensive Vulnerability Assessment Reports',
      'Exploit Proof-of-Concept (PoC) Demonstrations',
      'Executive Summary & Technical Remediation Steps',
      'Free Re-Testing After Vulnerability Patching'
    ],
    techBadges: ['Kali Linux', 'Metasploit', 'Nmap', 'Burp Suite Pro', 'Wireshark']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'web-application-penetration-testing',
    title: 'Web Application Penetration Testing',
    seoTitle: 'Web Application Pentesting Karachi | Web Security Audit Pakistan',
    targetKeywords: ['web application pentesting Karachi', 'web security audit Pakistan', 'OWASP pentest Karachi', 'ecommerce website security audit'],
    h1Heading: 'Deep Web Application Penetration Testing in Pakistan',
    heroSubtitle: 'Uncovering complex logic flaws, authentication bypasses, and data leak risks in custom web apps.',
    pageContent: `Protect customer data and payment processing systems with specialized web application penetration testing by Uvosoft Tech. We test custom web applications, e-commerce storefronts, and SaaS portals against business logic vulnerabilities, authorization bypasses, CSRF, and SQL injections.`,
    features: [
      'Business Logic Vulnerability Assessment',
      'Authentication & Session Hijacking Tests',
      'Payment Gateway & Checkout Security Verification',
      'Cross-Site Scripting (XSS) & Injection Audits',
      'Developer Remediation Walkthroughs'
    ],
    techBadges: ['Burp Suite', 'OWASP ZAP', 'SQLMap', 'Acunetix', 'Python Security']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'mobile-application-penetration-testing',
    title: 'Mobile Application Penetration Testing',
    seoTitle: 'Mobile App Pentesting Karachi | iOS Android Security Audit Pakistan',
    targetKeywords: ['mobile app pentesting Karachi', 'iOS Android security audit Pakistan', 'Flutter app pentest Karachi', 'mobile API security audit'],
    h1Heading: 'Mobile Application Penetration Testing (iOS & Android)',
    heroSubtitle: 'Auditing mobile app binaries, local encrypted storage, and API communications.',
    pageContent: `Ensure your mobile applications cannot be reverse-engineered or exploited. Uvosoft Tech provides mobile app penetration testing in Karachi for iOS and Android platforms. We analyze APK/IPA binaries, test local data storage encryption, inspect SSL pinning, and verify API authentication.`,
    features: [
      'Static & Dynamic Binary Reverse-Engineering',
      'SSL Pinning & Traffic Interception Analysis',
      'Local Storage & Keychain/Keystore Audits',
      'Hardcoded API Key & Secret Extraction Tests',
      'OWASP Mobile Top 10 Compliance Verification'
    ],
    techBadges: ['Frida', 'Objection', 'MobSF', 'Burp Suite', 'APKTool']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'api-penetration-testing',
    title: 'API Penetration Testing',
    seoTitle: 'API Penetration Testing Karachi | REST GraphQL Security Audit Pakistan',
    targetKeywords: ['API penetration testing Karachi', 'REST GraphQL security audit Pakistan', 'API security testing company', 'microservices pentest Karachi'],
    h1Heading: 'API Penetration Testing & Microservices Security',
    heroSubtitle: 'Auditing RESTful, GraphQL, and SOAP API endpoints for broken object-level authorization (BOLA).',
    pageContent: `APIs are the primary target for modern data breaches. Uvosoft Tech performs rigorous API penetration testing in Karachi, evaluating REST, GraphQL, and microservices endpoints against Broken Object Level Authorization (BOLA), rate-limiting bypasses, and data exposure flaws.`,
    features: [
      'OWASP API Security Top 10 Vulnerability Testing',
      'BOLA / BFLA Authorization Bypass Inspections',
      'Rate-Limiting & Denial of Service Vulnerability Tests',
      'JWT Token & OAuth 2.0 Security Audits',
      'Postman & OpenAPI Security Test Suites'
    ],
    techBadges: ['Postman', 'Burp Suite API', 'KiteRunner', 'GraphQL Security', 'Python']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'cloud-penetration-testing',
    title: 'Cloud Penetration Testing',
    seoTitle: 'Cloud Penetration Testing Karachi | AWS Azure Security Audit Pakistan',
    targetKeywords: ['cloud penetration testing Karachi', 'AWS Azure security audit Pakistan', 'S3 bucket security audit Karachi', 'IAM permission pentest'],
    h1Heading: 'Cloud Infrastructure & IAM Penetration Testing',
    heroSubtitle: 'Testing cloud configurations, IAM role escalation, S3 bucket permissions, and security groups.',
    pageContent: `Misconfigured cloud resources account for over 80% of enterprise security breaches. Uvosoft Tech delivers cloud penetration testing in Karachi for AWS, Azure, and GCP environments. We audit IAM policies, evaluate bucket permissions, and test container security.`,
    features: [
      'AWS / Azure IAM Privilege Escalation Tests',
      'S3 Bucket & Blob Storage Security Audits',
      'Security Group & VPC Peering Verification',
      'Kubernetes Cluster & Docker Security Scans',
      'CIS Benchmark Compliance Reporting'
    ],
    techBadges: ['ScoutSuite', 'Prowler', 'Pacu', 'AWS Security', 'Azure Sentinel']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'active-directory-penetration-testing',
    title: 'Active Directory Penetration Testing',
    seoTitle: 'Active Directory Pentesting Karachi | Internal Network Audit Pakistan',
    targetKeywords: ['Active Directory pentesting Karachi', 'internal network audit Pakistan', 'Kerberoasting attack simulation', 'Domain Admin privilege escalation'],
    h1Heading: 'Active Directory & Internal Network Penetration Testing',
    heroSubtitle: 'Simulating lateral movement, Kerberoasting, and Domain Admin takeover in enterprise networks.',
    pageContent: `Active Directory is the crown jewel of corporate IT. Uvosoft Tech conducts Active Directory penetration testing in Karachi to evaluate internal network defenses. We test for weak domain password policies, Kerberoasting, BloodHound attack paths, and privilege escalation vulnerabilities.`,
    features: [
      'Domain Admin Privilege Escalation Path Audits',
      'Kerberoasting & AS-REP Roasting Attack Simulations',
      'BloodHound Graph Attack Path Analysis',
      'LLMNR / NBT-NS Poisoning & Hash Cracking Tests',
      'Group Policy (GPO) Security Hardening Advice'
    ],
    techBadges: ['BloodHound', 'Mimikatz', 'Impacket', 'PowerView', 'Active Directory']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'database-hardening-and-security',
    title: 'Database Hardening & Security',
    seoTitle: 'Database Hardening Services Karachi | SQL Security Audit Pakistan',
    targetKeywords: ['database hardening services Karachi', 'SQL security audit Pakistan', 'PostgreSQL MySQL security setup', 'database encryption compliance'],
    h1Heading: 'Database Hardening & Encryption Security Services',
    heroSubtitle: 'Securing PostgreSQL, MySQL, MS SQL, and MongoDB against unauthorized access and data leaks.',
    pageContent: `Protect mission-critical data with database hardening services from Uvosoft Tech in Karachi. We enforce data-at-rest encryption, restrict network listening interfaces, configure row-level security, and audit database user privileges across PostgreSQL, MySQL, and SQL Server databases.`,
    features: [
      'Database Privilege & Role Access Minimization',
      'Data-at-Rest & Data-in-Transit (TLS) Encryption',
      'SQL Injection Vulnerability Defense Setup',
      'Automated Database Audit Logging & Alerts',
      'CIS Benchmark Database Configuration Audits'
    ],
    techBadges: ['PostgreSQL', 'MySQL', 'MS SQL Server', 'MongoDB', 'TLS/SSL']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'security-operations-center-24x7',
    title: 'Security Operations Center (SOC 24/7)',
    seoTitle: 'SOC 24x7 Monitoring Services Karachi | Managed SIEM Security Pakistan',
    targetKeywords: ['SOC 24x7 monitoring services Karachi', 'managed SIEM security Pakistan', 'cyber threat monitoring Karachi', 'Wazuh Elastic SOC setup'],
    h1Heading: '24/7 Managed Security Operations Center (SOC)',
    heroSubtitle: 'Continuous 24/7 threat detection, SIEM log analysis, and automated threat response.',
    pageContent: `Gain round-the-clock protection with Uvosoft Tech’s 24/7 Managed SOC services in Karachi. Our security analysts monitor event logs from your firewalls, servers, endpoints, and cloud workloads using advanced SIEM platforms to detect and neutralize threats in real time.`,
    features: [
      'Real-Time 24/7 SIEM Log Aggregation & Analysis',
      'Automated Threat Detection & Anomaly Alerts',
      'Endpoint Detection & Response (EDR) Integration',
      'Threat Intelligence Feed Sync',
      'Monthly Security Incident & Compliance Summaries'
    ],
    techBadges: ['Wazuh SIEM', 'Elastic SOC', 'Splunk', 'Suricata', 'Sysmon']
  },
  {
    categorySlug: 'cybersecurity',
    serviceSlug: 'incident-response',
    title: 'Incident Response & Malware Forensics',
    seoTitle: 'Incident Response Services Karachi | Ransomware Forensics Pakistan',
    targetKeywords: ['incident response services Karachi', 'ransomware forensics Pakistan', 'cyber attack recovery Karachi', 'digital forensics company Pakistan'],
    h1Heading: 'Emergency Incident Response & Digital Forensics',
    heroSubtitle: 'Rapid containment, malware analysis, and system recovery during active cyber incidents.',
    pageContent: `In the event of a breach, speed is everything. Uvosoft Tech provides 24/7 emergency incident response and digital forensics in Karachi. Our incident response team isolates compromised hosts, analyzes malware payloads, eradicates attacker persistence, and safely restores normal business operations.`,
    features: [
      'Emergency Containment & Attacker Eradication',
      'Digital Memory & Disk Forensics Analysis',
      'Ransomware Payload Reverse Engineering',
      'Root Cause Analysis (RCA) & Breach Reporting',
      'Post-Incident Security Architecture Reinforcement'
    ],
    techBadges: ['FTK Imager', 'Autopsy', 'Volatilty', 'YARA', 'Wireshark']
  },

  // --- 4. AI AUTOMATION ---
  {
    categorySlug: 'ai-automation',
    serviceSlug: 'ai-engineering-and-automation',
    title: 'AI Engineering & Automation',
    seoTitle: 'AI Engineering Company Karachi | Custom AI Agents & Automation Pakistan',
    targetKeywords: ['AI engineering company Karachi', 'custom AI agents Pakistan', 'LLM fine-tuning company Karachi', 'RAG AI automation developers'],
    h1Heading: 'AI Engineering, Custom LLMs & Business Process Automation',
    heroSubtitle: 'Transforming enterprise data into intelligent automated workflows, AI chatbots, and predictive models.',
    pageContent: `Unlock competitive advantages with custom AI solutions built by Uvosoft Tech in Karachi. We specialize in AI engineering, Retrieval-Augmented Generation (RAG) over corporate documents, fine-tuning Large Language Models (LLMs), and deploying autonomous AI agents that automate customer service, document parsing, and operational analytics.`,
    features: [
      'Custom RAG Systems over Enterprise Knowledge Bases',
      'OpenAI, Claude & Llama 3 LLM Fine-Tuning',
      'Autonomous Business Process AI Agents',
      'Automated Document OCR & Data Extraction',
      'Predictive Analytics & Machine Learning Pipelines'
    ],
    techBadges: ['Python', 'LangChain', 'LlamaIndex', 'OpenAI API', 'PyTorch', 'Vector DB']
  }
];

function getAllCategories() {
  return servicesCategories;
}

function getServicesByCategory(categorySlug) {
  return detailedServices.filter(s => s.categorySlug === categorySlug);
}

function findDetailedService(categorySlug, serviceSlug) {
  const normCat = categorySlug ? categorySlug.toLowerCase().replace(/[^a-z0-9]/g, '') : null;
  const normServ = serviceSlug ? serviceSlug.toLowerCase().replace(/[^a-z0-9]/g, '') : null;

  return detailedServices.find(s => {
    const sCatNorm = s.categorySlug.toLowerCase().replace(/[^a-z0-9]/g, '');
    const sServNorm = s.serviceSlug.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (normCat) {
      return sCatNorm === normCat && sServNorm === normServ;
    }
    return sServNorm === normServ;
  });
}

module.exports = {
  servicesCategories,
  detailedServices,
  getAllCategories,
  getServicesByCategory,
  findDetailedService
};
