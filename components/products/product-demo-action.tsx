"use client";

import React, { useState } from "react";
import { Terminal, Play, Sparkles, CheckCircle2, ShieldCheck, X, Loader2, ArrowRight } from "lucide-react";
import { submitDemoRequest } from "@/lib/actions";

interface ProductDemoActionProps {
  productName: string;
  slug: string;
  liveSandboxSupported: boolean;
  activeDemoEnvironment?: string;
}

export function ProductDemoAction({
  productName,
  slug,
  liveSandboxSupported,
  activeDemoEnvironment,
}: ProductDemoActionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [sandboxActive, setSandboxActive] = useState(false);
  const [sandboxLog, setSandboxLog] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Form State
  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("50-250");
  const [deploymentType, setDeploymentType] = useState<
    "cloud_saas" | "on_premises_hybrid" | "air_gapped_private" | "sandbox_preview"
  >("cloud_saas");

  const handleLaunchSandbox = () => {
    setSandboxActive(true);
    setSandboxLog([
      `[0.00s] Initializing ephemeral container sandbox for ${productName}...`,
      `[0.45s] Allocating isolated PostgreSQL multi-tenant schema...`,
      `[0.82s] Provisioning mock enterprise seed data...`,
      `[1.20s] Live sandbox ready. Interactive demo session established.`,
    ]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("applicant_name", applicantName);
    formData.append("email", email);
    formData.append("company_size", companySize);
    formData.append("deployment_type", deploymentType);

    const res = await submitDemoRequest(formData);
    setIsSubmitting(false);
    setSubmissionResult(res);

    if (res.success) {
      setTimeout(() => {
        setModalOpen(false);
        setSubmissionResult(null);
        setApplicantName("");
        setEmail("");
      }, 4000);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Sandbox Ready
            </span>
            <span className="text-xs font-mono text-slate-400">Environment ID: env_{slug}</span>
          </div>
          <h3 className="text-base font-semibold text-white mt-1">
            Test Drive {productName} Architecture
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {liveSandboxSupported && !sandboxActive && (
            <button
              type="button"
              onClick={handleLaunchSandbox}
              className="px-4 py-2 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 rounded-lg transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              Launch Ephemeral Sandbox
            </button>
          )}

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 text-xs font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 border border-cobalt-400/30 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Request Private Tenant
          </button>
        </div>
      </div>

      {/* Ephemeral Sandbox Terminal Preview */}
      {sandboxActive && (
        <div className="rounded-lg bg-black border border-slate-800 p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>sandbox-shell://{slug}.instance.internal:8080</span>
            </div>
            <button
              onClick={() => setSandboxActive(false)}
              className="text-slate-500 hover:text-slate-300 text-xs"
            >
              Terminate Session
            </button>
          </div>
          <div className="space-y-1 text-slate-300">
            {sandboxLog.map((log, idx) => (
              <div key={idx} className="text-emerald-400/90">
                {log}
              </div>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900">
            <span>Session Lease: 45:00 minutes remaining</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Zero-Trust Verified
            </span>
          </div>
        </div>
      )}

      {/* Value Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-slate-200">Full Isolation</div>
            <div className="text-[11px] text-slate-400">Air-gapped tenant sandbox with real dataset simulation</div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-3">
          <Terminal className="w-4 h-4 text-cobalt-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-slate-200">API & CLI Direct Access</div>
            <div className="text-[11px] text-slate-400">Includes OpenAPI specs, webhook receivers, and SDK keys</div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-slate-200">No Credit Card</div>
            <div className="text-[11px] text-slate-400">Instantly provisioned for verified engineering leaders</div>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Tenant Request */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl bg-slate-950 border border-slate-800 p-6 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cobalt-600/20 text-cobalt-400 border border-cobalt-500/30 text-xs font-mono">
                Dedicated Tenant Deployment
              </div>
              <h3 className="text-lg font-bold text-white">
                Request Private Sandbox: {productName}
              </h3>
              <p className="text-xs text-slate-400">
                Our infrastructure automation will generate an isolated environment tailored to your workload size.
              </p>
            </div>

            {submissionResult ? (
              <div
                className={`p-4 rounded-lg border text-xs leading-relaxed ${
                  submissionResult.success
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                    : "bg-red-950/40 border-red-500/40 text-red-300"
                }`}
              >
                {submissionResult.message}
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Engineering Lead / Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Sarah Connor, VP Infrastructure"
                    className="w-full px-3 py-2 text-xs rounded-md bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cobalt-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@enterprise-corp.com"
                    className="w-full px-3 py-2 text-xs rounded-md bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cobalt-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Organization Scale
                    </label>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-md bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cobalt-500"
                    >
                      <option value="1-20">1 - 20 employees</option>
                      <option value="21-100">21 - 100 employees</option>
                      <option value="101-1000">101 - 1,000 employees</option>
                      <option value="1000+">1,000+ Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Deployment Type
                    </label>
                    <select
                      value={deploymentType}
                      onChange={(e) =>
                        setDeploymentType(
                          e.target.value as
                            | "cloud_saas"
                            | "on_premises_hybrid"
                            | "air_gapped_private"
                            | "sandbox_preview"
                        )
                      }
                      className="w-full px-3 py-2 text-xs rounded-md bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cobalt-500"
                    >
                      <option value="cloud_saas">Cloud SaaS (Multi-Tenant)</option>
                      <option value="on_premises_hybrid">Hybrid On-Premises</option>
                      <option value="air_gapped_private">Air-Gapped Private VPC</option>
                      <option value="sandbox_preview">Ephemeral Preview</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-xs font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Generating Ticket...
                      </>
                    ) : (
                      <>
                        Submit Request <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
