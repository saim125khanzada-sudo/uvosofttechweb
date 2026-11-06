import React from "react";
import Link from "next/link";
import {
  Shield,
  Server,
  Layers,
  Terminal,
  Database,
  Lock,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Activity,
  GitBranch,
  HardDrive,
  Workflow,
  Radio,
  FileCode,
  Sparkles,
  Globe,
} from "lucide-react";
import { PRODUCTS } from "@/lib/products-data";
import { SERVICES } from "@/lib/services-data";
import { TelemetryBadge } from "@/components/common/telemetry-badge";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 py-10 sm:py-16">
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none -z-10" />

        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Live Telemetry Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <TelemetryBadge label="Zero-Trust Architecture" />
            <span className="hidden sm:inline-block text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              Multi-Tenant Ready
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cobalt-950/60 border border-cobalt-500/30 text-cobalt-400">
              Supavisor Pooler Active
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Mission-Critical Software, Managed SIEM & Enterprise Cloud Systems.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-sans">
            Engineered for organizations that require zero-downtime availability, sub-100ms transactional latency, and autonomous cyber threat mitigation.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/products"
              className="px-6 py-3.5 text-sm font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-lg shadow-lg shadow-cobalt-950 border border-cobalt-400/30 transition-all flex items-center gap-2"
            >
              <span>Explore Enterprise Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 text-sm font-mono font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Request Sandbox Access</span>
            </Link>
          </div>

          {/* Metric Telemetry Ticker */}
          <div className="w-full pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-emerald-400">99.999%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
                Uptime Availability
              </div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-cobalt-400">&lt; 45ms</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
                P99 Core Latency
              </div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-white">250k EPS</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
                SIEM Ingestion Stream
              </div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="text-2xl font-bold font-mono text-emerald-400">SOC 2 / ISO</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
                Certified Governance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE BLUEPRINT (REALISTIC ENTERPRISE SCHEMATIC) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                <Workflow className="w-4 h-4" />
                Unified Enterprise Architecture Blueprint
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Decoupled, Resilient, Connection-Pooled Systems
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Pipeline Topology
            </div>
          </div>

          {/* Distributed Topology Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-colors">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Tier 01 // Edge & Ingress
              </div>
              <div className="flex items-center gap-2 font-semibold text-white text-sm">
                <Globe className="w-4 h-4 text-cobalt-400" />
                Global Anycast CDN
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vercel Edge Network routing with TLS 1.3 termination, automatic DDoS scrubbing, and geo-replicated SSR.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                Protocols: HTTP/3 • QUIC
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-colors">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Tier 02 // Application Layer
              </div>
              <div className="flex items-center gap-2 font-semibold text-white text-sm">
                <Cpu className="w-4 h-4 text-emerald-400" />
                Next.js 15 App Router
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Server Components with async streaming, typed Server Actions, and strict Zod runtime payload validation.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                Runtime: Node 24 • React 19
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-colors">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Tier 03 // Connection Pooler
              </div>
              <div className="flex items-center gap-2 font-semibold text-white text-sm">
                <Radio className="w-4 h-4 text-cobalt-400" />
                Supavisor Pooler (Port 6543)
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transaction-mode multiplexing preventing serverless pool exhaustion under sudden high-concurrency spikes.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                Mode: Transaction • Zero Leak
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-colors">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Tier 04 // Persistence & Vault
              </div>
              <div className="flex items-center gap-2 font-semibold text-white text-sm">
                <Database className="w-4 h-4 text-emerald-400" />
                Supabase PostgreSQL 16
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Row Level Security (RLS) policies, immutable audit logging, and WORM-compliant snapshot replication.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                Security: Strict RLS • AES-256
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cobalt-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              Enterprise Solutions
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Six Purpose-Built Software Platforms
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Each product is architected for autonomous operation, localized failover, and comprehensive enterprise API extensibility.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
          >
            <span>View All Product Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.slug}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/90 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {prod.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    {prod.keyMetrics[0]?.value}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {prod.tagline}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400">Key Capabilities:</div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {prod.features.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{f.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {prod.deploymentOptions[0]}
                </span>
                <Link
                  href={`/products/${prod.slug}`}
                  className="text-xs font-mono text-cobalt-400 group-hover:text-cobalt-300 flex items-center gap-1"
                >
                  Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE SERVICES DIRECTORY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <Server className="w-4 h-4" />
            Engineering Services Directory
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Infrastructure & Cybersecurity Operations
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            From managed 24/7 SOC detection to enterprise-wide SD-WAN rollouts and bespoke cloud microservices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.slug}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {srv.tagline}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap">
                  {srv.slaCommitment.split("&")[0]}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">Enterprise Capabilities:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {srv.capabilities.map((cap) => (
                    <div
                      key={cap.name}
                      className="p-2.5 rounded bg-slate-950/80 border border-slate-800/80 text-slate-300"
                    >
                      <div className="font-semibold text-slate-200">{cap.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {cap.deliverables[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
                  {srv.complianceStandards.slice(0, 3).map((std) => (
                    <span key={std} className="px-1.5 py-0.5 rounded bg-slate-800/80">
                      {std}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/services/${srv.slug}`}
                  className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  Service Architecture <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ZERO-TRUST SECURITY & COMPLIANCE SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              Defense-In-Depth Security
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sovereign Data Protection & Zero-Trust Governance
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every system deployed by UVO SoftTech complies with international regulatory standards. We implement Row-Level Security, air-gapped cryptographic backups, and continuous MITRE ATT&CK SIEM telemetry auditing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-mono text-xs font-semibold text-emerald-400">
                Zero-Trust Access
              </div>
              <p className="text-xs text-slate-400">
                Mutual TLS (mTLS), ephemeral credentials, and phishing-resistant FIDO2 biometric authentication.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-mono text-xs font-semibold text-emerald-400">
                Immutable WORM Defense
              </div>
              <p className="text-xs text-slate-400">
                Write-Once-Read-Many storage lockers safeguarding business logs and backups from ransomware encryption.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-mono text-xs font-semibold text-emerald-400">
                Transaction Pooler
              </div>
              <p className="text-xs text-slate-400">
                Supavisor connection pooling prevents serverless DB exhaustion during 100k+ concurrent requests.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-mono text-xs font-semibold text-emerald-400">
                SOC 2 / ISO Ready
              </div>
              <p className="text-xs text-slate-400">
                Continuous automated audit evidence collection for seamless annual compliance recertification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Modernize Your Enterprise Infrastructure?
          </h2>
          <p className="text-sm text-slate-400">
            Consult with our principal systems engineers, inspect our product architecture sandboxes, or request dedicated tenant provisioning.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3.5 text-sm font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <span>Schedule Architectural Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products"
            className="px-6 py-3.5 text-sm font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-all"
          >
            Inspect Technical Sandboxes
          </Link>
        </div>
      </section>
    </div>
  );
}
