import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const whatsappLeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20).regex(/^\+?[0-9\s\-()]+$/),
  source: z.enum(['whatsapp_button', 'website']).default('whatsapp_button'),
  language: z.enum(['en', 'fr', 'ar']).default('en'),
  // Deliberately do not accept/store free-text messages or health information here.
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = whatsappLeadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const supabase = await createServiceClient()
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        full_name: parsed.data.name,
        whatsapp: parsed.data.phone,
        source: parsed.data.source,
        country: 'Other',
        stage: 'new',
        treatment: null,
        treatment_interest: 'whatsapp_intro',
        notes: null,
        updated_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (error || !lead) {
      console.error('[whatsapp lead] Supabase insert failed:', error?.code ?? 'unknown')
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    const { error: activityError } = await supabase.from('lead_activities').insert({
      lead_id: lead.id,
      type: 'lead_created',
      title: 'Lead captured from WhatsApp entry point',
      metadata: {
        source: parsed.data.source,
        language: parsed.data.language,
        response_consent: false,
        follow_up_status: 'consent_not_recorded_manual_review_required',
      },
    })
    if (activityError) {
      console.error('[whatsapp lead] Audit insert failed:', activityError.code ?? 'unknown')
    }

    // No third-party CRM sync. WhatsApp itself is opened by the user; no automated
    // outbound messages are sent from this endpoint.
    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 })
  } catch {
    console.error('[whatsapp lead] Request failed')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
