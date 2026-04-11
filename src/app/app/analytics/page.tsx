import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { STAGES } from '@/lib/constants'
import type { Lead } from '@/types/database'

export const metadata: Metadata = { title: 'Analytics | MMV Medical' }

export default async function AnalyticsPage() {
  const supabase = await createClient() as any

  const { data } = await supabase
    .from('leads')
    .select('stage,country,treatment_interest,estimated_value,source')
    .is('deleted_at', null)

  const all = (data ?? []) as Pick<Lead, 'stage' | 'country' | 'treatment_interest' | 'estimated_value' | 'source'>[]
  const total = all.length || 1

  const byStage: Record<string, number>     = {}
  const byCountry: Record<string, number>   = {}
  const byTreatment: Record<string, number> = {}
  const bySource: Record<string, number>    = {}
  const valueByStage: Record<string, number> = {}

  all.forEach(l => {
    byStage[l.stage]                     = (byStage[l.stage] ?? 0) + 1
    byCountry[l.country]                 = (byCountry[l.country] ?? 0) + 1
    byTreatment[l.treatment_interest]    = (byTreatment[l.treatment_interest] ?? 0) + 1
    bySource[l.source]                   = (bySource[l.source] ?? 0) + 1
    valueByStage[l.stage]                = (valueByStage[l.stage] ?? 0) + (l.estimated_value ?? 0)
  })

  const totalValue = all.reduce((s, l) => s + (l.estimated_value ?? 0), 0)
  const converted  = all.filter(l => ['deposit_paid','confirmed','completed'].includes(l.stage)).length

  function Bar({ label, n, max, color }: { label: string; n: number; max: number; color?: string }) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-xs text-[#6b8f6b] w-40 flex-shrink-0 truncate">{label}</div>
        <div className="flex-1 h-1.5 bg-[#1e2b1e] rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${(n / max) * 100}%`, background: color ?? '#3dd68c' }} />
        </div>
        <div className="font-mono text-xs text-[#6b8f6b] w-8 text-right">{n}</div>
      </div>
    )
  }

  const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">{title}</div>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  )

  const maxCountry   = Math.max(...Object.values(byCountry), 1)
  const maxTreatment = Math.max(...Object.values(byTreatment), 1)
  const maxSource    = Math.max(...Object.values(bySource), 1)
  const maxValue     = Math.max(...Object.values(valueByStage), 1)
  const palette      = ['#4a9eff','#a78bfa','#f0a844','#1fb896','#d4a84b']

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads',  value: all.length,                          color: 'text-white' },
          { label: 'Total Value',  value: `£${totalValue.toLocaleString()}`,    color: 'text-[#d4a84b]' },
          { label: 'Converted',    value: converted,                            color: 'text-[#3dd68c]' },
          { label: 'Conv. Rate',   value: `${Math.round((converted/total)*100)}%`, color: 'text-[#5ba8ff]' },
        ].map(k => (
          <div key={k.label} className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mb-1">{k.label}</div>
            <div className={`font-display text-3xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Conversion Funnel">
          {STAGES.map(s => {
            const n   = byStage[s.value] ?? 0
            const pct = Math.round((n / total) * 100)
            return (
              <div key={s.value} className="flex items-center gap-3">
                <div className="text-xs text-[#6b8f6b] w-28 flex-shrink-0">{s.label}</div>
                <div className="flex-1 h-6 bg-[#1e2b1e] rounded overflow-hidden">
                  <div className="h-full flex items-center px-2"
                    style={{ width: `${Math.max(pct, 5)}%`, background: `${s.color}33` }}>
                    <span className="font-mono text-[10px]" style={{ color: s.color }}>{n}</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#6b8f6b] w-8 text-right">{pct}%</span>
              </div>
            )
          })}
        </Card>

        <Card title="Pipeline Value by Stage">
          {STAGES.map(s => (
            <Bar key={s.value} label={s.label}
              n={Math.round((valueByStage[s.value] ?? 0) / 1000)}
              max={Math.round(maxValue / 1000)} color={s.color} />
          ))}
          <div className="pt-2 border-t border-white/[0.06] text-xs text-[#6b8f6b] font-mono">Values in £k</div>
        </Card>

        <Card title="Leads by Country">
          {Object.entries(byCountry).sort((a, b) => b[1] - a[1]).map(([c, n], i) => (
            <Bar key={c} label={c} n={n} max={maxCountry} color={palette[i % palette.length]} />
          ))}
        </Card>

        <Card title="Leads by Treatment">
          {Object.entries(byTreatment).sort((a, b) => b[1] - a[1]).map(([t, n], i) => (
            <Bar key={t} label={t} n={n} max={maxTreatment} color={palette[i % palette.length]} />
          ))}
        </Card>

        <Card title="Lead Sources">
          {Object.entries(bySource).sort((a, b) => b[1] - a[1]).map(([s, n], i) => (
            <Bar key={s} label={s} n={n} max={maxSource} color={palette[i % palette.length]} />
          ))}
        </Card>
      </div>
    </div>
  )
}
