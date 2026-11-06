import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { CookieConsent } from "@/components/common/cookie-consent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://uvosofttech.com"),
  title: {
    default: "UVO SoftTech | Enterprise Software, Managed SIEM & Cloud Infrastructure",
    template: "%s | UVO SoftTech Enterprise",
  },
  description:
    "Engineering mission-critical enterprise software, restaurant POS & KDS suites, corporate data backup, campus management ERPs, autonomous SIEM cybersecurity, and high-availability SD-WAN networking.",
  keywords: [
    "Custom Software Development & ERP Systems",
    "Enterprise Cybersecurity Solutions & Managed SIEM",
    "Corporate IT Support & Infrastructure Services",
    "Enterprise Networking & Cloud Migration Solutions",
    "Restaurant POS and KDS Suite",
    "Corporate Data Backup Tool WORM",
    "School Management System ERP",
    "Enterprise Mobile Device Management MDM",
    "Zero-Trust Cloud Architecture",
  ],
  authors: [{ name: "UVO SoftTech Technical Architecture Team" }],
  creator: "UVO SoftTech Corporation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uvosofttech.com",
    title: "UVO SoftTech | Enterprise Infrastructure & Autonomous Security",
    description:
      "Enterprise systems engineered with zero-trust architecture, high-concurrency database connection pooling, and 99.999% availability.",
    siteName: "UVO SoftTech",
    images: [
      {
        url: "https://uvosofttech.com/og-enterprise.png",
        width: 1200,
        height: 630,
        alt: "UVO SoftTech Enterprise Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UVO SoftTech | Enterprise Software & Cybersecurity",
    description:
      "Next-generation ERPs, immutable workstation backup, and 24/7 Managed SIEM operations.",
    creator: "@uvosofttech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UVO SoftTech",
    url: "https://uvosofttech.com",
    logo: "https://uvosofttech.com/logo.png",
    description:
      "Enterprise software development, managed cybersecurity SIEM, corporate IT support, and mission-critical cloud networking.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-UVO-TECH",
      contactType: "technical support",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://github.com/saim125khanzada-sudo/uvosofttechweb",
      "https://www.linkedin.com/company/uvosofttech",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cobalt-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
