import React from "react";
import { Metadata } from "next";
import {
  Terminal,
  ShieldAlert,
  Clock,
  Phone,
  Mail,
  MapPin,
  Lock,
  Radio,
} from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { TelemetryBadge } from "@/components/common/telemetry-badge";

export const metadata: Metadata = {
  title: "Contact Engineering Operations Desk & Security Hotline",
  description:
    "Direct engineering escalation desk and commercial consultation. 4-hour SLA response for technical inquiries and 15-minute emergency SOC triage.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <TelemetryBadge label="Dispatch Desk Online" />
          <span className="text-xs font-mono text-slate-400">Response SLA: &lt; 4 Hours</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect with Solution Architects & SOC Operations
        </h1>
        <p className="text-base text-slate-400 leading-relaxed font-sans">
          Whether you need a dedicated enterprise demo sandbox, custom microservices planning, or emergency cybersecurity triage, our engineering team is standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column: Direct Channels & Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          {/* Emergency Triage Card */}
          <div className="p-6 rounded-xl border border-red-900/50 bg-red-950/20 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Active Cyber Incident / Emergency SOC
            </div>
            <p className="text-xs text-red-200 leading-relaxed">
              For active breach investigations, suspected ransomware intrusions, or critical infrastructure outages under active retainer.
            </p>
            <div className="pt-2 font-mono text-xs text-red-300">
              Hotline: <span className="font-bold underline">+1 (800) 886-8324</span>
              <div className="text-[11px] text-red-400 mt-0.5">SLA: Sub-15 Minute Analyst Escalation</div>
            </div>
          </div>

          {/* Operational Headquarters & Points of Contact */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Engineering Dispatch Coordinates
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-400 font-mono">Inquiries & Architecture</div>
                  <div className="text-slate-200 font-medium">engineering@uvosofttech.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-400 font-mono">Enterprise Desk</div>
                  <div className="text-slate-200 font-medium">+1 (800) UVO-TECH (886-8324)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-400 font-mono">Coverage Window</div>
                  <div className="text-slate-200 font-medium">24/7/365 Global Operations</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-400 font-mono">GPG Encryption Key</div>
                  <div className="text-slate-400 font-mono text-[11px] break-all">
                    4A7F 92B1 C388 E105 8D99 443B A109 23F5 8812 EF90
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Target Verification Checklist
              </div>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Strict Non-Disclosure Agreement (NDA) on request</li>
                <li>• Architecture assessment & workload sizing</li>
                <li>• Supabase transaction pooler load benchmarking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
