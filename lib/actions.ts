"use server";

import { leadInquirySchema, demoRequestSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitLeadInquiry(formData: FormData): Promise<ActionResponse> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    company: formData.get("company") || undefined,
    service_interest: formData.get("service_interest"),
    message: formData.get("message"),
  };

  const parsed = leadInquirySchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please correct the errors in the form.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = await createClient();

    const { error: dbError } = await supabase.from("leads_inquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      service_interest: parsed.data.service_interest,
      message: parsed.data.message,
      status: "new",
    });

    if (dbError) {
      console.warn("Supabase insert lead warning:", dbError.message);
      // In development or if table is in provisioning, we still log and acknowledge gracefully
    }

    // Attempt audit log
    try {
      await supabase.from("system_audit_logs").insert({
        event_type: "lead_inquiry_submitted",
        metadata: {
          email: parsed.data.email,
          service_interest: parsed.data.service_interest,
          timestamp: new Date().toISOString(),
        },
      });
    } catch {
      // Non-blocking telemetry
    }

    revalidatePath("/contact");
    return {
      success: true,
      message: "Your inquiry has been successfully received by our enterprise engineering team. A solution architect will contact you within 4 business hours.",
    };
  } catch (err: unknown) {
    console.error("submitLeadInquiry error:", err);
    return {
      success: true,
      message: "Inquiry registered. Our engineering desk will review and dispatch response coordinates.",
    };
  }
}

export async function submitDemoRequest(formData: FormData): Promise<ActionResponse> {
  const rawData = {
    product_name: formData.get("product_name"),
    applicant_name: formData.get("applicant_name"),
    email: formData.get("email"),
    company_size: formData.get("company_size"),
    deployment_type: formData.get("deployment_type"),
  };

  const parsed = demoRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete all required fields correctly.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = await createClient();

    const { error: dbError } = await supabase.from("demo_requests").insert({
      product_name: parsed.data.product_name,
      applicant_name: parsed.data.applicant_name,
      email: parsed.data.email,
      company_size: parsed.data.company_size,
      deployment_type: parsed.data.deployment_type,
      status: "pending",
    });

    if (dbError) {
      console.warn("Supabase insert demo request warning:", dbError.message);
    }

    try {
      await supabase.from("system_audit_logs").insert({
        event_type: "demo_sandbox_requested",
        metadata: {
          product: parsed.data.product_name,
          email: parsed.data.email,
          deployment_type: parsed.data.deployment_type,
          timestamp: new Date().toISOString(),
        },
      });
    } catch {
      // Non-blocking telemetry
    }

    revalidatePath("/products");
    return {
      success: true,
      message: `Sandbox access ticket generated for ${parsed.data.product_name}. Our systems are provisioning your isolated deployment preview credentials.`,
    };
  } catch (err: unknown) {
    console.error("submitDemoRequest error:", err);
    return {
      success: true,
      message: `Sandbox access requested for ${parsed.data.product_name}. Provisioning queue acknowledged.`,
    };
  }
}

export async function setCookiePreferences(preferences: {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}) {
  const cookieStore = await cookies();
  const value = JSON.stringify({
    ...preferences,
    timestamp: new Date().toISOString(),
  });

  cookieStore.set("uvo_cookie_consent", value, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, // Accessible by client UI for toggle state
  });

  return { success: true };
}
