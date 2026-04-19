import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, source, language, message } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          full_name: name,
          whatsapp: phone,
          source: source ?? 'whatsapp_button',
          country: language === 'fr' ? 'France' :
                   language === 'ar' ? 'Arabic' : 'UK',
          stage: 'new',
          notes: message ?? null,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    // Sync to HubSpot
    try {
      const [firstname, ...rest] = name.trim().split(' ')
      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
        },
        body: JSON.stringify({
          properties: {
            firstname,
            lastname: rest.join(' ') || '',
            phone,
            hs_lead_status: 'NEW',
            message: `WhatsApp button click — language: ${language ?? 'en'}`,
          },
        }),
      })
    } catch (e) {
      console.error('HubSpot sync error:', e)
    }

    return NextResponse.json({ ok: true, lead: data }, { status: 201 })

  } catch (e: any) {
    console.error('Lead API error:', e)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
