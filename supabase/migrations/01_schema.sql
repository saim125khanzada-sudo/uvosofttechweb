-- ==============================================================================
-- UVOSOFTTECH ENTERPRISE SCHEMA MIGRATION
-- Migration 01: Core Inquiries, Product Demo Requests, and Telemetry Audit Logs
-- Production Target: Supabase PostgreSQL (Transaction Pooler: Port 6543)
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. LEADS & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.leads_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_interest TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for rapid enterprise search and time-series aggregation
CREATE INDEX IF NOT EXISTS idx_leads_inquiries_created_at ON public.leads_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_inquiries_email ON public.leads_inquiries (email);
CREATE INDEX IF NOT EXISTS idx_leads_inquiries_service ON public.leads_inquiries (service_interest);

-- 2. DEMO REQUESTS TABLE (Sandboxes, Live Previews & Waitlists)
CREATE TABLE IF NOT EXISTS public.demo_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name TEXT NOT NULL,
    applicant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company_size TEXT NOT NULL,
    deployment_type TEXT NOT NULL CHECK (deployment_type IN ('cloud_saas', 'on_premises_hybrid', 'air_gapped_private', 'sandbox_preview')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'provisioning', 'active', 'completed', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_demo_requests_product ON public.demo_requests (product_name);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON public.demo_requests (created_at DESC);

-- 3. SYSTEM AUDIT LOGS TABLE (Zero-Trust Event Logging)
CREATE TABLE IF NOT EXISTS public.system_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_system_audit_logs_event_type ON public.system_audit_logs (event_type);
CREATE INDEX IF NOT EXISTS idx_system_audit_logs_created_at ON public.system_audit_logs (created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Zero-Trust access model: Public inserts allowed, reads restricted to service role
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.leads_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_audit_logs ENABLE ROW LEVEL SECURITY;

-- Leads: Anonymous visitors may submit inquiries
CREATE POLICY "Allow public insert to leads_inquiries"
    ON public.leads_inquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Leads: Service role can read and manage all leads
CREATE POLICY "Allow service role full access to leads_inquiries"
    ON public.leads_inquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Demo Requests: Anonymous visitors may request sandbox demos
CREATE POLICY "Allow public insert to demo_requests"
    ON public.demo_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Demo Requests: Service role can read and manage all demo requests
CREATE POLICY "Allow service role full access to demo_requests"
    ON public.demo_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Audit Logs: Anonymous visitors can log system audit telemetry events
CREATE POLICY "Allow public insert to system_audit_logs"
    ON public.system_audit_logs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Audit Logs: Service role can inspect all audit logs
CREATE POLICY "Allow service role full access to system_audit_logs"
    ON public.system_audit_logs
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
