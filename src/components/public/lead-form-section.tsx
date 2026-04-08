'use client'

import { useState, useRef } from 'react'
import { capturePublicLead } from '@/actions/leads'
import { COUNTRIES, TREATMENTS, BUDGET_RANGES, TRAVEL_MONTHS, WA_NUMBER } from '@/lib/constants'

export function LeadFormSection() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [waUrl, setWaUrl] = useState('')
  const tsRef = useRef(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const data = {
      full_name:              fd.get('full_name') as string,
      email:                  fd.get('email') as string,
      whatsapp:               fd.get('whatsapp') as string,
      country:                fd.get('country') as string,
      treatment_interest:     fd.get('treatment_interest') as string,
      budget_range:           fd.get('budget_range') as string || undefined,
      preferred_travel_month: fd.get('preferred_travel_month') as string || undefined,
      notes:                  fd.get('notes') as string || undefined,
      website:                fd.get('website') as string || undefined,
      _ts:                    tsRef.current,
    }

    const result = await capturePublicLead(data as any)

    if (result.success) {
      const msg = encodeURIComponent(
        `Hi MMV Medical — I just submitted a consultation request.\n\n` +
        `Name: ${data.full_name}\n` +
        `Country: ${data.country}\n` +
        `Treatment: ${data.treatment_interest}\n\n` +
        `Looking forward to hearing from you!`
      )
      setWaUrl(`https://wa.me/${WA_NUMBER}?text=${msg}`)
      setState('success')
    } else {
      setErrorMsg(result.error ?? 'Something went wrong')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="max-w-lg bg-white border border-cream-dark rounded-lg p-8 text-center">
        <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
        <h3 className="font-display text-2xl font-semibold text-navy mb-2">Request Received</h3>
        <p className="text-navy/55 text-sm leading-relaxed mb-6">
          Thank you. We'll send your personalised treatment plan within 24 hours via WhatsApp or email.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25d366] text-white font-semibold text-sm px-6 py-3 rounded-sm hover:bg-[#1db954] transition-colors"
        >
          💬 Continue on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Left: promises */}
      <div>
        <ul className="space-y-3">
          {[
            'Response within 24 hours',
            'Personalised treatment plan with exact pricing',
            'No pushy sales — honest information only',
            'English-speaking coordinator from day one',
            'WhatsApp or email — your choice',
          ].map(p => (
            <li key={p} className="flex items-center gap-3 text-navy/70 text-sm">
              <span className="w-5 h-5 rounded-full bg-teal flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: form */}
      <div className="bg-white border border-cream-dark rounded-lg p-6 shadow-sm">
        <h3 className="font-display text-xl font-semibold text-navy mb-1">Free Consultation Request</h3>
        <p className="text-navy/45 text-xs mb-5">Takes 2 minutes. No commitment.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot — hidden from real users */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Full Name *</label>
              <input name="full_name" required className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Country *</label>
              <select name="country" required defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
                <option value="" disabled>Select</option>
                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Email *</label>
            <input name="email" type="email" required className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="your@email.com" />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">WhatsApp *</label>
            <input name="whatsapp" type="tel" required className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="+44 7700 000000" />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Treatment Interest *</label>
            <select name="treatment_interest" required defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
              <option value="" disabled>Select treatment</option>
              {TREATMENTS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Budget Range</label>
              <select name="budget_range" defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
                <option value="">Not sure</option>
                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Travel Month</label>
              <select name="preferred_travel_month" defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
                <option value="">Flexible</option>
                {TRAVEL_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Your Situation (optional)</label>
            <textarea name="notes" rows={3} className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal resize-none" placeholder="E.g. I'm missing 2 back teeth, quoted £6,000 in the UK..." />
          </div>

          {state === 'error' && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-2 rounded">{errorMsg}</p>
          )}

          <button type="submit" disabled={state === 'loading'} className="w-full bg-navy text-gold font-semibold text-sm tracking-wide uppercase py-3 rounded-sm hover:bg-navy-mid transition-colors disabled:opacity-50">
            {state === 'loading' ? 'Sending...' : 'Send My Free Consultation Request →'}
          </button>

          <p className="text-navy/30 text-xs text-center leading-relaxed">
            Your information is kept private by MMV Medical and never shared with third parties.
          </p>
        </form>
      </div>
    </div>
  )
}
