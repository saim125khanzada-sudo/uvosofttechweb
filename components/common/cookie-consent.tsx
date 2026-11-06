"use client";

import React, { useState, useEffect } from "react";
import { Shield, Check, Settings2, X } from "lucide-react";
import { setCookiePreferences } from "@/lib/actions";

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has already been recorded
    const cookies = document.cookie.split("; ");
    const consentCookie = cookies.find((row) => row.startsWith("uvo_cookie_consent="));

    if (!consentCookie) {
      // Delay slightly for smooth rendering
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(decodeURIComponent(consentCookie.split("=")[1]));
        setSettings({
          essential: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
        });
      } catch {
        setIsOpen(true);
      }
    }

    // Listen for custom open event triggered by footer button
    const handleOpenSettings = () => {
      setIsOpen(true);
      setShowPreferences(true);
    };

    window.addEventListener("uvo:openCookieSettings", handleOpenSettings);
    return () => window.removeEventListener("uvo:openCookieSettings", handleOpenSettings);
  }, []);

  const handleSave = async (preferences: CookieSettings) => {
    setSettings(preferences);
    setIsOpen(false);
    setShowPreferences(false);

    // Persist via Server Action
    await setCookiePreferences(preferences);

    // Also persist directly to document cookie for instant client-side read
    const serialized = encodeURIComponent(
      JSON.stringify({ ...preferences, timestamp: new Date().toISOString() })
    );
    document.cookie = `uvo_cookie_consent=${serialized}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const handleAcceptAll = () => {
    handleSave({ essential: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    handleSave({ essential: true, analytics: false, marketing: false });
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Privacy Settings"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {!showPreferences ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-1 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  Enterprise Data Privacy & Security Governance
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                    GDPR / CCPA Compliant
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  UVO SoftTech uses cookies to maintain secure sessions, monitor telemetry performance, and provide optimal enterprise capabilities. We respect your sovereign data choices.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md transition-colors flex items-center gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Customize
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-md shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-100">
                  Granular Cookie & Telemetry Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close preferences"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Essential */}
              <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Essential & Security</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Always Required
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Required for CSRF defense, Supabase authentication tokens, load balancing, and connection pooling.
                </p>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Telemetry & Performance</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-400">
                  Aggregates anonymous latency telemetry, Core Web Vitals, and server routing performance metrics.
                </p>
              </div>

              {/* Marketing */}
              <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Marketing & Sandbox Attribution</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.marketing}
                      onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-400">
                  Enables product sandbox analytics and customized enterprise case study recommendations.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSave(settings)}
                className="px-4 py-2 text-xs font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 rounded-md shadow-sm transition-colors"
              >
                Save Selected Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
