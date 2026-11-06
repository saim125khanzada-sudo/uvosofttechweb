import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Layers,
  ArrowRight,
  Shield,
  CheckCircle2,
  Cpu,
  Server,
  Terminal,
  Activity,
  Play,
  Database,
  Lock,
  Smartphone,
  BookOpen,
  UtensilsCrossed,
} from "lucide-react";
import { PRODUCTS } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "Enterprise Products Architecture & Live Sandboxes",
  description:
    "Explore UVO SoftTech's six mission-critical software platforms: Restaurant POS Suite, Corporate Workstation Backup, School ERP, SIEM SOC Platform, MDM, and Custom Cloud Systems.",
};

const iconMap: Record<string, React.ElementType> = {
  "restaurant-erp-suite": UtensilsCrossed,
  "corporate-data-backup-tool": Database,
  "school-management-system": BookOpen,
  "cybersecurity-siem-platform": Lock,
  "enterprise-mobile-device-management": Smartphone,
  "custom-software-cloud-engineering": Cpu,
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400">
          <Layers className="w-3.5 h-3.5" />
          Enterprise Products Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Battle-Tested Enterprise Software Platforms
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Engineered for continuous operation, modular deployment, and high-concurrency throughput. Each platform supports ephemeral sandboxes and dedicated VPC tenant provisioning.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((prod) => {
          const Icon = iconMap[prod.slug] || Server;
          return (
            <div
              key={prod.slug}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:border-slate-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                    {prod.architectureTier.split(" ")[0]}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {prod.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {prod.tagline}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  {prod.keyMetrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="p-2 rounded bg-slate-950/70 border border-slate-800/70">
                      <div className="text-xs font-bold font-mono text-white">{m.value}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feature Bullets */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400">
                    Core Capabilities:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {prod.features.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 leading-tight">{f.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sandbox Available
                </span>
                <Link
                  href={`/products/${prod.slug}`}
                  className="px-3 py-1.5 rounded-md bg-slate-800 text-xs font-mono text-white hover:bg-cobalt-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Architecture</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ephemeral Sandboxes Callout Section */}
      <section
        id="sandboxes"
        className="rounded-2xl border border-slate-800 bg-slate-950 p-8 sm:p-10 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Ephemeral Production Sandboxes
            </h3>
            <p className="text-xs text-slate-400">
              Spin up dedicated containerized sandboxes for any product to inspect database schema, API contracts, and user roles.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2 text-xs font-mono text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-lg transition-colors flex items-center gap-2 shrink-0"
          >
            Request Private VPC Cluster <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="font-mono text-emerald-400 font-semibold">1. Zero-Friction Launch</div>
            <p className="text-slate-400">
              Isolated multi-tenant schemas provisioned in seconds with synthetic enterprise datasets.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="font-mono text-cobalt-400 font-semibold">2. Live API & Webhooks</div>
            <p className="text-slate-400">
              Direct access to interactive OpenAPI docs, mock payment processors, and audit streams.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="font-mono text-emerald-400 font-semibold">3. Seamless Migration</div>
            <p className="text-slate-400">
              Graduate your sandbox testing into a production tenant with one-click configuration export.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
