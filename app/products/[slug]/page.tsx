import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Server,
  Database,
  Lock,
  Cpu,
  Clock,
  Zap,
  Workflow,
  Sparkles,
  Terminal,
  FileText,
} from "lucide-react";
import { PRODUCTS } from "@/lib/products-data";
import { ProductDemoAction } from "@/components/products/product-demo-action";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Enterprise Architecture & Specifications`,
    description: product.tagline,
    openGraph: {
      title: `${product.name} - Enterprise Architecture`,
      description: product.description,
      type: "website",
      url: `https://uvosofttech.com/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Schema.org SoftwareApplication JSON-LD
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    operatingSystem: "Multi-Platform, Linux, Windows, macOS, Android, iOS, Cloud",
    applicationCategory: product.category,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "84",
    },
    softwareRequirements: product.technicalSpecifications.protocol,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />

      {/* Back link */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Products Catalog</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400">
            {product.category}
          </span>
          <span className="px-2.5 py-1 rounded text-xs font-mono bg-cobalt-950/60 border border-cobalt-500/30 text-cobalt-400">
            {product.architectureTier}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {product.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
          {product.description}
        </p>
      </div>

      {/* Key Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {product.keyMetrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800"
          >
            <div className="text-2xl font-bold font-mono text-emerald-400">{metric.value}</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{metric.label}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{metric.detail}</div>
          </div>
        ))}
      </div>

      {/* Product Demo Action Component (Sandboxes, Waitlist, Previews) */}
      <ProductDemoAction
        productName={product.name}
        slug={product.slug}
        liveSandboxSupported={product.liveSandboxSupported}
        activeDemoEnvironment={product.activeDemoEnvironment}
      />

      {/* Architecture Blueprint Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Workflow className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">System Architecture & Layer Topology</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {product.architectureDiagram.layers.map((layer, idx) => (
            <div
              key={layer.name}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3"
            >
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Tier {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-bold text-white">{layer.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{layer.description}</p>
              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Components:</span>
                {layer.components.map((comp) => (
                  <div key={comp} className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cobalt-400"></span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Data Flow Pipeline */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            Transaction Data Pipeline Lifecycle
          </div>
          <ol className="space-y-2 text-slate-300 list-decimal list-inside">
            {product.architectureDiagram.dataFlow.map((flow, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-400">{flow}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-cobalt-400" />
          <h2 className="text-xl font-bold text-white">Production Capabilities & Feature Matrix</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
            >
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feature.title}</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specifications Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Technical Specifications & Runtime Matrix</h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="p-5 space-y-3">
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Transmission Protocol</span>
                <div className="text-slate-200 mt-0.5">{product.technicalSpecifications.protocol}</div>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Throughput Capacity</span>
                <div className="text-slate-200 mt-0.5">{product.technicalSpecifications.throughput}</div>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Latency Envelope</span>
                <div className="text-slate-200 mt-0.5">{product.technicalSpecifications.latency}</div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Database & Index Engine</span>
                <div className="text-slate-200 mt-0.5">{product.technicalSpecifications.dbEngine}</div>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Security Controls</span>
                <div className="text-slate-200 mt-0.5">
                  {product.technicalSpecifications.security.join(" • ")}
                </div>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Compliance Certifications</span>
                <div className="text-slate-200 mt-0.5">
                  {product.technicalSpecifications.compliance.join(" • ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callout to Consult */}
      <div className="p-8 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">
            Need a Custom Architecture Adaptation for {product.name}?
          </h3>
          <p className="text-xs text-slate-400">
            Our systems engineers can deploy tailored edge gateways, custom ERP plugins, or air-gapped instances.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-500 text-white text-xs font-semibold shrink-0"
        >
          Consult Solution Architect
        </Link>
      </div>
    </div>
  );
}
