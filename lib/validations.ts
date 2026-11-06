import { z } from "zod";

export const leadInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
});

export type LeadInquiryInput = z.infer<typeof leadInquirySchema>;

export const demoRequestSchema = z.object({
  product_name: z.string().min(1, "Product selection is required"),
  applicant_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid work email"),
  company_size: z.string().min(1, "Please select company size"),
  deployment_type: z.enum([
    "cloud_saas",
    "on_premises_hybrid",
    "air_gapped_private",
    "sandbox_preview",
  ]),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
