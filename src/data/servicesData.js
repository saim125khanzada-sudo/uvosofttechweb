// Centralized Service Database for UVO SoftTech
const servicesData = [
  {
    id: 'it-backoffice-support',
    slug: 'it-backoffice-support',
    aliases: ['it backoffice support', 'it-support', 'it backoffice', 'it-backoffice'],
    title: 'IT Backoffice Support & Managed Infrastructure',
    categoryName: 'IT Backoffice Support',
    subtitle: 'Reliable 24/7 remote and on-site IT helpdesk, server administration, network engineering, and cybersecurity posture management for corporate teams.',
    icon: '🛠️',
    heroBadge: '24/7 Managed IT Operations',
    overview: 'UVO SoftTech provides end-to-end IT Backoffice Support designed to keep your business running smoothly without technical hiccups. From daily user helpdesk support and active directory management to complex multi-site networking and firewall deployment, our certified engineers handle your entire IT ecosystem.',
    benefits: [
      { title: 'Zero Downtime Guarantee', desc: 'Proactive monitoring and rapid incident resolution keep your servers, workstations, and network active 24/7/365.' },
      { title: 'Cost Savings up to 60%', desc: 'Eliminate the overhead of hiring an entire in-house IT department by outsourcing to our team of enterprise engineers.' },
      { title: 'Enterprise Security Compliance', desc: 'Standardized security configurations, automated backups, and strict access controls protect sensitive company data.' },
      { title: 'Scalable On-Demand Support', desc: 'Easily add remote support seats or on-site engineer visits as your team expands across cities or countries.' }
    ],
    subServices: [
      {
        slug: 'local-remote-helpdesk',
        title: 'Local & Remote IT Backoffice Support',
        desc: 'Dedicated helpdesk engineers offering Tier 1-3 troubleshooting, software installation, hardware diagnostics, user onboarding, and remote assistance.',
        features: ['24/7 Remote Desk Assistance', 'Hardware Diagnostics & Repair', 'Workstation Provisioning & Imaging', 'Email & Office 365 Account Management']
      },
      {
        slug: 'server-management',
        title: 'Windows & Linux Server Management',
        desc: 'Complete server setup, Active Directory domain controller management, Hyper-V/Proxmox virtualization, automated cloud backups, and file server permissions.',
        features: ['Active Directory & Group Policy (GPO)', 'Hyper-V & VMware Virtualization', 'Automated Daily Offsite Backups', 'DNS, DHCP, & Print Server Configuration']
      },
      {
        slug: 'network-support',
        title: 'Enterprise Network Support (LAN, WAN, VLANs)',
        desc: 'Structured network design, Cisco/MikroTik router configuration, switch management, guest Wi-Fi access control, and dedicated VPN tunnels between branch offices.',
        features: ['Multi-Branch Site-to-Site VPNs', 'VLAN Segmentation & QoS Bandwidth Tuning', 'Managed Wi-Fi Access Points', 'Network Topology Audit & Optimization']
      },
      {
        slug: 'firewall-configuration',
        title: 'Firewall Installation & Cyber Hardening',
        desc: 'Implementation and maintenance of enterprise firewalls (pfSense, Fortinet, Sophos) to shield your network from intruder scans, ransomware, and unauthorized entry.',
        features: ['Intrusion Prevention Systems (IPS)', 'Deep Packet Inspection & Web Filtering', 'Real-time Cyber Attack Blocking', 'Secure Remote Access Gateway']
      }
    ],
    techStack: ['Microsoft Active Directory', 'pfSense / Fortinet', 'Windows Server 2022', 'Ubuntu / RHEL Linux', 'Cisco / MikroTik', 'Veeam Backup'],
    faqs: [
      { q: 'How quickly does UVO SoftTech respond to IT support tickets?', a: 'Our SLA guarantees response times within 15 minutes for critical server or network outages, and under 1 hour for routine workstation support requests.' },
      { q: 'Can you support teams across multiple branch locations in Pakistan and internationally?', a: 'Yes! We manage IT infrastructure for enterprise clients in Karachi, Lahore, Islamabad, and international locations with seamless remote monitoring and local field support.' },
      { q: 'What is included in the monthly IT Backoffice Support package?', a: 'Every package includes helpdesk ticketing, server patch management, network firewall monitoring, automated backup verification, and dedicated account manager support.' }
    ]
  },
  {
    id: 'software-mobile-dev',
    slug: 'software-mobile-dev',
    aliases: ['software and mobile dev', 'software-dev', 'mobile-dev', 'custom-software'],
    title: 'Custom Software & Mobile App Development',
    categoryName: 'Software & Mobile Dev',
    subtitle: 'Tailored enterprise software, custom HRM/CRM portals, high-performance mobile applications (iOS/Android), and secure cloud APIs.',
    icon: '💻',
    heroBadge: 'Custom Software Engineering',
    overview: 'We build custom software products designed around your exact operational workflows. Whether you need a corporate HRM & Payroll portal, an inventory asset management system, or a consumer-facing mobile app, UVO SoftTech engineers write clean, secure, and scalable code built for long-term growth.',
    benefits: [
      { title: '100% Tailored Workflows', desc: 'No rigid off-the-shelf limitations. Every feature, dashboard, and report is built specifically for your business processes.' },
      { title: 'High Performance & Security', desc: 'Built using modern frameworks with end-to-end encryption, role-based access control, and protection against OWASP top 10 vulnerabilities.' },
      { title: 'Seamless Third-Party APIs', desc: 'Easily connect your web and mobile applications with payment gateways, ERP systems, WhatsApp API, and legacy databases.' },
      { title: 'Cross-Platform Mobile Apps', desc: 'Deliver fluid user experiences on both iPhone (iOS) and Android devices with a single codebase.' }
    ],
    subServices: [
      {
        slug: 'hrm-crm-erp-apps',
        title: 'Custom Business Applications (HRM, HCM, CRM)',
        desc: 'Custom web portals for Human Resource Management (HRM), employee attendance tracking, automated payroll calculation, CRM sales pipelines, and asset management.',
        features: ['Biometric & Attendance API Integration', 'Automated Tax & Payroll Computation', 'Role-Based Executive Dashboards', 'Gatekeeper & Asset Tracking Systems']
      },
      {
        slug: 'mobile-app-development',
        title: 'Native & Cross-Platform Mobile Applications',
        desc: 'Native iOS/Android and Flutter mobile app development with real-time push notifications, offline mode sync, and secure biometric authentication.',
        features: ['Flutter & React Native Codebase', 'Biometric Fingerprint/FaceID Login', 'Real-time GPS Location & Tracking', 'App Store & Play Store Publishing']
      },
      {
        slug: 'web-portal-development',
        title: 'Responsive Web Application & Client Portals',
        desc: 'Modern web applications built with modern frontend tools, Node.js REST APIs, microservice architecture, and lightning-fast database engines.',
        features: ['Progressive Web App (PWA) Capabilities', 'Multi-Tenant SaaS Architecture', 'Secure API Endpoints & Webhooks', 'Dark/Light Modern Cyber Design UI']
      }
    ],
    techStack: ['Node.js & Express', 'React & Vue.js', 'Flutter / React Native', 'PostgreSQL / MongoDB', 'Docker & REST APIs', 'Tailwind CSS / EJS'],
    faqs: [
      { q: 'Do I own the source code of the custom application?', a: 'Yes! Upon project completion and sign-off, full intellectual property and source code ownership are transferred 100% to your organization.' },
      { q: 'How long does it take to develop a custom web or mobile app?', a: 'Typical MVP web applications take 3 to 6 weeks, while comprehensive enterprise software suites take 8 to 12 weeks depending on scope.' }
    ]
  },
  {
    id: 'odoo-dynamics-365-erp',
    slug: 'odoo-dynamics-365-erp',
    aliases: ['odoo and dynamics 365 erp', 'odoo-erp', 'dynamics-365', 'erp-solutions'],
    title: 'Odoo ERP & Microsoft Dynamics 365 Solutions',
    categoryName: 'Odoo & Dynamics 365 ERP',
    subtitle: 'End-to-end ERP implementation, custom module development, Point of Sale (POS) sync, multi-currency accounting, and supply chain automation.',
    icon: '📊',
    heroBadge: 'Enterprise ERP Implementation',
    overview: 'Transform your business operations with world-class Enterprise Resource Planning (ERP) systems. UVO SoftTech specializes in full lifecycle Odoo (Community & Enterprise) and Microsoft Dynamics 365 implementations, bridging accounting, inventory, HR, sales, and manufacturing into one unified platform.',
    benefits: [
      { title: 'Unified Business Operations', desc: 'Replace fragmented spreadsheets with a single, real-time database managing finance, sales, inventory, and HR.' },
      { title: 'Custom Module Engineering', desc: 'Extend standard Odoo or Dynamics workflows with custom Python/C# modules tailored to localized tax requirements and business logic.' },
      { title: 'Real-Time POS & E-Commerce Sync', desc: 'Connect physical retail stores with online e-commerce platforms, syncing stock levels automatically.' },
      { title: 'Data Migration without Risk', desc: 'Seamlessly migrate historical accounting ledgers, customer records, and product catalogs from legacy systems.' }
    ],
    subServices: [
      {
        slug: 'odoo-erp-implementation',
        title: 'Odoo ERP Implementation & Customization',
        desc: 'Complete Odoo v15-v17 setup, custom Python module development, QWeb report customization, localized accounting, and automated invoice processing.',
        features: ['Odoo Community & Enterprise Setup', 'Custom QWeb Invoice & Receipt Formats', 'Multi-Warehouse Inventory Control', 'Pakistani FBR & International Tax Modules']
      },
      {
        slug: 'microsoft-dynamics-365',
        title: 'Microsoft Dynamics 365 Deployments',
        desc: 'Implementation, customization, and cloud migration for Dynamics 365 Finance & Operations and Dynamics Business Central.',
        features: ['Business Central ERP Setup', 'Power BI Dashboard Integrations', 'Legacy ERP to Dynamics Migration', 'Financial Consolidation & Reporting']
      }
    ],
    techStack: ['Odoo Enterprise & Community', 'Python / XML / QWeb', 'Microsoft Dynamics 365', 'PostgreSQL', 'Power BI', 'REST/XML-RPC APIs'],
    faqs: [
      { q: 'Which ERP is right for my business: Odoo or Microsoft Dynamics 365?', a: 'Odoo is cost-effective, highly modular, and ideal for growing SMEs and mid-market firms. Dynamics 365 is tailored for large enterprises requiring complex financial consolidation.' },
      { q: 'Can you migrate data from QuickBooks or Excel into Odoo?', a: 'Yes! We perform complete data scrubbing, validation, and automated migration of chart of accounts, vendors, customers, and opening balances.' }
    ]
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    aliases: ['cloud and devops', 'cloud-engineering', 'devops-services'],
    title: 'Cloud Engineering & DevOps Architecture',
    categoryName: 'Cloud & DevOps',
    subtitle: 'AWS, Azure, and GCP cloud architecture, CI/CD automated deployment pipelines, Kubernetes container orchestration, and Cloud Cost Optimization.',
    icon: '☁️',
    heroBadge: 'Cloud & DevOps Architecture',
    overview: 'Accelerate your cloud journey with reliable Infrastructure as Code (IaC) and modern DevOps practices. UVO SoftTech designs highly available, auto-scaling cloud architectures on Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP) while slashing monthly cloud expenses.',
    benefits: [
      { title: '99.99% High Availability', desc: 'Multi-region failover and load balancer configurations ensure zero downtime even during unexpected server spikes.' },
      { title: 'Cloud Bill Reduction (Up to 50%)', desc: 'Our cloud cost audit identifies idle resources, optimizes instances, and implements reserved instance strategies.' },
      { title: 'Automated CI/CD Deployment', desc: 'Deploy code updates to production automatically with zero downtime using GitHub Actions, GitLab CI, or Jenkins.' },
      { title: 'Enterprise MDM Security', desc: 'Enforce Microsoft Intune and Mobile Device Management (MDM) policies to secure remote laptop access.' }
    ],
    subServices: [
      {
        slug: 'cloud-migration',
        title: 'Cloud Migration & Architecture (AWS / Azure / GCP)',
        desc: 'End-to-end cloud migration of legacy on-premises servers to cloud environments with zero data loss, serverless microservices, and auto-scaling.',
        features: ['AWS EC2, S3, RDS, & ECS Architectures', 'Azure Virtual Machines & SQL Database', 'Containerized Kubernetes (EKS / AKS)', 'Disaster Recovery & Automated Snapshots']
      },
      {
        slug: 'cloud-cost-optimization',
        title: 'Cloud Cost Optimization & FinOps',
        desc: 'Thorough audit of cloud infrastructure utilization, eliminating oversized VMs, unattached disks, and implementing spot/reserved instances to cut cloud bills by 30-50%.',
        features: ['Idle Resource Identification', 'Reserved Instance & Savings Plan Tuning', 'Cost Allocation & Budget Alerts', 'Monthly FinOps Performance Reports']
      },
      {
        slug: 'mdm-management',
        title: 'Enterprise MDM & Device Security (Intune / Jamf)',
        desc: 'Mobile Device Management enrollment for Windows, macOS, and mobile devices to enforce BitLocker encryption, password policies, and remote wipe capability.',
        features: ['Microsoft Intune Configuration', 'Remote Device Locking & Wiping', 'Automated Patch Management', 'Conditional Access Policies']
      }
    ],
    techStack: ['Amazon Web Services (AWS)', 'Microsoft Azure / Intune', 'Docker & Kubernetes', 'Terraform / Ansible', 'GitHub Actions / GitLab CI', 'Nginx / Cloudflare'],
    faqs: [
      { q: 'How much can UVO SoftTech reduce my monthly AWS/Azure bill?', a: 'Our clients save an average of 35% to 50% on monthly cloud infrastructure costs through right-sizing, auto-scaling, and architectural optimization.' }
    ]
  },
  {
    id: 'cybersecurity-pentesting',
    slug: 'cybersecurity-pentesting',
    aliases: ['cybersecurity and pentesting', 'cyber-security', 'pentesting', 'cybersecurity'],
    title: 'Enterprise Cybersecurity & Penetration Testing',
    categoryName: 'Cybersecurity & Pentesting',
    subtitle: 'Offensive penetration testing, web app vulnerability assessments, Active Directory security hardening, and 24/7 Security Operations Center (SOC) monitoring.',
    icon: '🛡️',
    heroBadge: 'Offensive Security & Pentesting',
    overview: 'Protect your business assets, customer data, and reputation from sophisticated cyber threats. UVO SoftTech provides certified penetration testing and proactive security operations to identify and patch security flaws before malicious hackers can exploit them.',
    benefits: [
      { title: 'Certified Ethical Hackers', desc: 'Our team uses the latest threat tactics (MITRE ATT&CK) to thoroughly assess your internal networks, web apps, and APIs.' },
      { title: 'Actionable Remediation Reports', desc: 'Receive clear, developer-friendly penetration testing reports with step-by-step instructions to fix every vulnerability.' },
      { title: 'Regulatory Compliance', desc: 'Meet ISO 27001, PCI-DSS, SOC 2, and local regulatory cyber standards needed for enterprise partnerships.' },
      { title: '24/7 SIEM Security Operations', desc: 'Continuous log monitoring and immediate alert response when suspicious activity is detected on your servers.' }
    ],
    subServices: [
      {
        slug: 'app-security-pentest',
        title: 'Application & Web Security Penetration Testing',
        desc: 'Comprehensive penetration testing of web applications, mobile apps, and REST APIs to discover SQL injection, XSS, authentication bypass, and logic flaws.',
        features: ['OWASP Top 10 Security Audit', 'API Authentication & Token Analysis', 'Business Logic Flaw Assessment', 'Re-Testing & Verification Report']
      },
      {
        slug: 'ad-infrastructure-pentest',
        title: 'Active Directory & Network Pentesting',
        desc: 'Simulated real-world cyber attack against internal domain controllers, active directory privileges, network switches, and corporate endpoints.',
        features: ['Domain Admin Privilege Escalation Test', 'Kerberoasting & Pass-the-Hash Audits', 'Wireless Network Security Testing', 'Phishing Simulation & Awareness']
      },
      {
        slug: '24x7-soc-monitoring',
        title: '24/7 Security Operations Center (SOC)',
        desc: 'Continuous real-time threat detection, SIEM log centralization, automated alert filtering, and expert incident containment.',
        features: ['Wazuh / Elastic SIEM Monitoring', 'Real-Time Intrusion Detection', 'Ransomware Containment Protocol', 'Executive Threat Summary Reports']
      }
    ],
    techStack: ['Burp Suite Professional', 'Metasploit / Cobalt Strike', 'Wazuh SIEM', 'Nmap / Wireshark', 'Kali Linux', 'OWASP Standards'],
    faqs: [
      { q: 'Will penetration testing cause downtime to my live website or portal?', a: 'No! We conduct all penetration tests during scheduled maintenance windows or non-peak hours, ensuring zero disruption to live operations.' }
    ]
  },
  {
    id: 'ai-engineering-llms',
    slug: 'ai-engineering-llms',
    aliases: ['ai engineering and llms', 'ai-engineering', 'ai-services', 'llm-integration'],
    title: 'AI Engineering & Custom LLM Integration',
    categoryName: 'AI Engineering & LLMs',
    subtitle: 'Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) over private company data, and autonomous AI agents.',
    icon: '🤖',
    heroBadge: 'Enterprise AI Solutions',
    overview: 'Unlock unprecedented productivity by integrating artificial intelligence into your business applications. UVO SoftTech builds custom GenAI solutions, Retrieval-Augmented Generation (RAG) knowledge systems, and autonomous AI agents that safely query private corporate documents without leaking sensitive data.',
    benefits: [
      { title: 'Private Document Intelligence', desc: 'Enable employees or customers to instantly query PDFs, ERP records, and SOPs using natural conversational AI.' },
      { title: '100% Data Privacy & Security', desc: 'Deploy open-source LLMs (Llama 3, Mistral) on private cloud servers so confidential company data never leaves your network.' },
      { title: 'Automated Customer Support', desc: 'Deploy intelligent AI chatbots that answer complex customer inquiries accurately 24/7 and create support tickets.' },
      { title: 'Automated Data Extraction', desc: 'Extract structured JSON data automatically from scanned invoices, receipts, contracts, and email attachments.' }
    ],
    subServices: [
      {
        slug: 'rag-document-ai',
        title: 'Retrieval-Augmented Generation (RAG) Systems',
        desc: 'Build custom AI search portals over internal enterprise knowledge bases, PDFs, policy handbooks, and database tables.',
        features: ['Vector DB Setup (Pinecone / Chroma)', 'Semantic Search & Instant Answers', 'Private On-Premises Model Deployment', 'Source Citation & Page Referencing']
      },
      {
        slug: 'ai-agents-chatbots',
        title: 'Autonomous AI Agents & Chatbot Workflows',
        desc: 'Custom AI agents capable of performing multi-step tasks such as booking appointments, updating CRM leads, and sending WhatsApp notifications.',
        features: ['WhatsApp & Web Chatbot Integration', 'Tool Function Calling & API Execution', 'Multi-Language Support (English/Urdu)', 'Human-in-the-Loop Approval Escrow']
      }
    ],
    techStack: ['OpenAI GPT-4o / Claude 3.5', 'Llama 3 / Ollama', 'LangChain / LlamaIndex', 'Pinecone / ChromaDB', 'Python & FastAPI', 'Node.js'],
    faqs: [
      { q: 'Is our proprietary business data safe when using your AI solutions?', a: 'Absolute security is guaranteed. We use enterprise privacy endpoints or host private open-source AI models inside your own isolated cloud environment.' }
    ]
  }
];

// Helper function to find a service by slug or name match
function findServiceBySlug(inputSlug) {
  if (!inputSlug) return null;

  // Clean and decode URL slug
  const decoded = decodeURIComponent(inputSlug).trim().toLowerCase();
  const normalized = decoded.replace(/\+/g, ' ').replace(/%20/g, ' ');
  const dashSlug = normalized.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // 1. Direct Category Match
  for (const s of servicesData) {
    if (
      s.slug === dashSlug ||
      s.id === dashSlug ||
      s.categoryName.toLowerCase() === normalized ||
      s.title.toLowerCase() === normalized ||
      s.aliases.some(alias => alias.toLowerCase() === normalized || alias.toLowerCase() === dashSlug)
    ) {
      return s;
    }
  }

  // 2. Loose Partial Match
  for (const s of servicesData) {
    if (
      normalized.includes('backoffice') || normalized.includes('it support') || normalized.includes('it-support')
    ) {
      if (s.id === 'it-backoffice-support') return s;
    }
    if (normalized.includes('software') || normalized.includes('mobile') || normalized.includes('app')) {
      if (s.id === 'software-mobile-dev') return s;
    }
    if (normalized.includes('odoo') || normalized.includes('dynamics') || normalized.includes('erp')) {
      if (s.id === 'odoo-dynamics-365-erp') return s;
    }
    if (normalized.includes('cloud') || normalized.includes('devops') || normalized.includes('aws') || normalized.includes('azure')) {
      if (s.id === 'cloud-devops') return s;
    }
    if (normalized.includes('cyber') || normalized.includes('pentest') || normalized.includes('security')) {
      if (s.id === 'cybersecurity-pentesting') return s;
    }
    if (normalized.includes('ai') || normalized.includes('llm') || normalized.includes('intelligence')) {
      if (s.id === 'ai-engineering-llms') return s;
    }
  }

  return null;
}

module.exports = {
  servicesData,
  findServiceBySlug
};
