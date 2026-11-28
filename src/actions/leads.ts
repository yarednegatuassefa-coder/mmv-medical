'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { leadFormSchema, leadUpdateSchema, noteSchema } from '@/lib/validations/schemas'
import type { LeadFormData } from '@/lib/validations/schemas'
import type { Lead, Profile } from '@/types/database'

// ── HUBSPOT SYNC ─────────────────────────────────────────────
// Disabled by default. Enable only after the processor/privacy review and explicit form consent.
async function syncToHubSpot(data: {
  full_name: string
  email: string
  whatsapp: string
  country: string
  treatment_interest: string
  budget_range?: string | null
  preferred_travel_month?: string | null
}) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) throw new Error('HubSpot sync is enabled but HUBSPOT_PRIVATE_APP_TOKEN is missing')

  const [firstname, ...rest] = data.full_name.trim().split(' ')
  const lastname = rest.join(' ') || ''
  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      properties: {
        firstname,
        lastname,
        email: data.email,
        phone: data.whatsapp,
        country: data.country,
        hs_lead_status: 'NEW',
        message: [
          `Treatment: ${data.treatment_interest}`,
          data.budget_range ? `Budget: ${data.budget_range}` : null,
          data.preferred_travel_month ? `Travel: ${data.preferred_travel_month}` : null,
        ].filter(Boolean).join(' | '),
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`HubSpot sync failed with HTTP ${response.status}`)
  }
}

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

  const { data: existing, error: duplicateCheckError } = await supabase
    .from('leads')
    .select('id')
    .or(`email.eq.${parsed.data.email},whatsapp.eq.${parsed.data.whatsapp}`)
    .gte('created_at', new Date(Date.now() - 86400000).toISOString())
    .is('deleted_at', null)
    .limit(1)
    .maybeSingle()

  if (duplicateCheckError) {
    console.error('[capturePublicLead:duplicate-check]', duplicateCheckError.message)
    return { success: false, error: 'We could not verify your request. Please try again.' }
  }
  if (existing) return { success: true, duplicate: true }

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      whatsapp: parsed.data.whatsapp,
      country: parsed.data.country,
      treatment: parsed.data.treatment_interest,
      treatment_interest: parsed.data.treatment_interest,
      budget_range: parsed.data.budget_range ?? null,
      preferred_travel_month: parsed.data.preferred_travel_month ?? null,
      // Free-text notes are deliberately not collected on the public form.
      source: 'website',
      stage: 'new',
    })
    .select('id')
    .single()

  if (error || !lead) {
    console.error('[capturePublicLead:insert]', error?.message ?? 'No lead returned')
    return { success: false, error: 'We could not save your enquiry. Please try again or contact us directly.' }
  }

  const consentAt = new Date().toISOString()
  const { error: activityError } = await supabase.from('lead_activities').insert({
    lead_id: (lead as Pick<Lead, 'id'>).id,
    type: 'consent_recorded',
    title: 'Website enquiry consent recorded',
    metadata: {
      source: 'website',
      contact_consent: true,
      crm_consent: parsed.data.crm_consent,
      privacy_notice_version: '2026-11-28',
      consent_recorded_at: consentAt,
    },
  })

  if (activityError) {
    console.error('[capturePublicLead:consent-audit]', activityError.message)
    return { success: false, error: 'Your enquiry could not be fully recorded. Please contact MMV directly before resubmitting.' }
  }

  // CRM transfer requires both an explicit separate opt-in and an owner-enabled feature flag.
  if (parsed.data.crm_consent && process.env.MMV_ENABLE_HUBSPOT_SYNC === 'true') {
    try {
      await syncToHubSpot(parsed.data)
    } catch (syncError) {
      console.error('[capturePublicLead:hubspot]', syncError instanceof Error ? syncError.message : 'Unknown sync error')
    }
  }

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
