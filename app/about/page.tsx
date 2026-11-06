import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Terminal,
  Shield,
  Cpu,
  Server,
  Workflow,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
} from "lucide-react";
import { TelemetryBadge } from "@/components/common/telemetry-badge";

export const metadata: Metadata = {
  title: "Engineering Standards & Infrastructure Architecture",
  description:
    "Learn about UVO SoftTech's zero-trust engineering philosophy, connection-pooled database architectures, and round-the-clock SOC telemetry operations.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400">
          <Terminal className="w-3.5 h-3.5" />
          Engineering Philosophy & Standards
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Reliability as a First-Class System Property
        </h1>
        <p className="text-base text-slate-400 leading-relaxed font-sans">
          At UVO SoftTech, we design distributed systems that operate deterministically under network partition, peak transaction spikes, and targeted cyber attack vectors.
        </p>
      </div>

      {/* Core Tenets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
            <Lock className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white">Zero-Trust by Default</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Perimeter defenses are obsolete. Every microservice, client request, and database mutation must present verified cryptographic credentials and pass strict Row Level Security (RLS) constraints.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cobalt-400">
            <Database className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white">Connection Resilience & Poolers</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Serverless architectures fail when database pools exhaust. We mandate transaction multiplexers (Supavisor on port 6543) and circuit breakers to handle 100k+ concurrent mutations cleanly.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white">Local-First Failover</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Whether powering multi-unit restaurant kitchen displays or hospital device management, edge hubs maintain local SQLite replication to keep operations fluid during wide-area internet blackouts.
          </p>
        </div>
      </div>

      {/* Verification & Compliance Blueprint */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h3 className="text-xl font-bold text-white">
              Compliance Governance & Audit Trail Integrity
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Rigorous verification frameworks embedded directly within our continuous integration and deployment pipelines.
            </p>
          </div>
          <TelemetryBadge label="Continuous Audit: PASS" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-bold">SOC 2 Type II</div>
            <div className="text-slate-300">Security & Confidentiality</div>
            <div className="text-[11px] text-slate-500">Audited Annually</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-bold">ISO/IEC 27001:2022</div>
            <div className="text-slate-300">Information Security Mgmt</div>
            <div className="text-[11px] text-slate-500">Certified Scope</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-bold">PCI-DSS 4.0 Level 1</div>
            <div className="text-slate-300">Cardholder Data Security</div>
            <div className="text-[11px] text-slate-500">Tokenized Enclaves</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-bold">GDPR & CCPA</div>
            <div className="text-slate-300">Sovereign Data Rights</div>
            <div className="text-[11px] text-slate-500">Right to Erasure API</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">
            Schedule an Architectural Deep-Dive
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Meet with our principal infrastructure architects to review your technical blueprints.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-500 text-white text-xs font-medium font-mono shrink-0"
        >
          Dispatch Direct Inquiry
        </Link>
      </div>
    </div>
  );
}
