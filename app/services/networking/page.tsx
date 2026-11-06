import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Radio,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Workflow,
  Globe,
  Shield,
} from "lucide-react";
import { SERVICES } from "@/lib/services-data";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Enterprise Networking & Cloud Migration Solutions | SD-WAN",
  description:
    "High-availability SD-WAN, multi-gigabit campus routing, Wi-Fi 6E/7, next-gen firewall security, and direct multi-cloud interconnects.",
  keywords: [
    "Enterprise Networking & Cloud Migration Solutions",
    "High Availability SD-WAN Routing",
    "Next Gen Firewall NGFW Microsegmentation",
    "Direct Cloud Interconnects AWS ExpressRoute",
  ],
};

export default function NetworkingServicePage() {
  const service = SERVICES.find((s) => s.slug === "networking")!;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Enterprise Networking & Cloud Migration Solutions",
    provider: {
      "@type": "Organization",
      name: "UVO SoftTech",
    },
    description: service.overview,
    termsOfService: "99.999% Core Routing Availability SLA",
    areaServed: "Global",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Services Directory</span>
        </Link>
      </div>

      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400">
            {service.serviceTier}
          </span>
          <span className="px-2.5 py-1 rounded text-xs font-mono bg-cobalt-950/60 border border-cobalt-500/30 text-cobalt-400">
            {service.slaCommitment}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Enterprise Networking & Cloud Migration Solutions
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
          {service.overview}
        </p>
      </div>

      {/* Business Outcomes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {service.businessOutcomes.map((outcome, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2"
          >
            <div className="font-mono text-xs font-semibold text-emerald-400">
              Network Metric 0{idx + 1}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{outcome}</p>
          </div>
        ))}
      </div>

      {/* Capabilities & Deliverables */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Workflow className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Networking Capabilities & Topology Deliverables</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.capabilities.map((cap) => (
            <div
              key={cap.name}
              className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-base font-bold text-white">{cap.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cap.description}</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono uppercase text-slate-500">
                  Target Deliverables:
                </span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {cap.deliverables.map((del) => (
                    <li key={del} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware & Cloud Interconnect Ecosystem */}
      <section className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Validated Network Vendor & Protocol Ecosystem
        </h3>
        <div className="flex flex-wrap gap-2">
          {service.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Contact & Consultation Form */}
      <section className="pt-6">
        <ContactForm initialService="Enterprise Networking & SD-WAN" />
      </section>
    </div>
  );
}
