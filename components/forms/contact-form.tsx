"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitLeadInquiry } from "@/lib/actions";

interface ContactFormProps {
  initialService?: string;
}

export function ContactForm({ initialService = "custom-software" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_interest: initialService,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("company", formData.company);
    fd.append("service_interest", formData.service_interest);
    fd.append("message", formData.message);

    const res = await submitLeadInquiry(fd);
    setIsSubmitting(false);
    setResult(res);

    if (res.success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service_interest: initialService,
        message: "",
      });
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="mb-6 space-y-1">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          Contact Enterprise Engineering Desk
        </h3>
        <p className="text-xs text-slate-400">
          Direct dispatch to our technical architects and security operations team.
        </p>
      </div>

      {result && (
        <div
          className={`p-4 rounded-lg mb-6 text-xs leading-relaxed flex items-start gap-3 border ${
            result.success
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border-red-500/40 text-red-300"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-semibold">{result.message}</div>
            {result.errors && (
              <ul className="list-disc list-inside mt-2 space-y-1 text-red-400">
                {Object.entries(result.errors).map(([field, errs]) => (
                  <li key={field}>{errs.join(", ")}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Alex Vance"
              className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@acmecorp.com"
              className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Phone / Direct Dial
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Company / Institution
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Global Inc"
              className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
            Primary Area of Interest *
          </label>
          <select
            value={formData.service_interest}
            onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cobalt-500 transition-colors"
          >
            <optgroup label="Enterprise Products">
              <option value="Restaurant ERP Suite">Restaurant Touch POS & KDS Suite</option>
              <option value="Corporate Data Backup Tool">Corporate Data Backup & Immutable Storage</option>
              <option value="School Management System">School ERP & Campus Portals</option>
              <option value="Cybersecurity SIEM Platform">Cybersecurity SIEM Platform & SOAR</option>
              <option value="Enterprise MDM">Enterprise Mobile Device Management (MDM)</option>
              <option value="Custom Cloud Engineering">Custom Software & Cloud Architecture</option>
            </optgroup>
            <optgroup label="Professional Services">
              <option value="Custom Software & Microservices">Custom Software & Microservices</option>
              <option value="Cybersecurity & SOC Operations">Cybersecurity & Managed SOC</option>
              <option value="Enterprise IT Support">Enterprise IT Support & Helpdesk</option>
              <option value="Enterprise Networking & SD-WAN">Enterprise Networking & SD-WAN</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
            Project Scope / Technical Requirements *
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Outline your architectural parameters, user scale, compliance requirements, or target timeline..."
            className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-lg bg-cobalt-600 hover:bg-cobalt-500 text-white text-xs font-medium uppercase tracking-wider font-mono shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Secure Payload...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Dispatch Inquiry to Engineering Desk</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 text-center font-mono">
          Encrypted with TLS 1.3 • Zero-Knowledge RLS Policy • 4h Engineering SLA
        </p>
      </form>
    </div>
  );
}
