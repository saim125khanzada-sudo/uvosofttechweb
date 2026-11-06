import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Server,
  ArrowRight,
  Shield,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  Clock,
  Radio,
  FileCheck,
} from "lucide-react";
import { SERVICES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Enterprise Engineering Services Directory & SOC Operations",
  description:
    "Comprehensive enterprise engineering services: Custom Software Development, Cybersecurity & 24/7 Managed SIEM, Corporate IT Support, and Enterprise Networking.",
  keywords: [
    "Custom Software Development & ERP Systems",
    "Enterprise Cybersecurity Solutions & Managed SIEM",
    "Corporate IT Support & Infrastructure Services",
    "Enterprise Networking & Cloud Migration Solutions",
  ],
};

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400">
          <Server className="w-3.5 h-3.5" />
          Enterprise Services Directory
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering & Operations Matrix
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          From full-lifecycle custom cloud engineering and round-the-clock SOC threat hunting to multi-gigabit campus networking and automated corporate fleet management.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((srv) => (
          <div
            key={srv.slug}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all space-y-6"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  {srv.serviceTier}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-500" />
                  {srv.slaCommitment.split("&")[0]}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">{srv.title}</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {srv.overview}
                </p>
              </div>

              {/* Business Outcomes */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-mono uppercase text-slate-400">
                  Business Outcomes:
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {srv.businessOutcomes.slice(0, 3).map((bo, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 leading-tight">{bo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {srv.techStack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-500">
                {srv.complianceStandards.slice(0, 2).join(" • ")}
              </div>
              <Link
                href={`/services/${srv.slug}`}
                className="px-4 py-2 rounded-md bg-cobalt-600 hover:bg-cobalt-500 text-xs font-medium text-white transition-colors flex items-center gap-1.5"
              >
                <span>Service Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Models Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 space-y-6">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-lg font-bold text-white">
            Enterprise Engagement & Retainer Models
          </h3>
          <p className="text-xs text-slate-400">
            Whether you require a dedicated engineering pod for custom microservices, a fully outsourced 24/7 SOC, or co-managed enterprise IT infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-semibold text-emerald-400">Dedicated Pod (Retainer)</div>
            <p className="text-slate-400 text-[11px]">
              Senior architects, full-stack engineers, and QA leads dedicated full-time to your backlog.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-semibold text-cobalt-400">Fixed-Scope Modernization</div>
            <p className="text-slate-400 text-[11px]">
              Milestone-based delivery with guaranteed SLA cutovers for migrations and bespoke builds.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-semibold text-emerald-400">24/7 Incident Escalation SLA</div>
            <p className="text-slate-400 text-[11px]">
              Guaranteed 15-minute response time for critical production downtime or cyber breach events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
