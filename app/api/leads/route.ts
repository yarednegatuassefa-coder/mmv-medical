import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, source, language, message } = body

    // Basic validation
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
          name,
          phone,
          source: source ?? 'unknown',
          language: language ?? 'en',
          message: message ?? null,
          status: 'new',
          created_at: new Date().toISOString(),
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

    return NextResponse.json({ ok: true, lead: data }, { status: 201 })

  } catch (e: any) {
    console.error('Lead API error:', e)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
