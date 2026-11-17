import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  let healthy = true

  try {
    const supabase = await createServiceClient()
    const { error } = await supabase.from('profiles').select('id').limit(1)
    if (error) {
      console.error('health: supabase connectivity check failed:', error.message)
      healthy = false
    }
  } catch (e) {
    console.error('health: supabase connectivity exception:', e instanceof Error ? e.message : 'unknown')
    healthy = false
  }

  if (!process.env.ANTHROPIC_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('health: required server configuration missing')
    healthy = false
  }

  return NextResponse.json(
    { status: healthy ? 'healthy' : 'degraded', timestamp: new Date().toISOString() },
    { status: healthy ? 200 : 503 }
  )
}
