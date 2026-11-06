"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Shield, Lock, Cpu, Globe, Sliders } from "lucide-react";

export function Footer() {
  const triggerCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("uvo:openCookieSettings"));
    }
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-cobalt-600 border border-cobalt-500/40 flex items-center justify-center text-white">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                UVO SOFTTECH
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Engineering high-resilience software systems, zero-trust cybersecurity architectures, managed SIEM operations, and enterprise networking for global enterprises.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                SOC 2 Type II
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                ISO/IEC 27001
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                GDPR & CCPA
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                PCI-DSS Level 1
              </span>
            </div>
          </div>

          {/* Column 2: Products Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Enterprise Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/restaurant-erp-suite" className="hover:text-emerald-400 transition-colors">
                  Restaurant Touch POS & KDS
                </Link>
              </li>
              <li>
                <Link href="/products/corporate-data-backup-tool" className="hover:text-emerald-400 transition-colors">
                  Workstation Backup & WORM
                </Link>
              </li>
              <li>
                <Link href="/products/school-management-system" className="hover:text-emerald-400 transition-colors">
                  School ERP & Campus Portals
                </Link>
              </li>
              <li>
                <Link href="/products/cybersecurity-siem-platform" className="hover:text-emerald-400 transition-colors">
                  Autonomous SIEM & SOAR
                </Link>
              </li>
              <li>
                <Link href="/products/enterprise-mobile-device-management" className="hover:text-emerald-400 transition-colors">
                  Enterprise MDM & Remote Wipe
                </Link>
              </li>
              <li>
                <Link href="/products/custom-software-cloud-engineering" className="hover:text-emerald-400 transition-colors">
                  Custom Cloud Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Services Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/custom-software" className="hover:text-emerald-400 transition-colors">
                  Custom Software & Microservices
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity" className="hover:text-emerald-400 transition-colors">
                  Cybersecurity & Managed SOC
                </Link>
              </li>
              <li>
                <Link href="/services/it-services" className="hover:text-emerald-400 transition-colors">
                  Enterprise IT Support & Helpdesk
                </Link>
              </li>
              <li>
                <Link href="/services/networking" className="hover:text-emerald-400 transition-colors">
                  High-Availability SD-WAN
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Infrastructure & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Governance & Desk
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Engineering Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Incident Response Hotline
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={triggerCookieSettings}
                  className="flex items-center gap-1.5 text-left text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Cookie Preferences</span>
                </button>
              </li>
              <li className="pt-2">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>NOC / SOC Active</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Continuous monitoring across 14 edge pop clusters.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Target Keywords */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UVO SoftTech Corporation. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span>Zero-Trust Architecture</span>
            <span className="text-slate-700">•</span>
            <span>Multi-Tenant Ready</span>
            <span className="text-slate-700">•</span>
            <span>Vercel & Supavisor Pooler Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
