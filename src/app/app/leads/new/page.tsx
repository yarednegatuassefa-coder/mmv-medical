'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { capturePublicLead } from '@/actions/leads'
import { COUNTRIES, TREATMENTS, STAGES, BUDGET_RANGES, TRAVEL_MONTHS } from '@/lib/constants'
import { ArrowLeft } from 'lucide-react'

export default function NewLeadPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const inp = 'bg-[#1e2b1e] border border-white/[0.08] rounded px-3 py-2 text-sm text-[#d4e4d4] outline-none focus:border-[#3dd68c]/40 w-full placeholder:text-[#6b8f6b]'
  const lbl = 'block text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-1.5'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const result = await capturePublicLead({
      full_name:              fd.get('full_name') as string,
      email:                  fd.get('email') as string,
      whatsapp:               fd.get('whatsapp') as string,
      country:                fd.get('country') as string,
      treatment_interest:     fd.get('treatment_interest') as string,
      budget_range:           fd.get('budget_range') as string || undefined,
      preferred_travel_month: fd.get('preferred_travel_month') as string || undefined,
      notes:                  fd.get('notes') as string || undefined,
    } as any)

    setSaving(false)
    if (result.success) {
      router.push('/app/leads')
    } else {
      setError(result.error ?? 'Failed to create lead')
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-[#6b8f6b] hover:text-[#d4e4d4] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Add New Lead</h1>
          <p className="text-xs text-[#6b8f6b]">Manually add a lead to the CRM pipeline</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-[#111a14] border border-white/[0.06] rounded-lg p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Full Name *</label>
            <input name="full_name" required className={inp} placeholder="Patient name" />
          </div>
          <div>
            <label className={lbl}>Country *</label>
            <select name="country" required defaultValue="" className={`${inp} bg-[#1e2b1e]`}>
              <option value="" disabled>Select</option>
              {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Email *</label>
            <input name="email" type="email" required className={inp} placeholder="patient@email.com" />
          </div>
          <div>
            <label className={lbl}>WhatsApp *</label>
            <input name="whatsapp" type="tel" required className={inp} placeholder="+44 7700 000000" />
          </div>
        </div>

        <div>
          <label className={lbl}>Treatment Interest *</label>
          <select name="treatment_interest" required defaultValue="" className={`${inp} bg-[#1e2b1e]`}>
            <option value="" disabled>Select treatment</option>
            {TREATMENTS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Budget Range</label>
            <select name="budget_range" defaultValue="" className={`${inp} bg-[#1e2b1e]`}>
              <option value="">Not specified</option>
              {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Travel Month</label>
            <select name="preferred_travel_month" defaultValue="" className={`${inp} bg-[#1e2b1e]`}>
              <option value="">Flexible</option>
              {TRAVEL_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={lbl}>Notes</label>
          <textarea name="notes" rows={3} className={`${inp} resize-none`}
            placeholder="Patient situation, concerns, how they found us…" />
        </div>

        {error && <p className="text-xs text-[#e05252] bg-[#e05252]/10 border border-[#e05252]/20 px-3 py-2 rounded">{error}</p>}

        <div className="flex gap-3 pt-1">
          <button type="submit" disabled={saving}
            className="bg-[#3dd68c] text-[#0d1117] font-semibold text-sm px-6 py-2.5 rounded hover:bg-[#52e09e] transition-colors disabled:opacity-40">
            {saving ? 'Saving…' : 'Create Lead'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="bg-transparent border border-white/[0.08] text-[#6b8f6b] text-sm px-5 py-2.5 rounded hover:text-[#d4e4d4] transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
