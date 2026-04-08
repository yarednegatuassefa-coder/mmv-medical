'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateLeadStage } from '@/actions/leads'
import { STAGES } from '@/lib/constants'

interface Lead {
  id: string; full_name: string; country: string; treatment: string
  stage: string; whatsapp: string
}

const FLAGS: Record<string, string> = {
  UK: '🇬🇧', Ireland: '🇮🇪', Netherlands: '🇳🇱', Belgium: '🇧🇪', Romania: '🇷🇴',
  'United Kingdom': '🇬🇧',
}

export function PipelineBoard({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial)
  const [dragId, setDragId] = useState<string | null>(null)
  const router = useRouter()

  async function handleDrop(e: React.DragEvent, targetStage: string) {
    e.preventDefault()
    if (!dragId) return
    const lead = leads.find(l => l.id === dragId)
    if (!lead || lead.stage === targetStage) return

    const oldStage = lead.stage
    setLeads(prev => prev.map(l => l.id === dragId ? { ...l, stage: targetStage } : l))
    await updateLeadStage(dragId, targetStage, oldStage)
    setDragId(null)
    router.refresh()
  }

  return (
    <div className="flex gap-3 pb-4" style={{ minWidth: `${STAGES.length * 260}px` }}>
      {STAGES.map(s => {
        const col = leads.filter(l => l.stage === s.value)
        return (
          <div key={s.value} className="w-[250px] flex-shrink-0 flex flex-col"
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, s.value)}>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#111a14] border border-white/[0.06] rounded-t-lg border-b-0">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-xs font-semibold flex-1" style={{ color: s.color }}>{s.label}</span>
              <span className="font-mono text-[10px] text-[#6b8f6b] bg-[#1e2b1e] px-1.5 py-0.5 rounded">{col.length}</span>
            </div>
            <div className="flex-1 bg-[#0f1810] border border-white/[0.06] rounded-b-lg p-2 space-y-2 min-h-[200px]">
              {col.map(l => (
                <div key={l.id}
                  draggable
                  onDragStart={() => setDragId(l.id)}
                  onDragEnd={() => setDragId(null)}
                  className={`bg-[#111a14] border rounded-md p-3 cursor-grab active:cursor-grabbing hover:border-white/15 transition-all ${dragId === l.id ? 'opacity-50' : ''}`}
                  style={{ borderColor: 'rgba(255,255,255,0.06)', borderLeft: `3px solid ${s.color}` }}>
                  <Link href={`/app/leads/${l.id}`} onClick={e => e.stopPropagation()}>
                    <div className="text-sm font-medium text-[#d4e4d4] mb-1 hover:text-white">{l.full_name}</div>
                  </Link>
                  <div className="text-[11px] text-[#6b8f6b] mb-2">{FLAGS[l.country] ?? '🌍'} {l.country}</div>
                  <div className="text-[11px] text-[#6b8f6b] italic mb-2 truncate">{l.treatment}</div>
                  {l.whatsapp && (
                    <a href={`https://wa.me/${l.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="mt-2 flex items-center gap-1 text-[10px] text-[#25d366]/70 hover:text-[#25d366] transition-colors">
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              ))}
              {col.length === 0 && (
                <div className="text-center py-6 text-[11px] text-[#6b8f6b]/50 italic">Drop here</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
