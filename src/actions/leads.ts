'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { leadFormSchema, leadUpdateSchema, noteSchema } from '@/lib/validations/schemas'
import type { LeadFormData } from '@/lib/validations/schemas'
import type { Lead, Profile } from '@/types/database'

const PRIVACY_NOTICE_VERSION = '2026-11-28'

// ── PUBLIC LEAD CAPTURE ──────────────────────────────────────
export async function capturePublicLead(
  data: LeadFormData & { website?: string; _ts?: number }
) {
  if (data.website && data.website.length > 0) {
    return { success: false, error: 'Invalid submission' }
  }
  if (data._ts && Date.now() - data._ts < 3000) {
    return { success: false, error: 'Please try again' }
  }

  const parsed = leadFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? 'Validation error' }
  }

  const supabase = await createServiceClient() as any

  const { data: existing } = await supabase
    .from('leads')
    .select('id')
    .or(`email.eq.${parsed.data.email},whatsapp.eq.${parsed.data.whatsapp}`)
    .gte('created_at', new Date(Date.now() - 86400000).toISOString())
    .is('deleted_at', null)
    .limit(1)
    .maybeSingle()

  if (existing) return { success: true, duplicate: true }

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      whatsapp: parsed.data.whatsapp,
      country: parsed.data.country,
      // This field is retained for compatibility with the existing CRM schema,
      // but now contains only a non-clinical coordination topic.
      treatment: null,
      treatment_interest: parsed.data.treatment_interest,
      budget_range: null,
      preferred_travel_month: null,
      notes: null,
      source: 'website',
      stage: 'new',
      assigned_to: null,
    })
    .select('id')
    .single()

  if (error || !lead) {
    console.error('[capturePublicLead] Lead insert failed:', error?.code ?? 'unknown')
    return { success: false, error: 'Failed to save — please contact us by email' }
  }

  const { error: activityError } = await supabase.from('lead_activities').insert({
    lead_id: (lead as Pick<Lead, 'id'>).id,
    type: 'lead_created',
    title: 'Lead captured from MMV website',
    metadata: {
      source: 'website',
      coordination_topic: parsed.data.treatment_interest,
      response_consent: true,
      marketing_consent: parsed.data.marketing_consent,
      privacy_notice_version: PRIVACY_NOTICE_VERSION,
      assigned: false,
      follow_up_status: 'awaiting_human_review',
    },
  })

  if (activityError) {
    // Do not leak submitted values into logs. The lead remains available in the CRM.
    console.error('[capturePublicLead] Lead activity audit insert failed:', activityError.code ?? 'unknown')
  }

  // External CRM sync is intentionally disabled. It requires a documented processor
  // arrangement, lawful-basis review and an explicit owner-approved data-flow decision.
  return { success: true, leadId: (lead as Pick<Lead, 'id'>).id }
}

// ── UPDATE STAGE ─────────────────────────────────────────────
export async function updateLeadStage(leadId: string, newStage: string, oldStage: string) {
  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { error } = await supabase.from('leads').update({ stage: newStage }).eq('id', leadId)
  if (error) return { success: false, error: error.message }

  await supabase.from('lead_activities').insert({
    lead_id: leadId, type: 'stage_changed',
    title: `Stage: ${oldStage} → ${newStage}`,
    metadata: { from: oldStage, to: newStage },
    created_by: user.id,
  })

  return { success: true }
}

// ── UPDATE LEAD DETAILS ───────────────────────────────────────
export async function updateLead(input: unknown) {
  const parsed = leadUpdateSchema.safeParse(input)
  if (!parsed.success) return { success: false, error: 'Invalid data' }

  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { id, ...updates } = parsed.data
  const { error } = await supabase.from('leads').update(updates).eq('id', id)
  if (error) return { success: false, error: error.message }

  await supabase.from('lead_activities').insert({
    lead_id: id, type: 'lead_updated', title: 'Lead details updated', created_by: user.id,
  })

  return { success: true }
}

// ── SOFT DELETE ───────────────────────────────────────────────
export async function deleteLead(leadId: string) {
  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: profileData } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  const profile = profileData as Pick<Profile, 'role'> | null
  if (profile?.role !== 'admin') return { success: false, error: 'Admin only' }

  const { error } = await supabase
    .from('leads').update({ deleted_at: new Date().toISOString() }).eq('id', leadId)

  return error ? { success: false, error: error.message } : { success: true }
}

// ── ADD NOTE ──────────────────────────────────────────────────
export async function addNote(input: unknown) {
  const parsed = noteSchema.safeParse(input)
  if (!parsed.success) return { success: false, error: 'Invalid note' }

  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { error } = await supabase.from('lead_notes').insert({
    lead_id: parsed.data.lead_id, content: parsed.data.content, created_by: user.id,
  })
  if (error) return { success: false, error: error.message }

  await supabase.from('lead_activities').insert({
    lead_id: parsed.data.lead_id, type: 'note_added', title: 'Note added', created_by: user.id,
  })

  return { success: true }
}
