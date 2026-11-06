import { ProductDetail } from "@/lib/types";

export const PRODUCTS: ProductDetail[] = [
  {
    slug: "restaurant-erp-suite",
    name: "Restaurant ERP Suite",
    tagline: "High-throughput omni-channel point of sale, kitchen telemetry, and decentralized dispatch engine.",
    category: "Hospitality & Retail Infrastructure",
    architectureTier: "Multi-Tenant Distributed Microservices",
    deploymentOptions: ["Cloud SaaS", "Hybrid On-Premises Edge Gateway", "Offline-First Local Sync"],
    description: "An enterprise-grade hospitality operating system engineered for multi-unit restaurant chains, cloud kitchens, and franchise groups. Built with offline-first local edge sync, zero-latency KDS ticket dispatch, waiter handheld routing, and automated driver dispatch.",
    keyMetrics: [
      { label: "Order Dispatch Latency", value: "< 120ms", detail: "Sub-second sync from POS terminal to KDS screens" },
      { label: "Offline Availability", value: "99.999%", detail: "Full localized POS operation during WAN outages" },
      { label: "Fleet Concurrency", value: "50,000+", detail: "Concurrent terminals across regional availability zones" },
      { label: "Telemetry Throughput", value: "10k req/s", detail: "Real-time kitchen order state mutations" },
    ],
    architectureDiagram: {
      layers: [
        {
          name: "Client Edge Layer",
          description: "Ruggedized touch POS stations, Waiter Android/iOS handhelds, and Kitchen Display monitors.",
          components: ["Touch Terminal POS", "Kitchen Display System (KDS)", "Waiter Handheld App", "Customer Digital Ordering PWA"],
        },
        {
          name: "Local Edge Relay (Offline Gateway)",
          description: "Embedded edge hub ensuring continuous operation even during ISP dropouts.",
          components: ["Local SQLite Edge Replicator", "Zero-Config mDNS Network Discovery", "Hardware ESC/POS Printer Bus"],
        },
        {
          name: "Cloud Telemetry & Orchestration",
          description: "Scalable central serverless cluster coordinating orders, inventory, and logistics.",
          components: ["Websocket Event Bus", "Automated Driver Fleet Router", "Central Inventory Depletion Engine"],
        },
        {
          name: "Data Lake & Reporting",
          description: "High-performance analytics capturing unit economics, shrinkage, and sales trends.",
          components: ["Time-Series Sales Warehouse", "Third-Party Aggregator Bridges (UberEats, DoorDash)", "Accounting GL Sync"],
        },
      ],
      dataFlow: [
        "Customer/Terminal enters order -> Local Edge Gateway verifies ticket schema",
        "Edge Gateway dispatches order simultaneously to KDS station and kitchen thermal printers",
        "Waiter Handheld receives real-time meal completion alert via local broadcast",
        "Background worker syncs audited financial ledger to central cloud database when upstream WAN is verified",
      ],
    },
    features: [
      {
        title: "Multi-Terminal Touch POS",
        description: "Hardened cashier and server POS with fast-bar tender modes, split billing, table mapping, and biometric staff clock-in.",
        tags: ["Touch-Optimized", "Biometric Auth", "Cash Drawer Interfacing"],
      },
      {
        title: "Kitchen Display System (KDS)",
        description: "Color-coded station-specific prep queues with priority timers, item grouping, and bump-bar keyboard support.",
        tags: ["Visual SLA Timers", "Bump-Bar Compatible", "Course Pacing"],
      },
      {
        title: "Waiter Mobile Handheld",
        description: "Lightweight mobile app enabling waitstaff to transmit orders directly from table-side into the kitchen line.",
        tags: ["iOS & Android", "Tableside Card Reader", "Zero-Typing Modifier Selection"],
      },
      {
        title: "Rider Delivery App & Dispatch",
        description: "Automated geofencing, route optimization, SMS tracking links for end-customers, and rider payout audits.",
        tags: ["GPS Telemetry", "Dynamic Routing", "Live Tracking URL"],
      },
      {
        title: "Web & Mobile Client Ordering",
        description: "Zero-commission brand-owned ordering storefront with loyalty points, promo engines, and Apple/Google Pay.",
        tags: ["White-Label PWA", "Digital Wallet Integration", "Smart Upselling Engine"],
      },
    ],
    technicalSpecifications: {
      protocol: "gRPC over HTTP/2, Secure WebSockets (WSS), mTLS",
      throughput: "Up to 15,000 transactions/min per regional cluster",
      latency: "P99 < 85ms end-to-end ticket routing",
      compliance: ["PCI-DSS Level 1", "SOC 2 Type II", "GDPR/CCPA Data Retention"],
      security: ["Hardware Secure Element Key Storage", "AES-256 at Rest", "Role-Based ACL"],
      dbEngine: "PostgreSQL 16 with TimescaleDB & Local SQLite Edge Replica",
    },
    liveSandboxSupported: true,
    activeDemoEnvironment: "https://demo-restaurant.uvosofttech.com",
  },
  {
    slug: "corporate-data-backup-tool",
    name: "Corporate Data Backup Tool",
    tagline: "Enterprise endpoint protection, continuous block-level deduplication, and immutable ransomware defense.",
    category: "Cyber Resilience & Storage",
    architectureTier: "Hybrid Edge-to-Cloud Distributed Vault",
    deploymentOptions: ["On-Premises Private Appliance", "Multi-Cloud S3 Object Storage", "Hybrid Air-Gapped"],
    description: "A centralized enterprise workstation and server backup infrastructure. Protects corporate laptops, desktops, and file servers with continuous delta-syncing, global content-addressable deduplication, zero-knowledge AES-256 encryption, and tamper-proof WORM immutability.",
    keyMetrics: [
      { label: "Storage Reduction", value: "Up to 82%", detail: "Global variable block-size deduplication ratio" },
      { label: "Restore Speed", value: "850 MB/s", detail: "Parallelized multi-stream bare-metal restoration" },
      { label: "RPO / RTO Target", value: "RPO 15m / RTO 2m", detail: "Near-zero data loss on executive workstations" },
      { label: "Ransomware Armor", value: "100% Immutable", detail: "S3 Object Lock compliance retention" },
    ],
    architectureDiagram: {
      layers: [
        {
          name: "Endpoint Agent Daemon",
          description: "Low-footprint background service observing file-system change logs.",
          components: ["Windows VSS Writer", "macOS FSEvents Monitor", "Linux eBPF File-Watcher"],
        },
        {
          name: "Deduplication & Chunking Engine",
          description: "Fast CDC (Content-Defined Chunking) and BLAKE3 cryptographic hash verification.",
          components: ["Rabin Fingerprint Chunking", "Client-Side Zero-Knowledge Encryption", "Rate-Limiting Bandwidth Shaper"],
        },
        {
          name: "Storage Vault & Gateway",
          description: "Consolidated deduplication index and distributed object store.",
          components: ["RocksDB Metadata Index", "Local SAN/NAS Storage Target", "Cloud Cold Storage Tiering"],
        },
        {
          name: "Central Admin SOC Console",
          description: "Fleet-wide compliance auditor, restore drill scheduler, and anomaly detection.",
          components: ["Mass Deployment MSI/PKG", "Ransomware Entropy Spike Monitor", "Audit Trail Exporter"],
        },
      ],
      dataFlow: [
        "Workstation agent identifies modified files via kernel VSS shadow copy",
        "File is decomposed into variable chunks and hashed using BLAKE3",
        "Unique chunks are encrypted client-side with host-specific private key",
        "Encrypted blocks stream to local vault repository or immutable cloud tier with WORM lock",
      ],
    },
    features: [
      {
        title: "Continuous Workstation Backup",
        description: "Silent background sync with CPU and battery governor to prevent workstation slowdowns during intensive work.",
        tags: ["CPU Throttling", "Silent Daemon", "Smart Bandwidth Throttling"],
      },
      {
        title: "Global Content Deduplication",
        description: "Transmits only globally unique data blocks across tens of thousands of corporate endpoints, cutting WAN usage.",
        tags: ["Content-Defined Chunking", "WAN Optimization", "Storage Cost Reduction"],
      },
      {
        title: "Immutable Ransomware Defense",
        description: "Write-Once-Read-Many (WORM) storage architecture prevents ransomware or compromised admins from deleting snapshots.",
        tags: ["S3 Object Lock", "Air-Gapped Vaults", "Entropy Analysis Alerting"],
      },
      {
        title: "Instant Bare-Metal & File Recovery",
        description: "Self-service employee portal for recovering past revisions, alongside IT bare-metal disaster recovery ISO generation.",
        tags: ["Self-Service Web UI", "Point-in-Time Rollback", "Bare-Metal ISO Boot"],
      },
      {
        title: "Centralized SOC Governance",
        description: "Real-time dashboard for CISO teams showing backup health, un-enrolled assets, and automated restore drill SLAs.",
        tags: ["SIEM Integration", "Automated Restore Drills", "SOC 2 Evidence Export"],
      },
    ],
    technicalSpecifications: {
      protocol: "TLS 1.3, WireGuard Tunneling, REST/S3 API",
      throughput: "Multi-gigabit parallelized snapshot ingestion",
      latency: "Local LAN backup discovery < 5ms",
      compliance: ["HIPAA Security Rule", "ISO 27001", "NIST SP 800-88 Compliant Sanitization"],
      security: ["Client-Side AES-256-GCM", "Hardware Security Key (FIDO2/YubiKey)", "Zero-Knowledge Architecture"],
      dbEngine: "Embedded RocksDB Key-Value Engine with Distributed S3 Backend",
    },
    liveSandboxSupported: true,
    activeDemoEnvironment: "https://demo-backup.uvosofttech.com",
  },
  {
    slug: "school-management-system",
    name: "School Management System",
    tagline: "End-to-end academic lifecycle engine, automated grading, fiscal accounting, and multi-portal campus operations.",
    category: "Education & Campus Administration",
    architectureTier: "Scalable Enterprise Multi-Tenant SaaS",
    deploymentOptions: ["Private Cloud Tenant", "Multi-Campus SaaS Cluster", "Hybrid Government On-Prem"],
    description: "A centralized campus ERP orchestrating academic governance, faculty administration, automated tuition fee collection, biometric attendance gateways, dynamic transcript generation, and parent-student engagement channels.",
    keyMetrics: [
      { label: "Active Student Capacity", value: "250,000+", detail: "Across concurrent district campuses" },
      { label: "Fee Reconciliation", value: "100% Automated", detail: "Direct bank gateway and digital invoice clearing" },
      { label: "Attendance Capture", value: "< 2 Seconds", detail: "RFID / facial scan clock-in per student" },
      { label: "Uptime SLA", value: "99.99%", detail: "Mission-critical exam and report card generation periods" },
    ],
    architectureDiagram: {
      layers: [
        {
          name: "Portal Interface Layer",
          description: "Role-specific responsive portals for leadership, instructors, accountants, and guardians.",
          components: ["Superintendent Dashboard", "Instructor Gradebook App", "Parent-Student Mobile Hub", "Bursar Billing Desk"],
        },
        {
          name: "Academic Engine Core",
          description: "Business logic governing prerequisite checks, GPA calculations, and curriculum catalogs.",
          components: ["Dynamic Transcript Generator", "Classroom Timetable Solver", "Biometric Attendance Ingestion"],
        },
        {
          name: "Financial & Fee Gateway",
          description: "Accounts receivable, automated scholarship disbursement, and multi-tier fee plans.",
          components: ["Automated Invoicing Engine", "Direct Banking API (Stripe, 1Bill, Kuickpay)", "Late Penalty Calculator"],
        },
        {
          name: "Security & Notification Grid",
          description: "Critical safety alerts, SMS broadcasts, and institutional record archiving.",
          components: ["Automated SMS/WhatsApp Gateway", "FERPA/GDPR Audit Logger", "Digital Certificate Verification"],
        },
      ],
      dataFlow: [
        "RFID gate or app scans student arrival -> Attendance record saved with timestamp",
        "Absentee alerts instantly dispatched to verified parents via automated WhatsApp/SMS gateway",
        "Instructor registers midterm assessments in digital gradebook; weighted GPA recalculates live",
        "Monthly fee vouchers generated, synced with bank clearinghouses, and made available on parent mobile apps",
      ],
    },
    features: [
      {
        title: "Full Admissions & Student Lifecycle",
        description: "Paperless applicant tracking, entrance examination scores, document verification, and digital enrollment.",
        tags: ["Paperless Onboarding", "Document Vault", "Custom Application Forms"],
      },
      {
        title: "Intelligent Timetable & Room Scheduler",
        description: "Algorithmic conflict-free timetable generation considering teacher availability, room capacity, and subject lab requirements.",
        tags: ["Constraint Satisfaction Solver", "Faculty Workload Balancer", "Room Utilization Optimizer"],
      },
      {
        title: "Automated Fee Invoicing & Collection",
        description: "Scheduled challan generation, partial payment tracking, late fee automation, and instantaneous payment gateway reconciliations.",
        tags: ["Multi-Bank API", "Dynamic Discount Engine", "Automated SMS Due Reminders"],
      },
      {
        title: "Configurable Grading & Report Cards",
        description: "Custom evaluation schemas (percentage, GPA, letter grades, Cambridge, IB) with one-click report card PDF batch exporting.",
        tags: ["Curriculum Agnostic", "Bulk Watermarked PDFs", "Historical Transcript Storage"],
      },
      {
        title: "Parent & Student Collaboration Portal",
        description: "Real-time visibility into attendance records, homework assignments, teacher notes, exam dates, and extracurricular events.",
        tags: ["Push Notifications", "Homework Submission", "Teacher-Parent Messaging"],
      },
    ],
    technicalSpecifications: {
      protocol: "HTTPS / REST, GraphQL for Mobile Apps, Webhooks",
      throughput: "30,000 concurrent examination sessions",
      latency: "Database queries < 35ms",
      compliance: ["FERPA Compliant", "COPPA Compliant", "SOC 2 Type II Certified Data Centers"],
      security: ["Fine-Grained Role-Based Access Control (RBAC)", "Field-Level PII Encryption", "Audit Logging"],
      dbEngine: "PostgreSQL 16 with Row Level Security & Redis Cache",
    },
    liveSandboxSupported: true,
    activeDemoEnvironment: "https://demo-school.uvosofttech.com",
  },
  {
    slug: "cybersecurity-siem-platform",
    name: "Cybersecurity SIEM Platform",
    tagline: "Autonomous telemetry aggregation, behavioral threat correlation, and automated SOC incident triage.",
    category: "Security Operations & Threat Defense",
    architectureTier: "Real-Time Distributed Event Stream Pipeline",
    deploymentOptions: ["Managed Security SaaS", "Air-Gapped Defense Cloud", "Hybrid On-Prem Sensor Array"],
    description: "An enterprise SIEM (Security Information & Event Management) and SOAR platform. Ingests raw telemetry across firewalls, cloud infrastructure, Active Directory, and endpoints to surface zero-day threats, credential abuse, and ransomware vectors through behavioral analytics.",
    keyMetrics: [
      { label: "Event Ingestion Rate", value: "250,000 EPS", detail: "Events per second per pipeline cluster" },
      { label: "Mean Time to Detect (MTTD)", value: "< 45 Seconds", detail: "From log emission to correlated alert dispatch" },
      { label: "Rule Catalog", value: "1,400+ Rules", detail: "Pre-mapped to MITRE ATT&CK Enterprise Framework" },
      { label: "Compression Ratio", value: "10:1", detail: "Cold storage log indexing for forensic compliance" },
    ],
    architectureDiagram: {
      layers: [
        {
          name: "Telemetry Collectors & Log Forwarders",
          description: "Universal log shippers deployed across clouds, hypervisors, switches, and endpoints.",
          components: ["Syslog-ng / Fluentbit Collectors", "Windows Event Forwarder (WEF)", "AWS CloudTrail / GCP Audit Connectors", "SNMP Traps"],
        },
        {
          name: "Streaming Ingestion & Normalization",
          description: "Distributed message queue parsing logs into the Open Cybersecurity Schema Framework (OCSF).",
          components: ["Apache Kafka / Redpanda Cluster", "OCSF Normalizer Engine", "GeoIP & Threat Intel Enrichment"],
        },
        {
          name: "Correlation & Behavioral Detection Engine",
          description: "Complex event processing (CEP) matching against known attack patterns and baseline anomalies.",
          components: ["Sigma & MITRE Rule Engine", "User & Entity Behavior Analytics (UEBA)", "Brute-Force & Lateral Movement Detectors"],
        },
        {
          name: "SOAR & Incident Response Hub",
          description: "Automated playbooks for firewall isolation, account suspension, and analyst war rooms.",
          components: ["Automated Playbook Executor", "Analyst Incident Triage Board", "Regulatory Breach Report Generator"],
        },
      ],
      dataFlow: [
        "Network switch or server generates authentication log event -> Sent over TLS to SIEM collector",
        "Stream parser validates log integrity, maps fields to OCSF, and enriches with commercial threat intelligence",
        "Correlation engine detects abnormal 3 AM domain admin login followed by bulk file read operations",
        "SOAR playbook automatically disables AD account, triggers EDR network quarantine, and pages on-call SOC lead",
      ],
    },
    features: [
      {
        title: "High-Throughput Log Streaming",
        description: "Effortlessly scales to hundreds of thousands of events per second with zero data drop or packet loss.",
        tags: ["Distributed Pipeline", "OCSF Standard", "Real-Time Normalization"],
      },
      {
        title: "MITRE ATT&CK Matrix Alignment",
        description: "Pre-configured detection rules covering initial access, privilege escalation, credential dumping, and exfiltration.",
        tags: ["Sigma Compatible", "Kill-Chain Visibility", "Threat Intel Feeds"],
      },
      {
        title: "Autonomous SOAR Playbooks",
        description: "Configurable automated containment workflows: isolate infected hosts, revoke cloud tokens, and blacklist malicious IPs.",
        tags: ["Zero-Human-Delay Mitigation", "Custom Webhooks", "Firewall API Sync"],
      },
      {
        title: "Compliance & Audit Readiness",
        description: "One-click audit packs for ISO 27001, PCI-DSS 4.0, HIPAA, and NIST 800-53 with tamper-evident cryptographic log hashes.",
        tags: ["Tamper-Proof Hashes", "Retention Policies", "Executive PDF Briefings"],
      },
      {
        title: "Interactive Threat Hunting Canvas",
        description: "Ultra-fast Lucene/SQL query syntax allowing security engineers to comb petabytes of historical logs in milliseconds.",
        tags: ["Sub-Second Search", "Visual Pivot Trees", "Forensic Timelines"],
      },
    ],
    technicalSpecifications: {
      protocol: "Syslog over TLS, Kafka protocol, HTTPS, STIX/TAXII",
      throughput: "250,000+ EPS with linear horizontal scale-out",
      latency: "Alert generation latency < 2.4 seconds",
      compliance: ["PCI-DSS 4.0 Log Retention", "HIPAA §164.312", "SOC 2 Type II", "NIST CSF"],
      security: ["Cryptographic Hash Chain (SHA-256)", "RBAC & ABAC", "mTLS Sensor Encryption"],
      dbEngine: "ClickHouse Columnar Warehouse + Apache Kafka + Redis",
    },
    liveSandboxSupported: true,
    activeDemoEnvironment: "https://demo-siem.uvosofttech.com",
  },
  {
    slug: "enterprise-mobile-device-management",
    name: "Enterprise Mobile Device Management (MDM)",
    tagline: "Cross-platform mobile fleet orchestration, zero-touch provisioning, and cryptographic endpoint wipe.",
    category: "Unified Endpoint Management (UEM)",
    architectureTier: "Zero-Trust Cloud Fleet Controller",
    deploymentOptions: ["Global Multi-Tenant SaaS", "Dedicated VPC Enterprise Instance", "Government Air-Gapped"],
    description: "A centralized Unified Endpoint Management (UEM) platform built for securing corporate smartphones, tablets, and ruggedized scanners across Android Enterprise, Apple iOS/macOS, and Windows 11. Enforces encryption, distributes managed apps, and initiates instant remote wipe upon theft or employee offboarding.",
    keyMetrics: [
      { label: "Fleet Scale", value: "100,000+", detail: "Managed endpoints per centralized enterprise tenant" },
      { label: "Policy Push Latency", value: "< 15 Seconds", detail: "Global APNs / FCM push notification sync" },
      { label: "Zero-Touch Enrollment", value: "100%", detail: "Out-of-the-box configuration without IT manual touch" },
      { label: "Compliance Verification", value: "Real-Time", detail: "Instant jailbreak, root, and OS version detection" },
    ],
    architectureDiagram: {
      layers: [
        {
          name: "Device Fleet Agents & Profiles",
          description: "Native OS management APIs across Apple MDM, Android Enterprise Management, and Windows OMA-DM.",
          components: ["Apple MDM Profile", "Android Device Policy Controller (DPC)", "Windows Intune/OMA-DM Bridge"],
        },
        {
          name: "Push Gateway Integrations",
          description: "High-priority push channels ensuring commands wake devices reliably.",
          components: ["Apple Push Notification Service (APNs)", "Firebase Cloud Messaging (FCM)", "Windows Push Notification Services (WNS)"],
        },
        {
          name: "Central Policy & Compliance Engine",
          description: "Rules engine verifying passcode complexity, storage encryption, and prohibited apps.",
          components: ["Dynamic Compliance Evaluator", "Enterprise App Store & VPP Broker", "SCEP Certificate Authority"],
        },
        {
          name: "IT Administrator Operations Portal",
          description: "Fleet tracking, geo-fencing, bulk provisioning, and one-click remote sanitization.",
          components: ["Zero-Touch Deployment Hub", "Remote Diagnostic Screen Viewer", "Audit Trail Exporter"],
        },
      ],
      dataFlow: [
        "Unopened device boots from factory -> Connects to Wi-Fi and queries Apple ADE / Android Zero-Touch server",
        "Device receives UVO MDM enrollment profile and installs company applications automatically",
        "Agent continuously audits device posture (root status, PIN complexity, OS patch level)",
        "Upon security incident, IT administrator dispatches remote cryptographic wipe command executed in under 10 seconds",
      ],
    },
    features: [
      {
        title: "Zero-Touch Fleet Provisioning",
        description: "Devices ship directly from manufacturer to employee homes and auto-configure corporate profiles on first power-up.",
        tags: ["Apple Business Manager", "Android Zero-Touch", "Windows Autopilot"],
      },
      {
        title: "Work Profile & Data Containerization",
        description: "Strict isolation between personal photos and corporate sensitive emails, ensuring employee privacy while securing company IP.",
        tags: ["BYOD Friendly", "Clipboard Sandboxing", "Encrypted Work Profile"],
      },
      {
        title: "Instant Remote Lock & Cryptographic Wipe",
        description: "Emergency fleet commands: pinpoint lost device location, lock the screen with custom owner text, or permanently erase corporate keys.",
        tags: ["Selective Wipe", "Full Hardware Sanitization", "Lost Mode Beacon"],
      },
      {
        title: "Private Enterprise App Store",
        description: "Silently distribute in-house APKs/IPAs, manage Apple Volume Purchase (VPP) licenses, and block sideloading of unauthorized apps.",
        tags: ["Silent Install", "License Management", "App Whitelisting"],
      },
      {
        title: "Automated Wi-Fi & VPN Certificate Ingestion",
        description: "Deploys 802.1X corporate Wi-Fi credentials and Always-On VPN configurations via SCEP/PKI without exposing passwords.",
        tags: ["SCEP / PKI Integration", "Per-App VPN", "Zero-Password Enrollment"],
      },
    ],
    technicalSpecifications: {
      protocol: "Apple MDM Protocol, Android Management API, OMA-DM v1.2, SCEP/EST",
      throughput: "50,000 policy updates dispatched/minute",
      latency: "Command transmission to device < 8 seconds",
      compliance: ["CIS Benchmark Level 1 & 2", "GDPR Article 32 Security", "SOC 2 Type II"],
      security: ["Hardware Key Attestation", "AES-256 Storage Encryption Enforced", "Certificate Pinning"],
      dbEngine: "PostgreSQL 16 with Redis In-Memory Command Queue",
    },
    liveSandboxSupported: true,
    activeDemoEnvironment: "https://demo-mdm.uvosofttech.com",
  },
  {
    slug: "custom-software-cloud-engineering",
    name: "Custom Software & Cloud Engineering",
    tagline: "Mission-critical enterprise software, bespoke microservices, cloud migrations, and real-time database architectures.",
    category: "Bespoke Enterprise Systems",
    architectureTier: "Cloud-Native Modular Architecture",
    deploymentOptions: ["AWS Cloud", "Google Cloud Platform", "Microsoft Azure", "Bare-Metal Kubernetes"],
    description: "Custom software engineering for enterprise corporations requiring robust, bespoke business applications. We architect, build, and maintain high-concurrency transactional platforms, internal operations tools, ERPs, API gateways, and distributed cloud microservices.",
    keyMetrics: [
      { label: "Code Test Coverage", value: "> 95%", detail: "Automated CI/CD end-to-end integration test suites" },
      { label: "Availability Architecture", value: "99.999%", detail: "Multi-region active-active deployment patterns" },
      { label: "Deployment Frequency", value: "Multiple/Day", detail: "Zero-downtime blue-green and canary pipeline automation" },
      { label: "Performance Tuning", value: "Sub-100ms", detail: "Global edge CDN and database query optimization" },
    ],
    architectureDiagram: {
      layers: [
        {
          name: "Global Edge & CDN Layer",
          description: "Distributed reverse proxy termination, DDoS mitigation, and edge caching.",
          components: ["Cloudflare Enterprise / CloudFront", "WAF Security Filter", "Edge SSR & Static Assets"],
        },
        {
          name: "Application & API Tier",
          description: "Resilient microservices and modular monolith architectures designed for maintainability.",
          components: ["Next.js & React Enterprise Frontends", "Go / Node / Python Microservices", "GraphQL & RESTful Public APIs"],
        },
        {
          name: "Distributed Data & Caching Tier",
          description: "High-throughput transactional databases with read-replicas and in-memory caches.",
          components: ["PostgreSQL with Connection Pooling", "Redis Distributed Cache", "Elasticsearch / OpenSearch"],
        },
        {
          name: "CI/CD & Observability Pipeline",
          description: "Automated security scanning, container builds, and real-time distributed tracing.",
          components: ["GitHub Actions / GitLab CI", "Docker & Kubernetes Helm", "OpenTelemetry & Prometheus"],
        },
      ],
      dataFlow: [
        "User sends request -> Processed through global edge network with WAF evaluation",
        "Microservices execute business workflows with distributed transaction locks",
        "Optimized database queries leverage connection pooling (Supavisor/PgBouncer) to prevent pool starvation",
        "System telemetry and structured audit logs export to centralized OpenTelemetry observability collectors",
      ],
    },
    features: [
      {
        title: "Bespoke Enterprise Web & Mobile Apps",
        description: "Purpose-built business platforms replacing fragmented legacy workflows with unified modern interfaces.",
        tags: ["Next.js App Router", "React Native", "TypeScript Strict Mode"],
      },
      {
        title: "Cloud Migration & Modernization",
        description: "Re-platforming on-premises legacy monoliths into elastic cloud-native infrastructure with zero downtime.",
        tags: ["AWS / GCP / Azure", "Kubernetes Orchestration", "Database Replication"],
      },
      {
        title: "Microservices & Distributed Systems",
        description: "Decoupled domain-driven services utilizing event-driven message buses for fault isolation and extreme scalability.",
        tags: ["Kafka / RabbitMQ", "Domain-Driven Design", "gRPC Communications"],
      },
      {
        title: "API Gateways & Legacy Interfacing",
        description: "Modern REST and GraphQL interfaces connecting modern frontends with legacy AS400, SAP, or Oracle backbones.",
        tags: ["Rate Limiting", "OAuth2 / OIDC", "Legacy Wrapper Connectors"],
      },
      {
        title: "DevSecOps & Automated CI/CD",
        description: "Bulletproof delivery pipelines featuring static code analysis, vulnerability scanning, and automated canary deployments.",
        tags: ["Zero-Downtime Deployments", "SAST / DAST Scanning", "Terraform Infrastructure as Code"],
      },
    ],
    technicalSpecifications: {
      protocol: "HTTPS / HTTP3, gRPC, WebSockets, Apache Kafka",
      throughput: "Engineered to client concurrency demands (1,000 to 500,000+ rps)",
      latency: "P95 latency < 50ms",
      compliance: ["SOC 2 Type II", "ISO 27001", "PCI-DSS Level 1 Ready"],
      security: ["Zero-Trust Identity Providers", "Secret Vault Management", "OWASP Top 10 Mitigation"],
      dbEngine: "PostgreSQL, Supabase, Redis, Elasticsearch, CockroachDB",
    },
    liveSandboxSupported: true,
    activeDemoEnvironment: "https://demo-custom.uvosofttech.com",
  },
];
