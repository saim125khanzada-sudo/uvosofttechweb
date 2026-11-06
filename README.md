# UVO SoftTech Enterprise Platform (v2.0 Rebuild)

High-resilience enterprise software, 24/7 managed SIEM, corporate IT operations, and high-availability SD-WAN networking.

Target Production Host: **Vercel**  
Target Database: **Supabase PostgreSQL (Free Tier & Enterprise)**  
Connection Pooler: **Supavisor (Port 6543, Transaction Mode)**  
Primary Stack: **Next.js (App Router, React 19, TypeScript), Tailwind CSS, Lucide Icons, Supabase SSR (`@supabase/ssr`), Zod**

---

## Architecture & Technology Blueprint

### 1. Zero-Trust Access & Next.js 15 App Router
- Full server-side rendering with streaming and React 19 Server Components.
- Typed Server Actions in `/lib/actions.ts` with strict runtime Zod payload validation (`/lib/validations.ts`).
- Enterprise cookie-based session synchronization:
  - `/lib/supabase/client.ts`: Client component browser client.
  - `/lib/supabase/server.ts`: Async cookies with `next/headers`.
  - `/lib/supabase/middleware.ts`: Token refresh on edge routing.
  - Root `middleware.ts`: Applied across all dynamic application routes.

### 2. Database Connection Pooling (Supavisor)
Serverless edge functions on Vercel can quickly exhaust PostgreSQL connections without transaction multiplexing. This application is configured to connect via Supabase's transaction pooler:
- **Host**: `aws-0-[region].pooler.supabase.com`
- **Port**: `6543` (Supavisor Transaction Mode)
- **Flag**: `?pgbouncer=true`

### 3. Database Schema & RLS Security
Defined in `/supabase/migrations/01_schema.sql`:
1. `leads_inquiries`: Contact & consultation inquiries with service routing.
2. `demo_requests`: Product sandbox provisioning requests and tenant waitlist.
3. `system_audit_logs`: Zero-trust event telemetry capturing submissions and user actions.
- Row Level Security (RLS) is enabled on all tables with explicit insert policies for visitors and restricted access for service roles.

### 4. Enterprise Product Platforms
Detailed specifications, layer topologies, and interactive `<ProductDemoAction />` sandboxes:
1. **Restaurant ERP Suite**: Multi-terminal Touch POS, Kitchen Display System (KDS), Waiter Mobile App, and Rider Delivery Engine.
2. **Corporate Data Backup Tool**: Workstation endpoint backup, continuous CDC deduplication, and immutable WORM ransomware defense.
3. **School Management System**: Full campus lifecycle, biometric attendance, automated grading, and fiscal tuition invoicing.
4. **Cybersecurity SIEM Platform**: Distributed log stream parsing (OCSF), MITRE ATT&CK correlation, and automated SOAR playbooks.
5. **Enterprise Mobile Device Management (MDM)**: Apple MDM, Android Enterprise, zero-touch provisioning, and cryptographic remote wipe.
6. **Custom Software & Cloud Engineering**: High-concurrency bespoke web applications, Go/Node microservices, and database tuning.

### 5. Services Directory
Comprehensive landing pages with enterprise SLAs and deliverables:
- `/services/custom-software`
- `/services/cybersecurity`
- `/services/it-services`
- `/services/networking`

### 6. SEO & Structured Data
- Schema.org Google-compliant JSON-LD:
  - `Organization` in root layout.
  - `SoftwareApplication` on each product page.
  - `Service` on each service page.
- Dynamic `/app/sitemap.ts` and `/app/robots.ts`.

---

## Local Development & Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production verification build
npm run build
```
