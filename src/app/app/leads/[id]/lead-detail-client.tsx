'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateLeadStage, addNote, deleteLead } from '@/actions/leads'
import { STAGES } from '@/lib/constants'
import { ArrowLeft, MessageCircle } from 'lucide-react'

interface Lead {
  id: string; full_name: string; email: string; whatsapp: string
  country: string; treatment: string; stage: string; source: string
  notes: string | null; created_at: string
}
interface Activity { id: string; title: string; created_at: string }
interface Note {
  id: string; content: string; created_at: string
  profiles: { full_name: string } | null
}
interface Props { lead: Lead; activities: Activity[]; notes: Note[] }

export function LeadDetailClient({ lead, activities, notes }: Props) {
  const router = useRouter()
  const [stage, setStage] = useState(lead.stage)
  const [noteText, setNoteText] = useState('')
  const [saving, setSaving] = useState(false)

  const waUrl = `https://wa.me/${lead.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(
    `Hi ${lead.full_name.split(' ')[0]}, this is Yared from MMV Medical. Following up on your dental enquiry — are you still looking to proceed?`
  )}`

  async function handleStageChange(newStage: string) {
    const old = stage
    setStage(newStage)
    await updateLeadStage(lead.id, newStage, old)
    router.refresh()
  }

  async function handleSaveNote() {
    if (!noteText.trim()) return
    setSaving(true)
    await addNote({ lead_id: lead.id, content: noteText })
    setNoteText('')
    setSaving(false)
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm(`Delete lead for ${lead.full_name}? This cannot be undone.`)) return
    await deleteLead(lead.id)
    router.push('/app/leads')
  }

  const inp = 'bg-[#1e2b1e] border border-white/[0.08] rounded px-3 py-2 text-sm text-[#d4e4d4] outline-none focus:border-[#3dd68c]/40 w-full'

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-[#6b8f6b] hover:text-[#d4e4d4] transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{lead.full_name}</h1>
            <p className="text-sm text-[#6b8f6b]">{lead.country} · {lead.treatment}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs bg-[#25d366]/10 border border-[#25d366]/25 text-[#25d366] px-3 py-1.5 rounded hover:bg-[#25d366]/18 transition-colors">
            <MessageCircle size={13} /> WhatsApp
          </a>
          <button onClick={handleDelete} className="text-xs bg-[#e05252]/10 border border-[#e05252]/20 text-[#e05252] px-3 py-1.5 rounded hover:bg-[#e05252]/18 transition-colors">
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          {/* Stage */}
          <div className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mb-3">Stage</div>
            <div className="flex gap-2 flex-wrap">
              {STAGES.map(s => (
                <button key={s.value} onClick={() => handleStageChange(s.value)}
                  className="text-xs px-3 py-1.5 rounded font-medium transition-all border"
                  style={stage === s.value
                    ? { background: `${s.color}22`, color: s.color, borderColor: `${s.color}44` }
                    : { background: 'transparent', color: '#6b8f6b', borderColor: 'rgba(255,255,255,0.06)' }
                  }>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mb-3">Contact Details</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Email',     value: lead.email },
                { label: 'WhatsApp',  value: lead.whatsapp },
                { label: 'Country',   value: lead.country },
                { label: 'Treatment', value: lead.treatment },
                { label: 'Source',    value: lead.source },
                { label: 'Added',     value: lead.created_at.slice(0,10) },
              ].map(d => (
                <div key={d.label}>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-0.5">{d.label}</div>
                  <div className="text-sm text-[#d4e4d4] font-mono">{d.value}</div>
                </div>
              ))}
            </div>
            {lead.notes && (
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-1">Initial Notes</div>
                <p className="text-sm text-[#d4e4d4]/70 leading-relaxed">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Add note */}
          <div className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mb-3">Add Note</div>
            <textarea className={`${inp} resize-none mb-2`} rows={3} value={noteText}
              onChange={e => setNoteText(e.target.value)} placeholder="What happened? What's next?" />
            <button onClick={handleSaveNote} disabled={saving || !noteText.trim()}
              className="text-xs bg-[#3dd68c] text-[#0d1117] font-semibold px-4 py-1.5 rounded hover:bg-[#52e09e] transition-colors disabled:opacity-40">
              {saving ? 'Saving…' : 'Add Note'}
            </button>
          </div>

          {/* Notes */}
          {notes.length > 0 && (
            <div className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4">
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mb-3">Notes ({notes.length})</div>
              <div className="space-y-3">
                {notes.map(n => (
                  <div key={n.id} className="border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                    <p className="text-sm text-[#d4e4d4]/80 leading-relaxed">{n.content}</p>
                    <div className="text-[10px] font-mono text-[#6b8f6b] mt-1">
                      {n.profiles?.full_name ?? 'Team'} · {new Date(n.created_at).toLocaleString('en-GB', { dateStyle:'medium', timeStyle:'short' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activity log */}
        <div className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4 h-fit">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mb-3">Activity Log</div>
          <div className="space-y-3">
            {activities.length > 0 ? activities.map(a => (
              <div key={a.id} className="flex gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3dd68c] flex-shrink-0 mt-1.5" />
                <div>
                  <div className="text-xs text-[#d4e4d4]">{a.title}</div>
                  <div className="text-[10px] font-mono text-[#6b8f6b] mt-0.5">
                    {new Date(a.created_at).toLocaleString('en-GB', { dateStyle:'medium', timeStyle:'short' })}
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-xs text-[#6b8f6b] italic">No activity yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
