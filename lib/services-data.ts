import { ServiceDetail } from "@/lib/types";

export const SERVICES: ServiceDetail[] = [
  {
    slug: "custom-software",
    title: "Custom Software & Cloud Engineering",
    tagline: "Purpose-built enterprise web applications, high-concurrency microservices, and modern database architectures.",
    overview: "We architect, build, and maintain mission-critical software systems for forward-thinking enterprises. From high-throughput distributed ERP platforms to transactional financial ledgers and modern customer-facing web apps, our engineering practices follow strict zero-trust, modular domain architectures.",
    businessOutcomes: [
      "Replacement of fragile legacy software with modern, maintainable TypeScript & Go microservices",
      "99.999% SLA availability engineered across distributed multi-region cloud infrastructures",
      "Massive reduction in operational maintenance costs and licensing friction",
      "Continuous CI/CD pipeline automation enabling multiple risk-free production releases daily",
    ],
    capabilities: [
      {
        name: "Enterprise Web Applications",
        description: "Full-stack Next.js, React, and Node/Go applications built with responsive design, extreme performance, and accessibility.",
        deliverables: ["Modular React/TypeScript codebase", "Design System UI components", "Optimized Web Vitals score (95+ LCP/INP)"],
      },
      {
        name: "Microservices & Distributed Systems",
        description: "Decoupled domain services communicating via high-performance gRPC and event streams (Kafka/RabbitMQ) for maximum fault isolation.",
        deliverables: ["Containerized Docker microservices", "Kubernetes Helm charts", "Distributed transaction handling & idempotency"],
      },
      {
        name: "Database Architecture & Optimization",
        description: "PostgreSQL, Supabase, and distributed SQL query tuning, connection pooling configuration (Supavisor/PgBouncer), and automated migration scripts.",
        deliverables: ["Optimized relational schemas & indexing", "Read-replica read/write splitting", "Zero-downtime database migration tooling"],
      },
      {
        name: "Cloud Migration & Modernization",
        description: "Lift-and-shift or re-architecting legacy workloads into AWS, Google Cloud, or Microsoft Azure with zero operational business disruption.",
        deliverables: ["Infrastructure as Code (Terraform)", "Cutover migration playbook", "24/7 hypercare post-migration monitoring"],
      },
    ],
    techStack: ["Next.js (App Router)", "TypeScript", "React 19", "Go", "Python", "PostgreSQL", "Supabase", "Redis", "Docker", "Kubernetes", "AWS", "GCP"],
    serviceTier: "Enterprise Tier (Dedicated Engineering Pod)",
    slaCommitment: "99.99% Availability & 15-Minute Critical Response",
    complianceStandards: ["SOC 2 Type II", "ISO 27001", "OWASP Top 10", "GDPR / CCPA"],
  },
  {
    slug: "cybersecurity",
    title: "Enterprise Cybersecurity & Managed SIEM",
    tagline: "24/7 Security Operations Center (SOC), proactive threat hunting, vulnerability management, and regulatory compliance.",
    overview: "UVO Security provides comprehensive defense-in-depth protection for corporate infrastructure. We design, deploy, and monitor custom SIEM/SOAR pipelines, perform offensive penetration testing, harden Active Directory forests, and deliver round-the-clock incident response against nation-state vectors and ransomware.",
    businessOutcomes: [
      "Sub-minute threat detection and automated containment before lateral movement occurs",
      "Guaranteed compliance audit readiness across ISO 27001, SOC 2, HIPAA, and PCI-DSS",
      "Substantial reduction in insurance premiums through verified cybersecurity posture hardening",
      "Dedicated 24/7/365 US/EMEA security operations center analysts watching your perimeter",
    ],
    capabilities: [
      {
        name: "24/7 Managed Detection & Response (MDR / SIEM)",
        description: "Full-spectrum log collection across endpoints, clouds, firewalls, and SaaS services with real-time correlation against MITRE ATT&CK rules.",
        deliverables: ["Turnkey SIEM ingestion pipeline", "Curated detection rule library", "Live SOC analyst escalation portal"],
      },
      {
        name: "Offensive Penetration Testing & Red Teaming",
        description: "Rigorous adversarial simulations testing external perimeters, web applications, cloud APIs, and physical employee social engineering defenses.",
        deliverables: ["Executive risk summary report", "Technical CVSS vulnerability findings with PoCs", "Developer remediation walkthrough session"],
      },
      {
        name: "Vulnerability Management & Patch Governance",
        description: "Continuous automated asset discovery and vulnerability scanning with risk-ranked prioritization and patch validation.",
        deliverables: ["Weekly vulnerability delta reports", "Critical zero-day emergency alerts", "Patch deployment verification"],
      },
      {
        name: "Incident Response & Digital Forensics",
        description: "Immediate emergency triage for active breaches, cryptographic ransomware containment, root-cause forensics, and legal breach reporting.",
        deliverables: ["15-minute emergency SLA response", "Forensic timeline reconstruction", "Breach attestation letter for insurers"],
      },
    ],
    techStack: ["UVO SIEM Platform", "Wazuh", "Elastic Security", "Suricata", "Sigma Rules", "YARA", "Crowdstrike / Defender API", "Zeek", "OpenCTI"],
    serviceTier: "Mission-Critical 24/7 SOC Tier",
    slaCommitment: "Sub-15 Minute Active Incident Containment SLA",
    complianceStandards: ["NIST CSF", "ISO/IEC 27001:2022", "PCI-DSS 4.0", "HIPAA Security Rule", "CIS Controls v8"],
  },
  {
    slug: "it-services",
    title: "Enterprise IT Support & Infrastructure Services",
    tagline: "Workstation fleet lifecycle, tier 1-3 helpdesk, corporate identity management, and hybrid datacenter operations.",
    overview: "We take full ownership of your day-to-day enterprise information technology ecosystem. From automated employee onboarding and device provisioning to corporate Google Workspace/M365 identity governance, license rationalization, and on-premises server room virtualization.",
    businessOutcomes: [
      "Zero IT onboarding friction: employee laptops ship pre-configured and ready to work on Day 1",
      "Elimination of internal IT backlog tickets with our sub-10 minute average helpdesk resolution time",
      "Consolidation of software SaaS licenses, saving 20-35% annually on IT expenditures",
      "Deterministic disaster recovery protocols with verified quarterly restore drills",
    ],
    capabilities: [
      {
        name: "24/7 Tier 1-3 Enterprise Helpdesk",
        description: "Omnichannel technical support via Slack, Microsoft Teams, email, and phone for all executive and employee desktop issues.",
        deliverables: ["Whitelabel corporate support portal", "First-contact resolution > 85%", "SLA performance analytics reporting"],
      },
      {
        name: "Workstation Fleet Lifecycle & MDM",
        description: "Procurement, hardware imaging, remote wipe, hardware refresh schedules, and e-waste certified disposal for Apple and Windows fleets.",
        deliverables: ["Zero-touch provisioning profiles", "Encrypted asset tracking database", "Hardware loaner pool management"],
      },
      {
        name: "Identity & Access Management (IAM)",
        description: "Centralized Okta, Microsoft Entra ID (Azure AD), and Google Workspace administration with mandatory phishing-resistant FIDO2 MFA.",
        deliverables: ["Automated SCIM provisioning/deprovisioning", "Conditional access policies", "Quarterly user access privilege reviews"],
      },
      {
        name: "Hybrid Server & Storage Infrastructure",
        description: "Management of on-premises VMware ESXi, Proxmox, Hyper-V clusters, and enterprise NAS/SAN storage arrays.",
        deliverables: ["Hypervisor patch orchestration", "High-availability clustering config", "Bare-metal hardware health monitoring"],
      },
    ],
    techStack: ["Microsoft 365 / Entra ID", "Google Workspace", "Okta", "JAMF Pro", "InTune", "Proxmox VE", "VMware vSphere", "Synology / TrueNAS", "ServiceNow / Jira Service Management"],
    serviceTier: "Full-Spectrum Managed IT (Co-Managed or Fully Outsourced)",
    slaCommitment: "10-Minute Helpdesk Response & 99.9% Core Service Uptime",
    complianceStandards: ["ITIL v4 Framework", "SOC 2 Type II", "CIS Endpoint Hardening Standards"],
  },
  {
    slug: "networking",
    title: "Enterprise Networking & Cloud Migration",
    tagline: "High-availability SD-WAN, multi-gigabit routing, zero-trust network access (ZTNA), and secure multi-cloud interconnects.",
    overview: "UVO Networking designs and maintains high-performance, fault-tolerant network topologies for multi-site headquarters, campus branches, and cloud datacenters. We replace fragile legacy MPLS with modern, encrypted SD-WAN, establish redundant multi-gigabit ISP failovers, and enforce microsegmentation.",
    businessOutcomes: [
      "100% network uptime achieved through automated multi-carrier BGP and 5G cellular backup failovers",
      "Dramatic reduction in WAN transit costs by transitioning from expensive MPLS circuits to intelligent SD-WAN",
      "Seamless and secure remote worker access with Zero-Trust Network Access (ZTNA) replacing insecure legacy VPNs",
      "End-to-end packet visibility and QoS optimization for voice, video, and mission-critical cloud traffic",
    ],
    capabilities: [
      {
        name: "Software-Defined WAN (SD-WAN) & Branch Routing",
        description: "Dynamic path selection across multiple internet carriers, automated failover in under 200ms, and encrypted transport tunnels.",
        deliverables: ["Multi-site SD-WAN architecture design", "Edge router hardware deployment", "Application-aware traffic shaping"],
      },
      {
        name: "Next-Gen Firewall (NGFW) & Perimeter Security",
        description: "Deployment and policy governance of enterprise Fortinet, Palo Alto, and pfSense firewalls with SSL/TLS deep packet inspection.",
        deliverables: ["Zero-trust firewall policy rulesets", "Intrusion Prevention System (IPS) tuning", "Geo-blocking and threat feed syncing"],
      },
      {
        name: "Enterprise Wi-Fi 6E/7 & Campus Switching",
        description: "High-density wireless planning, spectrum heat-mapping, 802.1X certificate authentication, and VLAN microsegmentation.",
        deliverables: ["Predictive RF heatmap site survey", "PoE+ core and distribution switch stacks", "Isolated guest and IoT network enclaves"],
      },
      {
        name: "Direct Cloud Interconnects & Site-to-Site VPN",
        description: "Private AWS Direct Connect, Azure ExpressRoute, and redundant IPsec/WireGuard tunnels linking on-premises servers to cloud VPCs.",
        deliverables: ["Dedicated 1Gbps / 10Gbps cloud links", "BGP dynamic route advertisement", "Encrypted mesh VPN topologies"],
      },
    ],
    techStack: ["Cisco Catalyst / Meraki", "Fortinet FortiGate", "Palo Alto Networks", "Aruba Networks", "pfSense / OPNsense", "WireGuard", "BGP / OSPF", "AWS Direct Connect", "Azure ExpressRoute"],
    serviceTier: "Enterprise Infrastructure & NOC Operations",
    slaCommitment: "99.999% Core Routing Availability SLA",
    complianceStandards: ["NIST SP 800-162 (Zero-Trust)", "PCI-DSS Network Segmentation", "ISO 27001"],
  },
];
