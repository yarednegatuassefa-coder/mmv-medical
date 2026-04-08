import { z } from 'zod'

export const leadFormSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  whatsapp: z.string().min(7, 'Enter a valid WhatsApp number').max(20)
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number'),
  country: z.enum(['UK', 'Ireland', 'Netherlands', 'Belgium', 'Romania', 'Other'],
    { errorMap: () => ({ message: 'Please select your country' }) }),
  treatment_interest: z.string().min(1, 'Please select a treatment'),
  budget_range: z.string().optional(),
  preferred_travel_month: z.string().optional(),
  notes: z.string().max(1000).optional(),
  // Honeypot — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const leadUpdateSchema = z.object({
  id: z.string().uuid(),
  stage: z.enum(['new','contacted','plan_sent','deposit_paid','confirmed','completed','lost']).optional(),
  estimated_value: z.number().min(0).optional(),
  follow_up_date: z.string().optional().nullable(),
  notes: z.string().max(2000).optional(),
  assigned_to: z.string().uuid().optional().nullable(),
})

export const noteSchema = z.object({
  lead_id: z.string().uuid(),
  content: z.string().min(1).max(2000),
})

export const kbSourceSchema = z.object({
  title: z.string().min(2).max(200),
  url: z.string().url().optional().or(z.literal('')),
  source_type: z.enum(['article','review','report','clinic_profile','regulation','price_data','other']).default('article'),
  language: z.string().default('en'),
  tags: z.array(z.string()).default([]),
  raw_content: z.string().min(50, 'Content too short — paste at least 50 characters'),
})

export type KbSourceFormData = z.infer<typeof kbSourceSchema>
