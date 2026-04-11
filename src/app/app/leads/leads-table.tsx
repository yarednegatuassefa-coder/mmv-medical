'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { STAGES } from '@/lib/constants'
import type { Lead } from '@/types/database'

const FLAGS: Record<string, string> = {
  UK: '🇬🇧', Ireland: '🇮🇪', Netherlands: '🇳🇱', Belgium: '🇧🇪', Romania: '🇷🇴',
}

function followBadge(date: string | null) {
  if (!date) return null
  const today = new Date().toISOString().slice(0,10)
  const diff = Math.ceil((new Date(date).getTime() - new Date(today).getTime()) / 86400000)
  if (diff < 0)  return <span className="font-mono text-[10px] bg-[#e05252]/15 text-[#e05252] px-1.5 py-0.5 rounded">Overdue</span>
  if (diff === 0) return <span className="font-mono text-[10px] bg-[#f0a844]/15 text-[#f0a844] px-1.5 py-0.5 rounded">Today</span>
  return <span className="font-mono text-[10px] text-[#6b8f6b]">{new Date(date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const router = useRouter()

  const filtered = useMemo(() => {
    let r = leads
    if (search) r = r.filter(l => `${l.full_name} ${l.email} ${l.whatsapp} ${l.treatment_interest} ${l.notes ?? ''}`.toLowerCase().includes(search.toLowerCase()))
    if (stageFilter)   r = r.filter(l => l.stage === stageFilter)
    if (countryFilter) r = r.filter(l => l.country === countryFilter)
    return r
  }, [leads, search, stageFilter, countryFilter])

  function exportCSV() {
    const headers = ['Name','Email','WhatsApp','Country','Treatment','Stage','Value','Follow-up','Source','Added']
    const rows = filtered.map(l => [l.full_name, l.email, l.whatsapp, l.country, l.treatment_interest, l.stage, l.estimated_value ?? '', l.follow_up_date ?? '', l.source, l.created_at.slice(0,10)])
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `mmv-leads-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  const inp = 'bg-[#182118] border border-white/[0.08] rounded px-3 py-1.5 text-sm text-[#d4e4d4] outline-none focus:border-[#3dd68c]/40 placeholder:text-[#6b8f6b]'

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input className={`${inp} flex-1 min-w-[180px] max-w-xs`} placeholder="Search leads…" value={search} onChange={e => setSearch(e.target.value)} />
        <select className={`${inp} w-36`} value={stageFilter} onChange={e => setStageFilter(e.target.value)}>
          <option value="">All Stages</option>
          {STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select className={`${inp} w-36`} value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
          <option value="">All Countries</option>
          {Object.keys(FLAGS).map(c => <option key={c} value={c}>{FLAGS[c]} {c}</option>)}
        </select>
        <span className="text-[#6b8f6b] text-xs font-mono ml-auto">{filtered.length} leads</span>
        <button onClick={exportCSV} className="text-xs bg-[#182118] border border-white/[0.08] text-[#6b8f6b] px-3 py-1.5 rounded hover:text-[#d4e4d4] transition-colors">
          ⬇ CSV
        </button>
        <Link href="/app/leads/new" className="text-xs bg-[#3dd68c] text-[#0d1117] font-semibold px-3 py-1.5 rounded hover:bg-[#52e09e] transition-colors">
          + New Lead
        </Link>
      </div>

      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Name','Country','Treatment','Stage','Value','Follow-up','Added'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(l => {
              const stage = STAGES.find(s => s.value === l.stage)
              return (
                <tr key={l.id} onClick={() => router.push(`/app/leads/${l.id}`)}
                  className="border-b border-white/[0.03] hover:bg-[#182118] cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm text-[#d4e4d4] font-medium">{l.full_name}</div>
                    <div className="text-xs text-[#6b8f6b] font-mono">{l.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6b8f6b]">{FLAGS[l.country] ?? ''} {l.country}</td>
                  <td className="px-4 py-3 text-xs text-[#6b8f6b] max-w-[160px] truncate">{l.treatment_interest}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap" style={{ background: `${stage?.color}22`, color: stage?.color }}>
                      {stage?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#d4a84b]">
                    {l.estimated_value ? `£${l.estimated_value.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3">{followBadge(l.follow_up_date)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#6b8f6b]">{l.created_at.slice(0,10)}</td>
                </tr>
              )
            }) : (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-[#6b8f6b] italic">No leads found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
