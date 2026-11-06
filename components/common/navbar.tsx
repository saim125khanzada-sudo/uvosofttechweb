"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Layers,
  Server,
  Terminal,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Smartphone,
  BookOpen,
  UtensilsCrossed,
} from "lucide-react";
import { TelemetryBadge } from "@/components/common/telemetry-badge";

const PRODUCT_LINKS = [
  {
    name: "Restaurant ERP Suite",
    desc: "Omni-channel Touch POS, KDS & delivery dispatch engine",
    href: "/products/restaurant-erp-suite",
    icon: UtensilsCrossed,
  },
  {
    name: "Corporate Data Backup Tool",
    desc: "Continuous endpoint deduplication & immutable WORM storage",
    href: "/products/corporate-data-backup-tool",
    icon: Database,
  },
  {
    name: "School Management System",
    desc: "Admissions, attendance, automated grading & fiscal tuition portal",
    href: "/products/school-management-system",
    icon: BookOpen,
  },
  {
    name: "Cybersecurity SIEM Platform",
    desc: "Real-time log streaming, MITRE ATT&CK & automated SOAR triage",
    href: "/products/cybersecurity-siem-platform",
    icon: Lock,
  },
  {
    name: "Enterprise MDM",
    desc: "Fleet policy enforcement, remote wipe & endpoint compliance",
    href: "/products/enterprise-mobile-device-management",
    icon: Smartphone,
  },
  {
    name: "Custom Software & Cloud",
    desc: "Bespoke high-concurrency microservices & cloud architectures",
    href: "/products/custom-software-cloud-engineering",
    icon: Cpu,
  },
];

const SERVICE_LINKS = [
  {
    name: "Custom Software & Cloud",
    desc: "Modern enterprise apps, microservices & database tuning",
    href: "/services/custom-software",
  },
  {
    name: "Enterprise Cybersecurity",
    desc: "Managed SIEM, 24/7 SOC, pen-testing & compliance",
    href: "/services/cybersecurity",
  },
  {
    name: "IT Support & Infrastructure",
    desc: "Tier 1-3 helpdesk, workstation fleet & IAM governance",
    href: "/services/it-services",
  },
  {
    name: "Enterprise Networking",
    desc: "High-availability SD-WAN, Wi-Fi 6E/7 & multi-cloud interconnects",
    href: "/services/networking",
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-cobalt-600 to-slate-900 border border-cobalt-500/40 flex items-center justify-center text-white shadow-sm group-hover:border-cobalt-400 transition-colors">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                UVO SOFTTECH
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Enterprise Engineering
              </span>
            </div>
          </Link>

          <div className="hidden xl:block pl-2 border-l border-slate-800">
            <TelemetryBadge label="All Systems Operational" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              className={`px-3 py-2 text-xs uppercase tracking-wider font-mono flex items-center gap-1 rounded-md transition-colors ${
                pathname.startsWith("/products")
                  ? "text-emerald-400 bg-slate-900 border border-slate-800"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <span>Products</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {productsOpen && (
              <div className="absolute top-full left-0 w-[540px] p-3 rounded-lg bg-slate-950 border border-slate-800 shadow-2xl grid grid-cols-2 gap-2 mt-1 z-50">
                {PRODUCT_LINKS.map((prod) => {
                  const Icon = prod.icon;
                  return (
                    <Link
                      key={prod.href}
                      href={prod.href}
                      onClick={() => setProductsOpen(false)}
                      className="p-2.5 rounded-md hover:bg-slate-900/90 border border-transparent hover:border-slate-800 group transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                          {prod.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {prod.desc}
                      </p>
                    </Link>
                  );
                })}
                <div className="col-span-2 pt-2 mt-1 border-t border-slate-800/80 flex items-center justify-between text-xs px-2">
                  <span className="text-slate-500 font-mono text-[11px]">Architecture Previews Ready</span>
                  <Link
                    href="/products"
                    onClick={() => setProductsOpen(false)}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    View All Suites <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`px-3 py-2 text-xs uppercase tracking-wider font-mono flex items-center gap-1 rounded-md transition-colors ${
                pathname.startsWith("/services")
                  ? "text-emerald-400 bg-slate-900 border border-slate-800"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 w-[420px] p-3 rounded-lg bg-slate-950 border border-slate-800 shadow-2xl space-y-1.5 mt-1 z-50">
                {SERVICE_LINKS.map((srv) => (
                  <Link
                    key={srv.href}
                    href={srv.href}
                    onClick={() => setServicesOpen(false)}
                    className="block p-2.5 rounded-md hover:bg-slate-900/90 border border-transparent hover:border-slate-800 group transition-all"
                  >
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white mb-0.5">
                      {srv.name}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{srv.desc}</p>
                  </Link>
                ))}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs px-2">
                  <Link
                    href="/services"
                    onClick={() => setServicesOpen(false)}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    Explore Service Matrix <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`px-3 py-2 text-xs uppercase tracking-wider font-mono rounded-md transition-colors ${
              pathname === "/about"
                ? "text-emerald-400 bg-slate-900 border border-slate-800"
                : "text-slate-300 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            Engineering
          </Link>

          <Link
            href="/contact"
            className={`px-3 py-2 text-xs uppercase tracking-wider font-mono rounded-md transition-colors ${
              pathname === "/contact"
                ? "text-emerald-400 bg-slate-900 border border-slate-800"
                : "text-slate-300 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/products#sandboxes"
            className="px-3.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-md transition-all flex items-center gap-1.5"
          >
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            Live Sandboxes
          </Link>

          <Link
            href="/contact"
            className="px-4 py-1.5 text-xs font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-md shadow-sm border border-cobalt-400/30 transition-all flex items-center gap-1.5"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-md border border-slate-800"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="py-2 border-b border-slate-800/80">
            <TelemetryBadge label="Enterprise Cloud v2.0 - Active" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-2">
              Products Architecture
            </span>
            <div className="grid grid-cols-1 gap-1 pt-1">
              {PRODUCT_LINKS.map((prod) => (
                <Link
                  key={prod.href}
                  href={prod.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md flex items-center justify-between"
                >
                  <span>{prod.name}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-2">
              Services Directory
            </span>
            <div className="grid grid-cols-1 gap-1 pt-1">
              {SERVICE_LINKS.map((srv) => (
                <Link
                  key={srv.href}
                  href={srv.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md flex items-center justify-between"
                >
                  <span>{srv.name}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md"
            >
              Engineering & Architecture
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md"
            >
              Contact Operations Desk
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-md shadow-sm"
            >
              Request Architecture Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
