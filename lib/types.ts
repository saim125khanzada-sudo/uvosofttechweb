export type DeploymentType = 'cloud_saas' | 'on_premises_hybrid' | 'air_gapped_private' | 'sandbox_preview';

export type ProductDemoStatus = 'pending' | 'provisioning' | 'active' | 'completed' | 'rejected';

export interface ProductDetail {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  architectureTier: string;
  deploymentOptions: string[];
  description: string;
  keyMetrics: { label: string; value: string; detail: string }[];
  architectureDiagram: {
    layers: { name: string; description: string; components: string[] }[];
    dataFlow: string[];
  };
  features: {
    title: string;
    description: string;
    tags: string[];
  }[];
  technicalSpecifications: {
    protocol: string;
    throughput: string;
    latency: string;
    compliance: string[];
    security: string[];
    dbEngine: string;
  };
  liveSandboxSupported: boolean;
  activeDemoEnvironment?: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  businessOutcomes: string[];
  capabilities: {
    name: string;
    description: string;
    deliverables: string[];
  }[];
  techStack: string[];
  serviceTier: string;
  slaCommitment: string;
  complianceStandards: string[];
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}
