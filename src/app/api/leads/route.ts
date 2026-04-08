import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createServiceClient()

    const { error } = await supabase.from('leads').insert({
      full_name: body.full_name || 'Unknown',
      email: body.email || '',
      whatsapp: body.whatsapp || '',
      country: body.country || 'Unknown',
      treatment: body.treatment_interest || 'Not specified',
      notes: body.notes || null,
      source: 'website',
      stage: 'new',
    })

    if (error) {
      console.error('Lead insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
