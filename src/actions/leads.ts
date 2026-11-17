'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { getStaffUser } from '@/lib/staff-auth'
import { leadFormSchema, leadUpdateSchema, noteSchema } from '@/lib/validations/schemas'
import type { LeadFormData } from '@/lib/validations/schemas'
import type { Lead } from '@/types/database'

// ── HUBSPOT SYNC ─────────────────────────────────────────────
async function syncToHubSpot(data: {
  full_name: string
  email: string
  whatsapp: string
  country: string
  treatment_interest: string
  budget_range?: string | null
  preferred_travel_month?: string | null
}) {
  try {
    const [firstname, ...rest] = data.full_name.trim().split(' ')
    const lastname = rest.join(' ') || ''

    await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
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
      signal: AbortSignal.timeout(5000),
    })
  } catch (e) {
    console.error('[syncToHubSpot]', e instanceof Error ? e.message : 'unknown')
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

  // Enforce server-side limits using database counts; do not trust the client timestamp.
  const hourAgo = new Date(Date.now() - 60 * 60_000).toISOString()
  const tenMinAgo = new Date(Date.now() - 10 * 60_000).toISOString()
  const [perPhone, overall] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true })
      .eq('whatsapp', parsed.data.whatsapp).gte('created_at', hourAgo),
    supabase.from('leads').select('id', { count: 'exact', head: true })
      .eq('source', 'website').gte('created_at', tenMinAgo),
  ])

  if (perPhone.error || overall.error) {
    console.error('[capturePublicLead] Rate-limit query failed:', perPhone.error?.message || overall.error?.message)
    return { success: false, error: 'Lead capture is temporarily unavailable' }
  }
  if ((perPhone.count ?? 0) >= 3 || (overall.count ?? 0) >= 50) {
    return { success: false, error: 'Too many requests' }
  }

  const sinceYesterday = new Date(Date.now() - 86400000).toISOString()
  const [emailMatch, whatsappMatch] = await Promise.all([
    supabase.from('leads').select('id').eq('email', parsed.data.email)
      .gte('created_at', sinceYesterday).is('deleted_at', null).limit(1).maybeSingle(),
    supabase.from('leads').select('id').eq('whatsapp', parsed.data.whatsapp)
      .gte('created_at', sinceYesterday).is('deleted_at', null).limit(1).maybeSingle(),
  ])

  if (emailMatch.error || whatsappMatch.error) {
    console.error('[capturePublicLead] Duplicate check failed:', emailMatch.error?.message || whatsappMatch.error?.message)
    return { success: false, error: 'Lead capture is temporarily unavailable' }
  }
  if (emailMatch.data || whatsappMatch.data) return { success: true, duplicate: true }

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
      notes: parsed.data.notes ?? null,
      source: 'website',
      stage: 'new',
    })
    .select('id')
    .single()

  if (error || !lead) {
    console.error('[capturePublicLead]', error?.message ?? 'Lead insert returned no row')
    return { success: false, error: 'Failed to save — please contact us on WhatsApp' }
  }

  await supabase.from('lead_activities').insert({
    lead_id: (lead as Pick<Lead, 'id'>).id,
    type: 'lead_created',
    title: 'Lead captured from MMV website',
    metadata: {
      source: 'website',
      country: parsed.data.country,
      treatment: parsed.data.treatment_interest,
    },
  })

  await syncToHubSpot(parsed.data)
  return { success: true, leadId: (lead as Pick<Lead, 'id'>).id }
}

// ── UPDATE STAGE ─────────────────────────────────────────────
export async function updateLeadStage(leadId: string, newStage: string, _oldStage: string) {
  const staff = await getStaffUser()
  if (!staff) return { success: false, error: 'Unauthorized' }

  const supabase = await createServiceClient() as any
  const { data: currentLead, error: readError } = await supabase
    .from('leads').select('stage').eq('id', leadId).maybeSingle()
  if (readError) return { success: false, error: readError.message }
  if (!currentLead) return { success: false, error: 'Lead not found' }

  const actualOldStage = currentLead.stage
  const { error } = await supabase.from('leads').update({ stage: newStage }).eq('id', leadId)
  if (error) return { success: false, error: error.message }

  await supabase.from('lead_activities').insert({
    lead_id: leadId,
    type: 'stage_changed',
    title: `Stage: ${actualOldStage} → ${newStage}`,
    metadata: { from: actualOldStage, to: newStage },
    created_by: staff.user.id,
  })

  return { success: true }
}

// ── UPDATE LEAD DETAILS ───────────────────────────────────────
export async function updateLead(input: unknown) {
  const staff = await getStaffUser()
  if (!staff) return { success: false, error: 'Unauthorized' }

  const parsed = leadUpdateSchema.safeParse(input)
  if (!parsed.success) return { success: false, error: 'Invalid data' }

  const supabase = await createServiceClient() as any
  const { id, ...updates } = parsed.data
  const { error } = await supabase.from('leads').update(updates).eq('id', id)
  if (error) return { success: false, error: error.message }

  await supabase.from('lead_activities').insert({
    lead_id: id,
    type: 'lead_updated',
    title: 'Lead details updated',
    created_by: staff.user.id,
  })

  return { success: true }
}

// ── SOFT DELETE ───────────────────────────────────────────────
export async function deleteLead(leadId: string) {
  const staff = await getStaffUser()
  if (!staff || staff.role !== 'admin') return { success: false, error: 'Admin only' }

  const supabase = await createServiceClient() as any
  const { error } = await supabase
    .from('leads')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', leadId)

  return error ? { success: false, error: error.message } : { success: true }
}

// ── ADD NOTE ──────────────────────────────────────────────────
export async function addNote(input: unknown) {
  const staff = await getStaffUser()
  if (!staff) return { success: false, error: 'Unauthorized' }

  const parsed = noteSchema.safeParse(input)
  if (!parsed.success) return { success: false, error: 'Invalid note' }

  const supabase = await createServiceClient() as any
  const { error } = await supabase.from('lead_notes').insert({
    lead_id: parsed.data.lead_id,
    content: parsed.data.content,
    created_by: staff.user.id,
  })
  if (error) return { success: false, error: error.message }

  await supabase.from('lead_activities').insert({
    lead_id: parsed.data.lead_id,
    type: 'note_added',
    title: 'Note added',
    created_by: staff.user.id,
  })

  return { success: true }
}
