import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { LeadsTable } from './leads-table'

export const metadata: Metadata = { title: 'All Leads | MMV Medical' }

interface SearchParams { stage?: string; country?: string; q?: string }

export default async function LeadsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const supabase = await createClient() as any

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (sp.stage)   query = query.eq('stage', sp.stage)
  if (sp.country) query = query.eq('country', sp.country)

  const { data } = await query
  let leads = (data ?? []) as any[]

  if (sp.q) {
    const q = sp.q.toLowerCase()
    leads = leads.filter(l =>
      `${l.full_name} ${l.email} ${l.whatsapp} ${l.treatment ?? ''} ${l.notes ?? ''}`.toLowerCase().includes(q)
    )
  }

  return (
    <div className="p-6">
      <LeadsTable leads={leads} />
    </div>
  )
}
