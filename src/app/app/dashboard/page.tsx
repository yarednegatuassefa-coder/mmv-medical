import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { STAGES } from '@/lib/constants'

export const metadata: Metadata = { title: 'Dashboard | MMV Medical' }

export default async function DashboardPage() {
  const supabase = await createClient() as any

  const { data } = await supabase
    .from('leads')
    .select('id,full_name,country,stage,treatment,created_at,source,whatsapp')
    .order('created_at', { ascending: false })

  const all = (data ?? []) as any[]
  const total = all.length
  const converted = all.filter(l => ['deposit_paid','confirmed','completed'].includes(l.stage)).length
  const convRate = total ? Math.round((converted / total) * 100) : 0

  const byCountry: Record<string, number> = {}
  all.forEach(l => { byCountry[l.country] = (byCountry[l.country] ?? 0) + 1 })
  const countryRows = Object.entries(byCountry).sort((a, b) => b[1] - a[1])

  const byStage: Record<string, number> = {}
  all.forEach(l => { byStage[l.stage] = (byStage[l.stage] ?? 0) + 1 })

  const recentLeads = all.slice(0, 8)

  const flags: Record<string, string> = {
    'United Kingdom': '🇬🇧', '🇬🇧 United Kingdom': '🇬🇧',
    'Ireland': '🇮🇪', 'Netherlands': '🇳🇱', 'Belgium': '🇧🇪', 'Romania': '🇷🇴',
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads',     value: total,       color: 'text-white' },
          { label: 'New',             value: byStage['new'] ?? 0, color: 'text-[#d4a84b]' },
          { label: 'Conversion Rate', value: `${convRate}%`, color: 'text-[#3dd68c]' },
          { label: 'Converted',       value: converted,   color: 'text-[#3dd68c]' },
        ].map(k => (
          <div key={k.label} className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mb-2">{k.label}</div>
            <div className={`font-display text-3xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">Pipeline Overview</div>
          </div>
          <div className="p-4 space-y-3">
            {STAGES.map(s => {
              const n = byStage[s.value] ?? 0
              const max = Math.max(...STAGES.map(x => byStage[x.value] ?? 0), 1)
              return (
                <div key={s.value} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <div className="text-xs text-[#6b8f6b] w-28 flex-shrink-0">{s.label}</div>
                  <div className="flex-1 h-1.5 bg-[#1e2b1e] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(n / max) * 100}%`, background: s.color }} />
                  </div>
                  <div className="font-mono text-xs text-[#6b8f6b] w-4 text-right">{n}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">Leads by Country</div>
          </div>
          <div className="p-4 space-y-2.5">
            {countryRows.length > 0 ? countryRows.map(([c, n]) => (
              <div key={c} className="flex items-center gap-3">
                <span className="text-base">{flags[c] ?? '🌍'}</span>
                <span className="text-xs text-[#6b8f6b] flex-1">{c}</span>
                <span className="font-mono text-xs text-[#d4e4d4]">{n}</span>
                <span className="font-mono text-xs text-[#6b8f6b] w-8 text-right">{Math.round((n / total) * 100)}%</span>
              </div>
            )) : <p className="text-xs text-[#6b8f6b] italic">No leads yet</p>}
          </div>
        </div>
      </div>

      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">Recent Leads</div>
          <Link href="/app/leads" className="text-xs text-[#3dd68c] hover:underline">View all →</Link>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {recentLeads.length > 0 ? recentLeads.map(l => {
            const stage = STAGES.find(s => s.value === l.stage)
            return (
              <Link key={l.id} href={`/app/leads/${l.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-[#182118] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#d4e4d4] font-medium truncate">{l.full_name}</div>
                  <div className="text-xs text-[#6b8f6b]">{flags[l.country] ?? '🌍'} {l.country} · {l.treatment}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap"
                  style={{ background: `${stage?.color}22`, color: stage?.color }}>
                  {stage?.label ?? l.stage}
                </span>
                {l.whatsapp ? (
  <a href={`https://wa.me/${l.whatsapp.replace(/\D/g, '')}`} target="_blank"
    rel="noopener noreferrer"
    className="text-[#25d366] hover:text-[#4de87e] transition-colors">
    💬
  </a>
) : null}
              </Link>
            )
          }) : (
            <div className="px-4 py-8 text-center text-xs text-[#6b8f6b] italic">
              No leads yet. They appear here when patients submit via your website.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
