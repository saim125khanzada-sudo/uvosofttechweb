import React from "react";

interface TelemetryBadgeProps {
  status?: "operational" | "active" | "monitored";
  label?: string;
  className?: string;
}

export function TelemetryBadge({
  status = "operational",
  label = "Systems Operational - 99.999% SLA",
  className = "",
}: TelemetryBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-sm ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>{label}</span>
    </div>
  );
}
