'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { leadFormSchema, noteSchema } from '@/lib/validations/schemas'
import type { LeadFormData } from '@/lib/validations/schemas'

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
    .limit(1)
    .maybeSingle()

  if (existing) return { success: true, duplicate: true }

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      full_name: parsed.data.full_name,
      email:     parsed.data.email,
      whatsapp:  parsed.data.whatsapp,
      country:   parsed.data.country,
      treatment: parsed.data.treatment_interest ?? parsed.data.treatment ?? 'Not specified',
      notes:     parsed.data.notes ?? null,
      source:    'website',
      stage:     'new',
    })
    .select('id')
    .single()

  if (error || !lead) {
    console.error('[capturePublicLead]', error)
    return { success: false, error: 'Failed to save — please contact us on WhatsApp' }
  }

  await supabase.from('lead_activities').insert({
    lead_id:  lead.id,
    type:     'lead_created',
    title:    'Lead captured from MMV website',
    metadata: {
      source:    'website',
      country:   parsed.data.country,
      treatment: parsed.data.treatment_interest ?? parsed.data.treatment,
    },
  })

  return { success: true, leadId: lead.id }
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

// ── HARD DELETE ───────────────────────────────────────────────
export async function deleteLead(leadId: string) {
  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { error } = await supabase.from('leads').delete().eq('id', leadId)
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
