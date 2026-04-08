import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, string> = {}
  let healthy = true

  // Supabase connectivity
  try {
    const supabase = await createServiceClient()
    const { error } = await supabase.from('profiles').select('id').limit(1)
    checks.supabase = error ? `error: ${error.message}` : 'ok'
    if (error) healthy = false
  } catch (e: any) {
    checks.supabase = `error: ${e.message}`
    healthy = false
  }

  // Anthropic key presence (never expose the actual key)
  checks.anthropic_key = process.env.ANTHROPIC_API_KEY ? 'configured' : 'missing'
  if (!process.env.ANTHROPIC_API_KEY) healthy = false

  // Env vars
  checks.supabase_url    = process.env.NEXT_PUBLIC_SUPABASE_URL   ? 'set' : 'missing'
  checks.supabase_anon   = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'missing'
  checks.service_role    = process.env.SUPABASE_SERVICE_ROLE_KEY  ? 'set' : 'missing'

  return NextResponse.json(
    {
      status: healthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? '3.0.0',
      checks,
    },
    { status: healthy ? 200 : 503 }
  )
}
