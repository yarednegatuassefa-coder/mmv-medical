import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SOURCES = ['whatsapp_button', 'website']
const LANGUAGES = ['en', 'fr', 'ar']
const PHONE_RE = /^\+?[0-9][0-9 ()-]{6,19}$/

const clip = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Honeypot: real visitors never fill the hidden "website" field.
    if (typeof body.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ ok: true }, { status: 201 })
    }

    const name = clip(body.name, 100)
    const phone = clip(body.phone, 20)
    const message = clip(body.message, 500)
    const requestedSource = clip(body.source, 40)
    const requestedLanguage = clip(body.language, 5)
    const source = SOURCES.includes(requestedSource) ? requestedSource : 'whatsapp_button'
    const language = LANGUAGES.includes(requestedLanguage) ? requestedLanguage : 'en'
    const country = clip(body.country, 60) || 'Not provided'

    if (name.length < 2 || !PHONE_RE.test(phone)) {
      return NextResponse.json(
        { error: 'A valid name and phone number are required' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()
    const hourAgo = new Date(Date.now() - 60 * 60_000).toISOString()
    const tenMinAgo = new Date(Date.now() - 10 * 60_000).toISOString()

    const [perPhone, overall] = await Promise.all([
      supabase.from('leads').select('id', { count: 'exact', head: true })
        .eq('whatsapp', phone).gte('created_at', hourAgo),
      supabase.from('leads').select('id', { count: 'exact', head: true })
        .eq('source', source).gte('created_at', tenMinAgo),
    ])

    if (perPhone.error || overall.error) {
      console.error('Lead rate-limit query failed:', perPhone.error?.message || overall.error?.message)
      return NextResponse.json({ error: 'Lead capture is temporarily unavailable' }, { status: 503 })
    }

    if ((perPhone.count ?? 0) >= 3 || (overall.count ?? 0) >= 50) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const { error } = await supabase.from('leads').insert({
      full_name: name,
      email: '',
      whatsapp: phone,
      treatment_interest: 'Not specified',
      source,
      country,
      stage: 'new',
      notes: message || null,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Supabase lead insert failed:', error.message)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN
    if (hubspotToken) {
      try {
        const [firstname, ...rest] = name.split(' ')
        await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${hubspotToken}`,
          },
          body: JSON.stringify({
            properties: {
              firstname,
              lastname: rest.join(' '),
              phone,
              hs_lead_status: 'NEW',
              message: `WhatsApp button click — language: ${language}`,
            },
          }),
          signal: AbortSignal.timeout(5000),
        })
      } catch (e) {
        console.error('HubSpot sync error:', e instanceof Error ? e.message : 'unknown')
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    console.error('Lead API error:', e instanceof Error ? e.message : 'unknown')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
